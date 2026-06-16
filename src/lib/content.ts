import "server-only";
import { prisma } from "@/lib/prisma";
import type { Locale } from "@/i18n/routing";

/**
 * Public-site content queries.
 *
 * Every query is wrapped so that a missing/unreachable database degrades
 * gracefully to empty content instead of crashing the page or the build.
 * Sections render their localized empty-state when they receive no rows.
 */
async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error("[content] query failed, using fallback:", err);
    return fallback;
  }
}

/** Pick the TR or EN variant of a `<field>Tr` / `<field>En` pair. */
export function pickLocale<
  T extends Record<string, unknown>,
  F extends string,
>(row: T, field: F, locale: Locale): string {
  const key = `${field}${locale === "en" ? "En" : "Tr"}` as keyof T;
  return String(row[key] ?? "");
}

export function getServices() {
  return safe(
    () =>
      prisma.service.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      }),
    [],
  );
}

export function getFaqs() {
  return safe(
    () =>
      prisma.faq.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      }),
    [],
  );
}

export function getTestimonials() {
  return safe(
    () =>
      prisma.testimonial.findMany({
        where: { status: "APPROVED" },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      }),
    [],
  );
}

export function getBeforeAfters() {
  return safe(
    () =>
      prisma.beforeAfter.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      }),
    [],
  );
}

export function getGalleryProjects() {
  return safe(
    () =>
      prisma.galleryProject.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      }),
    [],
  );
}
