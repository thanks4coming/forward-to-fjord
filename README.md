# Forward to Fjord — E-bike trip

Interactive route planner for a Scandinavia → Baltic → Balkans tour (static HTML + Leaflet). Updates live as the trip progresses.

## View the map (GitHub Pages)

**[https://thanks4coming.github.io/forward-to-fjord/](https://thanks4coming.github.io/forward-to-fjord/)**

GitHub Pages is enabled on this repo (branch `main`, folder `/`). After you push changes, the live site usually updates within one to two minutes.

Share that URL with anyone following along. The repo is public — commits and file history are visible too.

---

## Update my location

In **Cursor mobile**, say where you are in one message:

> **update my location — Turku**

or

> **update my location — Stockholm, Sweden**

Cloud Agent looks up the coordinates, updates the map, and pushes live. **No apps to install, no tokens, no setup.**

### Examples

| You say | What happens |
|---------|----------------|
| `update my location — Turku` | Map pin at Turku |
| `update my location — camped outside Helsinki` | Pin near Helsinki |
| `update my location — 59.3293, 18.0686` | Exact coords (see below) |
| `update my location — Kraków, 120 km today` | Pin at Kraków + note on timeline |

If you only say `update my location`, the agent will ask what city you're in.

### Precise GPS (optional, 10 seconds)

When you want your exact spot, not just the city:

1. Open **Google Maps** → long-press where you are → **Copy coordinates**
2. `update my location — 59.3293, 18.0686`

### What visitors see

- **You Are Here** pin (latest coordinates)
- **Location Timeline** in the sidebar — every GPS check-in, newest first; tap an entry to pan the map
- **Show Location Trail** toggle — green dashed line connecting all check-ins on the map

`location-stash.json` holds the last phone sync. Coordinates are public trip data — never put API tokens in it.

Cloud Agent entry point: [AGENTS.md](AGENTS.md)

---

## Check-in workflow (while traveling)

Each update is a small edit plus an optional photo. You only need to touch **`trip-data.js`** (not the full HTML).

### 1. Add photos (optional)

1. Resize photos before committing (max ~1600px wide, ~80% JPEG quality keeps the repo fast).
2. Save into [`photos/`](photos/) with a dated name, e.g. `2026-06-08-gothenburg.jpg`.
3. Reference them as `photos/2026-06-08-gothenburg.jpg` in `trip-data.js` (relative path).

Do not commit RAW originals or huge batches in one go.

### 2. Edit `trip-data.js`

Open [`trip-data.js`](trip-data.js) and update:

| Field | What to set |
|-------|-------------|
| `active` | `true` once the trip has started |
| `currentSegment` | Segment id you are on — **1, 3, 4, 5, 6, 7, 8, or 9** (there is no segment 2) |
| `currentCity` | Current town or city name |
| `dayNumber` | Trip day count |
| `kmRidden` | Total km cycled so far |
| `countries` | Array of countries visited, e.g. `['Sweden','Finland']` |
| `lat` / `lng` | Your current coordinates — preferred over city-name guessing on the map |
| `lastUpdated` | Today's date string, e.g. `'2026-06-08'` — shown in the live banner |
| `locationHistory` | Auto-filled on GPS check-ins (newest first) — powers the timeline and map trail |
| `updates` | Prepend a new entry (newest first) — see example below |
| `photos` | Optional map pins — same image paths as in `updates` |

**Example update entry** (prepend to `updates`):

```javascript
{
  date: '2026-06-08',
  location: 'Gothenburg, Sweden',
  text: 'Packed and ready. Ferry tomorrow.',
  photo: 'photos/2026-06-08-gothenburg.jpg'
}
```

**Example map pin** (add to `photos`):

```javascript
{
  lat: 57.7089,
  lng: 11.9746,
  src: 'photos/2026-06-08-gothenburg.jpg',
  caption: 'Harbor sunset',
  location: 'Gothenburg'
}
```

### 3. Bump the service worker cache

In [`sw.js`](sw.js), increment the cache name so PWA visitors get fresh trip data:

```javascript
const CACHE = 'biketrip-v7';  // was v6, v7, v8 …
```

Bump this on every check-in you push.

### 4. Commit and push

```powershell
git add trip-data.js photos/ sw.js
git commit -m "trip check-in: Gothenburg, day 0"
git push origin main
```

### 5. Before you push — public data check

This repo is **world-readable**. Fine to publish: route narrative, city names, trip photos you are happy to share, general budget figures.

**Do not commit:** API keys, `.env`, passwords, passport or booking codes, private home address, exact hotel confirmations, or anything you would not post on a public blog.

---

## What the site shows

When `active: true`:

- Live banner with city, day, segment, countries, and last-updated date
- Stats bar (km ridden, day, country count)
- Progress bar vs total planned distance (~5025 km)
- “You Are Here” map pin from `lat`/`lng`
- Location Timeline and map trail from `locationHistory`
- Journey Updates feed in the sidebar
- Optional photo pins on the map (toggle “Show Photos”)

When the trip is active and the newest update has a `photo`, link previews (iMessage, WhatsApp, etc.) use that image.

---

## History

Trip changes are normal Git history: [commits](https://github.com/thanks4coming/forward-to-fjord/commits/main), diffs, and blame on `trip-data.js` and `photos/`.
