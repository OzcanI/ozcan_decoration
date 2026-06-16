"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { SliderHandleIcon } from "@/components/ui/Icons";

export type BeforeAfterItem = {
  id: string;
  title: string;
  before: string;
  after: string;
};

export function BeforeAfterSlider({
  items,
  labels,
}: {
  items: BeforeAfterItem[];
  labels: { before: string; after: string; empty: string };
}) {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  if (items.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-[22px] border border-line bg-card text-ink-2">
        {labels.empty}
      </div>
    );
  }

  const item = items[Math.min(active, items.length - 1)];

  const update = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <div>
      <div
        ref={ref}
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          update(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && update(e.clientX)}
        onPointerUp={(e) => {
          dragging.current = false;
          e.currentTarget.releasePointerCapture(e.pointerId);
        }}
        onDragStart={(e) => e.preventDefault()}
        className="relative aspect-[16/10] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-[22px] border border-line shadow-[0_24px_50px_rgba(44,39,34,0.14)]"
      >
        {/* base: after */}
        <Image
          src={item.after}
          alt={`${item.title} — ${labels.after}`}
          fill
          sizes="(max-width: 900px) 100vw, 900px"
          className="pointer-events-none object-cover"
          draggable={false}
          priority
        />
        {/* overlay: before, clipped from the right by (100 - pos)% */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={item.before}
            alt={`${item.title} — ${labels.before}`}
            fill
            sizes="(max-width: 900px) 100vw, 900px"
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* labels */}
        <span className="pointer-events-none absolute left-3.5 top-3.5 rounded-full bg-[rgba(44,39,34,0.82)] px-3 py-1.5 text-[12px] font-semibold tracking-[0.06em] text-white">
          {labels.before}
        </span>
        <span className="pointer-events-none absolute right-3.5 top-3.5 rounded-full bg-accent px-3 py-1.5 text-[12px] font-semibold tracking-[0.06em] text-white">
          {labels.after}
        </span>

        {/* handle */}
        <div
          className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(44,39,34,0.1)]"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-[46px] w-[46px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_6px_18px_rgba(44,39,34,0.28)]">
            <SliderHandleIcon size={22} />
          </div>
        </div>
      </div>

      {/* pair selector */}
      {items.length > 1 && (
        <div className="mt-4 flex flex-wrap justify-center gap-2.5">
          {items.map((it, i) => (
            <button
              key={it.id}
              type="button"
              onClick={() => {
                setActive(i);
                setPos(50);
              }}
              className={`rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors ${
                i === active
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-paper text-ink-2 hover:text-ink"
              }`}
            >
              {it.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
