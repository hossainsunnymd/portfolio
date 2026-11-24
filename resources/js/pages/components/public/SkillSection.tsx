import React, { useEffect, useRef, useState } from "react";

const skillGroups = [
    {
        category: "Frontend Development",
        skills: [
            { name: "HTML & CSS", level: 95 },
            { name: "JavaScript", level: 85 },
            { name: "Vue.js", level: 80 },
        ],
    },
    {
        category: "Backend Development",
        skills: [
            { name: "PHP", level: 90 },
            { name: "Laravel", level: 90 },
            { name: "REST API", level: 85 },
        ],
    },
    {
        category: "Database & Tools",
        skills: [
            { name: "MySQL", level: 85 },
            { name: "Git & GitHub", level: 80 },
            { name: "Docker", level: 65 },
        ],
    },
];

const SkillSection = () => {
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
        <section
            ref={sectionRef}
            className="section-y overflow-hidden border-b border-line"
        >
            <div className="container-page">
                {/* Section Heading */}
                <div
                    className={`transition-all duration-700 ease-out ${
                        isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                    }`}
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                        My Expertise
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink">
                        Skills & Technologies
                    </h2>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                        Technologies and tools I use to build modern, scalable
                        and user-friendly web applications.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {skillGroups.map((group, groupIndex) => (
                        <div
                            key={group.category}
                            style={{
                                transitionDelay: `${150 + groupIndex * 120}ms`,
                            }}
                            className={`transition-all duration-700 ease-out ${
                                isVisible
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-8 opacity-0"
                            }`}
                        >
                            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-subtle">
                                {group.category}
                            </h3>

                            <ul className="mt-5 space-y-4">
                                {group.skills.map((skill, skillIndex) => (
                                    <li key={skill.name}>
                                        <div className="flex items-baseline justify-between gap-3">
                                            <span className="text-sm font-medium text-ink">
                                                {skill.name}
                                            </span>

                                            <span className="font-mono text-[11px] text-subtle">
                                                {skill.level}%
                                            </span>
                                        </div>

                                        <div
                                            role="meter"
                                            aria-valuenow={skill.level}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label={`${skill.name} proficiency`}
                                            className="mt-2 h-1 w-full overflow-hidden rounded-full bg-line"
                                        >
                                            <div
                                                style={{
                                                    width: isVisible
                                                        ? `${skill.level}%`
                                                        : "0%",
                                                    transitionDelay: `${
                                                        300 +
                                                        groupIndex * 120 +
                                                        skillIndex * 100
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
    );
};

export default SkillSection;
