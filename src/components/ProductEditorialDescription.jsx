import React from "react";

const PROMISE = {
  kicker: "A promessa",
  title: "Luminosidade que o toque confirma.",
  lines: [
    "Textura leve que penetra sem pesar — e devolve um brilho contido, quase silencioso.",
    "É o cuidado concentrado de um óleo bem formulado: presença sem excesso, resultado visível.",
  ],
  image: { src: "/images/mirra3.jpg.webp", alt: "Textura do óleo de mirra em close" },
};

const HOW_STEPS = [
  {
    image: "/images/mirra1.jpg.webp",
    alt: "Frasco do óleo de mirra",
    title: "Poucas gotas",
    text: "Aqueça nas palmas até sentir o óleo envolver a pele.",
  },
  {
    image: "/images/mirra5.jpg.webp",
    alt: "Aplicação do óleo no cabelo",
    title: "Espalhe no fio",
    text: "Distribua do meio às pontas, com movimentos longos.",
  },
  {
    image: "/images/mirra4.jpg.webp",
    alt: "Detalhe do produto",
    title: "Comprimento e pontas",
    text: "Concentre onde o fio pede selagem e acabamento.",
  },
  {
    image: "/images/12.png",
    alt: "Óleo em uso no ritual de beleza",
    title: "Úmido ou seco",
    text: "Finalize no secador ou no ar: o brilho acompanha o dia.",
  },
];

const WHY_ITEMS = [
  {
    title: "Penetração leve",
    text: "Nutre sem pesar; o fio respira e mantém movimento.",
  },
  {
    title: "Brilho que dura",
    text: "Ação antioxidante ajuda a prolongar o efeito do tratamento.",
  },
  {
    title: "Barreira do quotidiano",
    text: "Apoio contra sol, poluição e calor do secador.",
  },
  {
    title: "Rendimento real",
    text: "Poucas gotas bastam para acabamento limpo e preciso.",
  },
];

const RESULT_PANELS = [
  {
    src: "/images/mirra5.jpg.webp",
    alt: "Cabelo com movimento e brilho",
    kicker: "Resultado",
    title: "Brilho que se move com você",
  },
  {
    src: "/images/mirra2.jpg.webp",
    alt: "Óleo em ambiente editorial",
    kicker: "Rotina",
    title: "Um ritual, elevado",
  },
];

const STORY = {
  kicker: "Origem",
  title: "Mirra",
  body:
    "A mirra atravessa séculos de rituais de beleza. Na Ybera, torna-se um óleo reparador para quem busca resultado visível — e um toque que fica na memória.",
};

