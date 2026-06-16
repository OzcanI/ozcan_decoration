import { cn } from "@/lib/cn";
import { Container } from "./Container";

/** A full-width page section with consistent vertical rhythm + optional tint. */
export function Section({
  id,
  children,
  className,
  tone = "cream",
  containerSize = "default",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "cream" | "cream2" | "ink";
  containerSize?: "default" | "narrow" | "wide";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-[clamp(56px,8vw,96px)]",
        id && "scroll-mt-[78px]",
        tone === "cream2" && "bg-cream-2",
        tone === "ink" && "bg-ink text-cream",
        className,
      )}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}

/** Centered eyebrow + heading + subtitle block used at the top of sections. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto mb-11 max-w-[620px] text-center", className)}>
      {eyebrow && (
        <div className="text-[13px] font-bold uppercase tracking-[0.14em] text-accent">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-3 text-[clamp(1.8rem,3.6vw,2.6rem)] text-ink">{title}</h2>
      {subtitle && (
        <p className="mt-3.5 text-[17px] text-ink-2">{subtitle}</p>
      )}
    </div>
  );
}
