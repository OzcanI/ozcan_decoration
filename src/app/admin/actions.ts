"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { RESOURCES, coerceField } from "@/lib/admin-resources";

// Prisma client is indexed dynamically by model name from the resource config.
type AnyModel = {
  create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
  update: (args: {
    where: { id: string };
    data: Record<string, unknown>;
  }) => Promise<unknown>;
  delete: (args: { where: { id: string } }) => Promise<unknown>;
};

function modelFor(modelName: string): AnyModel {
  const model = (prisma as unknown as Record<string, AnyModel>)[modelName];
  if (!model) throw new Error(`Unknown model: ${modelName}`);
  return model;
}

function revalidateAll(key: string) {
  revalidatePath(`/admin/${key}`);
  revalidatePath("/admin");
  // Public site reads content on every request (force-dynamic), but revalidate
  // anyway in case caching is enabled later.
  revalidatePath("/", "layout");
}

/** Create (id falsy) or update a resource row from raw form values. */
export async function saveResource(
  key: string,
  id: string | null,
  raw: Record<string, unknown>,
) {
  await requireAdmin();
  const def = RESOURCES[key];
  if (!def) throw new Error(`Unknown resource: ${key}`);

  const data: Record<string, unknown> = {};
  for (const field of def.fields) {
    data[field.name] = coerceField(field, raw[field.name]);
  }

  // Testimonials store rating as an Int and track moderation/source.
  if (key === "testimonials") {
    data.rating = Math.min(5, Math.max(1, Number(data.rating) || 5));
  }

  const model = modelFor(def.model);
  if (id) {
    await model.update({ where: { id }, data });
  } else {
    if (key === "testimonials") {
      data.source = "ADMIN";
      if (!data.status) data.status = "APPROVED";
    }
    await model.create({ data });
  }

  revalidateAll(key);
  return { ok: true };
}

export async function deleteResource(key: string, id: string) {
  await requireAdmin();
  const def = RESOURCES[key];
  if (!def) throw new Error(`Unknown resource: ${key}`);
  await modelFor(def.model).delete({ where: { id } });
  revalidateAll(key);
  return { ok: true };
}

// ---- Contact requests (not part of the generic CRUD form) ----------------

export async function updateContactStatus(
  id: string,
  status: "NEW" | "CONTACTED" | "ARCHIVED",
) {
  await requireAdmin();
  await prisma.contactRequest.update({ where: { id }, data: { status } });
  revalidatePath("/admin/contact");
  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteContact(id: string) {
  await requireAdmin();
  await prisma.contactRequest.delete({ where: { id } });
  revalidatePath("/admin/contact");
  revalidatePath("/admin");
  return { ok: true };
}
