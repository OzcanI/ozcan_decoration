/**
 * Language-independent business constants (contact details, brand, defaults).
 * Localized copy lives in src/messages/*.json; this file holds facts that are
 * the same regardless of language.
 */
export const siteConfig = {
  brand: "Özcan Dekorasyon",
  brandShort: "ÖD",
  founder: "Ercan Özcan",
  domain: "ozcandekorasyon.com",
  phoneDisplay: "0535 795 09 76",
  phoneE164: "+905357950976",
  whatsapp: "905357950976",
  // Animated stat targets shown in the Stats section.
  stats: {
    years: 25,
    projects: 150,
    satisfaction: 100,
  },
} as const;

export const navAnchors = [
  { key: "services", href: "#hizmetler" },
  { key: "gallery", href: "#galeri" },
  { key: "testimonials", href: "#referanslar" },
  { key: "faq", href: "#sss" },
  { key: "contact", href: "#iletisim" },
] as const;

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
