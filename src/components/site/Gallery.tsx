import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/Section";
import {
  BeforeAfterSlider,
  type BeforeAfterItem,
} from "./BeforeAfterSlider";
import { ProjectGallery, type GalleryItem } from "./ProjectGallery";

export function Gallery({
  beforeAfters,
  projects,
}: {
  beforeAfters: BeforeAfterItem[];
  projects: GalleryItem[];
}) {
  const t = useTranslations("Gallery");

  return (
    <Section id="galeri" tone="cream2">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <div className="mx-auto max-w-[900px]">
        <BeforeAfterSlider
          items={beforeAfters}
          labels={{
            before: t("beforeLabel"),
            after: t("afterLabel"),
            empty: t("emptyState"),
          }}
        />
      </div>
      <ProjectGallery
        items={projects}
        labels={{
          title: t("completedTitle"),
          empty: t("emptyState"),
          openAlt: t("openAlt"),
        }}
      />
    </Section>
  );
}
