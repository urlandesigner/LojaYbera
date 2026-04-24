import React from "react";

/**
 * Informações técnicas — blocos editoriais em Z (imagem / texto alternados).
 * Conteúdo textual inalterado; imagens escolhidas por contexto visual.
 */
const TECH_EDITORIAL_BLOCKS = [
  {
    label: "Para que serve",
    value:
      "Reparação superficial dos fios, selagem de cutícula e acabamento com brilho controlado.",
    image: {
      src: "/images/mirra3.jpg.webp",
      alt: "Textura fluida do óleo de mirra em close",
    },
    imageFirst: true,
  },
  {
    label: "Tipo de produto",
    value: "Óleo capilar finalizador — uso leave-in, concentrado.",
    image: {
      src: "/images/mirra5.jpg.webp",
      alt: "Aplicação do óleo no cabelo",
    },
    imageFirst: false,
  },
  {
    label: "Indicação",
    value:
      "Fios porosos, ressecados ou com frizz. Pós-química: seguir orientação profissional.",
    image: {
      src: "/images/costas.png",
      alt: "Cabelo com movimento e resultado natural",
    },
    imageFirst: true,
  },
  {
    label: "Textura / acabamento",
    value: "Fluido leve, absorção rápida, toque seco e brilho sem efeito oleoso.",
    image: {
      src: "/images/13.png",
      alt: "Brilho e fluidez da textura do óleo",
    },
    imageFirst: false,
  },
];

/** 2 — Como usar */
const HOW_STEPS = [
  "Dispense de 2 a 5 gotas na palma das mãos, conforme o comprimento e a densidade do cabelo.",
  "Esfregue as mãos e distribua do meio às pontas, sem acumular na raiz.",
  "Se o couro cabeludo for oleoso, concentre nas pontas e evite a linha do nascimento.",
  "Aplique em fios úmidos (antes do secador) ou secos, como etapa final do penteado.",
];

/** 3 — Por que funciona */
const WHY_LEDE =
  "Óleos funcionais e filmantes leves formam uma camada fina sobre a cutícula: reduz perda de umidade, alinha o fio e aumenta o reflexo de luz — sem comprometer o movimento.";

const WHY_HEADLINE = "Precisão na superfície, liberdade no gesto.";

const WHY_ITEMS = [
  {
    title: "Filme protetor fino",
    text: "Silicones e ésteres de baixo peso molecular selam irregularidades e diminuem o atrito.",
  },
  {
    title: "Mirra na formulação",
    text: "Resinas e componentes lipofílicos associados à mirra reforçam acabamento e brilho percebido.",
  },
  {
    title: "Barreira ao stress diário",
    text: "Apoio contra calor do secador, poluição urbana e desgaste cumulativo do fio.",
  },
  {
    title: "Rendimento controlado",
    text: "Concentração elevada: poucas gotas cobrem o comprimento com acabamento uniforme.",
  },
];

/** 4 — Resultado (texto para split 50/50) */
const RESULT_COPY = {
  kicker: "Resultado",
  lead:
    "Brilho que acompanha o movimento. Toque seco, acabamento preciso — o que o espelho mostra e a mão confirma.",
  body:
    "O fio ganha leitura de saúde: superfície mais alinhada, reflexo mais contínuo, sensação de leveza imediata.",
};

/** 5 — Prova visual (grid) */
const VISUAL_PROOF = [
  { src: "/images/mirra1.jpg.webp", alt: "Óleo de Mirra Reparador Ybera" },
  { src: "/images/mirra2.jpg.webp", alt: "Frasco em ambiente editorial" },
  { src: "/images/mirra3.jpg.webp", alt: "Textura do óleo em close" },
  { src: "/images/mirra4.jpg.webp", alt: "Detalhe do produto" },
  { src: "/images/mirra5.jpg.webp", alt: "Aplicação no cabelo" },
  { src: "/images/13.png", alt: "Textura e brilho do óleo" },
];

/** 6 — Origem */
const STORY = {
  kicker: "Origem",
  title: "Mirra",
  body:
    "Da resina aromática aos rituais que atravessam séculos, a mirra carrega memória de cuidado. Na Ybera, esse legado encontra a precisão de um óleo reparador — para quem exige resultado visível e um gesto que permanece.",
  image: { src: "/images/12.png", alt: "Composição editorial do produto Ybera" },
};

