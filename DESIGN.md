# JDS Guitars: design plan

This file was written before any code. It sets the palette, the type, the
layout of the two most important pages, and the principles that keep the site
specific to a guitar shop in Derry, NH. The second half records the "would a
bakery get the same thing?" pass and what changed because of it.

## 1. What the site has to do

Someone arrives wanting to know: what is in stock right now, what it costs,
what condition it is in, whether Jason can fix their instrument, and how to
reach him. Jason sells set-up, ready-to-play guitars from his home in Derry,
many of them Sweetwater open-box or return stock that needed a setup or a
blemish repaired. The site's job is to show that stock honestly, with the
flaws, and make it easy to message him about one guitar.

So the design serves three things, in order:

1. Photographs of the actual instruments.
2. The spec sheet and the condition notes on each instrument.
3. Getting in touch about a specific guitar.

Everything else (repairs, rentals, about, contact, legal) uses the same
system, quieter.

## 2. Palette

Six named values. Nothing else is used except tints derived from them.

| Name      | Hex       | Where it comes from                | Role                                              |
|-----------|-----------|------------------------------------|---------------------------------------------------|
| Bench     | `#EDEAE4` | A worn workbench mat, warm grey    | Page ground. Photos of guitars sit on it well.    |
| Sheet     | `#FFFFFF` | Printed spec sheet, dealer catalogue | Surfaces: the spec table, listing cards, forms. |
| Rosewood  | `#231A15` | Dark fretboard timber              | Text, rules, primary buttons.                     |
| Walnut    | `#5E4330` | Walnut back and sides              | Secondary text, table labels, muted rules.        |
| Brass     | `#B9902F` | Tuner buttons, bridge saddles      | The one accent: price, condition tag, focus ring. |
| Sunburst  | `#8A2E1F` | The dark edge of a tobacco burst   | Errors, "sold" markers, the only red on the site. |

Contrast, checked against WCAG AA:

- Rosewood on Bench: 14.2:1. Rosewood on Sheet: 17.1:1.
- Walnut on Bench: 7.5:1. Walnut on Sheet: 9.1:1.
- Brass is never used for body text. It is used as a background under
  Rosewood text (5.8:1) and as a 3px focus ring and underline.
- Sunburst on Sheet: 8.4:1. Sunburst on Bench: 7.0:1.

