# Missing facts

Every item here is something Jason has not yet supplied. Each one is marked
`TODO:` in the source, and most of them show as a red marker on the page so
nobody can miss it. `npm run check:todos` lists them from the built site.
The site must not launch until this file is empty.

## Business details (`src/config.ts`)

- [ ] Domain name. Also used in `netlify.toml` and `DEPLOY.md`.
- [ ] Phone number.
- [ ] Email address.
- [ ] Opening hours, or a sentence about how visits work if there are no fixed hours. Also needed in schema.org format (`hoursSchema`) for Google.
- [ ] Latitude and longitude of 61 North Shore Rd, Derry NH, for the map link and Google's business data.
- [ ] Parking and transport notes for the contact page.
- [ ] Full list of brands to name on the About page (currently Yamaha and Ibanez).
- [ ] Social accounts, if any.
- [ ] Legal form of the business (sole proprietor or LLC) for the terms page.

## Inventory (`src/content/`)

- [ ] Real guitars. The only entry is a draft example and it is excluded from the build.
- [ ] Real photos. The example uses grey placeholder images.
- [ ] Any other equipment to list.
- [ ] Anything to rent, with daily and weekly rates, deposit and minimum period.
- [ ] Confirm the condition grade scale and wording (new, excellent, very good, good, fair) in `src/config.ts`.

## Repairs (`src/content/repairs/*.json`)

- [ ] A price for every service, or confirm it is quoted by estimate.
- [ ] Whether each price is fixed, "from", or an estimate. The current settings are a first guess.
- [ ] Turnaround time for every service.
- [ ] Confirm the list of services is right. Remove any Jason does not do; add any missing.

## Rentals (`src/pages/rentals.astro` and `src/pages/terms.astro`)

- [ ] Minimum hire period.
- [ ] Deposit amount or rule, and when it is returned.
- [ ] ID required, and minimum age.
- [ ] Damage policy.
- [ ] Late return charge.
- [ ] Collection only, or delivery and at what cost.
- [ ] Any geographic limit on where gear can be taken.

## Terms and conditions (`src/pages/terms.astro`)

- [ ] Lawyer review of the whole page (New Hampshire).
- [ ] Whether any tax is collected.
- [ ] Whether instruments are ever shipped.
- [ ] Deposit and hold policy.
- [ ] Whether layaway is offered and its terms.
- [ ] Return policy on used and open-box instruments, and on new ones.
- [ ] Number of days to report an item not as described.
- [ ] Statutory position on used goods and "as is" wording.
- [ ] Warranty position for Sweetwater open-box stock.
- [ ] Any warranty period offered on used instruments.
- [ ] What after-sale setup help is free and for how long.
- [ ] Insurance and liability limit for instruments left on site.
- [ ] Collection period after a repair is finished.
- [ ] Unclaimed instrument period and what happens after it.
- [ ] Storage charge, if any.
- [ ] Liability clause review.
- [ ] Date the terms were finalised.

## Privacy policy (`src/pages/privacy.astro`)

- [ ] Confirm Netlify as host and form processor.
- [ ] Name the email provider.
- [ ] Retention period for form submissions in Netlify.
- [ ] Retention period for emails.
- [ ] Lawyer confirmation of applicable privacy rights.
- [ ] Date the policy was finalised.

## About page (`src/pages/about.astro`)

- [ ] A paragraph from Jason about his playing and background, if wanted.
- [ ] A sentence or two about the workshop.

## Design assets

- [ ] Approve or change the proposed favicon mark (`public/favicon.svg`), then run `npm run icons`.
- [ ] A logo, if one exists. None was supplied; the site uses the shop name set in the site typeface.
