import { Link } from "@inertiajs/react";
import PublicPanel from "@/pages/layout/PublicPanel";
import type { ProjectRecord } from "@/types/portfolio";

type Props = {
    project: ProjectRecord;
    relatedProjects: ProjectRecord[];
};

export default function Show({ project, relatedProjects }: Props) {
    const bodyParagraphs = (project.body ?? "")
        .split(/\n{2,}/)
        .filter(Boolean);

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
                                        {project.category.name}
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
                                {project.completed_at && (
                                    <div>
                                        <dt className="text-xs font-medium uppercase tracking-wider text-subtle">
                                            Delivered
                                        </dt>
                                        <dd className="mt-1 text-sm text-ink">
                                            {project.completed_at}
                                        </dd>
                                    </div>
                                )}
                                {(project.tech ?? []).length > 0 && (
                                    <div className="col-span-2 lg:col-span-1">
                                        <dt className="text-xs font-medium uppercase tracking-wider text-subtle">
                                            Built with
                                        </dt>
                                        <dd className="mt-2 flex flex-wrap gap-1.5">
                                            {(project.tech ?? []).map((item) => (
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

                {project.cover_path && (
                    <div className="container-page -mt-px">
                        <img
                            src={project.cover_path}
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
                            <div className="prose-site prose max-w-none prose-p:leading-relaxed">
                                {bodyParagraphs.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {(project.highlights ?? []).length > 0 && (
                            <aside className="lg:sticky lg:top-24 lg:self-start">
                                <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-subtle">
                                    Highlights
                                </h2>
                                <ul className="mt-4 space-y-3">
                                    {(project.highlights ?? []).map((item) => (
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

                    {(project.gallery ?? []).length > 0 && (
                        <div className="mt-14 grid gap-5 sm:grid-cols-2">
                            {(project.gallery ?? []).map((image, index) => (
                                <img
                                    key={`${image}-${index}`}
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
                                        {item.cover_path && (
                                            <img
                                                src={item.cover_path}
                                                alt={item.title}
                                                className="w-full object-cover"
                                            />
                                        )}
                                        <div className="p-5">
                                            <h3 className="font-semibold text-ink">
                                                {item.title}
                                            </h3>
                                            {item.summary && (
                                                <p className="mt-2 text-sm leading-relaxed text-muted">
                                                    {item.summary}
                                                </p>
                                            )}
                                            <Link
                                                href={`/projects/show?slug=${encodeURIComponent(item.slug)}`}
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
