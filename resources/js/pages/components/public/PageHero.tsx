export default function PricingHero({
  eyebrow = "WORKING TOGETHER",
  title = "Simple, predictable pricing",
  description = "Pick the engagement that matches your stage. Every option includes the admin panel and a handover walkthrough.",
}) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[#eef3f3] py-20 sm:py-12"
    >
      {/* Deeper top mint/teal radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(70%_115%_at_50%_-5%,rgba(116,207,196,0.78)_0%,rgba(164,225,217,0.48)_52%,rgba(238,243,243,0)_100%)]"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0f8a87]">
          {eyebrow}
        </p>

        <h1
          id="hero-heading"
          className="mt-3 text-4xl font-semibold tracking-[-0.025em] text-[#111315] sm:text-5xl"
        >
          {title}
        </h1>

        <p className="mx-auto mt-4 max-w-[46ch] text-base leading-relaxed text-[#6b7275] sm:text-[17px]">
          {description}
        </p>
      </div>
    </section>
  );
}
