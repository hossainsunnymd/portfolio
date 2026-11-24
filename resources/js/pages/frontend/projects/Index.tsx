import React, { useEffect, useRef, useState } from "react";
import PageHero from "@/pages/components/public/PageHero";
import PublicPanel from "@/pages/layout/PublicPanel";

const categories = [
    { label: "All", href: "/projects", active: true },
    {
        label: "Web Development",
        href: "/projects?category=web-development",
        active: false,
    },
    {
        label: "Mobile App",
        href: "/projects?category=mobile-app",
        active: false,
    },
    {
        label: "E-commerce",
        href: "/projects?category=ecommerce",
        active: false,
    },
];

const projects = [
    {
        href: "/projects/project-one",
        image: "https://placehold.co/600x400",
        alt: "Project One",
        category: "Web Development",
        title: "Project One",
        description:
            "A modern website developed with responsive design and optimized performance.",
    },
    {
        href: "/projects/project-two",
        image: "https://placehold.co/600x400",
        alt: "Project Two",
        category: "E-commerce",
        title: "Project Two",
        description:
            "An e-commerce platform with product management, shopping cart and checkout functionality.",
    },
    {
        href: "/projects/project-three",
        image: "https://placehold.co/600x400",
        alt: "Project Three",
        category: "Mobile App",
        title: "Project Three",
        description:
            "A mobile application designed to provide a smooth user experience.",
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
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px",
            },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <PublicPanel>
            <PageHero />
            <section ref={sectionRef} className="section-y overflow-hidden">
                <div className="container-page">
                    {/* Filter Tabs & Search Bar */}
                    <div
                        className={`flex flex-wrap items-center justify-between gap-4 transition-all duration-700 ease-out ${
                            isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-6 opacity-0"
                        }`}
                    >
                        <div className="hide-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1">
                            {categories.map((cat) => (
                                <a
                                    key={cat.label}
                                    href={cat.href}
                                    className={
                                        cat.active
                                            ? "whitespace-nowrap rounded-full bg-ink px-3.5 py-1.5 text-sm font-medium text-bg transition-colors"
                                            : "whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-elevated hover:text-ink"
                                    }
                                >
                                    {cat.label}
                                </a>
                            ))}
                        </div>

                        <label className="relative w-full sm:w-64">
                            <span className="sr-only">Search projects</span>

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
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>

                            <input
                                type="search"
                                placeholder="Search projects…"
                                className="w-full rounded-[var(--radius-base)] border border-line-strong bg-surface py-2 pl-9 pr-3 text-sm text-ink placeholder:text-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                            />
                        </label>
                    </div>

                    {/* Projects Grid */}
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project, index) => (
                            <article
                                key={project.href}
                                style={{
                                    transitionDelay: `${150 + index * 110}ms`,
                                }}
                                className={`group overflow-hidden rounded-[var(--radius-base)] border border-line bg-surface transition-all duration-700 ease-out hover:border-line-strong hover:shadow-lg ${
                                    isVisible
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-8 opacity-0"
                                }`}
                            >
                                <a href={project.href} className="block">
                                    <img
                                        src={project.image}
                                        alt={project.alt}
                                        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                    />

                                    <div className="p-5">
                                        <span className="text-xs font-medium text-accent">
                                            {project.category}
                                        </span>

                                        <h2 className="mt-2 text-lg font-semibold text-ink">
                                            {project.title}
                                        </h2>

                                        <p className="mt-2 text-sm leading-relaxed text-muted">
                                            {project.description}
                                        </p>
                                    </div>
                                </a>
                            </article>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div
                        style={{ transitionDelay: "380ms" }}
                        className={`mt-10 flex flex-wrap items-center justify-center gap-2 transition-all duration-700 ease-out ${
                            isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-6 opacity-0"
                        }`}
                    >
                        <a
                            href="#"
                            className="rounded-md border border-line px-3 py-2 text-sm text-muted hover:bg-elevated"
                        >
                            Previous
                        </a>

                        <a
                            href="#"
                            className="rounded-md bg-ink px-3 py-2 text-sm text-bg"
                        >
                            1
                        </a>

                        <a
                            href="#"
                            className="rounded-md border border-line px-3 py-2 text-sm text-muted hover:bg-elevated"
                        >
                            2
                        </a>

                        <a
                            href="#"
                            className="rounded-md border border-line px-3 py-2 text-sm text-muted hover:bg-elevated"
                        >
                            3
                        </a>

                        <a
                            href="#"
                            className="rounded-md border border-line px-3 py-2 text-sm text-muted hover:bg-elevated"
                        >
                            Next
                        </a>
                    </div>
                </div>
            </section>
        </PublicPanel>
    );
};

export default Index;
