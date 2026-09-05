# Deploying JDS Guitars

The site is a static build (Astro) hosted on Netlify, which also handles the
three forms. Any static host would serve the pages, but the forms are wired
for Netlify, so use Netlify unless you also change `src/components/Form.astro`.

The domain is not known yet. Everywhere below, replace `example.com` with
the real domain.

## 1. Connect the repository to Netlify

1. Sign in at https://app.netlify.com and choose "Add new site", then
   "Import an existing project", then GitHub.
2. Pick the `JDSGuitars` repository and the `main` branch.
3. Build settings are read from `netlify.toml` (build command `npm run build`,
   publish folder `dist`, Node 22). Leave the fields as detected.
4. Deploy. The first build takes a minute or two. The site is now live at a
   `something.netlify.app` address.

## 2. Set the domain in the code

Before pointing the domain at Netlify, tell the site its own address:

1. In `src/config.ts` change `SITE_URL` to `https://example.com` (no
   trailing slash). This sets the canonical tags, sitemap, robots.txt and
   Open Graph URLs.
2. In `netlify.toml` replace both `TODO-domain.invalid` lines in the
   redirect with the real domain.
3. Commit and push. Netlify rebuilds.

## 3. DNS records

Decide on the canonical host. Recommended: the apex, `example.com`, with
`www.example.com` redirecting to it.

In Netlify: Site configuration, Domain management, Add a domain, enter
`example.com`. Netlify adds `www.example.com` as an alias. Set
`example.com` as the primary domain.

At the domain registrar (wherever the domain was bought), add these records:

| Type  | Host / name | Value                         | TTL  |
|-------|-------------|-------------------------------|------|
| A     | `@`         | `75.2.60.5`                   | 3600 |
| CNAME | `www`       | `<your-site-name>.netlify.app` | 3600 |

Notes:

- `75.2.60.5` is Netlify's load balancer address for apex domains. Netlify
  shows the current value in Domain management; use what it shows if it
  differs.
- If the registrar supports ALIAS or ANAME records at the apex, use one of
  those pointing to `<your-site-name>.netlify.app` instead of the A record.
- Alternatively, move the domain's nameservers to Netlify DNS (Netlify
  shows four `dns*.p0*.nsone.net` names). Then Netlify manages the records
  above itself. Either way works; the A and CNAME records are the least
  disruptive if the domain already has email set up.
- Do not delete existing MX or TXT records; they are for email, not the
  website.

DNS changes take from a few minutes to a day to spread.

## 4. Host settings to change

In the Netlify site settings:

1. **Domain management, HTTPS:** once DNS has propagated, Netlify provisions
   a Let's Encrypt certificate automatically. If it does not appear within
   an hour, press "Verify DNS configuration" then "Provision certificate".
   Then turn on "Force HTTPS".
2. **Domain management, primary domain:** confirm `example.com` is primary.
   Netlify then redirects `www.example.com` to it automatically, and the
   redirect in `netlify.toml` is a belt-and-braces copy of the same rule.
3. **Forms:** Site configuration, Forms, enable form detection (it is on by
   default). After the first deploy with forms enabled, three forms appear:
   `contact`, `repair-intake` and `rental-enquiry`. For each one, open it,
   choose "Form notifications", "Email notification", and enter Jason's
   email address. Also turn on spam filtering (Akismet is on by default;
   the forms also carry a honeypot field).
4. **Deploy notifications:** optional, but an email on failed deploys is
   useful. Site configuration, Notifications, Add notification, Deploy failed.
5. **Badges and injected scripts:** Netlify injects nothing into pages by
   default. Check Site configuration, Build and deploy, Post processing:
   leave "Snippet injection" empty, and asset optimisation off (the build
   already optimises). There is no "Netlify badge" option to disable for
   this kind of site; the badge only exists if someone adds it to the
   markup, which this site does not.

## 5. Test the forms end to end

After step 4, on the live domain:

1. Send a message through `/contact/`, `/repairs/` and `/rentals/` with a
   real name and email.
2. Confirm each one appears under Forms in Netlify and arrives in Jason's
   inbox. Mark item 7 in `LAUNCH.md`.

## 6. Redirect configuration

Already in `netlify.toml`:

- `www` to apex, 301, forced.
- Security headers on every page.
- Long cache lifetime on the hashed asset files under `/_astro/`.

To add a redirect later (for example when a guitar folder is renamed), add
another `[[redirects]]` block:

```
[[redirects]]
  from = "/guitars/old-name/"
  to = "/guitars/new-name/"
  status = 301
```

## 7. Everyday publishing

Push to `main` (or merge a pull request into it). Netlify builds and
publishes within about two minutes. The Deploys tab shows the log if
something fails; the usual cause is a typo in an item's `index.md`, and
the log names the file and the field.

## Alternative host

Cloudflare Pages or GitHub Pages will serve the pages identically (build
command `npm run build`, output `dist`). The forms would then need a service
such as Formspree: create a form there, put its endpoint in the `action`
attribute in `src/components/Form.astro`, remove the `data-netlify` and
`netlify-honeypot` attributes and the `form-name` hidden input, and update
the privacy policy to name Formspree instead of Netlify.