export default function ProductEditorialDescription() {
  return (
    <article className="bg-white text-ink">
      {/* Bloco 1 — Promessa */}
      <section className="border-t border-black/[0.06] px-0 section-y" aria-labelledby="pdp-promise-heading">
        <div className="mx-auto grid w-full max-w-site shell-px gap-12 lg:grid-cols-2 lg:items-center lg:gap-20 xl:gap-28">
          <div className="max-w-xl lg:max-w-none">
            <p className="section-kicker text-ink/48 before:bg-ink/24">{PROMISE.kicker}</p>
            <h2
              id="pdp-promise-heading"
              className="mt-6 font-display text-[clamp(1.75rem,4vw,3.25rem)] font-normal leading-[1.12] tracking-[-0.02em] text-ink md:text-[clamp(2.25rem,3.6vw,3.5rem)]"
            >
              {PROMISE.title}
            </h2>
            <div className="mt-8 space-y-5 text-[15px] font-light leading-[1.65] text-ink/62 sm:text-base sm:leading-relaxed md:max-w-md lg:max-w-lg">
              {PROMISE.lines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
          <figure className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="aspect-[4/5] overflow-hidden bg-[#ebe6df] sm:aspect-[5/6] lg:aspect-[3/4]">
              <img
                src={PROMISE.image.src}
                alt={PROMISE.image.alt}
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </figure>
        </div>
      </section>

      {/* Bloco 2 — Como usar */}
      <section
        className="border-t border-black/[0.06] bg-[#F6F4F2] px-0 py-16 md:py-24 lg:py-28"
        aria-labelledby="pdp-how-heading"
      >
        <div className="mx-auto w-full max-w-site shell-px">
          <header className="max-w-2xl">
            <p className="section-kicker text-ink/48 before:bg-ink/24">Como usar</p>
            <h2
              id="pdp-how-heading"
              className="mt-5 font-display text-[clamp(1.65rem,3.5vw,2.75rem)] font-normal leading-[1.14] tracking-[-0.02em] text-ink md:mt-6"
            >
              Quatro gestos. Uso real.
            </h2>
            <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-ink/52 md:text-[15px]">
              Do frasco ao acabamento — um fluxo simples para incorporar ao dia.
            </p>
          </header>

          <div className="section-inner-gap -mx-4 flex gap-5 overflow-x-auto overscroll-x-contain px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-6 [&::-webkit-scrollbar]:hidden">
            {HOW_STEPS.map((step, i) => (
              <div
                key={step.title}
                className="min-w-[min(17.5rem,calc(100vw-3.5rem))] shrink-0 snap-start sm:min-w-0"
              >
                <div className="overflow-hidden bg-white/80">
                  <div className="aspect-[4/5]">
                    <img
                      src={step.image}
                      alt={step.alt}
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                </div>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-xl font-normal leading-snug tracking-[-0.02em] text-ink md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[28ch] text-[13px] font-light leading-relaxed text-ink/55 md:text-sm">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloco 3 — Por que funciona */}
      <section className="border-t border-black/[0.06] px-0 section-y" aria-labelledby="pdp-why-heading">
        <div className="mx-auto w-full max-w-site shell-px">
          <header className="max-w-2xl">
            <p className="section-kicker text-ink/48 before:bg-ink/24">Por que funciona</p>
            <h2
              id="pdp-why-heading"
              className="mt-5 font-display text-[clamp(1.65rem,3.5vw,2.75rem)] font-normal leading-[1.14] tracking-[-0.02em] text-ink md:mt-6"
            >
              Clareza, em quatro ideias.
            </h2>
          </header>

          <ul className="section-inner-gap grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {WHY_ITEMS.map((item) => (
              <li
                key={item.title}
                className="border border-black/[0.08] bg-[#faf9f7] px-5 py-6 md:px-6 md:py-8"
              >
                <h3 className="font-display text-lg font-normal leading-tight tracking-[-0.02em] text-ink md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-[13px] font-light leading-relaxed text-ink/56 md:text-sm">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bloco 4 — Resultado */}
      <section className="border-t border-black/[0.06] bg-[#0f0e0c] px-0 py-16 text-white md:py-24 lg:py-28" aria-labelledby="pdp-result-heading">
        <div className="mx-auto w-full max-w-site shell-px">
          <p className="section-kicker text-white/45 before:bg-white/28">Resultado</p>
          <h2
            id="pdp-result-heading"
            className="mt-5 max-w-2xl font-display text-[clamp(1.65rem,3.5vw,2.75rem)] font-normal leading-[1.14] tracking-[-0.02em] text-white/95 md:mt-6"
          >
            A transformação em imagem.
          </h2>
        </div>

        <div className="section-inner-gap mx-auto mt-12 grid w-full max-w-site gap-3 shell-px sm:mt-14 sm:gap-4 lg:grid-cols-2 lg:gap-5">
          {RESULT_PANELS.map((panel) => (
            <figure key={panel.title} className="group relative overflow-hidden">
              <div className="aspect-[4/5] sm:aspect-[16/11] lg:aspect-[5/4]">
                <img
                  src={panel.src}
                  alt={panel.alt}
                  className="h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                  {panel.kicker}
                </p>
                <p className="mt-2 font-display text-xl font-normal leading-snug tracking-[-0.02em] text-white sm:text-2xl md:text-3xl">
                  {panel.title}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Bloco 5 — Storytelling */}
      <section className="border-t border-black/[0.06] bg-[#ebe6df] px-0 py-16 md:py-24 lg:py-28" aria-labelledby="pdp-story-heading">
        <div className="mx-auto max-w-2xl shell-px text-center">
          <p className="section-kicker mx-auto justify-center text-ink/45 before:bg-ink/22">
            {STORY.kicker}
          </p>
          <h2
            id="pdp-story-heading"
            className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.03em] text-ink"
          >
            {STORY.title}
          </h2>
          <p className="mt-8 text-[15px] font-light leading-[1.75] text-ink/58 sm:text-base">
            {STORY.body}
          </p>
          <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.18em] text-ink/38">
            Conteúdo: 01 Óleo de Mirra Reparador 15ml — Ybera Paris.
          </p>
        </div>
      </section>
    </article>
  );
}
