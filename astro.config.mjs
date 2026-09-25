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

  integrations: [mdx(), sitemap()],
  adapter: cloudflare(),
});