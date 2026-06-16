import { cn } from "@/lib/cn";

/** Pill label, e.g. the hero "since 2000" badge. */
export function Badge({
  children,
  className,
  dot = false,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-accent-2 px-3.5 py-[7px] text-[13px] font-semibold text-accent",
        className,
      )}
    >
      {dot && <span className="h-[7px] w-[7px] rounded-full bg-accent" />}
      {children}
    </span>
  );
}
