// ============================================================
// LIVE TRIP STATUS — edit this file each time you check in
// See README.md for the check-in workflow.
// ============================================================
const tripStatus = {
  active: false,               // set true when the trip starts
  currentSegment: 1,           // segment id: 1, 3, 4, 5, 6, 7, 8, 9 (no segment 2)
  currentCity: 'Gothenburg',   // most recent city/town name
  dayNumber: 0,                // day number of the trip
  kmRidden: 0,                 // total km covered so far
  countries: [],               // e.g. ['Sweden','Finland']
  lat: null,                   // precise current lat (preferred over city fallback)
  lng: null,                   // precise current lng
  lastUpdated: null,           // e.g. '2026-06-08' — shown in live banner when set
  updates: [
    // Newest first. photo: relative path under photos/ or full HTTPS URL
    // { date: '2026-XX-XX', location: 'City, Country', text: 'Your update here.', photo: 'photos/2026-XX-XX-city.jpg' }
  ],
  photos: [
    // Map photo pins — add as you go
    // { lat: 0.0, lng: 0.0, src: 'photos/2026-XX-XX-city.jpg', caption: 'Caption', location: 'City' }
  ]
};
