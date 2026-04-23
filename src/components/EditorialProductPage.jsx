import React from "react";
import { editorialProductExperience as story } from "../data/editorialProductExperience";
import { FooterSection, Header } from "./HomeSections";

function ProseBlock({ children, className = "" }) {
  return (
    <div
      className={`mx-auto max-w-[34rem] space-y-6 text-[0.9375rem] leading-[1.75] text-ink/68 md:text-base md:leading-8 ${className}`}
    >
      {children}
    </div>
  );
}

export default function EditorialProductPage() {
  React.useEffect(() => {
    document.title = story.meta.pageTitle;
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f1ea] text-ink">
      <Header solid />

      <main>
        {/* 1. Hero */}
        <section
          aria-labelledby="editorial-hero-heading"
          className="relative flex min-h-[min(92vh,52rem)] flex-col bg-[#ede6dc] pt-[calc(5.25rem+1px)] md:min-h-[min(90vh,56rem)]"
        >
          <div className="flex flex-1 flex-col items-center justify-center px-0 pb-10 pt-6 md:pb-14 md:pt-10">
            <div className="relative flex w-full max-w-4xl flex-1 items-center justify-center md:max-w-5xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,255,255,0.35),transparent_55%)]" aria-hidden />
              <img
                src={story.hero.image}
                alt={story.hero.imageAlt}
                className="relative z-[1] max-h-[min(58vh,28rem)] w-full object-contain object-center md:max-h-[min(62vh,32rem)]"
              />
            </div>
            <div className="relative z-[1] mx-auto mt-10 max-w-2xl text-center md:mt-14">
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-ink/40">
                {story.meta.productName}
              </p>
              <h1
                id="editorial-hero-heading"
                className="mt-5 font-display text-[2.35rem] leading-[1.02] tracking-[-0.02em] text-ink md:text-6xl md:leading-[0.98]"
              >
                {story.hero.headline}
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-ink/58 md:text-lg md:leading-8">
                {story.hero.subheadline}
              </p>
              <a
                href={story.hero.ctaHref}
                className="mt-10 inline-flex items-center gap-2 border-b border-ink/25 pb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/70 transition hover:border-ink/50 hover:text-ink"
              >
                {story.hero.ctaLabel}
                <span className="text-sm leading-none" aria-hidden>
                  ↓
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* 2. Introdução */}
        <section
          id={story.introduction.id}
          className="border-t border-black/[0.06] bg-[#f6f1ea] px-0 py-20 md:py-28 lg:py-32"
        >
          <div className="mx-auto w-full max-w-[1440px] shell-px">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-ink/42">
              {story.introduction.eyebrow}
            </p>
            <h2 className="mt-6 max-w-3xl font-display text-[2.1rem] leading-[1.02] tracking-[-0.02em] text-ink md:text-5xl md:leading-[0.98]">
              {story.introduction.title}
            </h2>
            <ProseBlock className="mt-12 md:mt-16">
              {story.introduction.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </ProseBlock>
          </div>
        </section>

        {/* 3. Experiência */}
        <section className="border-t border-black/[0.06] bg-[#f0e9e0] px-0 py-20 md:py-28 lg:py-32">
          <div className="mx-auto w-full max-w-[1440px] shell-px lg:grid lg:grid-cols-[minmax(0,0.38fr)_minmax(0,1fr)] lg:items-start lg:gap-20 xl:gap-28">
            <div className="lg:sticky lg:top-32">
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-ink/42">
                {story.experience.eyebrow}
              </p>
              <h2 className="mt-6 font-display text-[2rem] leading-[1.02] text-ink md:text-[2.65rem] md:leading-[0.98]">
                {story.experience.title}
              </h2>
            </div>
            <ProseBlock className="mt-12 lg:mt-0 lg:max-w-none lg:pr-8">
              {story.experience.body.map((p, i) => (
                <p
                  key={p}
                  className={
                    i === 0
                      ? "text-lg leading-8 text-ink/78 md:text-xl md:leading-9"
                      : ""
                  }
                >
                  {p}
                </p>
              ))}
            </ProseBlock>
          </div>
        </section>

        {/* 4. Benefícios */}
        <section className="border-t border-black/[0.06] bg-[#f6f1ea] px-0 py-20 md:py-28 lg:py-32">
          <div className="mx-auto w-full max-w-[1440px] shell-px">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-ink/42">
              {story.benefits.eyebrow}
            </p>
            <h2 className="mt-6 max-w-2xl font-display text-[2rem] leading-[1.02] text-ink md:text-5xl md:leading-[0.98]">
              {story.benefits.title}
            </h2>
            <ul className="mx-auto mt-14 max-w-2xl space-y-8 border-l border-black/[0.08] pl-8 md:mt-20 md:space-y-10 md:pl-10">
              {story.benefits.items.map((item) => (
                <li key={item} className="font-display text-lg leading-snug text-ink/88 md:text-xl md:leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Como funciona */}
        <section className="border-t border-black/[0.06] bg-[#1b1815] px-0 py-20 text-white md:py-28 lg:py-32">
          <div className="mx-auto w-full max-w-[1440px] shell-px lg:grid lg:grid-cols-2 lg:gap-20 xl:gap-24">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/45">
                {story.howItWorks.eyebrow}
              </p>
              <h2 className="mt-6 max-w-md font-display text-[2rem] leading-[1.02] text-white md:text-5xl md:leading-[0.98]">
                {story.howItWorks.title}
              </h2>
            </div>
            <div className="mt-12 space-y-6 text-[0.9375rem] leading-[1.75] text-white/72 md:mt-0 md:text-base md:leading-8">
              {story.howItWorks.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Como usar */}
        <section className="border-t border-black/[0.06] bg-[#f6f1ea] px-0 py-20 md:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-ink/42">
              {story.howToUse.eyebrow}
            </p>
            <h2 className="mt-6 font-display text-[2rem] leading-[1.02] text-ink md:text-5xl md:leading-[0.98]">
              {story.howToUse.title}
            </h2>
          </div>
          <ProseBlock className="mx-auto mt-14 text-center md:mt-20 [&>p]:text-balance">
            {story.howToUse.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </ProseBlock>
        </section>

        {/* 7. Resultados */}
        <section className="border-t border-black/[0.06] bg-[#ede6dc] px-0 py-20 md:py-28 lg:py-32">
          <div className="mx-auto w-full max-w-[1440px] shell-px">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-ink/42">
              {story.results.eyebrow}
            </p>
            <h2 className="mt-6 max-w-2xl font-display text-[2rem] leading-[1.02] text-ink md:text-5xl md:leading-[0.98]">
              {story.results.title}
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-ink/58 md:text-base md:leading-8">
              {story.results.intro}
            </p>

            <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
              {story.results.pairs.map((pair) => (
                <figure key={pair.caption} className="space-y-6">
                  <figcaption className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/40">
                    {pair.caption}
                  </figcaption>
                  <div className="grid gap-4 md:grid-cols-2 md:gap-5">
                    <div className="overflow-hidden bg-[#f6f1ea]">
                      <img
                        src={pair.before}
                        alt={pair.beforeAlt}
                        className="aspect-[4/5] h-full w-full object-cover object-center md:aspect-[3/4]"
                      />
                      <p className="px-4 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-ink/45">
                        Antes
                      </p>
                    </div>
                    <div className="overflow-hidden bg-[#f6f1ea]">
                      <img
                        src={pair.after}
                        alt={pair.afterAlt}
                        className="aspect-[4/5] h-full w-full object-cover object-center md:aspect-[3/4]"
                      />
                      <p className="px-4 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-ink/45">
                        Depois
                      </p>
                    </div>
                  </div>
                </figure>
              ))}
            </div>

            <div className="mt-20 overflow-hidden bg-[#1b1815]/[0.04] md:mt-28">
              <img
                src={story.results.lifestyle.src}
                alt={story.results.lifestyle.alt}
                className="aspect-[16/10] w-full object-cover object-center md:aspect-[21/9]"
              />
            </div>
          </div>
        </section>

        {/* 8. Prova social */}
        <section className="border-t border-black/[0.06] bg-[#f6f1ea] px-0 py-20 md:py-28 lg:py-32">
          <div className="mx-auto w-full max-w-[1440px] shell-px">
            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.26em] text-ink/42">
              Quem usa, descreve
            </p>
            <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10 lg:gap-14">
              {story.testimonials.map((t, i) => (
                <blockquote
                  key={`${t.author}-${i}`}
                  className="flex flex-col border-t border-black/[0.08] pt-8 text-left md:border-0 md:border-transparent md:pt-0"
                >
                  <p className="font-display text-xl leading-snug text-ink/90 md:text-2xl md:leading-tight">
                    “{t.quote}”
                  </p>
                  <footer className="mt-6 text-[11px] font-medium uppercase tracking-[0.18em] text-ink/45">
                    {t.author}
                    <span className="mx-2 text-ink/25">·</span>
                    {t.location}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Encerramento */}
        <section className="border-t border-black/[0.06] bg-[#ede6dc] px-0 py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-ink/42">
              {story.closing.eyebrow}
            </p>
            <h2 className="mt-6 font-display text-[2.15rem] leading-[1.02] text-ink md:text-5xl md:leading-[0.98]">
              {story.closing.title}
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ink/62 md:text-lg md:leading-8">
              {story.closing.body}
            </p>
            <p className="mt-10 font-display text-2xl text-ink/80 md:text-3xl">{story.meta.priceLine}</p>
            <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
              <a
                href={story.closing.ctaPrimary.href}
                className="inline-flex h-14 min-w-[14rem] items-center justify-center border border-ink bg-ink px-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#2a2622]"
              >
                {story.closing.ctaPrimary.label}
              </a>
              <a
                href={story.closing.ctaSecondary.href}
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/50 transition hover:text-ink"
              >
                {story.closing.ctaSecondary.label}
              </a>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
