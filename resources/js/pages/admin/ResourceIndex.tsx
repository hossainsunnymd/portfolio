import { Head, Link, router } from "@inertiajs/react";
import AdminPanel from "@/pages/layout/AdminPanel";

type Field = {
    name: string;
    label: string;
    type: string;
};

type PageLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type RecordRow = Record<string, unknown> & { id: number };

type Paginator = {
    data: RecordRow[];
    links: PageLink[];
};

const contactFields: Field[] = [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "subject", label: "Subject", type: "text" },
    { name: "status", label: "Status", type: "text" },
];

function display(value: unknown): string {
    if (value === null || value === undefined || value === "") return "—";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (Array.isArray(value) || typeof value === "object") {
        return JSON.stringify(value);
    }

    return String(value);
}

export default function ResourceIndex({
    resource,
    title,
    fields,
    records,
    canCreate,
}: {
    resource: string;
    title: string;
    fields: Field[];
    records: Paginator;
    canCreate: boolean;
}) {
    const columns = resource === "contacts" ? contactFields : fields.slice(0, 5);

    function removeRecord(id: number) {
        if (window.confirm("Delete this record? This cannot be undone.")) {
            router.delete(`/admin/${resource}/${id}`, {
                preserveScroll: true,
            });
        }
    }

    return (
        <AdminPanel
            title={title}
            description={`Manage ${title.toLowerCase()} stored in the database.`}
            actions={
                canCreate ? (
                    <Link
                        href={`/admin/${resource}/create`}
                        className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
                    >
                        Add {title.replace(/s$/, "")}
                    </Link>
                ) : null
            }
        >
            <Head title={title} />

            <div className="overflow-x-auto rounded-xl border border-line bg-surface">
                <table className="w-full min-w-[700px] text-left text-sm">
                    <thead className="border-b border-line bg-elevated text-xs uppercase tracking-wide text-subtle">
                        <tr>
                            {columns.map((field) => (
                                <th key={field.name} className="px-4 py-3 font-semibold">
                                    {field.label}
                                </th>
                            ))}
                            <th className="px-4 py-3 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                        {records.data.map((record) => (
                            <tr key={record.id}>
                                {columns.map((field) => (
                                    <td
                                        key={field.name}
                                        className="max-w-72 truncate px-4 py-3 text-muted"
                                        title={display(record[field.name])}
                                    >
                                        {display(record[field.name])}
                                    </td>
                                ))}
                                <td className="whitespace-nowrap px-4 py-3">
                                    <Link
                                        href={`/admin/${resource}/${record.id}/edit`}
                                        className="font-medium text-accent hover:underline"
                                    >
                                        {resource === "contacts" ? "Open" : "Edit"}
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => removeRecord(record.id)}
                                        className="ml-4 text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {records.data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length + 1}
                                    className="px-4 py-12 text-center text-muted"
                                >
                                    No records yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {records.links.length > 3 && (
                <nav
                    aria-label="Pagination"
                    className="mt-5 flex flex-wrap justify-center gap-2"
                >
                    {records.links.map((link, index) => (
                        <Link
                            key={`${link.label}-${index}`}
                            href={link.url ?? "#"}
                            preserveScroll
                            aria-disabled={!link.url}
                            className={`rounded-md border px-3 py-2 text-sm ${
                                link.active
                                    ? "border-ink bg-ink text-bg"
                                    : "border-line text-muted hover:bg-elevated"
                            } ${!link.url ? "pointer-events-none opacity-50" : ""}`}
                        >
                            {link.label
                                .replace("&laquo;", "←")
                                .replace("&raquo;", "→")}
                        </Link>
                    ))}
                </nav>
            )}
        </AdminPanel>
    );
}
