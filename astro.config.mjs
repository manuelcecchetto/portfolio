import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

const locales = ["en", "it", "de", "fr", "zh", "hi"];

// About and contact now live as sections of the home page.
const sectionRedirects = Object.fromEntries(
  locales.flatMap((locale) => {
    const prefix = locale === "en" ? "" : `/${locale}`;
    return [
      [`${prefix}/about`, `${prefix}/#about`],
      [`${prefix}/contact`, `${prefix}/#contact`],
    ];
  }),
);

export default defineConfig({
  site: "https://manuelcecchetto.it",

  redirects: sectionRedirects,

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