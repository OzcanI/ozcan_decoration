import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getCounts() {
  try {
    const [
      beforeAfter,
      gallery,
      testimonialsPending,
      testimonialsTotal,
      services,
      faq,
      contactNew,
    ] = await Promise.all([
      prisma.beforeAfter.count(),
      prisma.galleryProject.count(),
      prisma.testimonial.count({ where: { status: "PENDING" } }),
      prisma.testimonial.count(),
      prisma.service.count(),
      prisma.faq.count(),
      prisma.contactRequest.count({ where: { status: "NEW" } }),
    ]);
    return {
      beforeAfter,
      gallery,
      testimonialsPending,
      testimonialsTotal,
      services,
      faq,
      contactNew,
    };
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const counts = await getCounts();

  const cards = [
    { href: "/admin/before-after", label: "Önce / Sonra", value: counts?.beforeAfter },
    { href: "/admin/gallery", label: "Galeri Projeleri", value: counts?.gallery },
    {
      href: "/admin/testimonials",
      label: "Yorumlar",
      value: counts?.testimonialsTotal,
      badge: counts?.testimonialsPending
        ? `${counts.testimonialsPending} onay bekliyor`
        : undefined,
    },
    { href: "/admin/services", label: "Hizmetler", value: counts?.services },
    { href: "/admin/faq", label: "S.S.S.", value: counts?.faq },
    {
      href: "/admin/contact",
      label: "İletişim Talepleri",
      value: counts?.contactNew,
      badge: counts?.contactNew ? "yeni" : undefined,
    },
  ];

  return (
    <div>
      <h1 className="text-[26px] text-ink">Panel</h1>
      <p className="mt-1 text-[15px] text-ink-2">
        Site içeriğini buradan yönetin.
      </p>

      {!counts && (
        <div className="mt-6 rounded-xl border border-accent/30 bg-accent-2/40 p-4 text-[14px] text-ink">
          Veritabanına bağlanılamadı. <code>DATABASE_URL</code> değerini
          kontrol edin ve <code>npm run db:push</code> komutunu çalıştırın.
        </div>
      )}

      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-line bg-card p-6 transition-shadow hover:shadow-[0_14px_30px_rgba(44,39,34,0.1)]"
          >
            <div className="flex items-start justify-between">
              <span className="text-[15px] font-medium text-ink-2">
                {card.label}
              </span>
              {card.badge && (
                <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-white">
                  {card.badge}
                </span>
              )}
            </div>
            <div className="mt-2 font-heading text-[34px] font-bold text-ink">
              {card.value ?? "—"}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
