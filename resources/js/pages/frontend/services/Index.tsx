import React, { useEffect, useRef, useState } from "react";
import PageHero from "@/pages/components/public/PageHero";
import PublicPanel from "@/pages/layout/PublicPanel";

const serviceCards = [
    {
        href: "/services/web-development",
        price: "Starting at $100",
        title: "Web Development",
        description:
            "Professional web development services for modern businesses.",
        features: [
            "Responsive Website Design",
            "SEO Friendly Structure",
            "Fast Loading Performance",
        ],
        icon: (
            <>
                <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
                <path d="M19 14v4" />
                <path d="M21 16h-4" />
            </>
        ),
    },
    {
        href: "/services/software-development",
        price: "Starting at $200",
        title: "Software Development",
        description:
            "Custom software solutions designed to improve business operations.",
        features: ["Custom Software Solutions", "Database Integration"],
        icon: (
            <>
                <path d="m16 18 6-6-6-6" />
                <path d="m8 6-6 6 6 6" />
                <path d="m14 4-4 16" />
            </>
        ),
    },
];

const Index = () => {
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
                threshold: 0.15,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <PublicPanel>
            <PageHero />
            <section ref={sectionRef} className="section-y overflow-hidden">
                <div className="container-page">
                    <div className="grid gap-6 lg:grid-cols-2">
                        {serviceCards.map((service, index) => (
                            <article
                                key={service.href}
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
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            {service.icon}
                                        </svg>
                                    </span>

                                    <span className="shrink-0 rounded-full border border-line bg-elevated px-2.5 py-1 font-mono text-[11px] text-muted">
                                        {service.price}
                                    </span>
                                </div>

                                <h2 className="mt-5 text-[17px] font-semibold text-ink">
                                    <a
                                        href={service.href}
                                        className="after:absolute after:inset-0 after:content-['']"
                                    >
                                        {service.title}
                                    </a>
                                </h2>

                                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                                    {service.description}
                                </p>

                                <ul className="mt-5 flex-1 space-y-2 border-t border-line pt-5">
                                    {service.features.map((feature) => (
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
                            Not sure which you need?
                        </h2>

                        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted">
                            There are three ways to work together — hourly, a
                            fixed-scope build, or a full application. Tell me
                            what you are trying to do and I will point you at
                            the right one.
                        </p>

                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <a
                                href="/pricing"
                                className="inline-flex items-center justify-center rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-elevated"
                            >
                                Compare packages
                            </a>

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
