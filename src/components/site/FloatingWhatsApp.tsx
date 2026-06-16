import { WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/site-config";

export function FloatingWhatsApp({ label }: { label: string }) {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-5 right-5 z-[80] flex h-[60px] w-[60px] animate-pulse-ring items-center justify-center rounded-full bg-whatsapp text-white transition-[filter] hover:brightness-105"
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}
