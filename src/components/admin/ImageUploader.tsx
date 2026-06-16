"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/Field";

export function ImageUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function handleFile(file: File) {
    setStatus("uploading");
    setError("");
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Yükleme başlatılamadı.");
      }
      const { uploadUrl, publicUrl } = await res.json();

      const put = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!put.ok) throw new Error("S3'e yükleme başarısız.");

      onChange(publicUrl);
      setStatus("idle");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Bir hata oluştu.");
    }
  }

  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="relative h-[72px] w-[96px] shrink-0 overflow-hidden rounded-lg border border-line bg-cream-2">
          {value ? (
            <Image
              src={value}
              alt="preview"
              fill
              sizes="96px"
              className="object-cover"
            />
          ) : (
            <span className="flex h-full items-center justify-center text-[11px] text-ink-2">
              görsel yok
            </span>
          )}
        </div>

        <div className="flex-1">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={status === "uploading"}
            className="rounded-lg border border-line bg-paper px-3.5 py-2 text-[13.5px] font-medium text-ink transition-colors hover:border-accent disabled:opacity-60"
          >
            {status === "uploading" ? "Yükleniyor..." : "Görsel Yükle"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
          <p className="mt-1.5 text-[12px] text-ink-2">
            veya görsel bağlantısını yapıştırın:
          </p>
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://..."
            className="mt-1 py-2 text-[13px]"
          />
        </div>
      </div>
      {status === "error" && (
        <p className="mt-2 text-[13px] text-accent">{error}</p>
      )}
    </div>
  );
}
