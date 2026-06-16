import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MapPinIcon, CheckIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/site-config";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      id="hero"
      className="scroll-mt-[78px] px-[22px] pb-[clamp(48px,7vw,84px)] pt-[clamp(40px,6vw,80px)]"
    >
      <Container className="flex flex-wrap items-center gap-[clamp(32px,5vw,64px)]">
        {/* Copy */}
        <div className="min-w-[300px] flex-1 basis-[400px]">
          <Badge dot className="animate-fade-up">
            {t("badge")}
          </Badge>
          <h1 className="mt-5 animate-fade-up text-[clamp(2.1rem,5.4vw,3.6rem)] font-bold text-ink [text-wrap:balance]">
            {t("titleLead")}{" "}
            <span className="text-accent">{t("titleHighlight")}</span>{" "}
            {t("titleTrail")}
          </h1>
          <p className="mt-5 max-w-[540px] animate-fade-up text-[clamp(1rem,1.6vw,1.18rem)] text-ink-2 [text-wrap:pretty]">
            {t.rich("subtitle", {
              b: (chunks) => <strong className="text-ink">{chunks}</strong>,
            })}
          </p>
          <div className="mt-[18px] flex animate-fade-up items-center gap-2 text-[14.5px] text-ink-2">
            <MapPinIcon size={17} className="shrink-0 text-accent" />
            {t("serviceArea")}
          </div>
          <div className="mt-7 flex animate-fade-up flex-wrap gap-3.5">
            <Button href="#iletisim" variant="dark">
              {t("ctaQuote")}
            </Button>
            <Button
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="hover:!border-whatsapp hover:!text-whatsapp"
            >
              <WhatsAppIcon size={18} className="text-whatsapp" />
              {t("ctaWhatsapp")}
            </Button>
          </div>
        </div>

        {/* Visual */}
        <div className="relative min-w-[280px] flex-1 basis-[380px] animate-fade-up">
          <div className="absolute right-[-6%] top-[-8%] z-0 h-[62%] w-[62%] rounded-full bg-accent-2 opacity-60 blur-[46px]" />
          <div className="relative z-[1] flex aspect-[4/5] items-end overflow-hidden rounded-[26px] border border-line bg-gradient-to-br from-accent-2 to-cream-2 p-[18px] shadow-[0_30px_60px_rgba(44,39,34,0.16)]">
            <span className="rounded-[9px] bg-paper/80 px-[11px] py-[7px] font-mono text-[12px] text-ink-2">
              {t("imageAlt")}
            </span>
          </div>
          <div className="absolute bottom-[26px] left-[-14px] z-[2] flex items-center gap-3 rounded-2xl border border-line bg-paper px-[18px] py-3.5 shadow-[0_16px_34px_rgba(44,39,34,0.16)]">
            <span className="flex h-[44px] w-[44px] items-center justify-center rounded-xl bg-accent-2 text-accent">
              <CheckIcon size={22} />
            </span>
            <span className="leading-tight">
              <span className="block font-heading text-[18px] font-bold text-ink">
                {t("floatTitle")}
              </span>
              <span className="block text-[12.5px] text-ink-2">
                {t("floatSub")}
              </span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
