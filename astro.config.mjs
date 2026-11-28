import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://frentedigital.iunida.org',
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/gracias') &&
        !page.includes('/privacidad') &&
        !page.includes('/404'),
    }),
  ],
});
