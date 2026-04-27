import React from "react";

const TECH_FACTS = [
  {
    label: "Para que serve",
    value: "Selar a cutícula, reduzir frizz e deixar os fios mais alinhados com brilho visível.",
  },
  {
    label: "Tipo de produto",
    value: "Óleo finalizador concentrado de uso leave-in.",
  },
  {
    label: "Indicação",
    value: "Ideal para fios porosos, ressecados ou com frizz. Em pós-química, usar com orientação profissional.",
  },
  {
    label: "Textura / acabamento",
    value: "Textura fluida, absorção rápida, toque seco e brilho sem pesar.",
  },
];

const HOW_STEPS = [
  {
    title: "Dose",
    text: "Aplique de 2 a 5 gotas, conforme comprimento e volume dos fios.",
  },
  {
    title: "Aquecimento",
    text: "Aqueça o produto entre as mãos para distribuir de forma uniforme.",
  },
  {
    title: "Aplicação",
    text: "Espalhe do meio às pontas. Se a raiz for oleosa, mantenha distância do couro cabeludo.",
  },
  {
    title: "Finalização",
    text: "Finalize em fios úmidos ou secos para brilho contínuo, toque leve e menos frizz ao longo do dia.",
  },
];

const HOW_VISUALS = [
  { src: "/images/mirra1.jpg.webp", alt: "Frasco do óleo para início do ritual", label: "Dose" },
  { src: "/images/mirra3.jpg.webp", alt: "Aquecimento do óleo nas mãos", label: "Aquecimento" },
  { src: "/images/mirra5.jpg.webp", alt: "Aplicação do óleo no cabelo", label: "Aplicação" },
  { src: "/images/mirra4.jpg.webp", alt: "Finalização com brilho e alinhamento", label: "Finalização" },
];

const WHY_ITEMS = [
  {
    title: "Filme protetor leve",
    text: "Forma uma camada fina que reduz atrito, controla frizz e melhora o alinhamento imediato.",
  },
  {
    title: "Mirra com ação cosmética",
    text: "Os ativos ligados à mirra reforçam maciez, brilho e acabamento uniforme fio a fio.",
  },
  {
    title: "Proteção de rotina",
    text: "Ajuda a proteger contra calor do secador, poluição e desgaste diário sem tirar leveza.",
  },
];

const RESULT_COPY = {
  title: "Mais brilho, menos frizz, toque leve.",
  body: "Resultado visível desde a primeira aplicação: fios mais alinhados, com movimento natural e acabamento seco.",
};

const RESULT_COPY_SECOND = {
  title: "Leveza que permanece ao longo do dia.",
  subtitle: "Nutrição equilibrada, com acabamento leve.",
  body: "Ao longo da rotina, o cabelo mantém brilho contínuo, toque macio e controle do frizz com aparência natural.",
};

const STORY = {
  title: "Tradição que entrega resultado.",
  body: "A mirra, reconhecida historicamente pelo cuidado dos fios, é aplicada aqui com tecnologia cosmética para reparar, alinhar e ampliar o brilho com performance diária.",
  image: "/images/40.jpg",
  alt: "Composição editorial do produto Ybera",
};

