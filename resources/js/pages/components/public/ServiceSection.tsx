import React, { useEffect, useRef, useState } from "react";
import ServiceIcon from "./ServiceIcon";
import type { SectionRecord, ServiceRecord } from "@/types/portfolio";

const ServiceSection = ({
    services,
    section,
}: {
    services: ServiceRecord[];
    section: SectionRecord;
}) => {
    const sectionRef = useRef(null);
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
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px",
            }
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
                {/* হেডার অংশ */}
                <div
                    className={`transition-all duration-700 ease-out ${
                        isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                    }`}
                >
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                        {typeof section.config?.eyebrow === "string"
                            ? section.config.eyebrow
                            : section.name}
                    </p>

                    <h2 className="text-3xl font-semibold tracking-tight text-ink">
                        {section.heading}
                    </h2>

                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
                        {section.subheading}
                    </p>
                </div>

                {/* সার্ভিস কার্ড গ্রিড */}
                <div
                    className={`mt-12 grid gap-px overflow-hidden rounded-[var(--radius-base)] border border-line bg-line transition-opacity duration-500 sm:grid-cols-2 lg:grid-cols-3 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    {services
                        .filter(
                            (service) =>
                                service.status === "published" &&
                                service.is_featured,
                        )
                        .sort((a, b) => a.position - b.position)
                        .map((service, index) => (
                        <a
                            key={service.id}
                            href={`/services/show?slug=${service.slug}`}
                            className="group relative flex flex-col bg-surface p-7 transition-colors hover:bg-elevated"
                        >
                            {/* কার্ডের ভেতরের কন্টেন্ট একে একে (staggered) আসবে */}
                            <div
                                style={{
                                    transitionDelay: `${150 + index * 90}ms`,
                                }}
                                className={`flex flex-1 flex-col transition-all duration-700 ease-out ${
                                    isVisible
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-6 opacity-0"
                                }`}
                            >
                                <span className="mb-5 grid h-10 w-10 place-items-center rounded-[calc(var(--radius-base)*0.8)] bg-accent-soft text-accent">
                                    <ServiceIcon name={service.icon} />
                                </span>

                                <h3 className="text-[15px] font-semibold text-ink">
                                    {service.title}
                                </h3>

                                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                                    {service.summary}
                                </p>

                                <div className="mt-5 flex items-center justify-end gap-3">
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
                                        className="ml-auto text-subtle transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                                    >
                                        <path d="M7 17 17 7"></path>
                                        <path d="M7 7h10v10"></path>
                                    </svg>
                                </div>
                            </div>
                        </a>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceSection;
