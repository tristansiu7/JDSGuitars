// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/config.ts';

export default defineConfig({
  // The one place the site URL lives. Change it in src/config.ts.
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/thanks/') && !page.endsWith('/404/'),
    }),
  ],
  image: {
    // Photos come from the content folders and are resized at build time.
    responsiveStyles: true,
    layout: 'constrained',
  },
});
