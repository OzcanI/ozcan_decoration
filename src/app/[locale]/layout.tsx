import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { poppins } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const meta: Record<string, { title: string; description: string }> = {
  tr: {
    title: `${siteConfig.brand} — İstanbul Boya Badana, Tadilat, Dış Cephe & Anahtar Teslim Renovasyon`,
    description:
      "Özcan Dekorasyon — 2000'den beri İstanbul ve çevresinde iç/dış mekan boya badana, dış cephe mantolama, çatı işleri ve anahtar teslim komple tadilat. Ücretsiz keşif ve teklif.",
  },
  en: {
    title: `${siteConfig.brand} — Istanbul Painting, Renovation, Façade & Turnkey Remodelling`,
    description:
      "Özcan Dekorasyon — interior/exterior painting, façade insulation, roofing and turnkey full renovation across Istanbul since 2000. Free survey and quote.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[locale] ?? meta.tr;
  return { title: m.title, description: m.description };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={poppins.variable}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
