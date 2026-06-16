"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { StarIcon } from "@/components/ui/Icons";

export function ReviewForm({ onDone }: { onDone?: () => void }) {
  const t = useTranslations("ReviewForm");
  const [form, setForm] = useState({ name: "", role: "", text: "" });
  const [rating, setRating] = useState(5);
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
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setForm({ name: "", role: "", text: "" });
      setRating(5);
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="py-6 text-center">
        <p className="text-[15.5px] font-medium text-whatsapp">{t("success")}</p>
        {onDone && (
          <Button className="mt-4" variant="dark" onClick={onDone}>
            OK
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <h3 className="text-[20px] text-ink">{t("title")}</h3>
      <p className="mb-5 mt-1 text-[14px] text-ink-2">{t("subtitle")}</p>

      <Field label={t("name")} htmlFor="r-name">
        <Input
          id="r-name"
          required
          value={form.name}
          onChange={set("name")}
          placeholder={t("namePlaceholder")}
        />
      </Field>
      <Field label={t("role")} htmlFor="r-role">
        <Input
          id="r-role"
          value={form.role}
          onChange={set("role")}
          placeholder={t("rolePlaceholder")}
        />
      </Field>

      <div className="mb-4">
        <span className="mb-[7px] block text-[13.5px] font-semibold text-ink">
          {t("rating")}
        </span>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`${n}`}
              onClick={() => setRating(n)}
              className={n <= rating ? "text-accent" : "text-line"}
            >
              <StarIcon size={26} />
            </button>
          ))}
        </div>
      </div>

      <Field label={t("message")} htmlFor="r-text">
        <Textarea
          id="r-text"
          required
          rows={4}
          value={form.text}
          onChange={set("text")}
          placeholder={t("messagePlaceholder")}
        />
      </Field>

      <Button type="submit" variant="accent" disabled={status === "sending"} className="w-full">
        {status === "sending" ? t("sending") : t("submit")}
      </Button>
      {status === "error" && (
        <p className="mt-3 text-[14px] font-medium text-accent">{t("error")}</p>
      )}
    </form>
  );
}
