import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import {
  getServices,
  getFaqs,
  getTestimonials,
  getBeforeAfters,
  getGalleryProjects,
  pickLocale,
} from "@/lib/content";

import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { Services } from "@/components/site/Services";
import { Gallery } from "@/components/site/Gallery";
import { Process } from "@/components/site/Process";
import { Testimonials } from "@/components/site/Testimonials";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";

// Content is admin-managed, so render per request to always reflect the DB.
export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("Nav");

  const [services, faqs, testimonials, beforeAfters, gallery] =
    await Promise.all([
      getServices(),
      getFaqs(),
      getTestimonials(),
      getBeforeAfters(),
      getGalleryProjects(),
    ]);

  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <Stats />
        <Services
          items={services.map((s) => ({
            id: s.id,
            title: pickLocale(s, "title", locale),
            desc: pickLocale(s, "desc", locale),
            icon: s.icon,
          }))}
        />
        <Gallery
          beforeAfters={beforeAfters.map((b) => ({
            id: b.id,
            title: pickLocale(b, "title", locale),
            before: b.beforeImageUrl,
            after: b.afterImageUrl,
          }))}
          projects={gallery.map((g) => ({
            id: g.id,
            title: pickLocale(g, "title", locale),
            image: g.imageUrl,
          }))}
        />
        <Process />
        <Testimonials
          items={testimonials.map((t) => ({
            id: t.id,
            name: t.name,
            role: t.role,
            text: t.text,
            rating: t.rating,
          }))}
        />
        <Faq
          items={faqs.map((f) => ({
            id: f.id,
            q: pickLocale(f, "question", locale),
            a: pickLocale(f, "answer", locale),
          }))}
        />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp label={t("writeWhatsapp")} />
    </>
  );
}
