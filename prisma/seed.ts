import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Placeholder imagery so the site looks complete before the client uploads
// their own photos. Replace via the admin panel. (picsum.photos is allowed in
// next.config.ts for exactly this demo purpose.)
const img = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

async function main() {
  // --- Admin user -------------------------------------------------------
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@ozcandekorasyon.com";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "pFxu=%k37Ng4";
  const name = process.env.SEED_ADMIN_NAME ?? "Ercan Özcan";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { name, passwordHash },
    create: { email, name, passwordHash },
  });
  console.log(`✓ Admin user ready: ${email}`);

  // --- Services ---------------------------------------------------------
  const services = [
    {
      icon: "paint",
      titleTr: "İç & Dış Mekan Boya-Badana",
      titleEn: "Interior & Exterior Painting",
      descTr:
        "Saten, silikonlu ve dekoratif boya uygulamaları; pürüzsüz, lekesiz ve uzun ömürlü bir sonuç.",
      descEn:
        "Satin, silicone and decorative paint applications; a smooth, stain-free and long-lasting finish.",
    },
    {
      icon: "home",
      titleTr: "Anahtar Teslim Renovasyon",
      titleEn: "Turnkey Renovation",
      descTr:
        "Daire ve iş yerlerinizi tek elden, baştan sona yeniliyoruz. Tasarımdan teslimata komple çözüm.",
      descEn:
        "We renovate your flats and workplaces end to end from a single source. A complete solution from design to delivery.",
    },
    {
      icon: "building",
      titleTr: "Dış Cephe & Mantolama",
      titleEn: "Façade & Thermal Insulation",
      descTr:
        "Cephe boyası ve ısı yalıtımı (mantolama) ile binanıza modern bir görünüm, tasarrufla birlikte.",
      descEn:
        "Façade paint and thermal insulation give your building a modern look together with energy savings.",
    },
    {
      icon: "roof",
      titleTr: "Çatı İşleri",
      titleEn: "Roofing",
      descTr:
        "Çatı onarımı, kiremit aktarma ve su yalıtımı. Sızıntı ve nem sorunlarına kalıcı çözüm.",
      descEn:
        "Roof repair, tile re-laying and waterproofing. A permanent solution to leaks and damp problems.",
    },
    {
      icon: "tools",
      titleTr: "Komple Tadilat",
      titleEn: "Complete Remodelling",
      descTr:
        "Alçıpan, zemin, mutfak-banyo, elektrik ve su tesisatı dahil komple tadilat işleri.",
      descEn:
        "Complete remodelling including drywall, flooring, kitchen-bathroom, electrical and plumbing.",
    },
  ];
  await prisma.service.deleteMany();
  await prisma.service.createMany({
    data: services.map((s, i) => ({ ...s, order: i })),
  });
  console.log(`✓ Seeded ${services.length} services`);

  // --- FAQ --------------------------------------------------------------
  const faqs = [
    {
      questionTr: "Keşif ücretsiz mi?",
      questionEn: "Is the survey free?",
      answerTr:
        "Evet. İstanbul ve çevre illerde yerinde keşif ile yazılı fiyat teklifimiz tamamen ücretsizdir; hiçbir ön ödeme alınmaz.",
      answerEn:
        "Yes. In Istanbul and surrounding provinces our on-site survey and written quote are entirely free; no upfront payment is taken.",
    },
    {
      questionTr: "Hangi bölgelere hizmet veriyorsunuz?",
      questionEn: "Which areas do you serve?",
      answerTr:
        "İstanbul'un tüm ilçeleri ile Kocaeli ve Yalova başta olmak üzere çevre illere hizmet veriyoruz.",
      answerEn:
        "We serve all districts of Istanbul and surrounding provinces, primarily Kocaeli and Yalova.",
    },
    {
      questionTr: "İşler ne kadar sürer?",
      questionEn: "How long does the work take?",
      answerTr:
        "Süre işin kapsamına göre değişir. Tek oda boya genelde 1–2 gün, komple daire renovasyonu ortalama 1–3 hafta içinde teslim edilir. Net süreyi keşif sonrası belirtiriz.",
      answerEn:
        "Duration depends on scope. A single-room repaint usually takes 1–2 days, a full flat renovation 1–3 weeks on average. We confirm the exact timeline after the survey.",
    },
    {
      questionTr: "Garanti veriyor musunuz?",
      questionEn: "Do you provide a warranty?",
      answerTr:
        "Evet. İşçilik ve kullanılan malzemeler için garanti veriyoruz; teslim sonrası oluşabilecek sorunlarda yanınızdayız.",
      answerEn:
        "Yes. We provide a warranty on workmanship and materials used; we're there for you if any issues arise after handover.",
    },
    {
      questionTr: "Eşyalarım zarar görür mü?",
      questionEn: "Will my belongings be damaged?",
      answerTr:
        "Hayır. Çalışma öncesi tüm eşyalarınızı örtü ve naylonla koruma altına alır, iş bitiminde alanı tertemiz teslim ederiz.",
      answerEn:
        "No. Before work we cover all your belongings with sheeting and plastic, and hand the space over spotless when finished.",
    },
  ];
  await prisma.faq.deleteMany();
  await prisma.faq.createMany({ data: faqs.map((f, i) => ({ ...f, order: i })) });
  console.log(`✓ Seeded ${faqs.length} FAQ entries`);

  // --- Testimonials -----------------------------------------------------
  const testimonials = [
    {
      name: "Ahmet Y.",
      role: "Kadıköy · Daire Renovasyonu",
      rating: 5,
      text: "Evimizi anahtar teslim yenilediler. İşçilik tertemiz, ekip çok titiz ve söz verdikleri tarihte bitirdiler. Kesinlikle tavsiye ederim.",
    },
    {
      name: "Selin K.",
      role: "Üsküdar · Salon Boyası",
      rating: 5,
      text: "Ercan usta ve ekibi çok ilgili. Keşif ücretsizdi, fiyat baştan netti, sürpriz maliyet çıkmadı. Sonuç beklediğimden de güzel oldu.",
    },
    {
      name: "Murat D.",
      role: "Çekmeköy · Dış Cephe",
      rating: 5,
      text: "Apartmanımızın dış cephesini ve çatısını yaptılar. Hem hızlı hem de güven veren bir çalışma oldu. Teşekkürler.",
    },
  ];
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: testimonials.map((t, i) => ({
      ...t,
      order: i,
      status: "APPROVED" as const,
      source: "ADMIN" as const,
    })),
  });
  console.log(`✓ Seeded ${testimonials.length} testimonials`);

  // --- Before / After ---------------------------------------------------
  const beforeAfters = [
    {
      titleTr: "Salon · Komple Yenileme",
      titleEn: "Living Room · Full Renovation",
      beforeImageUrl: img("ba1-before"),
      afterImageUrl: img("ba1-after"),
    },
    {
      titleTr: "Mutfak · Tadilat",
      titleEn: "Kitchen · Remodel",
      beforeImageUrl: img("ba2-before"),
      afterImageUrl: img("ba2-after"),
    },
  ];
  await prisma.beforeAfter.deleteMany();
  await prisma.beforeAfter.createMany({
    data: beforeAfters.map((b, i) => ({ ...b, order: i })),
  });
  console.log(`✓ Seeded ${beforeAfters.length} before/after pairs`);

  // --- Gallery projects -------------------------------------------------
  const gallery = [
    { titleTr: "Salon · İç Boya", titleEn: "Living Room · Interior Paint", s: "g1" },
    { titleTr: "Mutfak · Tadilat", titleEn: "Kitchen · Remodel", s: "g2" },
    { titleTr: "Dış Cephe · Mantolama", titleEn: "Façade · Insulation", s: "g3" },
    { titleTr: "Çatı · Onarım", titleEn: "Roof · Repair", s: "g4" },
    { titleTr: "Banyo · Renovasyon", titleEn: "Bathroom · Renovation", s: "g5" },
    { titleTr: "Cephe · Boya", titleEn: "Façade · Paint", s: "g6" },
  ];
  await prisma.galleryProject.deleteMany();
  await prisma.galleryProject.createMany({
    data: gallery.map((g, i) => ({
      titleTr: g.titleTr,
      titleEn: g.titleEn,
      imageUrl: img(g.s, 900, 675),
      order: i,
    })),
  });
  console.log(`✓ Seeded ${gallery.length} gallery projects`);

  console.log("\n✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
