import { defineRouting } from "next-intl/routing";

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "tr",
  // Turkish (default) is served without a prefix ("/"), English at "/en".
  localePrefix: "as-needed",
});
