"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { siteConfig, navAnchors } from "@/lib/site-config";
import { PhoneIcon, MenuIcon, CloseIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("Nav");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/[0.86] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-[22px] py-[13px]">
        <a href="#hero" className="flex items-center gap-[11px]">
          <span className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-ink font-heading text-[16px] font-bold text-cream">
            {siteConfig.brandShort}
          </span>
          <span className="flex flex-col leading-[1.1]">
            <span className="font-heading text-[18px] font-bold text-ink">
              {siteConfig.brand}
            </span>
            <span className="text-[10.5px] uppercase tracking-[0.16em] text-ink-2">
              Boya · Badana · Tadilat
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-[26px] lg:flex">
          {navAnchors.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-[15px] font-medium text-ink-2 transition-colors hover:text-ink"
            >
              {t(link.key)}
            </a>
          ))}
          <LanguageSwitcher />
          <a
            href={`tel:${siteConfig.phoneE164}`}
            className="flex items-center gap-2 rounded-full bg-ink px-[18px] py-[11px] text-[14px] font-semibold text-cream transition-colors hover:bg-accent"
          >
            <PhoneIcon size={16} />
            {t("callNow")}: {siteConfig.phoneDisplay}
          </a>
        </nav>

        {/* Mobile actions */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <LanguageSwitcher />
          <a
            href={`tel:${siteConfig.phoneE164}`}
            aria-label={t("callNow")}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-[11px] bg-ink text-cream"
          >
            <PhoneIcon size={18} />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t("menu")}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-[11px] border border-line bg-paper text-ink"
          >
            <MenuIcon size={20} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-[rgba(30,26,22,0.45)] backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute inset-y-0 right-0 flex w-[min(330px,84vw)] animate-fade-up flex-col gap-1.5 bg-cream p-[22px] shadow-[-20px_0_60px_rgba(0,0,0,0.22)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3.5 flex items-center justify-between">
              <span className="font-heading text-[18px] font-bold">
                {t("menu")}
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={t("close")}
                className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-line bg-paper text-ink-2"
              >
                <CloseIcon size={18} />
              </button>
            </div>
            {navAnchors.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3.5 text-[17px] font-semibold text-ink transition-colors hover:bg-paper"
              >
                {t(link.key)}
              </a>
            ))}
            <a
              href={`tel:${siteConfig.phoneE164}`}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-ink p-3.5 font-semibold text-cream"
            >
              <PhoneIcon size={18} />
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-whatsapp p-3.5 font-semibold text-white"
            >
              <WhatsAppIcon size={18} />
              {t("writeWhatsapp")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
