"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site-config";

function useCountUp(target: number, run: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * ease(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return value;
}

export function Stats() {
  const t = useTranslations("Stats");
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const years = useCountUp(siteConfig.stats.years, visible);
  const projects = useCountUp(siteConfig.stats.projects, visible);
  const satisfaction = useCountUp(siteConfig.stats.satisfaction, visible);

  const items = [
    { value: `${years}+`, label: t("yearsLabel") },
    { value: `${projects}+`, label: t("projectsLabel") },
    { value: t("free"), label: t("freeLabel") },
    { value: `%${satisfaction}`, label: t("satisfactionLabel") },
  ];

  return (
    <section className="bg-ink text-cream">
      <div
        ref={ref}
        className="mx-auto grid max-w-[1080px] grid-cols-2 gap-[18px] px-[22px] py-[clamp(34px,5vw,52px)] md:grid-cols-4"
      >
        {items.map((item, i) => (
          <div key={i} className="p-2 text-center">
            <div className="font-heading text-[clamp(2rem,4.4vw,2.9rem)] font-bold text-accent">
              {item.value}
            </div>
            <div className="mt-1 text-[14px] opacity-[0.78]">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
