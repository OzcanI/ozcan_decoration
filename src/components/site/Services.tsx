import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ServiceIcon } from "@/components/ui/Icons";

export type ServiceItem = {
  id: string;
  title: string;
  desc: string;
  icon: string;
};

export function Services({ items }: { items: ServiceItem[] }) {
  const t = useTranslations("Services");

  return (
    <Section id="hizmetler">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((service) => (
          <Card key={service.id} hover>
            <div className="mb-[18px] flex h-[54px] w-[54px] items-center justify-center rounded-[15px] bg-accent-2 text-accent">
              <ServiceIcon name={service.icon} size={26} />
            </div>
            <h3 className="text-[19px] text-ink">{service.title}</h3>
            <p className="mt-2 text-[15px] text-ink-2">{service.desc}</p>
          </Card>
        ))}

        {/* Custom-request CTA card */}
        <div className="flex flex-col justify-center rounded-[20px] bg-gradient-to-br from-ink to-[#3a332c] p-7 text-cream">
          <h3 className="text-[20px] text-cream">{t("customTitle")}</h3>
          <p className="mb-[18px] mt-2 text-[15px] opacity-80">
            {t("customText")}
          </p>
          <a
            href="#iletisim"
            className="self-start rounded-full bg-accent px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-ink"
          >
            {t("customCta")}
          </a>
        </div>
      </div>
    </Section>
  );
}
