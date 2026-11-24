import React from "react";
import { Link } from "@inertiajs/react";
import PublicPanel from "./../../layout/PublicPanel";

const project = {
    category: "Inventory Management System",
    title: "Ideal Fibre – Factory Inventory Management System",
    summary:
        "A Laravel-based inventory management application designed to streamline raw material tracking, purchase management, production requisitions, stock approvals and inventory reporting.",

    live_url: "",
    repo_url: "",

    client: "Ideal Fibre",
    role: "Full Stack Developer",
    completed_label: "",

    tech: ["Laravel", "PHP", "MySQL", "JavaScript"],

    cover_url: "",

    body: `
        <h2>The Challenge</h2>
        <p>
            Ideal Fibre were running stock across several spreadsheets that only two people understood.
            Nobody could answer a simple question — how much of a given raw material is on hand right now —
            without opening three files.
        </p>

        <h2>What I Built</h2>
        <p>
            A Laravel application organised around the way the factory actually works.
            Vendors and purchases feed inventory; production floors raise requisitions;
            a supervisor approves them; issued stock is deducted and logged.
            Every movement is attributable to a person and a timestamp.
        </p>

        <h2>The Interesting Part</h2>
        <p>
            Approvals were the hard bit. A requisition can be partially approved,
            partially received, and then topped up later, so a naive status column
            falls apart quickly.
        </p>
        <p>
            I modelled each requisition line as its own record with its own approved
            and received quantities, which made partial fulfilment fall out naturally
            and made the reports honest.
        </p>

        <h2>Result</h2>
        <p>
            Stock questions that used to take an afternoon are now a filter on a page,
            and month-end reconciliation went from two days to about an hour.
        </p>
    `,

    highlights: [
        "Raw material inventory tracking",
        "Vendor and purchase management",
        "Production floor requisitions",
        "Supervisor approval workflow",
        "Partial approval and fulfilment",
        "Stock deduction and movement logs",
        "User and timestamp-based tracking",
        "Inventory reporting and reconciliation",
    ],

    gallery: [],
};

const relatedProjects = [
    {
        id: 1,
        slug: "project-one",
        title: "Project One",
        summary: "Project description goes here.",
        cover_url: "",
    },
    {
        id: 2,
        slug: "project-two",
        title: "Project Two",
        summary: "Project description goes here.",
        cover_url: "",
    },
    {
        id: 3,
        slug: "project-three",
        title: "Project Three",
        summary: "Project description goes here.",
        cover_url: "",
    },
];

