import { Head, Link, useForm } from "@inertiajs/react";
import type { FormEvent } from "react";

export default function Login() {
    const form = useForm({
        email: "",
        password: "",
        remember: false,
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.post("/login");
    }

    return (
        <>
            <Head title="Sign in" />
            <main className="grid min-h-screen place-items-center bg-bg px-4 py-12">
                <section className="w-full max-w-md rounded-xl border border-line bg-surface p-8">
                    <Link
                        href="/"
                        className="text-sm text-muted transition-colors hover:text-accent"
                    >
                        ← Back to site
                    </Link>

                    <h1 className="mt-8 text-2xl font-semibold text-ink">
                        Admin sign in
                    </h1>
                    <p className="mt-2 text-sm text-muted">
                        Sign in with the CMS account created from Artisan.
                    </p>

                    <form onSubmit={submit} className="mt-7 space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-ink"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="username"
                                required
                                value={form.data.email}
                                onChange={(event) =>
                                    form.setData("email", event.target.value)
                                }
                                className="w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none focus:border-accent"
                            />
                            {form.errors.email && (
                                <p className="mt-2 text-sm text-red-600">
                                    {form.errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-ink"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={form.data.password}
                                onChange={(event) =>
                                    form.setData("password", event.target.value)
                                }
                                className="w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none focus:border-accent"
                            />
                        </div>

                        <label className="flex items-center gap-2 text-sm text-muted">
                            <input
                                type="checkbox"
                                checked={form.data.remember}
                                onChange={(event) =>
                                    form.setData("remember", event.target.checked)
                                }
                            />
                            Remember me
                        </label>

                        {form.errors.password && (
                            <p className="text-sm text-red-600">
                                {form.errors.password}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={form.processing}
                            className="w-full rounded-lg bg-accent px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
                        >
                            {form.processing ? "Signing in..." : "Sign in"}
                        </button>
                    </form>
                </section>
            </main>
        </>
    );
}
