"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const items = [
  { href: "/admin", label: "Panel" },
  { href: "/admin/before-after", label: "Önce / Sonra" },
  { href: "/admin/gallery", label: "Galeri" },
  { href: "/admin/testimonials", label: "Yorumlar" },
  { href: "/admin/services", label: "Hizmetler" },
  { href: "/admin/faq", label: "S.S.S." },
  { href: "/admin/contact", label: "İletişim Talepleri" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-xl px-3.5 py-2.5 text-[14.5px] font-medium transition-colors",
              active
                ? "bg-accent text-white"
                : "text-ink-2 hover:bg-cream-2 hover:text-ink",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
