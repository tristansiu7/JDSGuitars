import { defineCollection, type SchemaContext } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Shared pieces --------------------------------------------------------------

const photo = (image: SchemaContext['image']) =>
  z.object({
    // Path relative to the item's folder, e.g. ./front.jpg
    src: image(),
    // Real alt text describing the instrument in this photo.
    alt: z.string().min(8, 'Write real alt text describing what is in the photo'),
  });

const money = z.number().nonnegative();

const common = (image: SchemaContext['image']) => ({
  // Stock reference shown on the page and carried into the contact form.
  // Leave it out and the folder name is used.
  ref: z.string().optional(),
  price: money,
  // available: listed and for sale. on-hold: deposit taken. sold: keep the
  // page a little while so old links still work, but it is marked as sold.
  status: z.enum(['available', 'on-hold', 'sold']).default('available'),
  condition: z.enum(['new', 'open-box', 'used', 'vintage']),
  // Wear grade. Open-box and used items get a wear grade; only unplayed stock is 'new'.
  grade: z.enum(['new', 'excellent', 'very-good', 'good', 'fair']),
  // One line shown under the price, e.g. "Set up with 10s, plays clean to the 22nd fret"
  summary: z.string().max(160).optional(),
  photos: z.array(photo(image)).default([]),
  // The date it was listed, YYYY-MM-DD. Used for "newest first".
  added: z.coerce.date(),
  // Drafts appear in `npm run dev` with a Draft tag and are left out of the build.
  draft: z.boolean().default(false),
});

// Guitars ---------------------------------------------------------------------

const guitars = defineCollection({
  loader: glob({
    pattern: ['**/index.md', '!**/_*/**'],
    base: './src/content/guitars',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      ...common(image),
      make: z.string(),
      model: z.string(),
      type: z.enum(['electric', 'acoustic', 'bass', 'classical']),
      year: z.number().int().optional(),
      // Partial serial, e.g. "HM****" or "ends 4471". Leave out to withhold.
      serial: z.string().optional(),
      handedness: z.enum(['right', 'left']).optional(),
      // Spec sheet. Every field is optional. Rows without a value are not shown.
      specs: z
        .object({
          bodyWood: z.string().optional(),
          top: z.string().optional(),
          neckWood: z.string().optional(),
          neckProfile: z.string().optional(),
          fretboard: z.string().optional(),
          scaleLength: z.string().optional(),
          nutWidth: z.string().optional(),
          frets: z.string().optional(),
          pickups: z.string().optional(),
          electronics: z.string().optional(),
          hardware: z.string().optional(),
          finish: z.string().optional(),
          colour: z.string().optional(),
          strings: z.string().optional(),
          weight: z.string().optional(),
        })
        .default({}),
      // Anything else worth a row, e.g. { "Tuners": "Grover Rotomatic" }
      extraSpecs: z.record(z.string(), z.string()).default({}),
      // "Hard case", "Gig bag", "Original hard case", "None"
      case: z.string().optional(),
      setupNotes: z.string().optional(),
      repairHistory: z.string().optional(),
    }),
});

// Other equipment --------------------------------------------------------------

const equipment = defineCollection({
  loader: glob({
    pattern: ['**/index.md', '!**/_*/**'],
    base: './src/content/equipment',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      ...common(image),
      brand: z.string(),
      model: z.string(),
      category: z.enum(['amps', 'pedals', 'drums', 'keys', 'pa', 'strings-accessories', 'other']),
      year: z.number().int().optional(),
      serial: z.string().optional(),
      // Free-form spec rows, in the order they should appear.
      // specs:
      //   Power: 20 watts
      //   Speaker: 1 x 12 in Celestion
      specs: z.record(z.string(), z.string()).default({}),
      included: z.string().optional(),
      setupNotes: z.string().optional(),
      repairHistory: z.string().optional(),
    }),
});

// Repair services -------------------------------------------------------------

const repairs = defineCollection({
  loader: glob({ pattern: ['*.json', '!_*'], base: './src/content/repairs' }),
  schema: z.object({
    name: z.string(),
    // Group shown as a heading on the repairs page.
    group: z.enum(['Setups and strings', 'Fret work', 'Nut and saddle', 'Electronics', 'Structural', 'Finish']),
    // Price in dollars. null means the price has not been supplied yet.
    price: money.nullable(),
    // fixed: the price is the price. from: starts at this figure. estimate: quoted after inspection.
    priceType: z.enum(['fixed', 'from', 'estimate']),
    // Shown next to the price, e.g. "plus strings" or "depends on fret wire".
    priceNote: z.string().optional(),
    turnaround: z.string().nullable(),
    description: z.string(),
    order: z.number().int().default(100),
  }),
});

// Rentals ----------------------------------------------------------------------

const rentals = defineCollection({
  loader: glob({
    pattern: ['**/index.md', '!**/_*/**'],
    base: './src/content/rentals',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      category: z.string(),
      dailyRate: money.nullable(),
      weeklyRate: money.nullable(),
      deposit: money.nullable(),
      minimumPeriod: z.string().nullable(),
      photos: z.array(photo(image)).default([]),
      available: z.boolean().default(true),
      draft: z.boolean().default(false),
    }),
});

export const collections = { guitars, equipment, repairs, rentals };
