import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, usePage } from "@inertiajs/react";

const SiteHeader = () => {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const { url } = usePage();
    const { name } = usePage().props;

    const links = [
        { label: "Home", url: "/" },
        { label: "Work", url: "/projects" },
        { label: "Services", url: "/services" },
        { label: "About", url: "/about" },
        { label: "Contact", url: "/contact" },
    ];


    const buttons = [
        { label: "Let's Talk", url: "/contact" },
    ];

    const isActive = (path: string) => {
        const currentPath = url.split("?")[0];

        if (path === "/") {
            return currentPath === "/";
        }

        return currentPath === path || currentPath.startsWith(path + "/");
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const savedTheme = window.localStorage.getItem("theme");
        const prefersDark =
            savedTheme === "dark" ||
            (savedTheme === null &&
                document.documentElement.classList.contains("dark"));

        document.documentElement.classList.toggle("dark", prefersDark);
        setIsDark(prefersDark);
    }, []);

    const toggleTheme = () => {
        const nextIsDark = !isDark;
        document.documentElement.classList.toggle("dark", nextIsDark);
        window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");
        setIsDark(nextIsDark);
    };

    // Close menu when pressing Escape
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    return (
        <header className="sticky top-0 z-50 border-b border-line/80 bg-bg/80 backdrop-blur-md">
            <div className="container-page">
                <div className="flex h-16 items-center justify-between gap-6">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex shrink-0 items-center gap-2.5"
                        aria-label="Home"
                    >
                        <span className="text-base font-semibold tracking-tight text-ink">
                            {name}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav
                        className="hidden items-center gap-1 lg:flex"
                        aria-label="Main navigation"
                    >
                        {links.map((item) => (
                            <Link
                                key={item.url}
                                href={item.url}
                                aria-current={
                                    isActive(item.url) ? "page" : undefined
                                }
                                className={`rounded-[var(--radius-base)] px-3 py-2 text-sm font-medium transition-colors ${
                                    isActive(item.url)
                                        ? "text-accent"
                                        : "text-ink hover:text-accent"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                            aria-pressed={isDark}
                            title={`Switch to ${isDark ? "light" : "dark"} mode`}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-base)] text-ink transition-colors hover:bg-elevated"
                        >
                            {isDark ? (
                                <svg
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="4" />
                                    <path d="M12 2v2" />
                                    <path d="M12 20v2" />
                                    <path d="m4.93 4.93 1.41 1.41" />
                                    <path d="m17.66 17.66 1.41 1.41" />
                                    <path d="M2 12h2" />
                                    <path d="M20 12h2" />
                                    <path d="m6.34 17.66-1.41 1.41" />
                                    <path d="m19.07 4.93-1.41 1.41" />
                                </svg>
                            ) : (
                                <svg
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6.5 6.5 0 0 0 8.268 8.268c.344-.215.825-.003.803.401" />
                                </svg>
                            )}
                        </button>

                        {/* Desktop CTA */}
                        <div className="hidden sm:block">
                            {buttons.map((item) => (
                                <Link
                                    key={item.url}
                                    href={item.url}
                                    className="inline-flex items-center justify-center rounded-[var(--radius-base)] bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            aria-label="Open menu"
                            aria-expanded={open}
                            aria-controls="mobile-nav"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-base)] text-ink transition-colors hover:bg-elevated lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="4" y1="6" x2="20" y2="6" />
                                <line x1="4" y1="12" x2="20" y2="12" />
                                <line x1="4" y1="18" x2="20" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Portal */}
            {mounted &&
                createPortal(
                    <>
                        {/* Overlay */}
                        <div
                            aria-hidden="true"
                            onClick={() => setOpen(false)}
                            className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-200 lg:hidden ${
                                open
                                    ? "opacity-100"
                                    : "pointer-events-none opacity-0"
                            }`}
                        />

                        {/* Mobile Sidebar */}
                        <div
                            id="mobile-nav"
                            role="dialog"
                            aria-modal={open ? "true" : undefined}
                            aria-hidden={!open}
                            aria-label="Site menu"
                            className={`fixed inset-y-0 left-0 z-[61] flex w-[86%] max-w-sm flex-col overflow-y-auto bg-bg shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
                                open
                                    ? "translate-x-0"
                                    : "-translate-x-full pointer-events-none"
                            }`}
                        >
                            {/* Sidebar Header */}
                            <div className="flex items-start justify-between gap-4 p-5">
                                <Link
                                    href="/"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="text-base font-semibold tracking-tight text-ink">
                                        {name}
                                    </span>
                                </Link>

                                {/* Close Button */}
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    aria-label="Close menu"
                                    className="-mr-1 -mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-base)] text-muted transition-colors hover:bg-elevated hover:text-ink"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>

                            {/* Mobile Links */}
                            <nav
                                aria-label="Mobile navigation"
                                className="flex flex-col px-3 pb-4"
                            >
                                {links.map((item) => (
                                    <Link
                                        key={item.url}
                                        href={item.url}
                                        aria-current={
                                            isActive(item.url)
                                                ? "page"
                                                : undefined
                                        }
                                        onClick={() => setOpen(false)}
                                        className={`rounded-[var(--radius-base)] px-3 py-3 text-[15px] font-medium transition-colors ${
                                            isActive(item.url)
                                                ? "text-accent"
                                                : "text-ink hover:bg-elevated"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Bottom CTA */}
                            {buttons.length > 0 && (
                                <div className="mt-auto border-t border-line p-5">
                                    {buttons.map((item) => (
                                        <Link
                                            key={item.url}
                                            href={item.url}
                                            onClick={() => setOpen(false)}
                                            className="flex w-full items-center justify-center rounded-[var(--radius-base)] bg-accent px-4 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}

                                </div>
                            )}
                        </div>
                    </>,
                    document.body
                )}
        </header>
    );
};

export default SiteHeader;
