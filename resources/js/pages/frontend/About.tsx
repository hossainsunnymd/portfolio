import { useEffect, useRef, useState,RefObject } from "react";
import PublicPanel from "../layout/PublicPanel";
import PageHero from "@/pages/components/public/PageHero";


const useInView =<T extends HTMLElement = HTMLElement> (threshold = 0.15): [RefObject<T | null>, boolean] => {
    const ref = useRef(null);
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

const skillGroups = [
    {
        category: "Backend Development",
        skills: [
            { name: "PHP", level: 90 },
            { name: "Laravel", level: 85 },
            { name: "REST API", level: 80 },
        ],
    },
    {
        category: "Frontend Development",
        skills: [
            { name: "Vue.js", level: 85 },
            { name: "React.js", level: 75 },
            { name: "Tailwind CSS", level: 90 },
        ],
    },
    {
        category: "Database & Tools",
        skills: [
            { name: "MySQL", level: 85 },
            { name: "Git & GitHub", level: 80 },
            { name: "Postman", level: 85 },
        ],
    },
];

const experiences = [
    {
        period: "2024 - Present",
        role: "Full Stack Web Developer",
        company: "ABC Technologies",
        location: "Dhaka, Bangladesh",
        isCurrent: true,
        summary:
            "Developing scalable web applications using Laravel, Vue.js, MySQL and modern frontend technologies.",
        highlights: [
            "Developed RESTful APIs and backend systems.",
            "Built responsive admin dashboards.",
            "Managed database design and optimization.",
        ],
    },
    {
        period: "2022 - 2024",
        role: "Junior Web Developer",
        company: "XYZ Software",
        location: "Dhaka, Bangladesh",
        isCurrent: false,
        summary:
            "Worked on frontend development, backend integration and database management for different web projects.",
        highlights: [
            "Developed user-friendly interfaces.",
            "Integrated third-party APIs.",
        ],
    },
];

const clients = ["Company One", "Company Two", "Company Three", "Company Four"];

export default function About() {
    const [aboutRef, aboutVisible] = useInView(0.15);
    const [skillsRef, skillsVisible] = useInView(0.15);
    const [expRef, expVisible] = useInView(0.15);
    const [clientsRef, clientsVisible] = useInView(0.15);

    return (
        <PublicPanel>
            {/* Page Hero */}
            <PageHero />

            {/* About Section */}
            <section
                ref={aboutRef}
                className="overflow-hidden border-b border-line py-14 sm:py-20"
            >
                <div className="container-page">
                    <div className="grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:gap-16">
                        {/* About Content */}
                        <div
                            className={`transition-all duration-700 ease-out ${
                                aboutVisible
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-8 opacity-0"
                            }`}
                        >
                            <div className="max-w-none space-y-5 text-base leading-relaxed text-muted">
                                <p>
                                    Hello! I'm a Full Stack Web Developer
                                    specializing in Laravel, PHP, Vue.js and
                                    modern frontend technologies. I enjoy
                                    creating clean, efficient and scalable web
                                    applications.
                                </p>

                                <p>
                                    My development experience includes building
                                    REST APIs, admin dashboards, inventory
                                    management systems, e-commerce platforms and
                                    dynamic web applications.
                                </p>

                                <p>
                                    I always try to write clean, maintainable
                                    code and follow industry-standard
                                    development practices. My goal is to build
                                    applications that solve real-world problems.
                                </p>
                            </div>

                            {/* Personal Facts */}
                            <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-line pt-8 sm:grid-cols-2">
                                <div>
                                    <dt className="text-xs font-medium uppercase tracking-wider text-subtle">
                                        Name
                                    </dt>
                                    <dd className="mt-1 text-sm text-ink">
                                        John Doe
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-xs font-medium uppercase tracking-wider text-subtle">
                                        Location
                                    </dt>
                                    <dd className="mt-1 text-sm text-ink">
                                        Dhaka, Bangladesh
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-xs font-medium uppercase tracking-wider text-subtle">
                                        Email
                                    </dt>
                                    <dd className="mt-1 text-sm text-ink">
                                        john@example.com
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-xs font-medium uppercase tracking-wider text-subtle">
                                        Experience
                                    </dt>
                                    <dd className="mt-1 text-sm text-ink">
                                        3+ Years
                                    </dd>
                                </div>
                            </dl>

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

                        {/* Profile Image */}
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
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800"
                                    alt="Profile"
                                    loading="lazy"
                                    className="aspect-[3/4] w-full object-cover"
                                />
                            </div>
                        </div>
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
                        Skills & Tools
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
                                        <li key={skill.name}>
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
                        Experience
                    </h2>

                    <ol className="relative mt-8 space-y-9 border-l border-line pl-7">
                        {experiences.map((exp, index) => (
                            <li
                                key={`${exp.period}-${exp.role}`}
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
                                        exp.isCurrent
                                            ? "bg-accent"
                                            : "bg-line-strong"
                                    }`}
                                ></span>

                                <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">
                                    {exp.period}
                                </p>

                                <h3 className="mt-1.5 text-[15px] font-semibold text-ink">
                                    {exp.role}
                                </h3>

                                <p className="mt-0.5 text-sm text-accent">
                                    {exp.company}
                                    <span className="text-subtle">
                                        {" "}
                                        · {exp.location}
                                    </span>
                                </p>

                                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                                    {exp.summary}
                                </p>

                                <ul className="mt-3 space-y-1.5">
                                    {exp.highlights.map((item) => (
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
                            Trusted By
                        </h2>

                        <p className="mt-3 text-sm text-muted">
                            Organizations and businesses I have worked with.
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                        {clients.map((client, index) => (
                            <div
                                key={client}
                                style={{
                                    transitionDelay: `${120 + index * 90}ms`,
                                }}
                                className={`flex h-24 items-center justify-center rounded-xl border border-line bg-elevated transition-all duration-700 ease-out ${
                                    clientsVisible
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-6 opacity-0"
                                }`}
                            >
                                <span className="text-lg font-bold text-subtle">
                                    {client}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicPanel>
    );
}
