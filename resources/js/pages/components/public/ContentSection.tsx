import React, { useEffect, useState } from "react";
import type { SectionRecord, SkillRecord } from "@/types/portfolio";

function getStats(section: SectionRecord) {
  const stats = section.config?.stats;
  if (!Array.isArray(stats)) return [];

  return stats.filter(
    (stat): stat is { value: string; label: string } =>
      typeof stat === "object" &&
      stat !== null &&
      "value" in stat &&
      typeof stat.value === "string" &&
      "label" in stat &&
      typeof stat.label === "string",
  );
}

const ContentSection = ({
  section,
  skills,
}: {
  section: SectionRecord;
  skills: SkillRecord[];
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const techStack = skills
    .filter((skill) => skill.enabled && skill.is_featured)
    .sort((a, b) => a.position - b.position);
  const stats = getStats(section);
  const config = section.config ?? {};
  const eyebrow =
    typeof config.eyebrow === "string"
      ? config.eyebrow
      : section.name;
  const imagePath =
    typeof config.image_path === "string" ? config.image_path : null;
  const primaryLabel =
    typeof config.primary_cta_label === "string"
      ? config.primary_cta_label
      : "Contact";
  const primaryUrl =
    typeof config.primary_cta_url === "string" &&
    config.primary_cta_url.startsWith("/") &&
    !config.primary_cta_url.startsWith("//")
      ? config.primary_cta_url
      : "/contact";
  const secondaryLabel =
    typeof config.secondary_cta_label === "string"
      ? config.secondary_cta_label
      : null;
  const secondaryUrl =
    typeof config.secondary_cta_url === "string" &&
    config.secondary_cta_url.startsWith("/") &&
    !config.secondary_cta_url.startsWith("//")
      ? config.secondary_cta_url
      : null;
  const showStats = config.show_stats !== false && stats.length > 0;
  const showTech = config.show_tech !== false;

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);


  const getRiseStyle = (delayMs = 0) => ({
    transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 26px, 0)",
    opacity: isVisible ? 1 : 0,
    transitionProperty: "transform, opacity",
    transitionDuration: "700ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: isVisible ? `${delayMs}ms` : "0ms",
  });

  return (
    <section className="min-h-[400px] bg-bg px-6 py-16">
      <div
        className={`mx-auto grid max-w-6xl items-center gap-12 lg:gap-16 ${
          imagePath ? "lg:grid-cols-2" : ""
        }`}
      >
        {/* Left Column */}
        <div>
          <div
            style={getRiseStyle(0)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-2 text-xs text-muted motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            {eyebrow}
          </div>

          <h1
            style={getRiseStyle(90)}
            className="text-4xl font-bold tracking-tight text-ink md:text-5xl motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none"
          >
            {section.heading}
          </h1>

          <p
            style={getRiseStyle(180)}
            className="mt-6 max-w-xl text-base leading-[1.7] text-muted motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none"
          >
            {section.subheading}
          </p>

          {showTech && techStack.length > 0 && (
            <div
              style={getRiseStyle(260)}
              className="mt-8 flex max-w-xl flex-wrap gap-2 motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none"
            >
              {techStack.map((tech) => (
              <span
                key={tech.id}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink"
              >
                <span className="text-accent" aria-hidden="true">●</span>
                {tech.icon && <span>{tech.icon}</span>}
                {tech.name}
              </span>
              ))}
            </div>
          )}

          <div
            style={getRiseStyle(340)}
            className="mt-9 flex flex-wrap items-center gap-3 motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none"
          >
            <a
              href={primaryUrl}
              className="inline-flex items-center gap-3 rounded-xl bg-accent px-6 py-3.5 text-sm font-medium text-accent-fg transition hover:bg-accent-hover"
            >
              {primaryLabel}
              <span aria-hidden="true">→</span>
            </a>

            {secondaryLabel && secondaryUrl && (
              <a
                href={secondaryUrl}
                className="inline-flex items-center rounded-xl border border-line-strong bg-surface px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-elevated"
              >
                {secondaryLabel}
              </a>
            )}
          </div>

          {showStats && <div
            style={getRiseStyle(420)}
            className="mt-11 grid grid-cols-3 divide-x divide-line overflow-hidden rounded-xl border border-line bg-surface motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 py-4">
                <h3 className="text-2xl font-semibold text-teal-600">
                  {stat.value}
                </h3>
                <p className="mt-1 text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </div>}
        </div>

        {imagePath && (
          <div
            style={getRiseStyle(220)}
            className="mx-auto w-full max-w-[500px] rounded-[22px] bg-accent-soft p-3 motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none"
          >
            <img
              src={imagePath}
              alt={section.name}
              className="aspect-[4/5] w-full rounded-2xl object-cover"
              loading="eager"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentSection;
