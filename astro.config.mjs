import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH are set by the deploy workflow.
// On GitHub Pages: SITE_URL=https://<user>.github.io, BASE_PATH=/<repo>
// On a custom domain: SITE_URL=https://yourdomain.com, BASE_PATH empty.
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
