import React, { useEffect, useRef, useState } from "react";
import type { SectionRecord } from "@/types/portfolio";

type Fact = { label: string; value: string };

function getFacts(section: SectionRecord): Fact[] {
    const facts = section.config?.facts;
    if (!Array.isArray(facts)) return [];

    return facts.filter(
        (fact): fact is Fact =>
            typeof fact === "object" &&
            fact !== null &&
            "label" in fact &&
            typeof fact.label === "string" &&
            "value" in fact &&
            typeof fact.value === "string",
    );
}

const AboutSection = ({ section }: { section: SectionRecord }) => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const config = section.config ?? {};
    const body = typeof config.body === "string" ? config.body : null;
    const facts = getFacts(section);
    const eyebrow =
        typeof config.eyebrow === "string" ? config.eyebrow : section.name;
    const ctaLabel =
        typeof config.cta_label === "string"
            ? config.cta_label
            : "Learn more";
    const ctaUrl =
        typeof config.cta_url === "string" &&
        config.cta_url.startsWith("/") &&
        !config.cta_url.startsWith("//")
            ? config.cta_url
            : "/about";
    const imagePath =
        typeof config.image_path === "string" ? config.image_path : null;

    useEffect(() => {
        const element = sectionRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -40px 0px",
            },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="section-y overflow-hidden border-t border-line"
        >
            <div className="container-page">
                <div
                    className={`grid gap-12 ${
                        imagePath ? "lg:grid-cols-[0.8fr_1fr]" : ""
                    } lg:gap-16`}
                >
                    {imagePath && (
                        <div
                            className={`relative transition-all duration-700 ease-out ${
                                isVisible
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-10 opacity-0"
                            }`}
                        >
                            <div className="sticky top-24 overflow-hidden rounded-xl border border-line bg-elevated">
                                <img
                                    src={imagePath}
                                    alt={section.name}
                                    loading="lazy"
                                    decoding="async"
                                    className="aspect-[3/4] w-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                    <div
                        className={`transition-all duration-700 delay-150 ease-out ${
                            isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-0"
                        }`}
                    >
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                            {eyebrow}
                        </p>

                        <h2 className="max-w-xl text-[clamp(1.6rem,3.2vw,2.2rem)] font-semibold leading-[1.15] text-ink">
                            {section.heading}
                        </h2>

                        {body && (
                            <div className="prose-site prose prose-sm mt-6 max-w-none prose-p:leading-relaxed">
                                {body.split(/\n{2,}/).filter(Boolean).map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </div>
                        )}

                        {facts.length > 0 && (
                            <dl className="mt-8 grid gap-x-8 gap-y-5 border-t border-line pt-7 sm:grid-cols-2">
                                {facts.map((fact) => (
                                    <div key={fact.label}>
                                        <dt className="text-xs font-medium uppercase tracking-wider text-subtle">
                                            {fact.label}
                                        </dt>
                                        <dd className="mt-1 text-sm text-ink">
                                            {fact.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        )}

                        <a
                            href={ctaUrl}
                            className="mt-8 inline-flex items-center gap-2 rounded-lg border border-line px-5 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:bg-elevated"
                        >
                            {ctaLabel}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
