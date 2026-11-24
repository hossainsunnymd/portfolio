import PublicPanel from "../layout/PublicPanel";
import PageHero  from '@/pages/components/public/PageHero';
export default function Contact() {
    return (
        <PublicPanel>
            <PageHero/>

            {/* Contact Section */}
            <section className="section-y">
                <div className="container-page">

                    <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">

                        {/* Contact Form */}
                        <form
                            action="/contact"
                            method="POST"
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
                                        autoComplete="name"
                                        placeholder="Jane Cooper"
                                        className="w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                                    />
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
                                        autoComplete="email"
                                        placeholder="jane@company.com"
                                        className="w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                                    />
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
                                        autoComplete="tel"
                                        placeholder="Optional"
                                        className="w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                                    />
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
                                        autoComplete="organization"
                                        placeholder="Optional"
                                        className="w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                                    />
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
                                    placeholder="What is this about?"
                                    className="w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                                />
                            </div>

                            {/* Package & Budget */}
                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>
                                    <label
                                        htmlFor="package_id"
                                        className="mb-2 block text-sm font-medium text-ink"
                                    >
                                        Package
                                    </label>

                                    <p className="mb-2 text-xs text-subtle">
                                        Optional — pick one if you already know.
                                    </p>

                                    <select
                                        id="package_id"
                                        name="package_id"
                                        defaultValue=""
                                        className="w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                                    >
                                        <option value="">Not sure yet</option>
                                        <option value="1">Basic Package</option>
                                        <option value="2">Standard Package</option>
                                        <option value="3">Premium Package</option>
                                        <option value="4">Enterprise Package</option>
                                    </select>
                                </div>

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
                                        className="w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                                    >
                                        <option value="">Select a range</option>
                                        <option value="Under $500">Under $500</option>
                                        <option value="$500 - $1000">$500 - $1000</option>
                                        <option value="$1000 - $3000">$1000 - $3000</option>
                                        <option value="$3000 - $5000">$3000 - $5000</option>
                                        <option value="$5000+">$5000+</option>
                                    </select>
                                </div>

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
                                    rows="6"
                                    required
                                    placeholder="Tell me about your project..."
                                    className="w-full resize-y rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                                ></textarea>
                            </div>

                            {/* Honeypot Field */}
                            <div
                                aria-hidden="true"
                                className="absolute left-[-9999px]"
                            >
                                <label htmlFor="website">
                                    Website
                                </label>

                                <input
                                    type="text"
                                    id="website"
                                    name="website"
                                    tabIndex="-1"
                                    autoComplete="off"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex flex-wrap items-center gap-4 pt-1">

                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                                >
                                    Send message
                                    <span aria-hidden="true">→</span>
                                </button>

                                <p className="text-xs text-subtle">
                                    I reply within one business day.
                                </p>

                            </div>

                        </form>


                        {/* Contact Sidebar */}
                        <aside className="space-y-6">

                            {/* Direct Contact */}
                            <div className="rounded-xl border border-line bg-surface p-6">

                                <h2 className="text-sm font-semibold text-ink">
                                    Direct contact
                                </h2>

                                <ul className="mt-4 space-y-3 text-sm">

                                    <li>
                                        <a
                                            href="mailto:hello@example.com"
                                            className="flex items-center gap-2.5 text-muted transition-colors hover:text-accent"
                                        >
                                            <span className="text-subtle">✉</span>
                                            hello@example.com
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="tel:+8801700000000"
                                            className="flex items-center gap-2.5 text-muted transition-colors hover:text-accent"
                                        >
                                            <span className="text-subtle">☎</span>
                                            +880 1700-000000
                                        </a>
                                    </li>

                                    <li className="flex items-center gap-2.5 text-muted">
                                        <span className="text-subtle">⌖</span>
                                        Dhaka, Bangladesh
                                    </li>

                                </ul>


                                {/* Social Links */}
                                <div className="mt-5 flex gap-2 border-t border-line pt-5">

                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Facebook"
                                        className="grid h-9 w-9 place-items-center rounded-lg text-sm font-semibold text-muted transition-colors hover:bg-elevated hover:text-accent"
                                    >
                                        f
                                    </a>

                                    <a
                                        href="https://linkedin.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn"
                                        className="grid h-9 w-9 place-items-center rounded-lg text-sm font-semibold text-muted transition-colors hover:bg-elevated hover:text-accent"
                                    >
                                        in
                                    </a>

                                    <a
                                        href="https://github.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="GitHub"
                                        className="grid h-9 w-9 place-items-center rounded-lg text-sm font-semibold text-muted transition-colors hover:bg-elevated hover:text-accent"
                                    >
                                        gh
                                    </a>

                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram"
                                        className="grid h-9 w-9 place-items-center rounded-lg text-sm font-semibold text-muted transition-colors hover:bg-elevated hover:text-accent"
                                    >
                                        ig
                                    </a>

                                </div>

                            </div>


                            {/* What Happens Next */}
                            <div className="rounded-xl border border-line bg-surface p-6">

                                <h2 className="text-sm font-semibold text-ink">
                                    What happens next
                                </h2>

                                <ol className="mt-4 space-y-3.5">

                                    <li className="flex gap-3 text-sm text-muted">
                                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent">
                                            1
                                        </span>

                                        <span className="leading-relaxed">
                                            I read your message and reply within one business day.
                                        </span>
                                    </li>

                                    <li className="flex gap-3 text-sm text-muted">
                                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent">
                                            2
                                        </span>

                                        <span className="leading-relaxed">
                                            We have a short call to nail down the scope.
                                        </span>
                                    </li>

                                    <li className="flex gap-3 text-sm text-muted">
                                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent">
                                            3
                                        </span>

                                        <span className="leading-relaxed">
                                            You get a written proposal with a fixed price and timeline.
                                        </span>
                                    </li>

                                </ol>

                            </div>

                        </aside>

                    </div>

                </div>
            </section>
        </PublicPanel>
    );
}
