import { Head, Link, useForm } from "@inertiajs/react";
import type { FormEvent } from "react";
import AdminPanel from "@/pages/layout/AdminPanel";

type Field = {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    options?: string[];
};

type CategoryOption = {
    id: number;
    name: string;
};

type RecordData = Record<string, unknown> & { id: number };
type FormValue = string | number | boolean | null;
type FormValues = Record<string, FormValue>;
type ImageUploadValues = { image: File | null };

function initialValue(
    field: Field,
    record: RecordData | null,
): FormValue {
    const existing = record?.[field.name];
    if (existing !== undefined && existing !== null) {
        if (field.type === "json") {
            return JSON.stringify(existing, null, 2) ?? "";
        }
        if (
            typeof existing === "string" ||
            typeof existing === "number" ||
            typeof existing === "boolean"
        ) {
            return existing;
        }
        return String(existing);
    }

    if (field.type === "checkbox") {
        return field.name === "enabled";
    }
    if (field.type === "number") {
        return field.name === "level" ? 80 : field.name === "rating" ? 5 : 0;
    }
    if (field.name === "kind") return "work";
    if (field.name === "status") {
        return field.options?.includes("published") ? "published" : "new";
    }
    if (field.name === "icon") return "sparkles";

    return field.type === "json" ? "[]" : "";
}

function getSectionImage(record: RecordData | null): string | null {
    const config = record?.config;
    if (
        typeof config !== "object" ||
        config === null ||
        Array.isArray(config) ||
        !("image_path" in config)
    ) {
        return null;
    }

    return typeof config.image_path === "string"
        ? config.image_path
        : null;
}

