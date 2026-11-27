import { Link, usePage } from "@inertiajs/react";

const links = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
    const { name } = usePage().props;

    return (
        <footer className="mt-auto border-t border-line bg-surface">
            <div className="container-page py-10">
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                    <Link
                        href="/"
                        className="text-[15px] font-semibold tracking-tight text-ink"
                    >
                        {name}
                    </Link>

                    <nav
                        aria-label="Footer navigation"
                        className="flex flex-wrap gap-x-5 gap-y-2"
                    >
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-muted transition-colors hover:text-accent"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <p className="mt-6 border-t border-line pt-5 text-xs text-subtle">
                    © {new Date().getFullYear()} {name}
                </p>
            </div>
        </footer>
    );
}
