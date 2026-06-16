# Agent instructions — Forward to Fjord

## Update my location

User says where they are in one message, e.g.:

- `update my location — Turku`
- `update my location — 59.33, 18.07`

1. `node scripts/apply-location-stash.js --place "..."` or `--coords lat,lng`
2. Commit and push `trip-data.js`, `sw.js`, `location-stash.json` to `main`

If no place given, ask: *What city are you in?*

Full steps: `.cursor/skills/update-location/SKILL.md`
