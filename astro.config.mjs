import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

const locales = ["en", "it", "de", "fr", "zh", "hi"];

export default defineConfig({
  site: "https://manuelcecchetto.it",

  i18n: {
    locales,
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },

  // Never inline scripts: public/_headers sets a CSP with script-src 'self'.
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },

  integrations: [mdx(), sitemap()],
  adapter: cloudflare(),
});