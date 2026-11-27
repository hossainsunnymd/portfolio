
import type { ClientRecord, SectionRecord } from "@/types/portfolio";

const ClientSection = ({
    clients,
    section,
}: {
    clients: ClientRecord[];
    section: SectionRecord;
}) => {
    return (
        <section className="border-t border-line py-16">
            <div className="container-page">
                <div className="mb-9 text-center">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">
                        {section.name}
                    </p>

                    <h2 className="mt-2 text-[15px] text-ink sm:text-base">
                        {section.heading}
                    </h2>
                </div>

                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                    {clients
                        .filter((client) => client.enabled)
                        .sort((a, b) => a.position - b.position)
                        .map((client) => (
                            <li key={client.id}>
                                {client.url ? (
                                    <a
                                        href={client.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={client.name}
                                        className="flex aspect-3/2 items-center justify-center rounded-xl px-2 transition-colors duration-200 hover:bg-elevated"
                                    >
                                        {client.logo_path ? (
                                            <img
                                                src={client.logo_path}
                                                alt={client.name}
                                                className="max-h-12 max-w-full object-contain"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <span className="text-sm font-semibold text-muted">
                                                {client.name}
                                            </span>
                                        )}
                                    </a>
                                ) : (
                                    <div className="flex aspect-3/2 items-center justify-center rounded-xl px-2">
                                        {client.logo_path ? (
                                            <img
                                                src={client.logo_path}
                                                alt={client.name}
                                                className="max-h-12 max-w-full object-contain"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <span className="text-sm font-semibold text-muted">
                                                {client.name}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                </ul>
            </div>
        </section>
    );
};

export default ClientSection;
