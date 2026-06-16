import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { siteConfig, navAnchors, whatsappLink } from "@/lib/site-config";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const areas = t.raw("areas") as string[];

  return (
    <footer className="bg-ink px-[22px] pb-7 pt-[clamp(44px,6vw,68px)] text-cream">
      <Container className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="max-w-[320px]">
          <div className="mb-3.5 flex items-center gap-[11px]">
            <span className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-accent font-heading font-bold text-white">
              {siteConfig.brandShort}
            </span>
            <span className="font-heading text-[18px] font-bold text-cream">
              {siteConfig.brand}
            </span>
          </div>
          <p className="text-[14.5px] leading-relaxed opacity-[0.72]">
            {t("tagline")} {t("founderLabel")}:{" "}
            <strong className="text-cream">{siteConfig.founder}</strong>.
          </p>
        </div>

        {/* Services */}
        <div>
          <div className="mb-3.5 font-heading text-[15px] font-semibold">
            {t("servicesTitle")}
          </div>
          <div className="flex flex-col gap-2.5 text-[14.5px] opacity-75">
            {navAnchors
              .filter((l) => l.key !== "faq" && l.key !== "contact")
              .map((l) => (
                <a
                  key={l.key}
                  href={l.href}
                  className="transition-colors hover:text-accent hover:opacity-100"
                >
                  {tNav(l.key)}
                </a>
              ))}
          </div>
        </div>

        {/* Areas */}
        <div>
          <div className="mb-3.5 font-heading text-[15px] font-semibold">
            {t("areasTitle")}
          </div>
          <div className="flex flex-col gap-2.5 text-[14.5px] opacity-75">
            {areas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="mb-3.5 font-heading text-[15px] font-semibold">
            {t("contactTitle")}
          </div>
          <div className="flex flex-col gap-2.5 text-[14.5px] opacity-85">
            <a
              href={`tel:${siteConfig.phoneE164}`}
              className="flex items-center gap-2 transition-colors hover:text-accent"
            >
              <PhoneIcon size={16} /> {siteConfig.phoneDisplay}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-accent"
            >
              <WhatsAppIcon size={16} /> {t("whatsappLink")}
            </a>
            <span className="opacity-70">{siteConfig.domain}</span>
          </div>
        </div>
      </Container>

      <div className="mx-auto mt-9 flex max-w-[1180px] flex-wrap justify-between gap-2 border-t border-white/10 pt-[22px] text-[13px] opacity-60">
        <span>
          © {new Date().getFullYear()} {siteConfig.brand} — {t("rights")}
        </span>
        <span>
          {t("founderLine")} · {siteConfig.domain}
        </span>
      </div>
    </footer>
  );
}
