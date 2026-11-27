import type {
    SectionRecord,
    TestimonialRecord,
} from "@/types/portfolio";

export default function TestimonialsSection({
    section,
    testimonials,
}: {
    section: SectionRecord;
    testimonials: TestimonialRecord[];
}) {
    if (testimonials.length === 0) return null;

    return (
        <section className="section-y border-t border-line">
            <div className="container-page">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    {typeof section.config?.eyebrow === "string"
                        ? section.config.eyebrow
                        : section.name}
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-ink">
                    {section.heading}
                </h2>
                {section.subheading && (
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
                        {section.subheading}
                    </p>
                )}

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                    {testimonials.map((testimonial) => {
                        const rating = Math.min(5, testimonial.rating);
                        const attribution = [
                            testimonial.role,
                            testimonial.company,
                            testimonial.location,
                        ]
                            .filter(Boolean)
                            .join(" · ");

                        return (
                            <figure
                                key={testimonial.id}
                                className="rounded-[var(--radius-base)] border border-line bg-surface p-6"
                            >
                                {rating > 0 && (
                                    <p
                                        aria-label={`Rated ${rating} out of 5`}
                                        className="mb-3 text-sm text-amber-500"
                                    >
                                        {"★".repeat(rating)}
                                    </p>
                                )}
                                <blockquote className="text-sm leading-relaxed text-muted">
                                    “{testimonial.quote}”
                                </blockquote>
                                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                                    {testimonial.avatar_path && (
                                        <img
                                            src={testimonial.avatar_path}
                                            alt=""
                                            loading="lazy"
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    )}
                                    <div>
                                        <p className="text-sm font-semibold text-ink">
                                            {testimonial.name}
                                        </p>
                                        {attribution && (
                                            <p className="mt-0.5 text-xs text-subtle">
                                                {attribution}
                                            </p>
                                        )}
                                    </div>
                                </figcaption>
                            </figure>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
