import React, { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    id: 1,
    category: "E-commerce",
    title: "E-commerce Website",
    href: "/projects/ecommerce-website",
    image: "/images/projects/ecommerce.jpg",
    description:
      "A modern online shopping platform with product management, cart and secure checkout.",
    tech: ["Laravel", "Vue.js", "MySQL"],
  },
  {
    id: 2,
    category: "Business Application",
    title: "POS Management System",
    href: "/projects/pos-system",
    image: "/images/projects/pos.jpg",
    description:
      "A complete point of sale solution for managing products, sales, inventory and invoices.",
    tech: ["Laravel", "Inertia.js", "Tailwind CSS"],
  },
  {
    id: 3,
    category: "Inventory Management",
    title: "Inventory Management System",
    href: "/projects/inventory-system",
    image: "/images/projects/inventory.jpg",
    description:
      "A powerful inventory solution for tracking stock, purchases, suppliers and product movements.",
    tech: ["PHP", "Laravel", "MySQL"],
  },
];

const ProjectSection = () => {
  const gridRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-y border-t border-line">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Our Work
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-ink">
              Featured Projects
            </h2>

            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
              Explore some of our recent projects and digital solutions we&apos;ve
              built for our clients.
            </p>
          </div>

          <a
            href="/projects"
            className="mb-1 inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-elevated"
          >
            All projects
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
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

        <div ref={gridRef} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <article
              key={project.id}
              style={{
                transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 28px, 0)",
                opacity: isVisible ? 1 : 0,
                transitionProperty: "transform, opacity, background-color",
                transitionDuration: "700ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: isVisible ? `${index * 110}ms` : "0ms",
              }}
              className="group overflow-hidden rounded-xl border border-line bg-surface hover:bg-elevated motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none"
            >
              <a href={project.href} className="block overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </a>

              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-accent">
                  {project.category}
                </p>

                <h3 className="mt-2 text-lg font-semibold text-ink">
                  <a href={project.href} className="hover:text-accent">
                    {project.title}
                  </a>
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-accent-soft px-3 py-1 text-xs text-accent"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <a
                  href={project.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
                >
                  View Project
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
                    <path d="M7 17 17 7"></path>
                    <path d="M7 7h10v10"></path>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
