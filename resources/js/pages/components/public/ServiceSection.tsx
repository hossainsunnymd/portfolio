import React, { useEffect, useRef, useState } from "react";

const services = [
    {
        href: "/services/web-development",
        title: "Web Development",
        description:
            "Modern, responsive and high-performance websites built with the latest web technologies.",
        price: "Starting at $299",
        icon: (
            <>
                <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                <path d="M8 21h8"></path>
                <path d="M12 17v4"></path>
            </>
        ),
    },
    {
        href: "/services/laravel-development",
        title: "Laravel Development",
        description:
            "Scalable backend applications, REST APIs, authentication and custom business solutions.",
        price: "Starting at $399",
        icon: (
            <>
                <path d="m16 18 6-6-6-6"></path>
                <path d="m8 6-6 6 6 6"></path>
                <path d="m14 4-4 16"></path>
            </>
        ),
    },
    {
        href: "/services/vue-development",
        title: "Frontend Development",
        description:
            "Beautiful and interactive user interfaces using Vue.js, React and Tailwind CSS.",
        price: "Starting at $249",
        icon: <path d="m12 2 10 18H2L12 2Z"></path>,
    },
    {
        href: "/services/ecommerce",
        title: "E-commerce Development",
        description:
            "Complete online shopping solutions with inventory, orders and payment integration.",
        price: "Starting at $499",
        icon: (
            <>
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2 2h2l3 12h12l3-9H5"></path>
            </>
        ),
    },
    {
        href: "/services/api-integration",
        title: "API Integration",
        description:
            "Third-party API integrations, payment gateways and custom backend connections.",
        price: "Starting at $149",
        icon: (
            <>
                <path d="M12 2v4"></path>
                <path d="M12 18v4"></path>
                <path d="M4.93 4.93l2.83 2.83"></path>
                <path d="M16.24 16.24l2.83 2.83"></path>
                <path d="M2 12h4"></path>
                <path d="M18 12h4"></path>
                <circle cx="12" cy="12" r="4"></circle>
            </>
        ),
    },
    {
        href: "/services/maintenance",
        title: "Website Maintenance",
        description:
            "Regular updates, bug fixes, security improvements and performance optimization.",
        price: "Starting at $99",
        icon: (
            <>
                <path d="M12 8v4l3 3"></path>
                <circle cx="12" cy="12" r="10"></circle>
            </>
        ),
    },
];

const ServiceSection = () => {
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
                        What We Do
                    </p>

                    <h2 className="text-3xl font-semibold tracking-tight text-ink">
                        Our Services
                    </h2>

                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
                        We provide professional digital services to help
                        businesses grow and succeed.
                    </p>
                </div>

                {/* সার্ভিস কার্ড গ্রিড */}
                <div
                    className={`mt-12 grid gap-px overflow-hidden rounded-[var(--radius-base)] border border-line bg-line transition-opacity duration-500 sm:grid-cols-2 lg:grid-cols-3 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    {services.map((service, index) => (
                        <a
                            key={service.href}
                            href={service.href}
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
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="19"
                                        height="19"
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

                                <h3 className="text-[15px] font-semibold text-ink">
                                    {service.title}
                                </h3>

                                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                                    {service.description}
                                </p>

                                <div className="mt-5 flex items-center justify-between gap-3">
                                    <span className="font-mono text-xs text-subtle">
                                        {service.price}
                                    </span>

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
