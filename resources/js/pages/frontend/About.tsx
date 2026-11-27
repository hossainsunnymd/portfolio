import { useEffect, useRef, useState,RefObject } from "react";
import PublicPanel from "../layout/PublicPanel";
import PageHero from "@/pages/components/public/PageHero";
import {
    formatExperienceDates,
    groupSkills,
} from "@/types/portfolio";
import type {
    ClientRecord,
    ExperienceRecord,
    SectionRecord,
    SkillRecord,
} from "@/types/portfolio";

type AboutFact = { label: string; value: string };

function getFacts(section: SectionRecord): AboutFact[] {
    const facts = section.config?.facts;
    if (!Array.isArray(facts)) return [];

    return facts.filter(
        (fact): fact is AboutFact =>
            typeof fact === "object" &&
            fact !== null &&
            "label" in fact &&
            typeof fact.label === "string" &&
            "value" in fact &&
            typeof fact.value === "string",
    );
}

const useInView = <T extends HTMLElement = HTMLElement>(
    threshold = 0.15,
): [RefObject<T | null>, boolean] => {
    const ref = useRef<T | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold,
                rootMargin: "0px 0px -40px 0px",
            },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, isVisible];
};

export default function About({
    sections,
    skills,
    experiences: experienceRecords,
    clients: clientRecords,
}: {
    sections: Record<string, SectionRecord>;
    skills: SkillRecord[];
    experiences: ExperienceRecord[];
    clients: ClientRecord[];
}) {
    const section = sections.about;
    const skillsSection = sections.skills;
    const experienceSection = sections.experience;
    const clientsSection = sections.clients;
    const skillGroups = groupSkills(skills);
    const experiences = experienceRecords
        .filter(
            (experience) =>
                experience.enabled && experience.kind === "work",
        )
        .sort((a, b) => a.position - b.position);
    const clients = clientRecords
        .filter((client) => client.enabled)
        .sort((a, b) => a.position - b.position);
    const body =
        typeof section.config?.body === "string"
            ? section.config.body
            : (section.subheading ?? "");
    const facts = getFacts(section);
    const profileImage =
        typeof section.config?.image_path === "string"
            ? section.config.image_path
            : null;

    const [aboutRef, aboutVisible] = useInView(0.15);
    const [skillsRef, skillsVisible] = useInView(0.15);
    const [expRef, expVisible] = useInView(0.15);
    const [clientsRef, clientsVisible] = useInView(0.15);

    return (
        <PublicPanel>
            {/* Page Hero */}
            <PageHero section={section} />

            {/* About Section */}
            <section
                ref={aboutRef}
                className="overflow-hidden border-b border-line py-14 sm:py-20"
            >
                <div className="container-page">
                    <div
                        className={`grid gap-12 ${
                            profileImage ? "lg:grid-cols-[1fr_0.7fr]" : ""
                        } lg:gap-16`}
                    >
                        {/* About Content */}
                        <div
                            className={`transition-all duration-700 ease-out ${
                                aboutVisible
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-8 opacity-0"
                            }`}
                        >
                            <div className="max-w-none space-y-5 text-base leading-relaxed text-muted">
                                {body.split(/\n{2,}/).filter(Boolean).map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </div>

                            {/* Personal Facts */}
                            {facts.length > 0 && (
                                <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-line pt-8 sm:grid-cols-2">
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

                            {/* Buttons */}
                            <div className="mt-9 flex flex-wrap gap-3">
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                                >
                                    Start a project
                                    <span aria-hidden="true">→</span>
                                </a>

                                <a
                                    href="/projects"
                                    className="inline-flex items-center rounded-lg border border-line px-5 py-3 text-sm font-medium text-ink transition hover:bg-gray-50"
                                >
                                    See my work
                                </a>
                            </div>
                        </div>

                        {profileImage && (
                            <div
                                style={{ transitionDelay: "150ms" }}
                                className={`order-first transition-all duration-700 ease-out lg:order-last ${
                                    aboutVisible
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-8 opacity-0"
                                }`}
                            >
                                <div className="sticky top-24 overflow-hidden rounded-2xl border border-line bg-elevated">
                                    <img
                                        src={profileImage}
                                        alt={section.name}
                                        loading="lazy"
                                        className="aspect-[3/4] w-full object-cover"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section
                ref={skillsRef}
                className="overflow-hidden border-b border-line py-16"
            >
                <div className="container-page">
                    <h2
                        className={`text-xl font-semibold text-ink transition-all duration-700 ease-out ${
                            skillsVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-6 opacity-0"
                        }`}
                    >
                        {skillsSection.heading ?? skillsSection.name}
                    </h2>

                    <div className="mt-8 grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
                        {skillGroups.map((group, groupIndex) => (
                            <div
                                key={group.category}
                                style={{
                                    transitionDelay: `${120 + groupIndex * 120}ms`,
                                }}
                                className={`transition-all duration-700 ease-out ${
                                    skillsVisible
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-8 opacity-0"
                                }`}
                            >
                                <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-subtle">
                                    {group.category}
                                </h3>

                                <ul className="mt-4 space-y-3.5">
                                    {group.skills.map((skill, skillIndex) => (
                                        <li key={skill.id}>
                                            <div className="flex items-baseline justify-between gap-3">
                                                <span className="text-sm font-medium text-ink">
                                                    {skill.name}
                                                </span>
                                                <span className="font-mono text-[11px] text-subtle">
                                                    {skill.level}%
                                                </span>
                                            </div>
                                            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-line">
                                                <div
                                                    style={{
                                                        width: skillsVisible
                                                            ? `${skill.level}%`
                                                            : "0%",
                                                        transitionDelay: `${
                                                            250 +
                                                            groupIndex * 120 +
                                                            skillIndex * 90
                                                        }ms`,
                                                    }}
                                                    className="h-full rounded-full bg-accent transition-all duration-1000 ease-out"
                                                ></div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section
                ref={expRef}
                className="overflow-hidden border-b border-line py-16"
            >
                <div className="container-page">
                    <h2
                        className={`text-xl font-semibold text-ink transition-all duration-700 ease-out ${
                            expVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-6 opacity-0"
                        }`}
                    >
                        {experienceSection.heading ?? experienceSection.name}
                    </h2>

                    <ol className="relative mt-8 space-y-9 border-l border-line pl-7">
                        {experiences.map((exp, index) => (
                            <li
                                key={exp.id}
                                style={{
                                    transitionDelay: `${150 + index * 150}ms`,
                                }}
                                className={`relative transition-all duration-700 ease-out ${
                                    expVisible
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-8 opacity-0"
                                }`}
                            >
                                <span
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
                                    {exp.organization}
                                    <span className="text-subtle">
                                        {" "}
                                        · {exp.location}
                                    </span>
                                </p>

                                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                                    {exp.summary}
                                </p>

                                <ul className="mt-3 space-y-1.5">
                                    {(exp.achievements ?? []).map((item) => (
                                        <li
                                            key={item}
                                            className="flex gap-2.5 text-sm text-muted"
                                        >
                                            <span className="mt-0.5 shrink-0 text-accent">
                                                ✓
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Clients Section */}
            <section
                ref={clientsRef}
                className="overflow-hidden border-b border-line py-16"
            >
                <div className="container-page">
                    <div
                        className={`transition-all duration-700 ease-out ${
                            clientsVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-6 opacity-0"
                        }`}
                    >
                        <h2 className="text-xl font-semibold text-ink">
                            {clientsSection.heading ?? clientsSection.name}
                        </h2>

                        <p className="mt-3 text-sm text-muted">
                            {clientsSection.subheading}
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                        {clients.map((client, index) => (
                            <div
                                key={client.id}
                                style={{
                                    transitionDelay: `${120 + index * 90}ms`,
                                }}
                                className={`flex h-24 items-center justify-center rounded-xl border border-line bg-elevated transition-all duration-700 ease-out ${
                                    clientsVisible
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-6 opacity-0"
                                }`}
                            >
                                {client.logo_path ? (
                                    <img
                                        src={client.logo_path}
                                        alt={client.name}
                                        className="max-h-12 max-w-full object-contain"
                                        loading="lazy"
                                    />
                                ) : (
                                    <span className="text-lg font-bold text-subtle">
                                        {client.name}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicPanel>
    );
}
