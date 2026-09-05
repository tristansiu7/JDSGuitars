# JDS Guitars website

The shop site for JDS Guitars, Derry NH. It is a static site: a set of plain
files that get rebuilt whenever something in this folder changes. There is no
database and no admin login. To change the inventory you edit text files and
add photos, and the host rebuilds the site.

This file explains how to do the everyday jobs. `DESIGN.md` explains the
look. `DEPLOY.md` explains hosting and the domain. `LAUNCH.md` is the checklist
that has to be complete before the site goes live. `TODO.md` lists every fact
still missing.

## Before you start

You need three things on your computer once:

1. Node.js, version 22 or later, from https://nodejs.org (the "LTS" download).
2. A copy of this folder. If it is on GitHub, the GitHub Desktop app is the
   easiest way to get it and to send changes back.
3. Open a terminal in this folder and run `npm install` once.

Then, whenever you want to see the site while you work on it:

```
npm run dev
```

and open http://localhost:4321 in a browser. It updates as you save files.
Press Ctrl+C in the terminal to stop it.

## How to add a guitar

1. Go to `src/content/guitars/`.
2. Copy the folder `example-yamaha-fg800` and rename the copy. The folder
   name becomes the web address, so use lowercase letters, numbers and
   hyphens: `ibanez-rg421-2022`, `taylor-214ce-used`. Never reuse a name.
3. Put the photos in the new folder. Name them `1.jpg`, `2.jpg` and so on.
   The first photo is the one shown in listings, so make it the front view.
   Phone photos are fine. Anything under about 4 MB each is fine.
4. Open `index.md` in the new folder in a text editor (Notepad, TextEdit,
   or better, VS Code) and change every line. The top part between the
   `---` lines is the fact sheet. The text below the second `---` is the
   condition description, written as you would describe it to a buyer.
5. Delete the line `draft: true`. While it is there the guitar shows only
   on your computer, never on the live site.
6. Save, check it at http://localhost:4321/guitars/, then commit and push
   (or drag the folder in on GitHub). The live site rebuilds in a minute
   or two.

### The fact sheet fields for a guitar

| Field | Required | What to put |
|---|---|---|
| `make` | yes | Yamaha, Ibanez, Fender |
| `model` | yes | FG800, RG421 |
| `type` | yes | `electric`, `acoustic`, `bass` or `classical` |
| `condition` | yes | `new`, `open-box`, `used` or `vintage`. This is the filter category. |
| `grade` | yes | `new`, `excellent`, `very-good`, `good` or `fair`. This is how much wear it has. The site explains each grade to the buyer. |
| `price` | yes | Number only, no dollar sign: `179` |
| `status` | yes | `available`, `on-hold` (deposit taken) or `sold` |
| `added` | yes | Date listed, `2026-09-14`. Newest shows first. |
| `summary` | no | One line under the price. Keep it under 160 characters. |
| `year` | no | `2023` |
| `serial` | no | Partial serial like `"IJ****"`. Leave out to show "withheld" instead. |
| `handedness` | no | `left` for a left-handed guitar |
| `case` | no | `Hard case`, `Gig bag`, `None` |
| `photos` | no | List of photos, each with `src` (the file) and `alt` (a sentence describing what the photo shows) |
| `specs` | no | The spec sheet. Every line is optional. Leave out anything that does not apply and the row is simply not shown. |
| `extraSpecs` | no | Any extra rows, written as `Tuners: Grover Rotomatic` |
| `setupNotes` | no | What was done to set it up |
| `repairHistory` | no | Any repair done to it, by you or before |
| `ref` | no | Stock reference shown on the page. If left out the folder name is used. |
| `draft` | no | `true` hides it from the live site |

`alt` text matters: it is what a blind visitor hears and what Google reads.
Say what is in the photo: "Back of the neck showing the satin finish and a
small ding at the third fret", not "photo 2".

### Marking a guitar sold

Change `status: available` to `status: sold`. The page stays up with a
"Sold" label so old links still work, and it drops out of the listing
unless someone ticks "Include sold". After a month or so, delete the folder.

## How to add a piece of gear (amps, pedals, drums, keys, PA, accessories)

Same as a guitar, but in `src/content/equipment/`. Copy the `_example`
folder, rename it without the underscore, and fill it in. The differences:

- `brand` instead of `make`.
- `category` is one of `amps`, `pedals`, `drums`, `keys`, `pa`,
  `strings-accessories` or `other`.
- `specs` is free-form. Write each row as `Label: value`, for example
  `Power: 20 watts`. They appear in the order you write them.
- `included` says what comes with it: `Power supply and box`.

Folders starting with an underscore are ignored, which is why the example
folder is called `_example`.

## How to change repair prices

Each service is a small file in `src/content/repairs/`. Open the one you
want, for example `setup.json`, and change the numbers:

```
"price": 60,
"priceType": "fixed",
"priceNote": "plus strings",
"turnaround": "2 to 3 days",
```

- `price` is a number with no dollar sign. Use `null` if there is no price
  yet (the page will show a TODO marker, which must be gone before launch).
- `priceType` is `fixed` (the price is the price), `from` (starts at this
  figure), or `estimate` (quoted after inspection; the price is ignored).
- `turnaround` is free text.

To add a service, copy any file, rename it, and change every field.
`group` must be one of: Setups and strings, Fret work, Nut and saddle,
Electronics, Structural, Finish. `order` decides the position in the list.

## How to add something to rent

Copy `src/content/rentals/_example`, rename without the underscore, and
fill in the rates. `null` for a rate shows a TODO marker. The rental terms
themselves (deposit, ID, damage, late returns) are written in
`src/pages/rentals.astro` and `src/pages/terms.astro`.

## How to change hours, phone, email, address

All in one file: `src/config.ts`. Change the text between the quotes. The
`hoursSchema` list is the same hours in the format Google reads, for
example `'Mo-Fr 10:00-18:00'`.

## Photos

Put photos next to the item they belong to. The site resizes and compresses
them at build time, so you do not need to shrink them first, but keep each
one under about 4 MB. Landscape or portrait both work; listings show a
portrait crop, so frame the guitar with some room on either side.

## Checking before you publish

```
npm run build
npm run check:todos
npm run check:prohibitions
```

The first builds the site into `dist/`. The second fails if any page still
shows a TODO marker. The third checks the built pages against the design
rules (no em dashes, no emoji, alt text on every image, and so on).

## How to deploy

See `DEPLOY.md`. In short: the site is hosted on Netlify, connected to the
GitHub repository. Every push to the main branch rebuilds and publishes the
site. Form submissions arrive in the Netlify dashboard and by email.

## For a developer

Astro 7, static output, no client framework. Content collections are in
`src/content.config.ts`. Business facts in `src/config.ts`. Global styles
and tokens in `src/styles/global.css`. The two important templates are
`src/layouts/Detail.astro` (guitar and equipment pages) and
`src/components/Listing.astro` (filterable listings). Forms use Netlify
Forms with a small progressive-enhancement script in
`src/components/Form.astro`.

```
npm run dev        # local preview
npm run build      # build to dist/
npm run check      # astro type check
npm run og         # regenerate public/og.png (needs Chrome installed)
npm run icons      # generate the favicon set from public/favicon.svg
```
