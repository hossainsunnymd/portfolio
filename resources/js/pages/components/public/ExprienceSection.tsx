import React, { useEffect, useRef, useState } from "react";
import {
    formatExperienceDates,
} from "@/types/portfolio";
import type { ExperienceRecord, SectionRecord } from "@/types/portfolio";

const ExprienceSection = ({
    section,
    experiences: records,
}: {
    section: SectionRecord;
    experiences: ExperienceRecord[];
}) => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const experiences = records
        .filter(
            (experience) =>
                experience.enabled && experience.kind === "work",
        )
        .sort((a, b) => a.position - b.position);
    const educations = records
        .filter(
            (experience) =>
                experience.enabled &&
                (experience.kind === "education" ||
                    experience.kind === "certification"),
        )
        .sort((a, b) => a.position - b.position);
    const eyebrow =
        typeof section.config?.eyebrow === "string"
            ? section.config.eyebrow
            : section.name;

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
        <section
            ref={sectionRef}
            className="section-y overflow-hidden border-b border-line"
        >
            <div className="container-page">
                {/* হেডিং অংশ */}
                <div
                    className={`transition-all duration-700 ease-out ${
                        isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                    }`}
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                        {eyebrow}
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink">
                        {section.heading}
                    </h2>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                        {section.subheading}
                    </p>
                </div>

                <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
                    {/* বাম পাশ: Experience Timeline */}
                    <ol className="relative space-y-9 border-l border-line pl-7">
                        {experiences.map((exp, index) => (
                            <li
                                key={exp.id}
                                style={{
                                    transitionDelay: `${150 + index * 140}ms`,
                                }}
                                className={`relative transition-all duration-700 ease-out ${
                                    isVisible
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-8 opacity-0"
                                }`}
                            >
                                <span
                                    aria-hidden="true"
                                    className={`absolute -left-[calc(1.75rem+4.5px)] top-1.5 h-[9px] w-[9px] rounded-full ring-4 ring-bg ${
                                        exp.is_current
                                            ? "bg-accent"
                                            : "bg-line-strong"
                                    }`}
                                ></span>

                                <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">
                                    {formatExperienceDates(exp)}
                                </p>

                                <h3 className="mt-1.5 text-[15px] font-semibold text-ink">
                                    {exp.role}
                                </h3>

                                <p className="mt-0.5 text-sm text-accent">
                                    {exp.url ? (
                                        <a
                                            href={exp.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline"
                                        >
                                            {exp.organization}
                                        </a>
                                    ) : (
                                        exp.organization
                                    )}

                                    <span className="text-subtle">
                                        {" "}
                                        · {exp.location}
                                    </span>
                                </p>

                                {exp.summary && (
                                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                                        {exp.summary}
                                    </p>
                                )}

                                <ul className="mt-3 space-y-1.5">
                                    {(exp.achievements ?? []).map((item) => (
                                        <li
                                            key={item}
                                            className="flex gap-2.5 text-sm text-muted"
                                        >
                                            <span
                                                className="mt-0.5 shrink-0 text-accent"
                                                aria-hidden="true"
                                            >
                                                ✓
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ol>

                    {/* ডান পাশ: Education & Training */}
                    <div
                        style={{ transitionDelay: "220ms" }}
                        className={`transition-all duration-700 ease-out ${
                            isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-8 opacity-0"
                        }`}
                    >
                        <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-subtle">
                            Education & Training
                        </h3>

                        <ul className="mt-5 space-y-5">
                            {educations.map((edu, index) => (
                                <li
                                    key={edu.id}
                                    style={{
                                        transitionDelay: `${280 + index * 140}ms`,
                                    }}
                                    className={`rounded-[var(--radius-base)] border border-line bg-surface p-5 transition-all duration-700 ease-out ${
                                        isVisible
                                            ? "translate-y-0 opacity-100"
                                            : "translate-y-8 opacity-0"
                                    }`}
                                >
                                    <span className="grid h-8 w-8 place-items-center rounded-[calc(var(--radius-base)*0.7)] bg-accent-soft text-accent">
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
                                            <path d="M22 10v6" />
                                            <path d="M2 10l10-5 10 5-10 5-10-5z" />
                                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                        </svg>
                                    </span>

                                    <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-subtle">
                                        {formatExperienceDates(edu)}
                                    </p>

                                    <h4 className="mt-1 text-sm font-semibold text-ink">
                                        {edu.role}
                                    </h4>

                                    <p className="text-sm text-muted">
                                        {edu.organization}
                                    </p>

                                    {edu.summary && (
                                        <p className="mt-2 text-xs leading-relaxed text-muted">
                                            {edu.summary}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExprienceSection;
