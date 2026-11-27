import React, { useEffect, useRef, useState } from "react";
import type { SectionRecord } from "@/types/portfolio";

const CtaSection = ({ section }: { section: SectionRecord }) => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const config = section.config ?? {};
    const primaryLabel =
        typeof config.primary_cta_label === "string"
            ? config.primary_cta_label
            : "Get in touch";
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
                threshold: 0.2,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="section-y overflow-hidden">
            <div className="container-page">
                <div
                    className={`relative overflow-hidden rounded-[calc(var(--radius-base)*1.4)] border border-line bg-surface px-7 py-14 text-center transition-all duration-700 ease-out sm:px-14 ${
                        isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                    }`}
                >
                    <div
                        style={{
                            background:
                                "radial-gradient(ellipse at center, var(--accent) 0%, transparent 70%)",
                        }}
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 -top-24 h-64 opacity-[0.09] blur-3xl"
                    ></div>

                    <div
                        style={{ transitionDelay: "120ms" }}
                        className={`relative mx-auto max-w-xl transition-all duration-700 ease-out ${
                            isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-6 opacity-0"
                        }`}
                    >
                        <h2 className="text-[clamp(1.6rem,3.4vw,2.3rem)] font-semibold leading-tight text-ink">
                            {section.heading}
                        </h2>

                        <p className="mt-4 text-[15px] leading-relaxed text-muted">
                            {section.subheading}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            <a
                                href={primaryUrl}
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90"
                            >
                                {primaryLabel}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="17"
                                    height="17"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </a>

                            {secondaryLabel && secondaryUrl && (
                                <a
                                    href={secondaryUrl}
                                    className="inline-flex items-center justify-center rounded-lg border border-line px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:bg-surface"
                                >
                                    {secondaryLabel}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
