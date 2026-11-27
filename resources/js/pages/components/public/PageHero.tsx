import type { SectionRecord } from "@/types/portfolio";

export default function PricingHero({
  section,
  eyebrow,
  title,
  description,
}: {
  section?: SectionRecord;
  eyebrow?: string;
  title?: string;
  description?: string | null;
}) {
  const sectionEyebrow =
    typeof section?.config?.eyebrow === "string"
      ? section.config.eyebrow
      : section?.name;
  const resolvedDescription =
    description ?? section?.subheading ?? null;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[#eef3f3] py-20 sm:py-12 dark:bg-[#141b1a]"
    >
      {/* Deeper top mint/teal radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(70%_115%_at_50%_-5%,rgba(116,207,196,0.78)_0%,rgba(164,225,217,0.48)_52%,rgba(238,243,243,0)_100%)] dark:bg-[radial-gradient(70%_115%_at_50%_-5%,rgba(45,212,191,0.2)_0%,rgba(20,83,78,0.12)_52%,rgba(20,27,26,0)_100%)]"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow ?? sectionEyebrow ?? "Portfolio"}
        </p>

        <h1
          id="hero-heading"
          className="mt-3 text-4xl font-semibold tracking-[-0.025em] text-ink sm:text-5xl"
        >
          {title ?? section?.heading ?? "Selected work"}
        </h1>

        {resolvedDescription && (
          <p className="mx-auto mt-4 max-w-[46ch] text-base leading-relaxed text-muted sm:text-[17px]">
            {resolvedDescription}
          </p>
        )}
      </div>
    </section>
  );
}
