"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { PhoneIcon, WhatsAppIcon, MapPinIcon, CheckIcon } from "@/components/ui/Icons";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export function Contact() {
  const t = useTranslations("Contact");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    // Best-effort lead storage; WhatsApp handoff happens regardless.
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      /* ignore — fall through to WhatsApp */
    }

    const text = `Merhaba, ben ${form.name || "(isim)"}. Telefon: ${
      form.phone || "(telefon)"
    }. ${form.message || "Ücretsiz keşif talep ediyorum."}`;
    window.open(whatsappLink(text), "_blank");
    setStatus("done");
    setForm({ name: "", phone: "", message: "" });
  }

  return (
    <Section id="iletisim" tone="cream2" containerSize="default">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-stretch gap-6">
        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="min-w-[280px] flex-1 basis-[360px] rounded-3xl border border-line bg-card p-[clamp(24px,4vw,34px)] shadow-[0_18px_40px_rgba(44,39,34,0.08)]"
        >
          <h3 className="mb-1.5 text-[20px] text-ink">{t("formTitle")}</h3>
          <p className="mb-5 text-[14px] text-ink-2">{t("formSubtitle")}</p>

          <Field label={t("name")} htmlFor="c-name">
            <Input
              id="c-name"
              required
              value={form.name}
              onChange={set("name")}
              placeholder={t("namePlaceholder")}
            />
          </Field>
          <Field label={t("phone")} htmlFor="c-phone">
            <Input
              id="c-phone"
              required
              type="tel"
              value={form.phone}
              onChange={set("phone")}
              placeholder={t("phonePlaceholder")}
            />
          </Field>
          <Field label={t("message")} htmlFor="c-message">
            <Textarea
              id="c-message"
              rows={4}
              value={form.message}
              onChange={set("message")}
              placeholder={t("messagePlaceholder")}
            />
          </Field>

          <Button
            type="submit"
            variant="whatsapp"
            disabled={status === "sending"}
            className="w-full"
          >
            <WhatsAppIcon size={18} />
            {status === "sending" ? t("sending") : t("submitWhatsapp")}
          </Button>

          {status === "done" && (
            <p className="mt-3 text-[14px] font-medium text-whatsapp">
              {t("success")}
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 text-[14px] font-medium text-accent">
              {t("error")}
            </p>
          )}
        </form>

        {/* Contact info panel */}
        <div className="flex min-w-[280px] flex-1 basis-[320px] flex-col rounded-3xl bg-gradient-to-br from-ink to-[#3a332c] p-[clamp(24px,4vw,34px)] text-cream">
          <h3 className="text-[20px] text-cream">{t("infoTitle")}</h3>
          <p className="mb-6 mt-2 text-[14.5px] opacity-[0.78]">
            {t("infoSubtitle")}
          </p>

          <a
            href={`tel:${siteConfig.phoneE164}`}
            className="mb-3 flex items-center gap-3.5 rounded-2xl bg-white/[0.07] p-4 transition-colors hover:bg-white/[0.13]"
          >
            <span className="flex h-[44px] w-[44px] items-center justify-center rounded-xl bg-accent text-white">
              <PhoneIcon size={20} />
            </span>
            <span className="leading-tight">
              <span className="block text-[12.5px] opacity-70">
                {t("phoneLabel")}
              </span>
              <span className="block font-heading text-[18px] font-semibold">
                {siteConfig.phoneDisplay}
              </span>
            </span>
          </a>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 rounded-2xl bg-white/[0.07] p-4 transition-colors hover:bg-white/[0.13]"
          >
            <span className="flex h-[44px] w-[44px] items-center justify-center rounded-xl bg-whatsapp text-white">
              <WhatsAppIcon size={20} />
            </span>
            <span className="leading-tight">
              <span className="block text-[12.5px] opacity-70">
                {t("whatsappLabel")}
              </span>
              <span className="block font-heading text-[18px] font-semibold">
                {siteConfig.phoneDisplay}
              </span>
            </span>
          </a>

          <div className="mt-[22px] flex flex-col gap-3.5 border-t border-white/10 pt-5">
            <div className="flex items-start gap-2.5 text-[14.5px] opacity-85">
              <MapPinIcon size={19} className="mt-0.5 shrink-0 text-accent" />
              <span>{t("areaNote")}</span>
            </div>
            <div className="flex items-start gap-2.5 text-[14.5px] opacity-85">
              <CheckIcon size={19} className="mt-0.5 shrink-0 text-accent" />
              <span>{t("freeNote")}</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
