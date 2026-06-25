// ============================================================
// LIVE TRIP STATUS — edit this file each time you check in
// See README.md for the check-in workflow.
// ============================================================
const tripStatus = {
  active: true,               // set true when the trip starts
  currentSegment: 1,           // segment id: 1, 3, 4, 5, 6, 7, 8, 9 (no segment 2)
  currentCity: 'Jönköping',   // most recent city/town name
  dayNumber: 11,                // day number of the trip
  kmRidden: 274,                 // total km covered so far
  countries: ['Australia', 'Vietnam', 'United Kingdom', 'Sweden'],               // e.g. ['Sweden','Finland']
  lat: 57.769429,                   // precise current lat (preferred over city fallback)
  lng: 14.035379,                   // precise current lng
  lastUpdated: '2026-06-25',           // e.g. '2026-06-08' — shown in live banner when set
  locationHistory: [
    {
      at: '2026-06-25T13:59:17.126Z',
      lat: 57.769429,
      lng: 14.035379,
      location: 'Jönköping',
      note: 'Stacked the bike at Sportson. Front fork and brake pads bent — going too fast on gravel while fully loaded, apparently.',
    },
    {
      at: '2026-06-25T10:31:17.000Z',
      lat: 57.837082,
      lng: 14.544994,
      location: 'Ryd',
    },
    {
      at: '2026-06-25T09:07:54.000Z',
      lat: 57.687066,
      lng: 13.704877,
      location: 'Mörkö',
    },
    {
      at: '2026-06-24T08:01:38.600Z',
      lat: 57.790342,
      lng: 13.410234,
      location: 'Ulricehamn bibliotek',
      note: 'Charging the e-bike at the library.',
    },
    {
      at: '2026-06-23T18:00:00.000Z',
      lat: 57.825694,
      lng: 13.348511,
      location: 'Håkabo, near Nitta',
      note: 'Day 2 — Alingsås → Ljur → Fristad → Nitta. Camp by the lake.',
    },
    {
      at: '2026-06-23T15:00:00.000Z',
      lat: 57.8275891,
      lng: 13.1885655,
      location: 'Nitta',
    },
    {
      at: '2026-06-23T12:30:00.000Z',
      lat: 57.8238811,
      lng: 13.0100197,
      location: 'Fristad',
    },
    {
      at: '2026-06-23T10:00:00.000Z',
      lat: 57.9526935,
      lng: 12.8416736,
      location: 'Ljur',
      note: 'Met Conny at the servo — invited home for fika, table tennis, and touring wisdom.',
    },
    {
      at: '2026-06-23T08:00:00.000Z',
      lat: 57.92824,
      lng: 12.533119,
      location: 'Alingsås bibliotek, Södra Ringgatan',
      note: 'Day 2 start — heading east via Ljur and Fristad.',
    },
    {
      at: '2026-06-22T20:30:00.000Z',
      lat: 57.940895,
      lng: 12.656936,
      location: 'Ettermaden, Vårgårda kommun',
      note: 'First night camping — tarp in the pines. Same day as Gothenburg → Alingsås.',
    },
    {
      at: '2026-06-22T12:18:33.371Z',
      lat: 57.92824,
      lng: 12.533119,
      location: 'Alingsås bibliotek, Södra Ringgatan',
      note: 'Day 1 on the bike — Gothenburg to Alingsås. Charging the e-bike at the library. First night camping tonight.',
    },
    {
      at: '2026-06-17T02:54:05.870Z',
      lat: 51.529061,
      lng: -0.120123,
      location: 'Clink261, King\'s Cross, London',
    },
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
      date: '2026-06-25',
      location: 'Jönköping',
      text: 'Ulricehamn → Mörkö → Ryd → Jönköping. I\'m fine, but the front fork and brake pads are bent — going too fast on gravel while fully loaded apparently causes problems. Stacked the bike at Sportson Jönköping; I trust they\'ll figure it out. Looks like a couple extra days here while it gets sorted.',
      photo: 'photos/2026-06-25-stacked-bike.jpg',
      lat: 57.769429,
      lng: 14.035379
    },
    {
      date: '2026-06-24',
      location: 'Ulricehamn bibliotek',
      text: 'Charging the e-bike at the library.',
      lat: 57.790342,
      lng: 13.410234
    },
    {
      date: '2026-06-23',
      location: 'Håkabo, near Nitta',
      text: 'Day 2 — Alingsås → Ljur → Fristad → Nitta. Camp by the lake.',
      photo: 'photos/2026-06-23-hakabo-camp-02.jpg',
      lat: 57.825694,
      lng: 13.348511
    },
    {
      date: '2026-06-23',
      location: 'Ljur',
      text: 'I met Conny at the servo who invited me home for fika. We exchanged wisdom for a few hours, played table tennis. He used to tour and shared 4 huge emails on what hes learned over his years. Conny your hospitality is top tier you represent the Swedes well. Thanks mate 🦘',
      photo: 'photos/2026-06-23-ljur-conny.jpg',
      lat: 57.9526935,
      lng: 12.8416736
    },
    {
      date: '2026-06-22',
      location: 'Ettermaden, Vårgårda kommun',
      text: 'First night camping — tarp in the pines. Same day as Gothenburg → Alingsås.',
      photo: 'photos/2026-06-22-forest-camp-02.jpg',
      lat: 57.940895,
      lng: 12.656936
    },
    {
      date: '2026-06-22',
      location: 'Alingsås bibliotek, Södra Ringgatan',
      text: 'Day 1 on the bike — Gothenburg to Alingsås. Charging the e-bike at the library. First night camping tonight.',
      photo: 'photos/2026-06-22-gothenburg-alingsas-06.jpg',
      lat: 57.92824,
      lng: 12.533119
    },
    {
      date: '2026-06-18',
      location: 'London, United Kingdom',
      text: 'London is pretty but the people are loudly divided. Abs the Albanian barber plans to leave London after 8 years here, the discrimination has become too much for him. We agreed that it\'s not our country and not our choice. I reminded him the western world\'s direction doesn\'t dictate whether you can live a happy and fulfilled life. His family is certainly lucky to have a son like him back in their lives next year.\n\nJet-lagged at 4am in the Maccas as a one-legged Brit is rolled in on his wheelchair. He calls his wife / carer every expletive under the sun, tells the young black boy that he\'s destined to be working here for the rest of his future, then asks the security guard what time he knocks off so they can kick off outside. Would\'ve paid to see that. Imagining that pogo stick\'s martial arts makes me feel like I should\'ve escalated the situation.\n\nI expected the political noise to be loud here and it is — every bar, almost every bus ride. I can\'t really understand either side\'s views after only a couple of days here and without living through the context. It seems like there\'s plenty of reason to be happier however.\n\nRetiree on Parliament Hill requested I mail him Jarrah tree seeds and explained that I MUST visit the Swedish Ball Bearing Factory. Duly noted.',
      photo: 'photos/2026-06-18-chelsea-gardens.jpg',
      lat: 51.5074,
      lng: -0.1278
    },
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
    { lat: 57.769429, lng: 14.035379, src: 'photos/2026-06-25-stacked-bike.jpg', caption: 'Stacked at Sportson', location: 'Jönköping' },
    { lat: 57.837082, lng: 14.544994, src: 'photos/2026-06-25-ulricehamn-jonkoping-03.jpg', caption: 'Approaching Jönköping', location: 'Ryd' },
    { lat: 57.687066, lng: 13.704877, src: 'photos/2026-06-25-ulricehamn-jonkoping-02.jpg', caption: 'South along Vättern', location: 'Mörkö' },
    { lat: 57.687066, lng: 13.704877, src: 'photos/2026-06-25-ulricehamn-jonkoping-01.jpg', caption: 'Leaving Ulricehamn behind', location: 'Mörkö' },
    { lat: 57.802309, lng: 13.399932, src: 'photos/2026-06-24-lake-video-poster.jpg', video: 'photos/2026-06-24-lake-video.mp4', caption: 'Morning at the lake', location: 'Ulricehamn' },
    { lat: 57.9526935, lng: 12.8416736, src: 'photos/2026-06-23-ljur-conny.jpg', caption: 'Fika with Conny', location: 'Ljur' },
    { lat: 57.825694, lng: 13.348511, src: 'photos/2026-06-23-hakabo-camp-01.jpg', caption: 'Loaded bike in the pines', location: 'Håkabo' },
    { lat: 57.825694, lng: 13.348511, src: 'photos/2026-06-23-hakabo-camp-02.jpg', caption: 'Camp by the lake', location: 'Håkabo' },
    { lat: 57.825694, lng: 13.348511, src: 'photos/2026-06-23-hakabo-camp-03.jpg', caption: 'Lake camp setup', location: 'Håkabo' },
    { lat: 57.940895, lng: 12.656936, src: 'photos/2026-06-22-forest-camp-02.jpg', caption: 'Tarp setup in the pines', location: 'Ettermaden' },
    { lat: 57.940895, lng: 12.656936, src: 'photos/2026-06-22-forest-camp-01.jpg', caption: 'Loaded bike at camp', location: 'Ettermaden' },
    { lat: 57.77325, lng: 12.29521, src: 'photos/2026-06-22-gothenburg-alingsas-01.jpg', caption: 'Säveån valley — open fields', location: 'Gothenburg → Alingsås' },
    { lat: 57.77325, lng: 12.29521, src: 'photos/2026-06-22-gothenburg-alingsas-02.jpg', caption: 'Lantbrukets Mjölk roadside', location: 'Gothenburg → Alingsås' },
    { lat: 57.77325, lng: 12.29521, src: 'photos/2026-06-22-gothenburg-alingsas-03.jpg', caption: 'Rock face by the water', location: 'Gothenburg → Alingsås' },
    { lat: 57.77325, lng: 12.29521, src: 'photos/2026-06-22-gothenburg-alingsas-04.jpg', caption: 'Country road with horses', location: 'Gothenburg → Alingsås' },
    { lat: 57.77325, lng: 12.29521, src: 'photos/2026-06-22-gothenburg-alingsas-05.jpg', caption: 'Lake view from the shore', location: 'Gothenburg → Alingsås' },
    { lat: 57.77325, lng: 12.29521, src: 'photos/2026-06-22-gothenburg-alingsas-06.jpg', caption: 'New bike path into Alingsås', location: 'Gothenburg → Alingsås' },
    { lat: 51.480643, lng: -0.160602, src: 'photos/2026-06-18-chelsea-gardens.jpg', caption: 'Battersea Park', location: 'Battersea, London' },
    { lat: 51.564915, lng: -0.157231, src: 'photos/2026-06-18-parliament-gardens.jpg', caption: 'Parliament Hill', location: 'Parliament Hill, London' },
    { lat: 51.4966, lng: -0.1764, src: 'photos/2026-06-18-natural-history-museum.jpg', caption: 'Natural History Museum — star dust, the oldest thing you\'ll ever see', location: 'South Kensington, London' },
    { lat: 51.5239546, lng: -0.0673675, src: 'photos/2026-06-18-carpenters-arms.jpg', caption: 'The Carpenters Arms, Cheshire St', location: 'Shoreditch, London' },
    // Map photo pins — add as you go
    // { lat: 0.0, lng: 0.0, src: 'photos/2026-XX-XX-city.jpg', caption: 'Caption', location: 'City' }
  ]
};
