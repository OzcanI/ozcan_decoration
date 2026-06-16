"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { GlobeIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

/** Toggles between Turkish and English while preserving the current path. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("Common");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const current = (params.locale as string) ?? routing.defaultLocale;
  const next = current === "tr" ? "en" : "tr";

  return (
    <button
      type="button"
      aria-label={t("switchTo")}
      onClick={() => router.replace(pathname, { locale: next })}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-2 text-[13px] font-semibold text-ink-2 transition-colors hover:text-ink",
        className,
      )}
    >
      <GlobeIcon size={16} />
      {next.toUpperCase()}
    </button>
  );
}
