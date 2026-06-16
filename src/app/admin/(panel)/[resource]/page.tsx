import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { RESOURCES } from "@/lib/admin-resources";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const dynamic = "force-dynamic";

type Row = Record<string, unknown> & { id: string };

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource } = await params;
  const def = RESOURCES[resource];
  if (!def) notFound();

  let rows: Row[] = [];
  try {
    const model = (prisma as unknown as Record<
      string,
      { findMany: (args: unknown) => Promise<Row[]> }
    >)[def.model];
    rows = await model.findMany({
      orderBy: def.orderBy ?? { createdAt: "desc" },
    });
  } catch (err) {
    console.error(`[admin/${resource}] failed to load rows:`, err);
  }

  return <ResourceManager def={def} rows={rows} />;
}
