"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StarIcon, CloseIcon } from "@/components/ui/Icons";
import { ReviewForm } from "./ReviewForm";

export type TestimonialItem = {
  id: string;
  name: string;
  role: string | null;
  text: string;
  rating: number;
};

export function Testimonials({ items }: { items: TestimonialItem[] }) {
  const t = useTranslations("Testimonials");
  const [open, setOpen] = useState(false);

  return (
    <Section id="referanslar" tone="cream2">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

      {items.length === 0 ? (
        <p className="mb-8 text-center text-ink-2">{t("emptyState")}</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id} className="flex flex-col gap-4">
              <div className="flex gap-[3px] text-accent">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <StarIcon key={i} size={17} />
                ))}
              </div>
              <p className="text-[15.5px] leading-[1.65] text-ink">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="mt-auto flex items-center gap-3">
                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-accent-2 font-heading text-[16px] font-bold text-accent">
                  {item.name.charAt(0).toUpperCase()}
                </div>
                <div className="leading-tight">
                  <div className="font-heading text-[15px] font-semibold text-ink">
                    {item.name}
                  </div>
                  {item.role && (
                    <div className="text-[13px] text-ink-2">{item.role}</div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-9 text-center">
        <Button variant="dark" onClick={() => setOpen(true)}>
          {t("leaveReview")}
        </Button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex animate-fade-up items-center justify-center bg-[rgba(26,22,18,0.7)] p-[22px] backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-[min(480px,100%)] rounded-3xl border border-line bg-card p-[clamp(24px,4vw,32px)] shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-[36px] w-[36px] items-center justify-center rounded-[10px] border border-line bg-paper text-ink-2"
            >
              <CloseIcon size={18} />
            </button>
            <ReviewForm onDone={() => setOpen(false)} />
          </div>
        </div>
      )}
    </Section>
  );
}
