/**
 * Business facts used across the site. Edit this file, not the pages.
 *
 * Anything marked TODO: has not been supplied yet. The build will still run,
 * but `npm run check:todos` fails until every TODO is replaced with a real
 * value. Do not launch with a TODO in here.
 */

// The public address of the site, with https:// and no trailing slash.
// Used for canonical tags, the sitemap and Open Graph tags.
export const SITE_URL = 'https://TODO-domain.invalid'; // TODO: set the real domain when known

export const BUSINESS = {
  name: 'JDS Guitars',
  owner: 'Jason Sliviak',
  shortDescription: 'Set-up, ready-to-play guitars, repairs and rentals from a home workshop in Derry, NH.',
  address: {
    street: '61 North Shore Rd.',
    town: 'Derry',
    region: 'NH',
    postcode: '03038',
    country: 'US',
  },
  // Latitude and longitude of the address, used for the map link and
  // the MusicStore geo data. Decimal degrees.
  geo: null as null | { lat: number; lng: number }, // TODO: supply coordinates for 61 North Shore Rd, Derry NH
  phone: 'TODO: phone number',
  email: 'TODO: email address',
  // Opening hours, one entry per line, as they should appear on the site.
  // Example: ['Monday to Friday: 10am to 6pm', 'Saturday: 10am to 4pm', 'Sunday: closed']
  hours: ['TODO: opening hours'] as string[],
  // Opening hours in schema.org format for the MusicStore JSON-LD.
  // Example: ['Mo-Fr 10:00-18:00', 'Sa 10:00-16:00']
  hoursSchema: [] as string[], // TODO: opening hours in schema.org format
  paymentMethods: ['PayPal', 'Venmo', 'cash'],
  brands: ['Yamaha', 'Ibanez'], // Brands Jason has said he carries. More: TODO confirm the full list
  social: [] as { label: string; url: string }[], // TODO: social accounts when available
  serviceArea: 'Derry, NH',
  // Notes shown on the contact page about getting there.
  parkingNotes: 'TODO: parking and transport notes',
};

// Formatting helpers for the address.
export const ADDRESS_LINE = `${BUSINESS.address.street}, ${BUSINESS.address.town}, ${BUSINESS.address.region} ${BUSINESS.address.postcode}`;

// Map search link. Works without an API key or a script.
export const MAP_QUERY = encodeURIComponent(`${BUSINESS.address.street} ${BUSINESS.address.town} ${BUSINESS.address.region} ${BUSINESS.address.postcode}`);
export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;
export const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;

// Condition grades used on every listing. The key is what goes in the
// item's front matter; the label and description are what the site shows.
export const GRADES = {
  new: {
    label: 'New',
    description: 'Unused and unplayed apart from the setup check.',
  },
  excellent: {
    label: 'Excellent',
    description: 'Used, with no more than very light marks that you have to look for.',
  },
  'very-good': {
    label: 'Very good',
    description: 'Used, with some light wear from normal playing. Everything described in the condition notes.',
  },
  good: {
    label: 'Good',
    description: 'Used, with visible wear. Fully working and set up. The condition notes list every mark worth knowing about.',
  },
  fair: {
    label: 'Fair',
    description: 'Heavily played or with a repair in its past. Priced accordingly. Read the condition notes before asking.',
  },
} as const;
export type Grade = keyof typeof GRADES;

// The condition category used for filtering. Separate from the grade.
export const CONDITIONS = {
  new: 'New',
  'open-box': 'Open box',
  used: 'Used',
  vintage: 'Vintage',
} as const;
export type Condition = keyof typeof CONDITIONS;

export const GUITAR_TYPES = {
  electric: 'Electric',
  acoustic: 'Acoustic',
  bass: 'Bass',
  classical: 'Classical',
} as const;
export type GuitarType = keyof typeof GUITAR_TYPES;

export const EQUIPMENT_CATEGORIES = {
  amps: 'Amps',
  pedals: 'Pedals',
  drums: 'Drums',
  keys: 'Keys',
  pa: 'PA',
  'strings-accessories': 'Strings and accessories',
  other: 'Other',
} as const;
export type EquipmentCategory = keyof typeof EQUIPMENT_CATEGORIES;

// Which forms exist. Netlify Forms picks these up from the built HTML.
export const FORMS = {
  contact: 'contact',
  repair: 'repair-intake',
  rental: 'rental-enquiry',
} as const;

// Analytics: none. If any is ever added, update src/pages/privacy.astro too.
export const ANALYTICS_IN_USE = false;
