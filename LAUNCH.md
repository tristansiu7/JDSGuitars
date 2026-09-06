# Launch gate

We do not launch until every box is ticked. Update this file as things get done.

- [ ] **1. Custom domain live over HTTPS**, with www and apex resolving to one canonical host. Domain not yet known. `DEPLOY.md` has the DNS records and host settings to apply once it is. After the domain is set: change `SITE_URL` in `src/config.ts` and the redirect in `netlify.toml`.
- [ ] **2. Favicon complete**: SVG, 32px ICO, 180px apple-touch-icon, 192 and 512 PNGs, and `site.webmanifest` with the right name and theme colour. No logo was supplied, so a mark is proposed in `public/favicon.svg` (a fretboard segment: six strings, one brass position marker, in the site's colours). Waiting for approval before generating the set with `npm run icons`. The manifest currently lists the SVG only.
- [ ] **3. No AI attribution tag anywhere.** The build has no generator meta tag and no badge. `npm run check:prohibitions` greps the built output for generator tags and "made with" or "powered by" text. Re-run against the deployed site after the first deploy, and confirm in the Netlify dashboard that no badge or injected script is enabled (Netlify does not inject any by default).
- [x] **4. Terms and conditions page live and linked in the footer.** Page exists at `/terms/` and is linked from every page. Not yet final: it contains TODO markers for every figure and clause that needs Jason or a lawyer (see `TODO.md`).
- [x] **5. Privacy policy page live and linked in the footer**, matching what the site collects. Page exists at `/privacy/`, linked from every page, and describes exactly the three forms, Netlify as processor, the click-to-load map, and no cookies or analytics. Not yet final: retention periods and provider names are TODO.
- [ ] **6. Zero TODO markers left in shipped pages.** `npm run check:todos` must pass. It currently fails; `TODO.md` lists everything outstanding.
- [ ] **7. Every form tested end to end** with a real submission arriving at a real inbox. Three forms: contact, repair intake, rental enquiry. Cannot be tested until the site is deployed to Netlify and form notifications are pointed at Jason's email (`DEPLOY.md`, step 4).
- [ ] **8. All prohibitions in the brief verified against the built output.** `npm run check:prohibitions` passes on the current build (no gradients, no pills, no em dashes, no emoji, no generator tag, alt text and dimensions on every image, no invented reviews). Re-check by eye against the deployed site once real photos and inventory are in.

## Quality floor, checked so far

- Responsive from 320px: checked the detail page and filtered listing at 360px and 320px.
- Keyboard: every control focusable with a visible brass ring; filters, gallery thumbnails and forms work with the keyboard.
- Contrast: all text pairs at 7:1 or better; button text on brass 5.8:1. See `DESIGN.md`.
- One h1 per page, heading order checked, every form control has a label.
- Images: resized at build time, `width` and `height` on every one, lazy loaded below the fold.
- Lighthouse on the built home and detail pages: see the note at the end of this file.
- Per-page title and description, Open Graph and Twitter tags, `og.png` at 1200 x 630, sitemap, robots.txt, canonical URLs.
- JSON-LD: MusicStore on every page (address, payment; hours and geo appear once supplied), Product with Offer on every item page.
- 404 page links to every listing.

## Lighthouse

Results are recorded here each time the check is run against a production build (`npm run build`, then serve `dist/`).

| Date | Page | Preset | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|---|---|
| 2026-09-05 | Home | Desktop | 100 | 100 | 100 | 100 |
| 2026-09-05 | Home | Mobile | 100 | 100 | 100 | 100 |
| 2026-09-05 | Guitars listing | Desktop | 100 | 100 | 100 | 100 |
| 2026-09-05 | Guitars listing | Mobile | 100 | 100 | 100 | 100 |
| 2026-09-05 | Guitar detail (draft example, `SHOW_DRAFTS=1` build) | Mobile | 100 | 100 | 100 | 69 (noindex on drafts; a live item has no noindex) |
| 2026-09-06 | Home, with the shop photo banner and strip | Mobile | 98 | 100 | 100 | 100 |

Run against a local production build with placeholder images. Re-run on the deployed site once real photos are in, since photo weight is the main thing that can move the performance score.
