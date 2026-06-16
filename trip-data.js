// ============================================================
// LIVE TRIP STATUS — edit this file each time you check in
// See README.md for the check-in workflow.
// ============================================================
const tripStatus = {
  active: true,               // set true when the trip starts
  currentSegment: 1,           // segment id: 1, 3, 4, 5, 6, 7, 8, 9 (no segment 2)
  currentCity: 'London Heathrow Airport, Southern Perimeter Road',   // most recent city/town name
  dayNumber: 1,                // day number of the trip
  kmRidden: 0,                 // total km covered so far
  countries: ['Australia', 'Vietnam', 'United Kingdom'],               // e.g. ['Sweden','Finland']
  lat: 51.467739,                   // precise current lat (preferred over city fallback)
  lng: -0.45878,                   // precise current lng
  lastUpdated: '2026-06-16',           // e.g. '2026-06-08' — shown in live banner when set
  locationHistory: [
    {
      at: '2026-06-16T17:48:53.409Z',
      lat: 51.467739,
      lng: -0.45878,
      location: 'London Heathrow Airport, Southern Perimeter Road',
      note: 'Landed — no issues. Smell like shit.',
    },
    {
      at: '2026-06-16T00:59:34.919Z',
      lat: 10.817979,
      lng: 106.656265,
      location: 'Ho Chi Minh City, Vietnam',
      note: 'Tan Son Nhat Airport — layover en route to Scandinavia',
    },
    {
      at: '2026-06-15T15:22:30.817Z',
      lat: -31.941521,
      lng: 115.965577,
      location: 'Perth Airport',
      note: 'T1 International Departures, Gate 52',
    },
    // Newest first — auto-filled by scripts/apply-location-stash.js on each GPS check-in
    // { at: '2026-06-15T14:30:00.000Z', lat: 57.7089, lng: 11.9746, location: 'Gothenburg, Sweden', note: 'optional', accuracy: 12 }
  ],
  updates: [
    {
      date: '2026-06-16',
      location: 'London Heathrow Airport, Southern Perimeter Road',
      text: 'Landed — no issues. Smell like shit.',
      lat: 51.467739,
      lng: -0.45878
    },
    {
      date: '2026-06-15',
      location: 'Perth Airport, Australia',
      text: 'T1 International Departures, Gate 52 — it begins. Off to Scandinavia.',
      lat: -31.941521,
      lng: 115.965577
    },
    // Newest first. photo: relative path under photos/ or full HTTPS URL
    // { date: '2026-XX-XX', location: 'City, Country', text: 'Your update here.', photo: 'photos/2026-XX-XX-city.jpg', lat: 0.0, lng: 0.0 }
  ],
  photos: [
    // Map photo pins — add as you go
    // { lat: 0.0, lng: 0.0, src: 'photos/2026-XX-XX-city.jpg', caption: 'Caption', location: 'City' }
  ]
};
