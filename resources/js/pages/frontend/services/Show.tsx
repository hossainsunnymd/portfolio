
import React from "react";
import { Link } from "@inertiajs/react";
import PublicPanel from "@/pages/layout/PublicPanel";
import ServiceIcon from "@/pages/components/public/ServiceIcon";
import type { ServiceRecord } from "@/types/portfolio";

type Props = {
    service: ServiceRecord;
    others: ServiceRecord[];
};

export default function Show({ service, others }: Props) {
    const bodyParagraphs = (service.body ?? "")
        .split(/\n{2,}/)
        .filter(Boolean);
    const features = service.features ?? [];

    return (
        <PublicPanel>
            <article>
                <header className="border-b border-line bg-surface/50">
                    <div className="container-page py-12 sm:py-16">
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m12 19-7-7 7-7" />
                                <path d="M19 12H5" />
                            </svg>

                            All services
                        </Link>

                        <span className="mt-7 grid h-12 w-12 place-items-center rounded-[calc(var(--radius-base)*0.9)] bg-accent-soft text-accent">
                            <ServiceIcon name={service.icon} />
                        </span>

                        <h1 className="mt-5 max-w-3xl text-[clamp(1.9rem,4.2vw,2.9rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
                            {service.title}
                        </h1>

                        {service.summary && (
                            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted">
                                {service.summary}
                            </p>
                        )}

                    </div>
                </header>

                <div className="container-page section-y">
                    <div className="grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
                        <div>
                            {bodyParagraphs.length > 0 && (
                                <div className="prose-site prose max-w-none prose-p:leading-relaxed">
                                    {bodyParagraphs.map((paragraph) => (
                                        <p key={paragraph}>{paragraph}</p>
                                    ))}
                                </div>
                            )}

                            {features.length > 0 && (
                                <div className="mt-10">
                                    <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-subtle">
                                        What's included
                                    </h2>

                                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                                        {features.map((feature, index) => (
                                            <li
                                                key={index}
                                                className="flex gap-2.5 rounded-[var(--radius-base)] border border-line bg-surface p-4 text-sm text-muted"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="15"
                                                    height="15"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="mt-0.5 shrink-0 text-accent"
                                                >
                                                    <path d="m5 12 4 4L19 6" />
                                                </svg>

                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                            <div className="rounded-[var(--radius-base)] border border-line bg-surface p-6">
                                <h2 className="text-sm font-semibold text-ink">
                                    Interested?
                                </h2>

                                <p className="mt-2 text-sm leading-relaxed text-muted">
                                    Send me the details and I will come back
                                    with a scope and a fixed quote.
                                </p>

                                <Link
                                    href="/contact"
                                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                                >
                                    Get in touch

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
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>

                            {others.length > 0 && (
                                <div>
                                    <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-subtle">
                                        Other services
                                    </h2>

                                    <ul className="mt-4 space-y-1">
                                        {others.map((item) => (
                                            <li key={item.slug}>
                                                <Link
                                                    href={`/services/show?slug=${item.slug}`}
                                                    className="flex items-center gap-2.5 rounded-[var(--radius-base)] px-3 py-2.5 text-sm text-muted transition-colors hover:bg-elevated hover:text-ink"
                                                >
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
                                                        className="text-subtle"
                                                    >
                                                        <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
                                                    </svg>

                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </article>
        </PublicPanel>
    );
}
