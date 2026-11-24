import React, { useEffect, useRef, useState } from "react";

const CtaSection = () => {
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
                            Let's Work Together
                        </h2>

                        <p className="mt-4 text-[15px] leading-relaxed text-muted">
                            Have a project in mind? Let's discuss how we can
                            work together to bring your ideas to life.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90"
                            >
                                Get In Touch
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

                            <a
                                href="/pricing"
                                className="inline-flex items-center justify-center rounded-lg border border-line px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:bg-surface"
                            >
                                View Pricing
                            </a>
                        </div>

                        <p className="mt-7 text-sm text-muted">
                            Or email me directly at{" "}
                            <a
                                href="mailto:hello@example.com"
                                className="font-medium text-accent hover:underline"
                            >
                                hello@example.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
