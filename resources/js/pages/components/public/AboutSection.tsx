import React, { useEffect, useRef, useState } from "react";

const AboutSection = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = sectionRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -40px 0px",
            },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="section-y overflow-hidden border-t border-line"
        >
            <div className="container-page">
                <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
                    <div
                        className={`relative transition-all duration-700 ease-out ${
                            isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-0"
                        }`}
                    >
                        <div className="sticky top-24 overflow-hidden rounded-xl border border-line bg-elevated">
                            <img
                                src="https://shifkat.com/storage/site/shifkat-about.jpg"
                                alt="About our company"
                                loading="lazy"
                                decoding="async"
                                className="aspect-[3/4] w-full object-cover"
                            />
                        </div>
                    </div>

                    <div
                        className={`transition-all duration-700 delay-150 ease-out ${
                            isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-0"
                        }`}
                    >
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                            About Us
                        </p>

                        <h2 className="max-w-xl text-[clamp(1.6rem,3.2vw,2.2rem)] font-semibold leading-[1.15] text-ink">
                            Building Digital Experiences That Make a Difference
                        </h2>

                        <div className="prose-site prose prose-sm mt-6 max-w-none prose-p:leading-relaxed">
                            <p>
                                I am a passionate full-stack web developer
                                focused on building modern, scalable and
                                user-friendly web applications.
                            </p>

                            <p>
                                With experience in Laravel, Vue.js, PHP and
                                modern frontend technologies, I help businesses
                                transform their ideas into powerful digital
                                products.
                            </p>

                            <p>
                                My goal is to write clean, maintainable code and
                                deliver solutions that provide real value to
                                businesses and their customers.
                            </p>
                        </div>

                        <dl className="mt-8 grid gap-x-8 gap-y-5 border-t border-line pt-7 sm:grid-cols-2">
                            <div>
                                <dt className="text-xs font-medium uppercase tracking-wider text-subtle">
                                    Experience
                                </dt>

                                <dd className="mt-1 text-sm text-ink">
                                    10+ Years
                                </dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium uppercase tracking-wider text-subtle">
                                    Projects Completed
                                </dt>

                                <dd className="mt-1 text-sm text-ink">
                                    60+ Projects
                                </dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium uppercase tracking-wider text-subtle">
                                    Location
                                </dt>

                                <dd className="mt-1 text-sm text-ink">
                                    Dhaka, Bangladesh
                                </dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium uppercase tracking-wider text-subtle">
                                    Specialization
                                </dt>

                                <dd className="mt-1 text-sm text-ink">
                                    Full-stack Development
                                </dd>
                            </div>
                        </dl>

                        <a
                            href="/about"
                            className="mt-8 inline-flex items-center gap-2 rounded-lg border border-line px-5 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:bg-elevated"
                        >
                            Learn More
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
