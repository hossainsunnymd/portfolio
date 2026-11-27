import { useForm, usePage } from "@inertiajs/react";
import type { FormEvent } from "react";
import PublicPanel from "../layout/PublicPanel";
import PageHero from "@/pages/components/public/PageHero";
import type { SectionRecord } from "@/types/portfolio";

type ContactLink = { label: string; url: string };

function getLinks(value: unknown): ContactLink[] {
    if (!Array.isArray(value)) return [];

    return value.filter(
        (link): link is ContactLink =>
            typeof link === "object" &&
            link !== null &&
            "label" in link &&
            typeof link.label === "string" &&
            "url" in link &&
            typeof link.url === "string" &&
            link.url.startsWith("https://"),
    );
}

export default function Contact({
    section,
}: {
    section: SectionRecord | null;
}) {
    const form = useForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        budget: "",
    });
    const { flash } = usePage().props;
    const config = section?.config ?? {};
    const contactDetails = [
        {
            label: "Email",
            value: config.email,
            href:
                typeof config.email === "string"
                    ? `mailto:${config.email}`
                    : null,
        },
        {
            label: "Phone",
            value: config.phone,
            href:
                typeof config.phone === "string"
                    ? `tel:${config.phone}`
                    : null,
        },
        { label: "Location", value: config.location, href: null },
    ].filter(
        (detail): detail is { label: string; value: string; href: string | null } =>
            typeof detail.value === "string" && detail.value.length > 0,
    );
    const socialLinks = getLinks(config.social_links);
    const steps = Array.isArray(config.process_steps)
        ? config.process_steps.filter(
              (step): step is string => typeof step === "string",
          )
        : [];

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.post("/contact", {
            onSuccess: () => form.reset(),
        });
    }

    return (
        <PublicPanel>
            <PageHero section={section ?? undefined} />

            {/* Contact Section */}
            <section className="section-y">
                <div className="container-page">

                    <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">

                        {/* Contact Form */}
                        <form
                            onSubmit={submit}
                            className="space-y-5"
                        >
                            {/* Name & Email */}
                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-medium text-ink"
                                    >
                                        Your name <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        maxLength={255}
                                        value={form.data.name}
                                        onChange={(event) => form.setData("name", event.target.value)}
                                        autoComplete="name"
                                        placeholder="Jane Cooper"
                                        className="w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                                    />
                                    {form.errors.name && <p className="mt-2 text-sm text-red-600">{form.errors.name}</p>}
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium text-ink"
                                    >
                                        Email <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        maxLength={255}
                                        value={form.data.email}
                                        onChange={(event) => form.setData("email", event.target.value)}
                                        autoComplete="email"
                                        placeholder="jane@company.com"
                                        className="w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                                    />
                                    {form.errors.email && <p className="mt-2 text-sm text-red-600">{form.errors.email}</p>}
                                </div>

                            </div>

                            {/* Phone & Company */}
                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="mb-2 block text-sm font-medium text-ink"
                                    >
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        maxLength={255}
                                        value={form.data.phone}
                                        onChange={(event) => form.setData("phone", event.target.value)}
                                        autoComplete="tel"
                                        placeholder="Optional"
                                        className="w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                                    />
                                    {form.errors.phone && <p className="mt-2 text-sm text-red-600">{form.errors.phone}</p>}
                                </div>

                                <div>
                                    <label
                                        htmlFor="company"
                                        className="mb-2 block text-sm font-medium text-ink"
                                    >
                                        Company
                                    </label>

                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        maxLength={255}
                                        value={form.data.company}
                                        onChange={(event) => form.setData("company", event.target.value)}
                                        autoComplete="organization"
                                        placeholder="Optional"
                                        className="w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                                    />
                                    {form.errors.company && <p className="mt-2 text-sm text-red-600">{form.errors.company}</p>}
                                </div>

                            </div>

                            {/* Subject */}
                            <div>
                                <label
                                    htmlFor="subject"
                                    className="mb-2 block text-sm font-medium text-ink"
                                >
                                    Subject
                                </label>

                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    maxLength={255}
                                    value={form.data.subject}
                                    onChange={(event) => form.setData("subject", event.target.value)}
                                    placeholder="What is this about?"
                                    className="w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                                />
                                {form.errors.subject && <p className="mt-2 text-sm text-red-600">{form.errors.subject}</p>}
                            </div>

                            {/* Budget */}
                            <div>
                                <label
                                    htmlFor="budget"
                                    className="mb-2 block text-sm font-medium text-ink"
                                >
                                    Budget
                                </label>

                                <select
                                    id="budget"
                                    name="budget"
                                    defaultValue=""
                                    value={form.data.budget}
                                    onChange={(event) => form.setData("budget", event.target.value)}
                                    className="w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                                >
                                    <option value="">Select a range</option>
                                    <option value="Under $500">Under $500</option>
                                    <option value="$500 - $1000">$500 - $1000</option>
                                    <option value="$1000 - $3000">$1000 - $3000</option>
                                    <option value="$3000 - $5000">$3000 - $5000</option>
                                    <option value="$5000+">$5000+</option>
                                </select>
                                {form.errors.budget && <p className="mt-2 text-sm text-red-600">{form.errors.budget}</p>}
                            </div>

                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-sm font-medium text-ink"
                                >
                                    Message <span className="text-red-500">*</span>
                                </label>

                                <p className="mb-2 text-xs text-subtle">
                                    What are you building, and what does success look like?
                                </p>

                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    maxLength={10000}
                                    required
                                    value={form.data.message}
                                    onChange={(event) => form.setData("message", event.target.value)}
                                    placeholder="Tell me about your project..."
                                    className="w-full resize-y rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                                ></textarea>
                                {form.errors.message && <p className="mt-2 text-sm text-red-600">{form.errors.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <div className="flex flex-wrap items-center gap-4 pt-1">

                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
                                >
                                    {form.processing ? "Sending..." : "Send message"}
                                    <span aria-hidden="true">→</span>
                                </button>

                                <p className="text-xs text-subtle">
                                    I reply within one business day.
                                </p>

                            </div>
                            {flash.success && (
                                <p role="status" className="text-sm text-emerald-700">
                                    {flash.success}
                                </p>
                            )}

                        </form>


                        {/* Contact Sidebar */}
                        <aside className="space-y-6">

                            {contactDetails.length > 0 && (
                            <div className="rounded-xl border border-line bg-surface p-6">

                                <h2 className="text-sm font-semibold text-ink">
                                    Direct contact
                                </h2>

                                <ul className="mt-4 space-y-3 text-sm">

                                    {contactDetails.map((detail) => (
                                        <li key={detail.label}>
                                            {detail.href ? (
                                                <a
                                                    href={detail.href}
                                                    className="flex items-center gap-2.5 text-muted transition-colors hover:text-accent"
                                                >
                                                    <span className="text-subtle">
                                                        {detail.label}
                                                    </span>
                                                    {detail.value}
                                                </a>
                                            ) : (
                                                <span className="flex items-center gap-2.5 text-muted">
                                                    <span className="text-subtle">
                                                        {detail.label}
                                                    </span>
                                                    {detail.value}
                                                </span>
                                            )}
                                        </li>
                                    ))}

                                </ul>


                                {/* Social Links */}
                                {socialLinks.length > 0 && (
                                    <div className="mt-5 flex gap-2 border-t border-line pt-5">
                                        {socialLinks.map((link) => (
                                            <a
                                                key={link.label}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="grid h-9 place-items-center rounded-lg px-3 text-sm font-semibold text-muted transition-colors hover:bg-elevated hover:text-accent"
                                            >
                                                {link.label}
                                            </a>
                                        ))}
                                    </div>
                                )}

                            </div>
                            )}


                            {/* What Happens Next */}
                            {steps.length > 0 && (
                            <div className="rounded-xl border border-line bg-surface p-6">

                                <h2 className="text-sm font-semibold text-ink">
                                    What happens next
                                </h2>

                                <ol className="mt-4 space-y-3.5">
                                    {steps.map((step, index) => (
                                        <li
                                            key={`${step}-${index}`}
                                            className="flex gap-3 text-sm text-muted"
                                        >
                                            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent">
                                                {index + 1}
                                            </span>
                                            <span className="leading-relaxed">
                                                {step}
                                            </span>
                                        </li>
                                    ))}
                                </ol>

                            </div>
                            )}

                        </aside>

                    </div>

                </div>
            </section>
        </PublicPanel>
    );
}
