/**
 * Declarative config for the admin CRUD panel. Shared between server actions
 * (validation + Prisma model resolution) and the client form/table renderer,
 * so each managed resource is described in exactly one place.
 *
 * Admin UI is in Turkish (the business owner's language).
 */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "image"
  | "select"
  | "switch";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  optional?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
};

export type ResourceDef = {
  key: string;
  /** Prisma model accessor (camelCase). */
  model: string;
  label: string;
  labelSingular: string;
  /** Field names shown as columns in the list table. */
  columns: string[];
  fields: Field[];
  /** Default order column + direction for the list. */
  orderBy?: Record<string, "asc" | "desc">;
};

const orderField: Field = {
  name: "order",
  label: "Sıra",
  type: "number",
  min: 0,
};
const publishedField: Field = {
  name: "published",
  label: "Yayında",
  type: "switch",
};

const iconOptions = [
  { value: "paint", label: "Boya (rulo)" },
  { value: "home", label: "Ev" },
  { value: "building", label: "Bina" },
  { value: "roof", label: "Çatı" },
  { value: "tools", label: "Tadilat" },
];

export const RESOURCES: Record<string, ResourceDef> = {
  "before-after": {
    key: "before-after",
    model: "beforeAfter",
    label: "Önce / Sonra",
    labelSingular: "Önce/Sonra Görseli",
    columns: ["titleTr", "order", "published"],
    orderBy: { order: "asc" },
    fields: [
      { name: "titleTr", label: "Başlık (TR)", type: "text" },
      { name: "titleEn", label: "Başlık (EN)", type: "text" },
      { name: "beforeImageUrl", label: "Önce Görseli", type: "image" },
      { name: "afterImageUrl", label: "Sonra Görseli", type: "image" },
      orderField,
      publishedField,
    ],
  },
  gallery: {
    key: "gallery",
    model: "galleryProject",
    label: "Galeri",
    labelSingular: "Proje Görseli",
    columns: ["titleTr", "order", "published"],
    orderBy: { order: "asc" },
    fields: [
      { name: "titleTr", label: "Başlık (TR)", type: "text" },
      { name: "titleEn", label: "Başlık (EN)", type: "text" },
      { name: "imageUrl", label: "Görsel", type: "image" },
      orderField,
      publishedField,
    ],
  },
  testimonials: {
    key: "testimonials",
    model: "testimonial",
    label: "Yorumlar",
    labelSingular: "Yorum",
    columns: ["name", "rating", "status", "order"],
    orderBy: { createdAt: "desc" },
    fields: [
      { name: "name", label: "Ad Soyad", type: "text" },
      {
        name: "role",
        label: "Konum / Proje",
        type: "text",
        optional: true,
        placeholder: "örn. Kadıköy · Salon Boyası",
      },
      { name: "text", label: "Yorum", type: "textarea" },
      {
        name: "rating",
        label: "Puan",
        type: "select",
        options: [1, 2, 3, 4, 5].map((n) => ({
          value: String(n),
          label: `${n} ★`,
        })),
      },
      {
        name: "status",
        label: "Durum",
        type: "select",
        options: [
          { value: "PENDING", label: "Onay Bekliyor" },
          { value: "APPROVED", label: "Onaylandı" },
          { value: "REJECTED", label: "Reddedildi" },
        ],
      },
      orderField,
    ],
  },
  services: {
    key: "services",
    model: "service",
    label: "Hizmetler",
    labelSingular: "Hizmet",
    columns: ["titleTr", "icon", "order", "published"],
    orderBy: { order: "asc" },
    fields: [
      { name: "titleTr", label: "Başlık (TR)", type: "text" },
      { name: "titleEn", label: "Başlık (EN)", type: "text" },
      { name: "descTr", label: "Açıklama (TR)", type: "textarea" },
      { name: "descEn", label: "Açıklama (EN)", type: "textarea" },
      { name: "icon", label: "İkon", type: "select", options: iconOptions },
      orderField,
      publishedField,
    ],
  },
  faq: {
    key: "faq",
    model: "faq",
    label: "S.S.S.",
    labelSingular: "Soru",
    columns: ["questionTr", "order", "published"],
    orderBy: { order: "asc" },
    fields: [
      { name: "questionTr", label: "Soru (TR)", type: "text" },
      { name: "questionEn", label: "Soru (EN)", type: "text" },
      { name: "answerTr", label: "Cevap (TR)", type: "textarea" },
      { name: "answerEn", label: "Cevap (EN)", type: "textarea" },
      orderField,
      publishedField,
    ],
  },
};

export const RESOURCE_KEYS = Object.keys(RESOURCES);

/** Coerce a raw form value into the type expected by the field/Prisma. */
export function coerceField(field: Field, value: unknown) {
  if (field.type === "number") {
    const n = Number(value);
    return Number.isFinite(n) ? Math.trunc(n) : 0;
  }
  if (field.type === "switch") {
    return value === true || value === "true" || value === "on";
  }
  if (field.optional && (value === "" || value == null)) {
    return null;
  }
  return typeof value === "string" ? value : String(value ?? "");
}