What this is not: it is not cream (#F4F1EA) plus terracotta. Bench is greyer
and cooler than cream, the accent is a yellow metal rather than a red clay,
and the red exists only for errors and sold markers.

## 3. Type

One family: **Archivo**, the variable version with the width axis, self-hosted
so no request leaves the site for fonts.

Archivo is a grotesque drawn from late nineteenth century American type, the
kind you find on amplifier badges, tuner boxes and old dealer price lists. The
width axis does the work that a second family normally would:

| Role                     | Width | Weight | Size (rem)     | Notes                                  |
|--------------------------|-------|--------|----------------|----------------------------------------|
| Shop name, page title    | 125   | 800    | 2.4 / 3.2 / 4  | Expanded. This is where the boldness goes. |
| Instrument name (h1)     | 125   | 700    | 2 / 2.6        | Make on one line, model on the next.   |
| Section heading (h2)     | 110   | 700    | 1.5            |                                        |
| Card title (h3)          | 100   | 600    | 1.125          |                                        |
| Body                     | 100   | 400    | 1.0625 (17px)  | Line height 1.55.                      |
| Spec table label         | 75    | 500    | 0.9375         | Condensed, like a printed spec column. |
| Spec table value         | 100   | 400    | 1              | Tabular numerals on.                   |
| Price                    | 110   | 700    | 1.75           | Tabular numerals on.                   |
| Small print, legal       | 100   | 400    | 0.9375         |                                        |

Type scale: 0.9375, 1, 1.0625, 1.125, 1.5, 1.75, 2, 2.6, 3.2, 4.

No monospace. Serial numbers are set in the body face with tabular figures.

## 4. Shape and surface

- Corner radius: 3px on buttons, inputs and tags. 0 on photographs and
  tables. A spec sheet is a rectangle.
- Rules: 1px Rosewood at 20% for table rows, 2px Rosewood for the rule under
  a page title. No hairlines under everything.
- Shadows: none. Surfaces are separated by colour (Sheet on Bench) and by
  rules, not by shadow.
- Buttons: Rosewood fill, Sheet text, 3px radius, no pill. Secondary buttons
  are outlined in Rosewood. Hover darkens or fills; that is the only motion.
- Focus: 3px Brass ring with 2px offset, on everything focusable.
- Photos: shown at a fixed 4:5 portrait ratio in listings (guitars are tall)
  and up to 4:5 on the detail page, cropped with `object-fit: cover` on the
  Bench colour. A phone photo taken against a wall still reads as a product
  shot because the frame and the ground are consistent. Where a guitar has
  no photo yet the frame shows a plain Bench block with the words "Photos to
  come" and nothing else.

## 5. Layout

Max content width 1200px. A 12-column grid above 900px, single column
below. Gutter 24px. Section spacing 48px on mobile, 80px on desktop.

### Home

```
+--------------------------------------------------------------------------+
| JDS GUITARS            Guitars  Equipment  Repairs  Rentals  About  Contact|
+--------------------------------------------------------------------------+
|                                                                          |
|  JDS GUITARS                                  61 North Shore Rd          |
|  Set-up, ready-to-play guitars                Derry, NH 03038            |
|  sold from a home workshop in Derry, NH.      Hours: TODO                |
|                                               Phone: TODO                |
|  [ See what's in stock ]  [ Book a repair ]   Visits arranged by message |
|                                                                          |
+--------------------------------------------------------------------------+
|  In stock now                                             12 guitars ->  |
|  +------------+ +------------+ +------------+ +------------+             |
|  |            | |            | |            | |            |             |
|  |   photo    | |   photo    | |   photo    | |   photo    |             |
|  |   4:5      | |   4:5      | |   4:5      | |   4:5      |             |
|  |            | |            | |            | |            |             |
|  +------------+ +------------+ +------------+ +------------+             |
|  Yamaha         Ibanez         Fender         Taylor                     |
|  FG800          RG421          Player Strat   214ce                      |
|  Used  $XXX     New  $XXX      Used  $XXX     Open box  $XXX             |
+--------------------------------------------------------------------------+
|  How the shop works                                                      |
|  Three short paragraphs: what Jason sells (Sweetwater open-box and        |
|  returns, set up and blemishes repaired), that every guitar is set up     |
|  before it is listed, that he helps with setups after purchase.           |
+--------------------------------------------------------------------------+
|  Repairs                    |  Rentals                                   |
|  Setups from $TODO          |  What is available and the rates           |
|  Fret work, nut work, ...   |  [ Ask about a rental ]                    |
|  [ See the price list ]     |                                            |
+--------------------------------------------------------------------------+
|  Footer: address, phone, email, hours | Terms | Privacy                  |
+--------------------------------------------------------------------------+
```

The hero is the shop name in expanded Archivo, one sentence saying what the
shop is, and the address block. No slogan. Stock comes immediately under it.
If there is nothing in stock the "In stock now" section says so and points to
the contact page.

### Guitar detail

```
+--------------------------------------------------------------------------+
| JDS GUITARS            Guitars  Equipment  Repairs  Rentals  About  Contact|
+--------------------------------------------------------------------------+
|  Guitars / Acoustic                                                      |
|                                                                          |
|  +---------------------------------+   YAMAHA                            |
|  |                                 |   FG800                             |
|  |                                 |   2021  Acoustic  Used              |
|  |         main photo              |                                     |
|  |           4:5                   |   $XXX                              |
|  |                                 |   Condition: Very good              |
|  |                                 |   Set up and ready to play          |
|  +---------------------------------+   Hard case included                |
|  [thumb][thumb][thumb][thumb]                                            |
|                                        [ Message Jason about this guitar ]|
|                                        Ref JDS-0012                      |
+--------------------------------------------------------------------------+
|  Condition                             |  Specifications                 |
|  Honest paragraph(s) about wear:       |  Year          2021             |
|  finish, frets, neck, electronics,     |  Make          Yamaha           |
|  what was repaired and how.            |  Model         FG800            |
|                                        |  Serial        HM****           |
|  Setup notes                           |  Body          Nato/Okume       |
|  What was done: action, relief,        |  Top           Solid spruce     |
|  strings fitted, intonation.           |  Neck          Nato, slim taper |
|                                        |  Fretboard     Rosewood         |
|  Repair history                        |  Scale length  25 in            |
|  Only shown if known.                  |  Pickups       (omitted)        |
|                                        |  Case          Hard case        |
|                                        |  Weight        4 lb 6 oz        |
+--------------------------------------------------------------------------+
|  More acoustics in stock                                                 |
|  [card] [card] [card]                                                    |
+--------------------------------------------------------------------------+
|  Footer                                                                  |
+--------------------------------------------------------------------------+
```

On mobile the photo stack comes first, then the name and price block, then
the message button, then condition, then the spec table. The spec table is
a two-column definition list; rows with no value are not rendered, so a
guitar without pickups simply has no pickups row. The "message" button links
to the contact page with the item reference in the query string, and the
contact form pre-fills a hidden field and the subject line with it.

The spec table is the visual centre of the page. It is set on a Sheet
surface with rules between rows, condensed labels on the left and tabular
values on the right, like the spec panel in a printed dealer catalogue.

## 6. Principles

1. **Structure carries the design.** The spec table, the condition grade and
   the price block are the most distinctive things on the page. Give them
   room and consistent form. No decoration around them.
2. **Show the flaw.** Condition text is written the way a dealer describes an
   instrument in person: where the buckle rash is, how much fret wear, what
   was repaired. The layout gives that text the same weight as the specs.
3. **Frames make photos.** Fixed-ratio frames on the Bench colour make phone
   photos look like a catalogue. Never stretch, never add drop shadow.
4. **One bold thing.** The expanded, heavy Archivo at display sizes. It
   appears in the shop name, page titles and instrument names. Everything
   else is regular width and quiet.
5. **Say where and how.** Address, hours and how to arrange a visit sit on
   every page (header or footer). This is a home workshop, not a storefront,
   and the site says that plainly.
6. **No invented facts.** Anything Jason has not supplied is a visible TODO,
   not a plausible guess.

## 7. The bakery test

I read the plan back and asked whether a bakery or an accountant would get
the same thing.

What would have survived the swap, and what I changed:

- A warm grey ground, white surfaces and a dark text colour would suit
  anyone. What makes it specific is where the accent comes from and where it
  is allowed: Brass is hardware colour and only appears on the things a
  buyer looks for first, the price and the condition tag. A bakery would not
  put its accent on a condition grade.
- Archivo on its own is a general-purpose grotesque. The width axis is the
  argument: expanded for names, the way a headstock logo or an amp badge is
  wide, and condensed for spec labels, the way a printed spec column is. An
  accountant's site has no spec column.
- The listing cards were originally "photo, title, price" with a 1:1 image.
  Guitars are tall. Changed to 4:5 portrait, make and model on separate
  lines (the way a dealer lists them), and the condition grade beside the
  price.
- The home page originally had a "Why buy from us" block with three points.
  That is landing-page furniture. Replaced by "How the shop works": three
  factual paragraphs from Jason's own description of the business.
- The detail page had a "Related" strip labelled "You might also like".
  Renamed to "More acoustics in stock" (by type), which is what a buyer in
  the room would ask about next.
- Serial numbers, scale length, nut width and weight are shown with tabular
  numerals so a column of them lines up. This detail is meaningless for a
  bakery and matters for a spec sheet.

What I kept after the test, deliberately: no shadows, small radii, one
family. Those are not guitar-specific, they are just restraint, and the site
needs restraint so the photographs and the spec sheets read.