export default function ProductEditorialDescription() {
  const [activeHowStep, setActiveHowStep] = React.useState(0);

  return (
    <article className="bg-white text-ink">
      {/* 2. RESULTADO (IMAGEM FULL) */}
      <section className="px-0">
        <div className="relative min-h-[34rem] overflow-hidden lg:min-h-[48rem]">
          <img
            src="/images/mirra5.jpg.webp"
            alt="Cabelo com movimento e brilho após uso do óleo"
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[40%]"
            style={{
              background: "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)",
            }}
            aria-hidden
          />
          <div className="absolute bottom-8 left-8 z-[1] right-8 sm:bottom-8 sm:left-8 sm:right-10 lg:bottom-20 lg:left-20 lg:right-auto">
            <div className="max-w-[30rem] [text-shadow:0_2px_16px_rgba(0,0,0,0.3)]">
              <p className="section-kicker text-white before:bg-white/55">Resultado</p>
              <h2 className="mt-6 font-display text-[clamp(2.1rem,4.4vw,4.35rem)] leading-[0.98] tracking-[-0.025em] text-white lg:text-[40px]">
                {RESULT_COPY.title}
              </h2>
              <p className="mt-6 max-w-[34rem] text-[16px] font-light leading-[1.75] text-white sm:text-[1.07rem] sm:leading-[1.78]">
                {RESULT_COPY.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROVA VISUAL */}
      <section className="bg-[#f6f3ef] px-6 py-14 sm:px-10 md:py-16 lg:px-14 lg:py-20 xl:px-20">
        <div className="mx-auto max-w-site">
          <header className="max-w-2xl">
            <p className="section-kicker text-ink/48 before:bg-ink/24">Prova visual</p>
            <h2 className="mt-5 font-display text-[clamp(1.6rem,2.4vw,2.3rem)] leading-[1.1] tracking-[-0.02em] text-ink lg:text-[40px]">
              Diferença visível no alinhamento e no brilho.
            </h2>
            <p className="mt-4 text-[15px] font-light leading-[1.75] text-ink/62 sm:text-base">
              Compare o antes e depois: menos frizz aparente, superfície mais uniforme e movimento mais limpo.
            </p>
          </header>
          <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5">
            <figure className="relative overflow-hidden bg-[#e9e4dd]">
              <img
                src="/images/costas.png"
                alt="Antes do uso do óleo reparador"
                className="aspect-[4/5] w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
              <span className="absolute left-4 top-4 bg-black/45 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                Antes
              </span>
            </figure>
            <figure className="relative overflow-hidden bg-[#e9e4dd]">
              <img
                src="/images/mirra5.jpg.webp"
                alt="Depois do uso do óleo reparador"
                className="aspect-[4/5] w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
              <span className="absolute left-4 top-4 bg-black/45 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                Depois
              </span>
            </figure>
          </div>
        </div>
      </section>

      {/* 4. POR QUE FUNCIONA */}
      <section className="relative z-[1] bg-white px-0">
        <div className="grid min-h-[32rem] grid-cols-1 lg:min-h-[44rem] lg:grid-cols-[58%_42%]">
          <figure className="min-h-[22rem] overflow-hidden lg:min-h-[44rem]">
            <img
              src="/images/mirra2.jpg.webp"
              alt="Óleo de Mirra em composição editorial"
              className="h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="flex items-center bg-white px-6 py-12 sm:px-10 lg:px-12 xl:px-16">
            <div className="max-w-[27rem]">
              <p className="section-kicker text-ink/48 before:bg-ink/24">Por que funciona</p>
              <h2 className="mt-5 font-display text-[clamp(1.9rem,2.9vw,3rem)] leading-[1.06] tracking-[-0.02em] text-ink lg:text-[40px]">
                Tecnologia leve que trata e finaliza sem pesar.
              </h2>
              <p className="mt-6 text-[15px] font-light leading-[1.8] text-ink/58 sm:text-base">
                A fórmula combina óleos de alta espalhabilidade com agentes de acabamento leve para selar a cutícula, reduzir perda de hidratação e melhorar o brilho sem rigidez.
              </p>
              <div className="mt-8 space-y-6">
                {WHY_ITEMS.map((item) => (
                  <article key={item.title}>
                    <h3 className="font-display text-[1.18rem] leading-tight tracking-[-0.02em] text-ink">{item.title}</h3>
                    <p className="mt-2 text-[14px] font-light leading-relaxed text-ink/58 sm:text-[15px]">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMO USAR */}
      <section
        id="pdp-como-usar"
        className="relative z-[1] scroll-mt-[calc(var(--header-height)+12px)] bg-[#f6f3ef] px-0"
      >
        <div className="mx-auto w-full max-w-site px-6 py-12 sm:px-10 md:py-14 lg:px-14 lg:py-16 xl:px-20">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch xl:gap-16">
            <div className="order-1 lg:sticky lg:top-28 lg:h-full">
              <article className="relative h-full overflow-hidden bg-[#ebe4dc]">
                <div className="relative h-[18rem] overflow-hidden sm:h-[28rem] lg:h-full lg:min-h-[36rem]">
                  {HOW_VISUALS.map((visual, index) => (
                    <img
                      key={visual.label}
                      src={visual.src}
                      alt={visual.alt}
                      loading="lazy"
                      decoding="async"
                      className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300 ease-in-out ${
                        activeHowStep === index ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(14,11,9,0.06),rgba(14,11,9,0.18)_70%,rgba(14,11,9,0.3))]" />
                </div>
              </article>
            </div>

            <div className="order-2">
              <header className="max-w-[34rem] pb-6">
                <p className="section-kicker text-ink/48 before:bg-ink/24">Como usar</p>
                <h2 className="mt-5 font-display text-[clamp(1.6rem,2.4vw,2.3rem)] leading-[1.1] tracking-[-0.02em] text-ink lg:text-[40px]">
                  Ritual simples em quatro gestos.
                </h2>
              </header>

              <div className="min-h-0" role="tablist" aria-label="Etapas do ritual de uso">
                {HOW_STEPS.map((step, index) => {
                  const isActive = activeHowStep === index;
                  return (
                    <article
                      key={step.title}
                      role="tab"
                      aria-selected={isActive}
                      tabIndex={0}
                      className={`grid cursor-pointer gap-3 py-4 transition-opacity duration-200 ease-out md:grid-cols-[95px_minmax(0,1fr)] md:items-start md:gap-x-4 lg:py-5 ${
                        isActive ? "opacity-100" : "opacity-[0.55]"
                      }`}
                      onMouseEnter={() => setActiveHowStep(index)}
                      onFocus={() => setActiveHowStep(index)}
                      onClick={() => setActiveHowStep(index)}
                    >
                      <p className={`font-display text-5xl leading-none md:text-6xl ${isActive ? "text-[#0a0a0a]" : "text-ink/62"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <div className="min-w-0 max-w-xl">
                        <h3 className={`font-display text-[22px] leading-[1.2] md:text-3xl lg:text-[2rem] ${isActive ? "text-[#0a0a0a]" : "text-ink"}`}>
                          {step.title}
                        </h3>
                        <p className="mt-2 text-[15px] leading-[1.65] text-ink/66 md:text-[15px] md:leading-7">
                          {step.text}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INFORMAÇÕES ESSENCIAIS */}
      <section
        id="pdp-informacoes-essenciais"
        className="scroll-mt-[calc(var(--header-height)+12px)] bg-white px-6 py-16 text-center sm:px-10 md:py-20 lg:px-14 lg:py-24 xl:px-20"
      >
        <p className="section-kicker mx-auto justify-center text-ink/48 before:bg-ink/24">Informações essenciais</p>
        <h2 className="mt-5 font-display text-[clamp(1.6rem,2.4vw,2.3rem)] leading-[1.1] tracking-[-0.02em] text-ink lg:text-[40px]">
          Essencial, sem excesso.
        </h2>
        <div className="mx-auto mt-12 grid max-w-[66rem] gap-8 text-left lg:grid-cols-[minmax(0,1.22fr)_minmax(0,0.78fr)] lg:items-center lg:gap-14">
          <article className="min-w-0 max-w-[43rem]">
            <p className="inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] text-ink/34">
              <span className="h-px w-8 bg-black/[0.2]" aria-hidden />
              {TECH_FACTS[0].label}
            </p>
            <p className="mt-6 max-w-[34ch] font-display text-[clamp(1.55rem,2.5vw,2.15rem)] leading-[1.34] tracking-[-0.012em] text-ink/90">
              {TECH_FACTS[0].value}
            </p>
          </article>

          <div className="space-y-9 sm:space-y-10 lg:space-y-11 lg:pl-2 lg:pt-8">
            {TECH_FACTS.slice(1).map((fact) => (
              <article key={fact.label} className="min-w-0">
                <p className="inline-flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.23em] text-ink/34">
                  <span className="h-px w-5 bg-black/[0.16]" aria-hidden />
                  {fact.label}
                </p>
                <p className="mt-3 max-w-[33ch] text-[15.5px] font-light leading-[1.84] text-ink/70 sm:text-[16px]">
                  {fact.value}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. RESULTADO (SEGUNDO BLOCO) */}
      <section className="px-0">
        <div className="relative min-h-[30rem] overflow-hidden lg:min-h-[42rem]">
          <img
            src="/images/13.png"
            alt="Óleo de Mirra em cena lifestyle"
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-y-0 left-0 w-[82%] sm:w-[76%] lg:w-[62%]"
            style={{
              background: "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0) 100%)",
            }}
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 z-[1]">
            <div className="mx-auto max-w-site px-6 pb-12 sm:px-10 md:pb-16 lg:px-14 lg:pb-20 xl:px-20">
              <div className="max-w-[34rem] [text-shadow:0_2px_12px_rgba(0,0,0,0.25)]">
                <h2 className="font-display text-[clamp(1.8rem,3.4vw,3.2rem)] leading-[1.02] tracking-[-0.02em] text-white lg:text-[40px]">
                {RESULT_COPY_SECOND.title}
                </h2>
                <p className="mt-3 text-[clamp(1.05rem,2.2vw,1.4rem)] font-display leading-[1.08] tracking-[-0.015em] text-white">
                  {RESULT_COPY_SECOND.subtitle}
                </p>
                <p className="mt-5 text-[15px] font-light leading-[1.75] text-white sm:text-base">
                  {RESULT_COPY_SECOND.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ORIGEM */}
      <section className="bg-white px-6 pb-12 pt-[72px] sm:px-10 md:pb-14 md:pt-[84px] lg:px-14 lg:pb-16 lg:pt-[96px] xl:px-20">
        <div className="mx-auto grid w-full max-w-[1120px] items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.9fr)] lg:gap-8 xl:gap-10">
          <div className="max-w-[470px] lg:pt-1">
            <p className="section-kicker text-ink/48 before:bg-ink/24">Origem</p>
            <h2 className="mt-5 font-display text-[clamp(1.95rem,3.7vw,3.2rem)] leading-[1.02] tracking-[-0.025em] text-ink lg:text-[40px]">
              {STORY.title}
            </h2>
            <p className="mt-6 max-w-[440px] text-[15px] font-light leading-[1.82] text-ink/62 sm:text-base sm:leading-[1.85]">
              {STORY.body}
            </p>
          </div>
          <figure className="justify-self-start overflow-hidden bg-white shadow-[0_26px_60px_-36px_rgba(24,21,18,0.34)] lg:-translate-x-6 lg:self-start">
            <div className="aspect-[4/5] w-full min-w-0 max-w-[25rem] sm:max-w-[27rem] lg:max-w-[29rem]">
              <img
                src={STORY.image}
                alt={STORY.alt}
                className="h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
          </figure>
        </div>
      </section>

    </article>
  );
}