export default function ResourceForm({
    resource,
    title,
    fields,
    record,
    action,
    categories,
}: {
    resource: string;
    title: string;
    fields: Field[];
    record: RecordData | null;
    action: string;
    categories: CategoryOption[];
}) {
    const form = useForm<FormValues>(
        Object.fromEntries(
            fields.map((field) => [field.name, initialValue(field, record)]),
        ),
    );
    const imageForm = useForm<ImageUploadValues>({ image: null });
    const sectionImage = getSectionImage(record);
    const canUploadSectionImage =
        resource === "sections" &&
        record !== null &&
        (record.key === "hero" || record.key === "about");

    function uploadSectionImage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!record) return;

        imageForm.post(`/admin/sections/${record.id}/image`, {
            onSuccess: () => imageForm.reset(),
        });
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const payload: Record<string, unknown> = { ...form.data };
        for (const field of fields) {
            if (field.type === "json") {
                const value = payload[field.name];
                if (typeof value === "string" && value.trim() !== "") {
                    try {
                        payload[field.name] = JSON.parse(value);
                    } catch {
                        form.setError(field.name, "Enter valid JSON.");
                        return;
                    }
                } else {
                    payload[field.name] = null;
                }
            }
            if (field.type === "category") {
                payload[field.name] = payload[field.name]
                    ? Number(payload[field.name])
                    : null;
            }
        }

        form.transform(() => payload);
        if (record) form.put(action);
        else form.post(action);
    }

    const contactDetails: [string, unknown][] = [
        ["Name", record?.name],
        ["Email", record?.email],
        ["Phone", record?.phone],
        ["Company", record?.company],
        ["Subject", record?.subject],
        ["Budget", record?.budget],
        ["Message", record?.message],
        ["Received", record?.created_at],
    ];

    return (
        <AdminPanel title={record ? `Edit ${title}` : `Create ${title}`}>
            <Head title={record ? `Edit ${title}` : `Create ${title}`} />

            {canUploadSectionImage && record && (
                <form
                    onSubmit={uploadSectionImage}
                    className="mb-6 max-w-4xl space-y-4 rounded-xl border border-line bg-surface p-6"
                >
                    <div>
                        <h2 className="text-sm font-semibold text-ink">
                            {record.key === "hero" ? "Home hero image" : "About image"}
                        </h2>
                        <p className="mt-1 text-sm text-muted">
                            Upload a JPG, PNG, or WebP image up to 5 MB.
                        </p>
                    </div>
                    {sectionImage && (
                        <img
                            src={sectionImage}
                            alt={`${record.name} section`}
                            className="max-h-64 max-w-full rounded-lg border border-line object-contain"
                        />
                    )}
                    <div>
                        <label
                            htmlFor="section-image"
                            className="mb-2 block text-sm font-medium text-ink"
                        >
                            Choose image
                        </label>
                        <input
                            id="section-image"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            required
                            onChange={(event) =>
                                imageForm.setData(
                                    "image",
                                    event.currentTarget.files?.[0] ?? null,
                                )
                            }
                            className="block w-full text-sm text-muted file:mr-4 file:rounded-md file:border-0 file:bg-elevated file:px-4 file:py-2 file:text-sm file:font-medium file:text-ink"
                        />
                        {imageForm.errors.image && (
                            <p className="mt-2 text-sm text-red-600">
                                {imageForm.errors.image}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={!imageForm.data.image || imageForm.processing}
                        className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
                    >
                        {imageForm.processing ? "Uploading..." : "Upload image"}
                    </button>
                </form>
            )}

            <form
                onSubmit={submit}
                className="max-w-4xl space-y-6 rounded-xl border border-line bg-surface p-6"
            >
                {resource === "contacts" && record && (
                    <section className="grid gap-5 border-b border-line pb-6 sm:grid-cols-2">
                        {contactDetails.map(([label, value]) => (
                            <div
                                key={label}
                                className={label === "Message" ? "sm:col-span-2" : ""}
                            >
                                <dt className="text-xs font-medium uppercase tracking-wide text-subtle">
                                    {label}
                                </dt>
                                <dd className="mt-1 whitespace-pre-wrap text-sm text-ink">
                                    {value === null || value === undefined
                                        ? "—"
                                        : String(value)}
                                </dd>
                            </div>
                        ))}
                    </section>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                    {fields.map((field) => (
                        <div
                            key={field.name}
                            className={
                                field.type === "textarea" ||
                                field.type === "json"
                                    ? "sm:col-span-2"
                                    : ""
                            }
                        >
                            {field.type === "checkbox" ? (
                                <label className="flex items-center gap-3 pt-2 text-sm font-medium text-ink">
                                    <input
                                        type="checkbox"
                                        checked={Boolean(form.data[field.name])}
                                        onChange={(event) =>
                                            form.setData(
                                                field.name,
                                                event.target.checked,
                                            )
                                        }
                                    />
                                    {field.label}
                                </label>
                            ) : (
                                <>
                                    <label
                                        htmlFor={field.name}
                                        className="mb-2 block text-sm font-medium text-ink"
                                    >
                                        {field.label}
                                        {field.required && (
                                            <span className="text-red-600"> *</span>
                                        )}
                                    </label>

                                    {field.type === "textarea" ||
                                    field.type === "json" ? (
                                        <textarea
                                            id={field.name}
                                            rows={field.type === "json" ? 6 : 4}
                                            required={field.required}
                                            value={String(
                                                form.data[field.name] ?? "",
                                            )}
                                            onChange={(event) =>
                                                form.setData(
                                                    field.name,
                                                    event.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none focus:border-accent"
                                        />
                                    ) : field.type === "select" ? (
                                        <select
                                            id={field.name}
                                            required={field.required}
                                            value={String(
                                                form.data[field.name] ?? "",
                                            )}
                                            onChange={(event) =>
                                                form.setData(
                                                    field.name,
                                                    event.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-line bg-bg px-4 py-3 text-sm text-ink outline-none focus:border-accent"
                                        >
                                            {field.options?.map((option) => (
                                                <option
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    ) : field.type === "category" ? (
                                        <select
                                            id={field.name}
                                            value={String(
                                                form.data[field.name] ?? "",
                                            )}
                                            onChange={(event) =>
                                                form.setData(
                                                    field.name,
                                                    event.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-line bg-bg px-4 py-3 text-sm text-ink outline-none focus:border-accent"
                                        >
                                            <option value="">Uncategorized</option>
                                            {categories.map((category) => (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            id={field.name}
                                            type={field.type}
                                            required={field.required}
                                            value={String(
                                                form.data[field.name] ?? "",
                                            )}
                                            onChange={(event) =>
                                                form.setData(
                                                    field.name,
                                                    field.type === "number"
                                                        ? Number(
                                                              event.target.value,
                                                          )
                                                        : event.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none focus:border-accent"
                                        />
                                    )}
                                </>
                            )}

                            {form.errors[field.name] && (
                                <p className="mt-2 text-sm text-red-600">
                                    {form.errors[field.name]}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-3 border-t border-line pt-5">
                    <button
                        type="submit"
                        disabled={form.processing}
                        className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
                    >
                        {form.processing ? "Saving..." : "Save"}
                    </button>
                    <Link
                        href={`/admin/${resource}`}
                        className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink hover:bg-elevated"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminPanel>
    );
}
