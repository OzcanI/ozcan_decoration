"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MaximizeIcon, CloseIcon } from "@/components/ui/Icons";

export type GalleryItem = { id: string; title: string; image: string };

export function ProjectGallery({
  items,
  labels,
}: {
  items: GalleryItem[];
  labels: { title: string; empty: string; openAlt: string };
}) {
  const [open, setOpen] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="mt-14">
      <h3 className="mb-[26px] text-center text-[clamp(1.3rem,2.6vw,1.7rem)] text-ink">
        {labels.title}
      </h3>

      {items.length === 0 ? (
        <p className="text-center text-ink-2">{labels.empty}</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpen(item)}
              aria-label={`${item.title} — ${labels.openAlt}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-3 text-left text-[12px] font-medium text-white">
                {item.title}
              </span>
              <span className="absolute right-2.5 top-2.5 flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-paper/85 text-ink">
                <MaximizeIcon size={16} />
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex animate-fade-up items-center justify-center bg-[rgba(26,22,18,0.82)] p-[22px] backdrop-blur-md"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative w-[min(960px,100%)] overflow-hidden rounded-[20px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={open.image}
                alt={open.title}
                fill
                sizes="960px"
                className="object-cover"
              />
            </div>
            <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent p-4 text-[15px] font-medium text-white">
              {open.title}
            </span>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute right-3.5 top-3.5 flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-paper/90 text-ink"
            >
              <CloseIcon size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
