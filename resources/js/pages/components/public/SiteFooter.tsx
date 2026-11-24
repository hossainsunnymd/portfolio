import {Link} from "@inertiajs/react";

const SiteFooter = () => {
    return (
        <footer className="mt-auto border-t border-line bg-surface">
        <div className="container-page py-14">
            <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <div>
                    <Link href="/" className="text-[15px] font-semibold tracking-tight text-ink">
                         site.name
                    </Link>
                    <p  className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                         site.tagline
                    </p>

                    <div  className="mt-5 flex items-center gap-1">
                        <a href="#">
                            SocialIcon
                        </a>
                    </div>
                </div>

                <div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-subtle">site.footer_primary_title </h2>
                    <ul className="mt-4 space-y-2.5">
                        <li>
                            <Link href=""  className="text-sm text-muted transition-colors hover:text-accent">
                                 item.label
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-subtle"> site.footer_secondary_title </h2>
                    <ul className="mt-4 space-y-2.5">
                        <li>
                            <a

                                href=""
                                className="text-sm text-muted transition-colors hover:text-accent"
                            >item.label</a>
                            <Link  href="#"  className="text-sm text-muted transition-colors hover:text-accent">
                                 item.label
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-subtle">site.footer_contact_title </h2>
                    <ul className="mt-4 space-y-2.5 text-sm text-muted">
                        <li>
                            <a href="" className="inline-flex items-center gap-2 transition-colors hover:text-accent">
                                Icon site.email
                            </a>
                        </li>
                        <li>
                            <a href="" className="inline-flex items-center gap-2 transition-colors hover:text-accent">
                                Icon site.phone
                            </a>
                        </li>
                        <li className="inline-flex items-center gap-2">
                            Icon  site.location
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
                <p className="text-xs text-subtle"> copyright </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <Link

                        href="#"
                        className="text-xs text-subtle transition-colors hover:text-accent"
                    >
                        item.label
                    </Link>
                    <p  className="text-xs text-subtle"> site.footer_note </p>
                </div>
            </div>
        </div>
    </footer>
    );
};

export default SiteFooter;
