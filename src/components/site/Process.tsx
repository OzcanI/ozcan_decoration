import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

type Step = { title: string; text: string };

export function Process() {
  const t = useTranslations("Process");
  const steps = t.raw("steps") as Step[];

  return (
    <Section>
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <Card key={i} className="p-[26px]">
            <div className="mb-4 flex h-[44px] w-[44px] items-center justify-center rounded-[13px] bg-accent font-heading text-[15px] font-bold text-white">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="text-[18px] text-ink">{step.title}</h3>
            <p className="mt-2 text-[14.5px] text-ink-2">{step.text}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
