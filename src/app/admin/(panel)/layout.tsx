import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { siteConfig } from "@/lib/site-config";
import { AdminNav } from "@/components/admin/AdminNav";
import { logout } from "../auth-actions";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <div className="min-h-screen bg-cream lg:flex">
      {/* Sidebar */}
      <aside className="flex shrink-0 flex-col gap-6 border-b border-line bg-card p-5 lg:h-screen lg:w-[260px] lg:border-b-0 lg:border-r">
        <Link href="/admin" className="flex items-center gap-2.5">
          <span className="flex h-[40px] w-[40px] items-center justify-center rounded-xl bg-ink font-heading text-[15px] font-bold text-cream">
            {siteConfig.brandShort}
          </span>
          <span className="font-heading text-[15px] font-bold leading-tight text-ink">
            {siteConfig.brand}
            <span className="block text-[11px] font-normal text-ink-2">
              Yönetim Paneli
            </span>
          </span>
        </Link>

        <AdminNav />

        <div className="mt-auto flex flex-col gap-2 border-t border-line pt-4">
          <Link
            href="/"
            target="_blank"
            className="rounded-xl px-3.5 py-2 text-[13.5px] font-medium text-ink-2 transition-colors hover:text-ink"
          >
            ↗ Siteyi Görüntüle
          </Link>
          <div className="px-3.5 text-[12px] text-ink-2">
            {session.user?.email}
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="w-full rounded-xl px-3.5 py-2 text-left text-[13.5px] font-medium text-accent transition-colors hover:bg-accent-2"
            >
              Çıkış Yap
            </button>
          </form>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-5 lg:p-8">
        <div className="mx-auto max-w-[1000px]">{children}</div>
      </main>
    </div>
  );
}
