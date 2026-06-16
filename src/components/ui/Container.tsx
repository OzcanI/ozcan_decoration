import { cn } from "@/lib/cn";

/** Centered max-width content wrapper used by every section. */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[22px]",
        size === "narrow" && "max-w-[820px]",
        size === "default" && "max-w-[1180px]",
        size === "wide" && "max-w-[1280px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
