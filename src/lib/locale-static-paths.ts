import { NON_DEFAULT_LOCALES } from "./i18n";

export function getNonDefaultLocaleStaticPaths() {
  return NON_DEFAULT_LOCALES.map((locale) => ({
    params: { locale },
  }));
}
