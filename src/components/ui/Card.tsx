import { cn } from "@/lib/cn";

/** Surface card used across services, process, testimonials, etc. */
export function Card({
  children,
  className,
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[20px] border border-line bg-card p-7",
        hover &&
          "transition-[transform,box-shadow] duration-200 hover:-translate-y-[5px] hover:shadow-[0_22px_44px_rgba(44,39,34,0.12)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