function TechZBlock({ label, value, image, imageFirst, headingId }) {
  const rootRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
    }
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const mediaOrder = imageFirst ? "order-1 lg:order-1" : "order-2 lg:order-2";
  const copyOrder = imageFirst ? "order-2 lg:order-2" : "order-1 lg:order-1";

  return (
    <article
      ref={rootRef}
      className={`pdp-tech-z-row min-h-[420px] lg:min-h-[28rem] ${visible ? "pdp-tech-z-row--visible" : ""}`}
      aria-labelledby={headingId}
    >
      <div className="grid min-h-[420px] grid-cols-1 items-stretch gap-10 lg:min-h-[28rem] lg:grid-cols-2 lg:gap-14 xl:gap-20">
        <figure
          className={`pdp-tech-z-row__media relative min-h-[280px] w-full overflow-hidden bg-[#f0ebe4] sm:min-h-[320px] lg:min-h-[420px] ${mediaOrder}`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-full min-h-[280px] w-full object-cover object-center sm:min-h-[320px] lg:min-h-[420px]"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className={`pdp-tech-z-row__copy flex flex-col justify-center ${copyOrder}`}>
          <div className="max-w-[30rem] lg:max-w-[480px]">
            <h3
              id={headingId}
              className="font-display text-[clamp(1.2rem,2.1vw,1.5rem)] font-normal leading-[1.18] tracking-[-0.02em] text-ink"
            >
              {label}
            </h3>
            <p className="mt-5 text-[15px] font-light leading-[1.75] text-ink/64 sm:text-base sm:leading-[1.78]">
              {value}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Imagem lateral com zoom / deslocamento muito sutis ao scroll (evita em reduced-motion). */
function WhySectionImage({ src, alt }) {
  const wrapRef = React.useRef(null);
  const imgRef = React.useRef(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    let raf = 0;

    const tick = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      if (rect.bottom < 0 || rect.top > vh) return;

      const mid = rect.top + rect.height * 0.42;
      const t = (vh * 0.5 - mid) / (vh + rect.height * 0.35);
      const clamped = Math.max(-1, Math.min(1, t));
      const translateY = clamped * 14;
      const scale = 1 + Math.abs(clamped) * 0.035;

      img.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        tick();
        raf = 0;
      });
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <figure ref={wrapRef} className="order-2 min-h-0 overflow-hidden bg-[#ebe6df] lg:order-1">
      <div className="relative aspect-[3/4] min-h-[min(72vh,38rem)] overflow-hidden sm:aspect-[4/5] lg:min-h-[min(78vh,42rem)]">
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="h-full w-full origin-center object-cover object-center will-change-transform"
          style={{ transform: "translate3d(0,0,0) scale(1)" }}
          loading="lazy"
          decoding="async"
        />
      </div>
    </figure>
  );
}

/** Frases curtas que ligam um ato narrativo ao seguinte (tom editorial). */
const NARRATIVE_BRIDGES = {
  afterTech:
    "Do rótulo ao gesto: a seguir, o ritual em quatro passos — direto, como no dia a dia.",
  afterHow:
    "Com o gesto incorporado, abre-se o racional: o que a fórmula faz pelo fio.",
  beforeResult:
    "Quando teoria e toque encontram o espelho, o discurso vira resultado.",
  afterResult:
    "A seguir, o produto em contexto — a mesma linguagem visual, em outro ritmo.",
  beforeOrigin:
    "Para fechar o fio narrativo: a origem que sustenta a promessa do frasco.",
};

