import { cn } from "@/lib/cn";

type Variant = "dark" | "accent" | "outline" | "whatsapp" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  dark: "bg-ink text-cream shadow-[0_14px_30px_rgba(44,39,34,0.22)] hover:bg-accent",
  accent: "bg-accent text-white hover:bg-ink",
  outline:
    "bg-paper text-ink border-[1.5px] border-line hover:border-accent hover:text-accent",
  whatsapp: "bg-whatsapp text-white hover:brightness-105",
  ghost: "text-ink-2 hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "px-[18px] py-[11px] text-[14px]",
  lg: "px-[26px] py-[15px] text-[16px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type ButtonAsAnchor = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    href: string;
  };

export function Button(props: ButtonAsButton | ButtonAsAnchor) {
  const { variant = "dark", size = "lg", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
      props;
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
