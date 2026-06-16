import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Line({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export const PhoneIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M5 4h3l1.6 4-2 1.3a11 11 0 0 0 5 5l1.3-2 4 1.6V18a2 2 0 0 1-2 2A14 14 0 0 1 4 6a2 2 0 0 1 1-2Z" />
  </Line>
);

export const MapPinIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M20 10c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="2.6" />
  </Line>
);

export const CheckIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Line>
);

export const MaximizeIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M11 4h-5a2 2 0 0 0-2 2v5M13 20h5a2 2 0 0 0 2-2v-5M20 4l-7 7M4 20l7-7" />
  </Line>
);

export const SliderHandleIcon = (p: IconProps) => (
  <Line strokeWidth={2} {...p}>
    <path d="M9 7l-4 5 4 5M15 7l4 5-4 5" />
  </Line>
);

export const StarIcon = ({ size = 18, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.4l-5.8 3.05 1.1-6.47L2.6 9.35l6.5-.95z" />
  </svg>
);

export const WhatsAppIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.519 5.265l-.999 3.648 3.739-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export const CloseIcon = ({ size = 20, ...props }: IconProps) => (
  <Line size={size} {...props}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Line>
);

export const MenuIcon = ({ size = 20, ...props }: IconProps) => (
  <Line size={size} {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Line>
);

export const GlobeIcon = ({ size = 18, ...props }: IconProps) => (
  <Line size={size} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
  </Line>
);

// ---- Service icons, keyed by Service.icon -------------------------------

const serviceIcons = {
  paint: (
    <>
      <rect x="3" y="4" width="13" height="6" rx="1.5" />
      <path d="M16 7h3a2 2 0 0 1 2 2v1.5a2 2 0 0 1-2 2h-7" />
      <path d="M12 12.5V15" />
      <rect x="10" y="15" width="4" height="5.5" rx="1" />
    </>
  ),
  home: (
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v9h14v-9" />
      <path d="M10 19v-5h4v5" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M9 3v18M14 3v18M4 9h16M4 15h16" />
    </>
  ),
  roof: (
    <>
      <path d="M2 12 12 5l10 7" />
      <path d="M5 12v7h14v-7" />
      <path d="M2 12h20" />
    </>
  ),
  tools: (
    <>
      <rect x="2" y="8" width="20" height="8" rx="1.5" />
      <path d="M7 8v3M12 8v4M17 8v3" />
    </>
  ),
} as const;

export type ServiceIconKey = keyof typeof serviceIcons;
export const serviceIconKeys = Object.keys(serviceIcons) as ServiceIconKey[];

export function ServiceIcon({
  name,
  size = 26,
  ...props
}: IconProps & { name: string }) {
  const content = serviceIcons[name as ServiceIconKey] ?? serviceIcons.paint;
  return (
    <Line size={size} strokeWidth={1.6} {...props}>
      {content}
    </Line>
  );
}
