#!/usr/bin/env node
/**
 * Update trip location on the map.
 *
 *   node scripts/apply-location-stash.js --place "Turku, Finland"
 *   node scripts/apply-location-stash.js --coords 59.3293,18.0686
 *   node scripts/apply-location-stash.js --coords 59.3293,18.0686 --note "Camped by the harbour"
 *   node scripts/apply-location-stash.js              # read location-stash.json (optional)
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const stashPath = path.join(root, 'location-stash.json');
const tripDataPath = path.join(root, 'trip-data.js');
const swPath = path.join(root, 'sw.js');

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
}

async function geocodePlace(place) {
  const url = 'https://nominatim.openstreetmap.org/search?q=' + encodeURIComponent(place) + '&format=json&limit=1';
  const resp = await fetch(url, {
    headers: { 'User-Agent': 'forward-to-fjord/1.0 (github.com/thanks4coming/forward-to-fjord)' }
  });
  if (!resp.ok) throw new Error('Geocoding failed (' + resp.status + ')');
  const data = await resp.json();
  if (!data.length) throw new Error('Could not find place: ' + place);
  const label = data[0].display_name.split(',').slice(0, 2).join(',').trim();
  return {
    lat: Math.round(parseFloat(data[0].lat) * 1e6) / 1e6,
    lng: Math.round(parseFloat(data[0].lon) * 1e6) / 1e6,
    location: label
  };
}

async function loadStash() {
  const place = argValue('--place');
  const coords = argValue('--coords');
  const note = argValue('--note');

  if (place) {
    const geo = await geocodePlace(place);
    return {
      lat: geo.lat,
      lng: geo.lng,
      location: geo.location,
      capturedAt: new Date().toISOString(),
      note: note || null
    };
  }

  if (coords) {
    const parts = coords.split(',').map(function (s) { return parseFloat(s.trim()); });
    if (parts.length !== 2 || parts.some(isNaN)) throw new Error('Invalid --coords. Use: 59.33,18.07');
    return {
      lat: Math.round(parts[0] * 1e6) / 1e6,
      lng: Math.round(parts[1] * 1e6) / 1e6,
      location: argValue('--location') || null,
      capturedAt: new Date().toISOString(),
      note: note || null
    };
  }

  const jsonIdx = process.argv.indexOf('--json');
  if (jsonIdx !== -1 && process.argv[jsonIdx + 1]) {
    return JSON.parse(process.argv[jsonIdx + 1]);
  }
  if (process.argv.includes('--stdin')) {
    const raw = fs.readFileSync(0, 'utf8').trim();
    if (!raw) throw new Error('No JSON on stdin');
    return JSON.parse(raw);
  }
  if (fs.existsSync(stashPath)) {
    const stash = JSON.parse(fs.readFileSync(stashPath, 'utf8'));
    if (stash.lat != null && stash.lng != null) return stash;
  }

  throw new Error('Say where you are: --place "City" or --coords lat,lng');
}

function writeStash(stash) {
  fs.writeFileSync(stashPath, JSON.stringify(stash, null, 2) + '\n', 'utf8');
}

function bumpSwCache(content) {
  const match = content.match(/const CACHE = 'biketrip-v(\d+)'/);
  if (!match) throw new Error('Could not find CACHE version in sw.js');
  const next = parseInt(match[1], 10) + 1;
  return content.replace(/const CACHE = 'biketrip-v\d+'/, "const CACHE = 'biketrip-v" + next + "'");
}

function formatEntry(entry) {
  const lines = ['    {'];
  lines.push("      at: '" + entry.at + "',");
  lines.push('      lat: ' + entry.lat + ',');
  lines.push('      lng: ' + entry.lng + ',');
  if (entry.location) lines.push("      location: '" + entry.location.replace(/'/g, "\\'") + "',");
  if (entry.note) lines.push("      note: '" + entry.note.replace(/'/g, "\\'") + "',");
  if (entry.accuracy != null) lines.push('      accuracy: ' + entry.accuracy + ',');
  lines.push('    }');
  return lines.join('\n');
}

function upsertField(src, field, valueLiteral) {
  const quoted = new RegExp('(' + field + ':)\\s*\'(?:\\\\.|[^\'])*\'');
  if (quoted.test(src)) return src.replace(quoted, '$1 ' + valueLiteral);
  const bare = new RegExp('(' + field + ':)\\s*[^,\\n]+');
  if (bare.test(src)) return src.replace(bare, '$1 ' + valueLiteral);
  throw new Error('Field not found in trip-data.js: ' + field);
}

function prependHistory(src, entryText) {
  const marker = 'locationHistory: [';
  if (!src.includes(marker)) throw new Error('locationHistory array missing from trip-data.js');
  const after = src.indexOf(marker) + marker.length;
  const tail = src.slice(after);
  if (/^\s*\]/.test(tail)) {
    return src.slice(0, after) + '\n' + entryText + '\n  ' + src.slice(after);
  }
  return src.slice(0, after) + '\n' + entryText + ',' + src.slice(after);
}

function prependUpdate(src, updateText) {
  const marker = 'updates: [';
  if (!src.includes(marker)) throw new Error('updates array missing from trip-data.js');
  const after = src.indexOf(marker) + marker.length;
  const tail = src.slice(after);
  if (/^\s*\]/.test(tail)) {
    return src.slice(0, after) + '\n' + updateText + '\n  ' + src.slice(after);
  }
  return src.slice(0, after) + '\n' + updateText + ',' + src.slice(after);
}

function getLatestHistoryEntry(tripSrc) {
  const marker = 'locationHistory: [';
  const start = tripSrc.indexOf(marker);
  if (start === -1) return null;
  const block = tripSrc.slice(start, start + 800);
  const entryMatch = block.match(/\{\s*at:\s*'([^']+)'[\s\S]*?lat:\s*([\d.]+)[\s\S]*?lng:\s*([\d.]+)/);
  if (!entryMatch) return null;
  return { at: entryMatch[1], lat: parseFloat(entryMatch[2]), lng: parseFloat(entryMatch[3]) };
}

function isAlreadyApplied(tripSrc, stash) {
  const latest = getLatestHistoryEntry(tripSrc);
  if (!latest) return false;
  if (stash.capturedAt && latest.at === stash.capturedAt) return true;
  const eps = 0.00005;
  if (Math.abs(latest.lat - stash.lat) < eps && Math.abs(latest.lng - stash.lng) < eps) {
    if (!stash.capturedAt) return true;
    const diff = Math.abs(new Date(latest.at).getTime() - new Date(stash.capturedAt).getTime());
    if (diff < 5 * 60 * 1000) return true;
  }
  return false;
}

function applyStash(stash) {
  if (stash.lat == null || stash.lng == null) {
    throw new Error('Need a place name or coordinates.');
  }

  let tripSrc = fs.readFileSync(tripDataPath, 'utf8');
  if (isAlreadyApplied(tripSrc, stash)) {
    console.log('Already applied: ' + (stash.location || stash.lat + ', ' + stash.lng));
    return null;
  }

  const capturedAt = stash.capturedAt || new Date().toISOString();
  const dateOnly = capturedAt.slice(0, 10);
  const locationLabel = stash.location || (stash.lat + ', ' + stash.lng);

  tripSrc = upsertField(tripSrc, 'lat', stash.lat);
  tripSrc = upsertField(tripSrc, 'lng', stash.lng);
  tripSrc = upsertField(tripSrc, 'lastUpdated', "'" + dateOnly + "'");
  tripSrc = upsertField(tripSrc, 'currentCity', "'" + locationLabel.replace(/'/g, "\\'") + "'");
  if (!/active:\s*true/.test(tripSrc)) {
    tripSrc = upsertField(tripSrc, 'active', 'true');
  }
  tripSrc = prependHistory(tripSrc, formatEntry({
    at: capturedAt,
    lat: stash.lat,
    lng: stash.lng,
    location: stash.location || undefined,
    note: stash.note || undefined,
    accuracy: stash.accuracy != null ? stash.accuracy : undefined
  }));

  if (stash.note) {
    tripSrc = prependUpdate(tripSrc, [
      '    {',
      "      date: '" + dateOnly + "',",
      "      location: '" + locationLabel.replace(/'/g, "\\'") + "',",
      "      text: '" + stash.note.replace(/'/g, "\\'") + "',",
      '      lat: ' + stash.lat + ',',
      '      lng: ' + stash.lng,
      '    }'
    ].join('\n'));
  }

  fs.writeFileSync(tripDataPath, tripSrc, 'utf8');
  fs.writeFileSync(swPath, bumpSwCache(fs.readFileSync(swPath, 'utf8')), 'utf8');
  return { locationLabel, capturedAt };
}

async function main() {
  const stash = await loadStash();
  writeStash(stash);
  const result = applyStash(stash);
  if (!result) return;
  console.log('Applied location: ' + result.locationLabel);
  console.log('  ' + stash.lat + ', ' + stash.lng + ' @ ' + result.capturedAt);
  if (stash.note) console.log('  Journey update added with note.');
  console.log('Updated trip-data.js, location-stash.json, and bumped sw.js cache.');
}

main().catch(function (err) {
  console.error(err.message || err);
  process.exit(1);
});