export default function Show() {
    return (
        <PublicPanel>
            <article>
                <header className="border-b border-line bg-surface/50">
                    <div className="container-page py-12 sm:py-16">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
                        >
                            <span>←</span>
                            Back to projects
                        </Link>

                        <div className="mt-7 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
                            <div>
                                {project.category && (
                                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                                        {project.category}
                                    </p>
                                )}

                                <h1 className="mt-3 text-[clamp(1.9rem,4.2vw,2.9rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
                                    {project.title}
                                </h1>

                                {project.summary && (
                                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                                        {project.summary}
                                    </p>
                                )}

                                {(project.live_url || project.repo_url) && (
                                    <div className="mt-7 flex flex-wrap gap-3">
                                        {project.live_url && (
                                            <a
                                                href={project.live_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                                            >
                                                Visit site ↗
                                            </a>
                                        )}

                                        {project.repo_url && (
                                            <a
                                                href={project.repo_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-surface"
                                            >
                                                Source code ↗
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>

                            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 self-start rounded-[var(--radius-base)] border border-line bg-surface p-6 lg:grid-cols-1">
                                {project.client && (
                                    <div>
                                        <dt className="text-xs font-medium uppercase tracking-wider text-subtle">
                                            Client
                                        </dt>
                                        <dd className="mt-1 text-sm text-ink">
                                            {project.client}
                                        </dd>
                                    </div>
                                )}

                                {project.role && (
                                    <div>
                                        <dt className="text-xs font-medium uppercase tracking-wider text-subtle">
                                            Role
                                        </dt>
                                        <dd className="mt-1 text-sm text-ink">
                                            {project.role}
                                        </dd>
                                    </div>
                                )}

                                {project.completed_label && (
                                    <div>
                                        <dt className="text-xs font-medium uppercase tracking-wider text-subtle">
                                            Delivered
                                        </dt>
                                        <dd className="mt-1 text-sm text-ink">
                                            {project.completed_label}
                                        </dd>
                                    </div>
                                )}

                                {project.tech?.length > 0 && (
                                    <div className="col-span-2 lg:col-span-1">
                                        <dt className="text-xs font-medium uppercase tracking-wider text-subtle">
                                            Built with
                                        </dt>
                                        <dd className="mt-2 flex flex-wrap gap-1.5">
                                            {project.tech.map((item) => (
                                                <span
                                                    key={item}
                                                    className="rounded-md border border-line bg-elevated px-2 py-0.5 font-mono text-[11px] text-muted"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>
                </header>

                {project.cover_url && (
                    <div className="container-page -mt-px">
                        <img
                            src={project.cover_url}
                            alt={project.title}
                            className="mt-10 w-full rounded-[calc(var(--radius-base)*1.2)] border border-line object-cover"
                        />
                    </div>
                )}

                <section className="container-page pt-[var(--section-y)] pb-[calc(var(--section-y)/2)]">
                    <div className="grid gap-12 lg:grid-cols-[1fr_16rem] lg:gap-16">
                        <div>
                            <h2 className="mb-6 text-xl font-semibold text-ink">
                                Project Details
                            </h2>

                            {project.body && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: project.body,
                                    }}
                                    className="prose-site prose max-w-none prose-headings:font-semibold prose-h2:text-xl prose-h3:text-base prose-p:leading-relaxed"
                                />
                            )}
                        </div>

                        {project.highlights?.length > 0 && (
                            <aside className="lg:sticky lg:top-24 lg:self-start">
                                <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-subtle">
                                    Highlights
                                </h2>

                                <ul className="mt-4 space-y-3">
                                    {project.highlights.map((item) => (
                                        <li
                                            key={item}
                                            className="flex gap-2.5 text-sm leading-relaxed text-muted"
                                        >
                                            <span className="mt-0.5 shrink-0 text-accent">
                                                ✓
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </aside>
                        )}
                    </div>

                    {project.gallery?.length > 0 && (
                        <div className="mt-14 grid gap-5 sm:grid-cols-2">
                            {project.gallery.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`${project.title} screenshot ${index + 1}`}
                                    loading="lazy"
                                    className="w-full rounded-[var(--radius-base)] border border-line"
                                />
                            ))}
                        </div>
                    )}
                </section>

                {relatedProjects.length > 0 && (
                    <section className="border-t border-line pb-[var(--section-y)] pt-[calc(var(--section-y)/2)]">
                        <div className="container-page">
                            <h2 className="text-xl font-semibold text-ink">
                                More projects
                            </h2>

                            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {relatedProjects.map((item) => (
                                    <div
                                        key={item.id}
                                        className="overflow-hidden rounded-[var(--radius-base)] border border-line bg-surface"
                                    >
                                        {item.cover_url && (
                                            <img
                                                src={item.cover_url}
                                                alt={item.title}
                                                className="w-full object-cover"
                                            />
                                        )}

                                        <div className="p-5">
                                            <h3 className="font-semibold text-ink">
                                                {item.title}
                                            </h3>

                                            <p className="mt-2 text-sm leading-relaxed text-muted">
                                                {item.summary}
                                            </p>

                                            <Link
                                                href={`/projects/${item.slug}`}
                                                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                                            >
                                                View project →
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </article>
        </PublicPanel>
    );
}
