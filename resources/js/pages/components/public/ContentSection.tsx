import React, { useEffect, useState } from "react";

const TECH_STACK = [
  { name: "Laravel", dotColor: "text-red-500", icon: "▲" },
  { name: "Vue 3", dotColor: "text-emerald-500", icon: "💚" },
  { name: "Inertia.js", dotColor: "text-purple-500", icon: "⚙️" },
  { name: "Tailwind CSS", dotColor: "text-sky-500", icon: "✨" },
  { name: "MySQL", dotColor: "text-blue-500", icon: "🐬" },
  { name: "PHP", dotColor: "text-indigo-500", icon: "🐘" },
  { name: "WordPress", dotColor: "text-blue-500", icon: "📝" },
  { name: "REST APIs", dotColor: "text-sky-500", icon: "🔌" },
  { name: "Vite", dotColor: "text-indigo-500", icon: "⚡" },
  { name: "Git", dotColor: "text-red-500", icon: "🌿" },
];

const STATS = [
  { value: "10+", label: "Years building for the web" },
  { value: "60+", label: "Projects delivered" },
  { value: "4", label: "Continents worked with" },
];

const ContentSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  
  const getRiseStyle = (delayMs = 0) => ({
    transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 26px, 0)",
    opacity: isVisible ? 1 : 0,
    transitionProperty: "transform, opacity",
    transitionDuration: "700ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: isVisible ? `${delayMs}ms` : "0ms",
  });

  return (
    <section className="min-h-[400px] bg-[#fafafa] px-6 py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left Column */}
        <div>
          <div
            style={getRiseStyle(0)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            Full-stack developer · Dhaka, Bangladesh
          </div>

          <h1
            style={getRiseStyle(90)}
            className="text-4xl font-bold tracking-tight text-gray-950 md:text-5xl motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none"
          >
            Hi, I&apos;m Shifkat
          </h1>

          <p
            style={getRiseStyle(180)}
            className="mt-6 max-w-xl text-base leading-[1.7] text-gray-600 motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none"
          >
            Full-stack developer in Narayanganj with 10+ years experience across
            Laravel, Vue.js and WordPress. I build web applications that are
            fast, maintainable and genuinely easy to run. I take projects from
            first sketch to a deployed product you can manage yourself.
          </p>

          <div
            style={getRiseStyle(260)}
            className="mt-8 flex max-w-xl flex-wrap gap-2 motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none"
          >
            {TECH_STACK.map((tech) => (
              <span
                key={tech.name}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs"
              >
                <span className={tech.dotColor}>●</span>
                <span>{tech.icon}</span>
                {tech.name}
              </span>
            ))}
          </div>

          <div
            style={getRiseStyle(340)}
            className="mt-9 flex flex-wrap items-center gap-3 motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none"
          >
            <a
              href="/contact"
              className="inline-flex items-center gap-3 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-teal-700"
            >
              Start a project
              <span aria-hidden="true">→</span>
            </a>

            <a
              href="/files/cv.pdf"
              download
              className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-medium text-gray-900 transition hover:bg-gray-100"
            >
              Download CV
            </a>
          </div>

          <div
            style={getRiseStyle(420)}
            className="mt-11 grid grid-cols-3 divide-x divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="px-4 py-4">
                <h3 className="text-2xl font-semibold text-teal-600">
                  {stat.value}
                </h3>
                <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Portrait Image) */}
        <div
          style={getRiseStyle(220)}
          className="mx-auto w-full max-w-[500px] rounded-[22px] bg-[#e7f3f1] p-3 motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none"
        >
          <img
            src="https://shifkat.com/storage/site/shifkat-portrait.jpg"
            alt="Shifkat - Full-stack Developer"
            className="aspect-[4/5] w-full rounded-2xl object-cover"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
