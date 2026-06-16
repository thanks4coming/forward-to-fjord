---
name: update-location
description: >-
  One-prompt trip location update for Forward to Fjord. When the user says
  update my location with a city name or coordinates, geocode and apply to the
  map, then commit and push. Works from Cursor mobile and Cloud Agent.
---

# Update my location

The user says where they are in the same message. No phone setup, no stash file required.

## Parse from the message

| User says | Run |
|-----------|-----|
| `update my location — Turku` | `node scripts/apply-location-stash.js --place "Turku"` |
| `update my location, Stockholm Sweden` | `node scripts/apply-location-stash.js --place "Stockholm Sweden"` |
| `update my location — 59.33, 18.07` | `node scripts/apply-location-stash.js --coords 59.33,18.07` |
| `update my location — Turku, camped by the harbour` | `--place "Turku" --note "camped by the harbour"` |

Extract the city or `lat, lng` pair from their message. If they only say **update my location** with no place, ask once: *What city are you in?*

## Apply and publish

1. Run the script with `--place` or `--coords` (add `--note` if they included a journal note).
2. If they also gave trip stats (`dayNumber`, `kmRidden`, `currentSegment`, `countries`), edit `trip-data.js` after.
3. **Commit and push to `main`** unless they said not to:

```text
git add location-stash.json trip-data.js sw.js
git commit -m "location check-in: <place>"
git push origin main
```

4. Confirm place, coordinates, and that the live map updates in ~1–2 min.

## Precise GPS (optional)

If they want exact coords: Google Maps → long-press the map → **Copy coordinates** → `update my location — 59.3293, 18.0686`

## Public data

City names and coordinates are fine. Never commit tokens.
