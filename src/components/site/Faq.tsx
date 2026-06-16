"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/Section";

export type FaqItem = { id: string; q: string; a: string };

export function Faq({ items }: { items: FaqItem[] }) {
  const t = useTranslations("Faq");
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  if (items.length === 0) return null;

  return (
    <Section id="sss" containerSize="narrow">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-line bg-card"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 p-[20px_22px] text-left"
              >
                <span className="font-heading text-[16.5px] font-semibold text-ink">
                  {item.q}
                </span>
                <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px] bg-accent-2 text-[20px] font-semibold text-accent">
                  {isOpen ? "–" : "+"}
                </span>
              </button>
              <div
                className="grid transition-all duration-300 ease-in-out"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="overflow-hidden">
                  <p className="px-[22px] pb-[22px] text-[15.5px] leading-relaxed text-ink-2">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
