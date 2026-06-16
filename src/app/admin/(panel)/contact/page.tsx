import { prisma } from "@/lib/prisma";
import { ContactRequests } from "@/components/admin/ContactRequests";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  let rows: {
    id: string;
    name: string;
    phone: string;
    message: string;
    status: "NEW" | "CONTACTED" | "ARCHIVED";
    createdAt: Date;
  }[] = [];
  try {
    rows = await prisma.contactRequest.findMany({
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    });
  } catch (err) {
    console.error("[admin/contact] failed to load:", err);
  }

  return (
    <div>
      <h1 className="mb-1 text-[26px] text-ink">İletişim Talepleri</h1>
      <p className="mb-6 text-[14px] text-ink-2">
        Siteden gelen keşif talepleri.
      </p>
      <ContactRequests
        rows={rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }))}
      />
    </div>
  );
}
