import { useEffect, useRef, useState } from "react";
import PageHero from "@/pages/components/public/PageHero";
import PublicPanel from "@/pages/layout/PublicPanel";
import type {
    ProjectCategoryRecord,
    ProjectRecord,
    SectionRecord,
} from "@/types/portfolio";

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Props = {
    projects: {
        data: ProjectRecord[];
        links: PaginationLink[];
    };
    categories: ProjectCategoryRecord[];
    selectedCategory: string;
    search: string;
    section: SectionRecord | null;
};

export default function Index({
    projects,
    categories,
    selectedCategory,
    search,
    section,
}: Props) {
    const sectionRef = useRef<HTMLElement | null>(null);
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
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    const categoryHref = (category: string) => {
        const params = new URLSearchParams();
        if (category) params.set("category", category);
        if (search) params.set("q", search);
        const query = params.toString();
        return query ? `/projects?${query}` : "/projects";
    };

    return (
        <PublicPanel>
            <PageHero section={section ?? undefined} />
            <section
                ref={sectionRef}
                className="section-y overflow-hidden"
            >
                <div className="container-page">
                    <div
                        className={`flex flex-wrap items-center justify-between gap-4 transition-all duration-700 ease-out ${
                            isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-6 opacity-0"
                        }`}
                    >
                        <div className="hide-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1">
                            <a
                                href={categoryHref("")}
                                className={
                                    selectedCategory === ""
                                        ? "whitespace-nowrap rounded-full bg-ink px-3.5 py-1.5 text-sm font-medium text-bg transition-colors"
                                        : "whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-elevated hover:text-ink"
                                }
                            >
                                All
                            </a>
                            {categories.map((category) => (
                                <a
                                    key={category.id}
                                    href={categoryHref(category.slug)}
                                    className={
                                        category.slug === selectedCategory
                                            ? "whitespace-nowrap rounded-full bg-ink px-3.5 py-1.5 text-sm font-medium text-bg transition-colors"
                                            : "whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-elevated hover:text-ink"
                                    }
                                >
                                    {category.name}
                                </a>
                            ))}
                        </div>

                        <form
                            action="/projects"
                            method="get"
                            className="relative w-full sm:w-64"
                        >
                            {selectedCategory && (
                                <input
                                    type="hidden"
                                    name="category"
                                    value={selectedCategory}
                                />
                            )}
                            <label>
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
                                    name="q"
                                    defaultValue={search}
                                    placeholder="Search projects…"
                                    className="w-full rounded-[var(--radius-base)] border border-line-strong bg-surface py-2 pl-9 pr-3 text-sm text-ink placeholder:text-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                                />
                            </label>
                        </form>
                    </div>

                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.data.map((project, index) => (
                            <article
                                key={project.id}
                                style={{
                                    transitionDelay: `${150 + index * 110}ms`,
                                }}
                                className={`group overflow-hidden rounded-[var(--radius-base)] border border-line bg-surface transition-all duration-700 ease-out hover:border-line-strong hover:shadow-lg ${
                                    isVisible
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-8 opacity-0"
                                }`}
                            >
                                <a
                                    href={`/projects/show?slug=${encodeURIComponent(project.slug)}`}
                                    className="block"
                                >
                                    {project.cover_path ? (
                                        <img
                                            src={project.cover_path}
                                            alt={project.title}
                                            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                        />
                                    ) : (
                                        <div
                                            aria-hidden="true"
                                            className="h-56 w-full bg-elevated"
                                        />
                                    )}
                                    <div className="p-5">
                                        {project.category && (
                                            <span className="text-xs font-medium text-accent">
                                                {project.category.name}
                                            </span>
                                        )}
                                        <h2 className="mt-2 text-lg font-semibold text-ink">
                                            {project.title}
                                        </h2>
                                        {project.summary && (
                                            <p className="mt-2 text-sm leading-relaxed text-muted">
                                                {project.summary}
                                            </p>
                                        )}
                                    </div>
                                </a>
                            </article>
                        ))}
                    </div>

                    {projects.data.length === 0 && (
                        <p className="mt-10 text-center text-sm text-muted">
                            No projects match your search.
                        </p>
                    )}

                    {projects.links.length > 3 && (
                        <nav
                            aria-label="Project pagination"
                            className={`mt-10 flex flex-wrap items-center justify-center gap-2 transition-all duration-700 ease-out ${
                                isVisible
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-6 opacity-0"
                            }`}
                        >
                            {projects.links.map((link, index) => (
                                <a
                                    key={`${link.label}-${index}`}
                                    href={link.url ?? "#"}
                                    aria-current={link.active ? "page" : undefined}
                                    aria-disabled={!link.url}
                                    className={`rounded-md border px-3 py-2 text-sm ${
                                        link.active
                                            ? "border-ink bg-ink text-bg"
                                            : "border-line text-muted hover:bg-elevated"
                                    } ${!link.url ? "pointer-events-none opacity-50" : ""}`}
                                >
                                    {link.label
                                        .replace("&laquo;", "«")
                                        .replace("&raquo;", "»")}
                                </a>
                            ))}
                        </nav>
                    )}
                </div>
            </section>
        </PublicPanel>
    );
}