/** Micro-transição: gradiente suave + linha + frase opcional */
function NarrativeBridge({ quote, gradientClass }) {
  return (
    <div
      className={`px-0 py-12 sm:py-14 md:py-16 ${gradientClass ?? "bg-gradient-to-b from-white via-[#faf9f7] to-[#f4f1ec]"}`}
    >
      <div className="mx-auto max-w-site shell-px text-center">
        <div className="mx-auto h-px max-w-xs bg-gradient-to-r from-transparent via-black/[0.09] to-transparent sm:max-w-md" />
        {quote ? (
          <p className="mx-auto mt-8 max-w-lg text-[13px] font-light italic leading-relaxed text-ink/44 md:mt-10 md:text-[14px] md:leading-relaxed">
            {quote}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function ProductEditorialDescription() {
  return (
    <article className="bg-gradient-to-b from-white via-white to-[#faf9f7] text-ink">
      {/* 1 — Informações técnicas (editorial em Z) */}
      <section
        className="px-0 pt-20 pb-14 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24"
        aria-labelledby="pdp-tech-heading"
      >
        <div className="mx-auto w-full max-w-site shell-px">
          <header className="mx-auto mb-20 max-w-xl text-center lg:mx-0 lg:mb-28 lg:max-w-lg lg:text-left">
            <p className="section-kicker mx-auto justify-center text-ink/48 before:bg-ink/24 lg:mx-0 lg:inline-flex">
              Informações técnicas
            </p>
            <h2
              id="pdp-tech-heading"
              className="mt-5 font-display text-[clamp(1.45rem,2.5vw,1.85rem)] font-normal leading-[1.12] tracking-[-0.02em] text-ink lg:mt-6"
            >
              Ficha essencial
            </h2>
            <p className="mt-5 text-[14px] font-light leading-[1.68] text-ink/46 sm:text-[15px] sm:leading-relaxed">
              Primeiro ato: o que o produto é — em leituras curtas, imagem e texto a caminhar juntos.
            </p>
          </header>

          <div className="flex flex-col gap-20 lg:gap-28" role="presentation">
            {TECH_EDITORIAL_BLOCKS.map((row, index) => (
              <TechZBlock
                key={row.label}
                label={row.label}
                value={row.value}
                image={row.image}
                imageFirst={row.imageFirst}
                headingId={`pdp-tech-block-${index}`}
              />
            ))}
          </div>
        </div>
      </section>

      <NarrativeBridge quote={NARRATIVE_BRIDGES.afterTech} gradientClass="bg-gradient-to-b from-white via-[#faf9f7] to-[#F6F4F2]" />

      {/* 2 — Como usar (imagem + texto) */}
      <section
        className="relative z-[1] -mt-10 rounded-t-[1.75rem] bg-[#F6F4F2] px-0 pb-16 pt-14 shadow-[0_-28px_56px_-32px_rgba(24,21,18,0.06)] md:-mt-14 md:rounded-t-[2.25rem] md:pb-24 md:pt-20 lg:-mt-16 lg:pb-28 lg:pt-24"
        aria-labelledby="pdp-how-heading"
      >
        <div className="mx-auto w-full max-w-site shell-px lg:pr-8 xl:pr-12">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-24">
            <figure className="order-2 min-w-0 lg:order-1">
              <div className="aspect-[4/5] overflow-hidden bg-white shadow-[0_32px_64px_-40px_rgba(24,21,18,0.2)] sm:aspect-[5/6] lg:aspect-[4/5]">
                <img
                  src="/images/mirra4.jpg.webp"
                  alt="Detalhe do frasco do óleo de mirra reparador"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </figure>
            <div className="order-1 min-w-0 lg:order-2 lg:max-w-md lg:justify-self-end xl:max-w-lg">
              <p className="section-kicker text-ink/48 before:bg-ink/24">Como usar</p>
              <h2
                id="pdp-how-heading"
                className="mt-4 font-display text-[clamp(1.4rem,2.6vw,1.85rem)] font-normal leading-[1.18] tracking-[-0.02em] text-ink lg:mt-5"
              >
                Quatro passos, sem rodeios.
              </h2>
              <ol className="mt-10 list-none space-y-5 border-l border-black/[0.1] pl-6 sm:mt-12 sm:space-y-6 sm:pl-8">
                {HOW_STEPS.map((step, i) => (
                  <li key={i} className="relative">
                    <span
                      className="absolute -left-6 top-0.5 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-black/[0.12] bg-white text-[10px] font-semibold tabular-nums text-ink/50 sm:-left-8"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <p className="text-[15px] font-light leading-relaxed text-ink/68 sm:text-base sm:leading-relaxed">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <NarrativeBridge
        quote={NARRATIVE_BRIDGES.afterHow}
        gradientClass="bg-gradient-to-b from-[#F6F4F2] via-[#f9f7f4] to-white"
      />

      {/* 3 — Por que funciona (imagem dominante + texto lateral) */}
      <section
        className="bg-white px-0 pt-20 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20"
        aria-labelledby="pdp-why-heading"
      >
        <div className="mx-auto w-full max-w-site shell-px lg:pl-2 xl:pl-6">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.22fr)_minmax(0,0.78fr)] lg:items-start lg:gap-14 xl:gap-20">
            <WhySectionImage
              src="/images/mirra3.jpg.webp"
              alt="Textura do óleo de mirra em close"
            />
            <div className="order-1 min-w-0 lg:order-2 lg:sticky lg:top-[calc(var(--header-height)+40px)] lg:max-w-[420px] lg:self-start lg:translate-x-1 xl:translate-x-2">
              <p className="section-kicker text-ink/48 before:bg-ink/24">Por que funciona</p>
              <h2
                id="pdp-why-heading"
                className="mt-4 font-display text-[clamp(1.45rem,2.6vw,2rem)] font-normal leading-[1.14] tracking-[-0.02em] text-ink lg:mt-5"
              >
                {WHY_HEADLINE}
              </h2>
              <p className="mt-7 text-[15px] font-light leading-[1.78] text-ink/50 sm:text-base sm:leading-[1.82]">
                {WHY_LEDE}
              </p>
              <div className="mt-14 flex max-w-[420px] flex-col gap-14 lg:mt-16 lg:gap-16">
                {WHY_ITEMS.map((item) => (
                  <article key={item.title} className="min-w-0">
                    <h3 className="font-display text-[clamp(1.12rem,2vw,1.35rem)] font-normal leading-[1.2] tracking-[-0.02em] text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-[14px] font-light leading-[1.75] text-ink/48 sm:text-[15px] sm:leading-[1.78]">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <NarrativeBridge quote={NARRATIVE_BRIDGES.beforeResult} gradientClass="bg-gradient-to-b from-white via-[#faf9f7] to-white" />

      {/* 4 — Resultado (split 50/50: imagem | texto) — fundo preto uniforme */}
      <section
        className="bg-black px-0 pb-20 pt-16 text-white md:pb-28 md:pt-20 lg:pb-32 lg:pt-24"
        aria-labelledby="pdp-result-heading"
      >
        <div className="mx-auto grid min-h-0 w-full max-w-site grid-cols-1 shell-px lg:grid-cols-2 lg:gap-0">
          <figure className="relative min-h-[18rem] overflow-hidden sm:min-h-[22rem] lg:min-h-[min(32rem,70vh)]">
            <img
              src="/images/mirra5.jpg.webp"
              alt="Cabelo com movimento e brilho após o uso do óleo"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="lazy"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-black/20 lg:bg-black/25"
              aria-hidden
            />
          </figure>
          <div className="flex flex-col justify-center px-0 py-12 sm:py-14 lg:px-12 lg:py-16 xl:px-16 xl:py-20">
            <p className="section-kicker text-white/42 before:bg-white/22">{RESULT_COPY.kicker}</p>
            <h2
              id="pdp-result-heading"
              className="mt-5 max-w-sm font-display text-[clamp(1.35rem,2.4vw,1.75rem)] font-normal leading-[1.2] tracking-[-0.02em] text-white/95 lg:mt-6"
            >
              {RESULT_COPY.lead}
            </h2>
            <p className="mt-6 max-w-md text-[15px] font-light leading-[1.75] text-white/58 sm:text-base">
              {RESULT_COPY.body}
            </p>
          </div>
        </div>
      </section>

      <NarrativeBridge quote={NARRATIVE_BRIDGES.afterResult} gradientClass="bg-white" />

      {/* 5 — Prova visual (grid) */}
      <section
        className="bg-white px-0 pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20"
        aria-labelledby="pdp-proof-heading"
      >
        <div className="mx-auto w-full max-w-site shell-px">
          <header className="max-w-lg lg:ml-1 xl:translate-x-1">
            <p className="section-kicker text-ink/48 before:bg-ink/24">Prova visual</p>
            <h2
              id="pdp-proof-heading"
              className="mt-4 font-display text-[clamp(1.35rem,2.3vw,1.7rem)] font-normal leading-snug tracking-[-0.02em] text-ink lg:mt-5"
            >
              O produto em contexto.
            </h2>
          </header>
          <div className="mt-12 grid grid-cols-2 gap-2 sm:gap-3 md:mt-14 md:grid-cols-3 md:gap-4 lg:mt-16">
            {VISUAL_PROOF.map((item) => (
              <figure
                key={item.src}
                className="overflow-hidden bg-[#ebe6df] aspect-square"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover object-center transition duration-500 ease-out hover:scale-[1.02]"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <NarrativeBridge
        quote={NARRATIVE_BRIDGES.beforeOrigin}
        gradientClass="bg-gradient-to-b from-white via-[#f6f3ee] to-[#ebe6df]"
      />

      {/* Origem (imagem grande + texto) */}
      <section
        className="bg-[#ebe6df] px-0 pb-24 pt-12 md:pb-32 md:pt-16 lg:pb-40 lg:pt-20"
        aria-labelledby="pdp-story-heading"
      >
        <div className="mx-auto grid max-w-site gap-12 shell-px lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16 xl:gap-20">
          <figure className="order-2 min-h-0 overflow-hidden lg:order-1">
            <div className="aspect-[4/5] min-h-[20rem] overflow-hidden sm:min-h-[24rem] lg:aspect-[5/6] lg:min-h-[min(32rem,75vh)]">
              <img
                src={STORY.image.src}
                alt={STORY.image.alt}
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </figure>
          <div className="order-1 max-w-lg lg:order-2 lg:justify-self-end lg:py-4 xl:max-w-md">
            <p className="section-kicker text-ink/45 before:bg-ink/22">{STORY.kicker}</p>
            <h2
              id="pdp-story-heading"
              className="mt-5 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-normal leading-[1.1] tracking-[-0.025em] text-ink lg:mt-6"
            >
              {STORY.title}
            </h2>
            <p className="mt-8 text-[15px] font-light leading-[1.78] text-ink/58 sm:text-base">
              {STORY.body}
            </p>
            <p className="mt-10 text-[10px] font-medium uppercase tracking-[0.2em] text-ink/36">
              Conteúdo: 01 Óleo de Mirra Reparador 15ml — Ybera Paris.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
