import React, { useEffect, useRef, useState } from "react";
import PageHero from "@/pages/components/public/PageHero";
import PublicPanel from "@/pages/layout/PublicPanel";
import ServiceIcon from "@/pages/components/public/ServiceIcon";
import type { SectionRecord, ServiceRecord } from "@/types/portfolio";

const Index = ({
    services,
    section,
}: {
    services: ServiceRecord[];
    section: SectionRecord | null;
}) => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

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
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <PublicPanel>
            <PageHero section={section ?? undefined} />
            <section ref={sectionRef} className="section-y overflow-hidden">
                <div className="container-page">
                    <div className="grid gap-6 lg:grid-cols-2">
                        {services.map((service, index) => (
                            <article
                                key={service.id}
                                style={{
                                    transitionDelay: `${120 + index * 140}ms`,
                                }}
                                className={`group relative flex flex-col rounded-[var(--radius-base)] border border-line bg-surface p-7 transition-all duration-700 ease-out hover:border-line-strong hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.14)] ${
                                    isVisible
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-8 opacity-0"
                                }`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[calc(var(--radius-base)*0.8)] bg-accent-soft text-accent">
                                        <ServiceIcon name={service.icon} />
                                    </span>
                                </div>

                                <h2 className="mt-5 text-[17px] font-semibold text-ink">
                                    <a
                                        href={`/services/show?slug=${service.slug}`}
                                        className="after:absolute after:inset-0 after:content-['']"
                                    >
                                        {service.title}
                                    </a>
                                </h2>

                                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                                    {service.summary}
                                </p>

                                <ul className="mt-5 flex-1 space-y-2 border-t border-line pt-5">
                                    {(service.features ?? []).map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex gap-2.5 text-sm text-muted"
                                        >
                                            <span className="mt-0.5 shrink-0 text-accent">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="15"
                                                    height="15"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="m5 12 4 4L19 6" />
                                                </svg>
                                            </span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                                    Learn more
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="15"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="transition-transform group-hover:translate-x-0.5"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </span>
                            </article>
                        ))}
                    </div>

                    <div
                        style={{ transitionDelay: "340ms" }}
                        className={`mt-16 rounded-[calc(var(--radius-base)*1.2)] border border-line bg-surface p-8 text-center transition-all duration-700 ease-out ${
                            isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-8 opacity-0"
                        }`}
                    >
                        <h2 className="text-lg font-semibold text-ink">
                            Need something more specific?
                        </h2>

                        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted">
                            Tell me what you are trying to build and I will
                            recommend the right approach.
                        </p>

                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                            >
                                Ask me
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
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </PublicPanel>
    );
};

export default Index;
