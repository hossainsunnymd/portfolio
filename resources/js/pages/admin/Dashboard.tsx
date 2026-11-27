import { Head, Link } from "@inertiajs/react";
import AdminPanel from "@/pages/layout/AdminPanel";

type DashboardStats = {
    projects: number;
    services: number;
    skills: number;
    experiences: number;
    clients: number;
    testimonials: number;
    newContacts: number;
};

type RecentContact = {
    id: number;
    name: string;
    email: string;
    subject: string | null;
    status: string;
    created_at: string;
};

const cards: { label: string; key: keyof DashboardStats; href: string }[] = [
    { label: "Projects", key: "projects", href: "/admin/projects" },
    { label: "Services", key: "services", href: "/admin/services" },
    { label: "Skills", key: "skills", href: "/admin/skills" },
    { label: "Experience", key: "experiences", href: "/admin/experiences" },
    { label: "Clients", key: "clients", href: "/admin/clients" },
    { label: "Testimonials", key: "testimonials", href: "/admin/testimonials" },
    { label: "New messages", key: "newContacts", href: "/admin/contacts" },
];

export default function Dashboard({
    stats,
    recentContacts,
}: {
    stats: DashboardStats;
    recentContacts: RecentContact[];
}) {
    return (
        <AdminPanel
            title="Dashboard"
            description="Manage portfolio content and incoming messages."
        >
            <Head title="Admin dashboard" />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => (
                    <Link
                        key={card.key}
                        href={card.href}
                        className="rounded-xl border border-line bg-surface p-5 transition-colors hover:bg-elevated"
                    >
                        <p className="text-sm text-muted">{card.label}</p>
                        <p className="mt-3 text-3xl font-semibold text-ink">
                            {stats[card.key]}
                        </p>
                    </Link>
                ))}
            </div>

            <section className="mt-8 rounded-xl border border-line bg-surface">
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                    <h2 className="font-semibold text-ink">Recent messages</h2>
                    <Link
                        href="/admin/contacts"
                        className="text-sm font-medium text-accent hover:underline"
                    >
                        View inbox
                    </Link>
                </div>

                {recentContacts.length ? (
                    <ul className="divide-y divide-line">
                        {recentContacts.map((contact) => (
                            <li
                                key={contact.id}
                                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
                            >
                                <div>
                                    <p className="text-sm font-medium text-ink">
                                        {contact.name}
                                    </p>
                                    <p className="mt-1 text-xs text-muted">
                                        {contact.subject || contact.email}
                                    </p>
                                </div>
                                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
                                    {contact.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="px-5 py-8 text-sm text-muted">
                        No contact messages yet.
                    </p>
                )}
            </section>
        </AdminPanel>
    );
}
