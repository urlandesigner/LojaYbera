import React from "react";
import { FooterSection, Header } from "./HomeSections";

const BENEFITS = [
  {
    title: "Margem estratégica",
    text: "Aumente seu ticket médio com percepção premium — sem depender de volume.",
  },
  {
    title: "Fidelização real",
    text: "Clientes voltam pelo resultado. Permanecem pela consistência.",
  },
  {
    title: "Diferenciação de marca",
    text: "Pare de competir por preço. Passe a ser escolhido por valor.",
  },
  {
    title: "Crescimento consistente",
    text: "Escala com previsibilidade — e controle real do negócio.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Diagnóstico",
    text: "Entendemos o momento do seu negócio e o potencial de crescimento.",
  },
  {
    step: "02",
    title: "Curadoria",
    text: "Definimos o mix, posicionamento e estratégia comercial.",
  },
  {
    step: "03",
    title: "Evolução",
    text: "Acompanhamos a operação para gerar consistência e escala.",
  },
];

const TARGETS = [
  "Salões que querem elevar percepção de valor",
  "Profissionais que buscam consistência de resultado",
  "Operações que desejam crescer com estratégia",
];

const PORTFOLIO_ITEMS = [
  {
    src: "/images/11.png",
    alt: "Produto profissional Ybera em composição editorial",
  },
  {
    src: "/images/12.png",
    alt: "Linha Ybera em bancada de salão premium",
  },
  {
    src: "/images/13.png",
    alt: "Detalhe de produto Ybera com iluminação quente",
  },
];

export default function ProfessionalLinePage() {
  const [portfolioIndex, setPortfolioIndex] = React.useState(0);
  const [portfolioPaused, setPortfolioPaused] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (portfolioPaused) return undefined;

    const id = window.setInterval(() => {
      setPortfolioIndex((i) => (i + 1) % PORTFOLIO_ITEMS.length);
    }, 4200);

    return () => window.clearInterval(id);
  }, [portfolioPaused]);

  const activePortfolioItem = PORTFOLIO_ITEMS[portfolioIndex];
  const nextPortfolioItem = PORTFOLIO_ITEMS[(portfolioIndex + 1) % PORTFOLIO_ITEMS.length];

  return (
    <div className="min-h-screen bg-[#f6f2ed] text-ink">
      <Header />
      <main className="mt-0">
        <section id="hero" className="relative min-h-[min(96vh,64rem)] overflow-hidden bg-[#12100f] text-white">
          <div className="absolute inset-0">
            <img
              src="/images/45.JPG"
              alt="Ambiente de salão profissional com estética editorial"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(102deg,rgba(10,8,7,0.88)_0%,rgba(10,8,7,0.58)_42%,rgba(10,8,7,0.2)_100%)]" />
          </div>
          <div className="relative mx-auto flex min-h-[inherit] w-full max-w-site flex-col justify-end px-[clamp(1.125rem,0.65rem+2.8vw,3.25rem)] pb-16 pt-20 sm:pb-20 sm:pt-24 md:pb-24 md:pt-28 lg:pb-28 lg:pt-32">
            <div className="max-w-[40rem]">
              <p className="section-kicker text-white before:bg-white/55">Linha profissional</p>
              <h1 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.02] tracking-[-0.03em] text-white">
                Escale seu negócio
                <br />
                com uma marca de salão.
              </h1>
              <p className="mt-6 max-w-[36ch] text-[15px] font-light leading-[1.8] text-white sm:text-base">
                Mais que produto, um sistema de valor para elevar percepção, recorrência e construção de marca no
                dia a dia do salão.
              </p>
              <a
                href="#cadastro-profissional"
                className="mt-9 inline-flex h-12 items-center justify-center gap-2 border border-white/75 bg-white/12 px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white no-underline transition duration-300 hover:border-white hover:bg-white hover:text-[#14110f]"
              >
                Quero fazer parte
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#f6f2ed] px-6 py-18 sm:px-10 lg:px-14 lg:py-28 xl:px-20">
          <div className="mx-auto grid w-full max-w-[1240px] gap-8 border-y border-black/[0.08] py-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 lg:py-16">
            <article className="w-full max-w-none">
              <p className="section-kicker text-ink/48 before:bg-ink/24">O cenário atual</p>
              <h2 className="mt-5 font-display text-[clamp(1.85rem,2.8vw,3rem)] leading-[1.02] tracking-[-0.03em]">
                <span className="block">Profissionais dominam a técnica.</span>
                <span className="mt-4 block">Mas não capturam valor.</span>
              </h2>
            </article>
            <article className="w-full max-w-none border-t border-black/[0.1] pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <p className="section-kicker text-ink/48 before:bg-ink/24">Nossa solução</p>
              <p className="mt-5 w-full max-w-none font-display text-[clamp(1.95rem,2.65vw,2.95rem)] leading-[1.03] tracking-[-0.025em] text-ink">
                A Ybera transforma resultado em valor percebido.
              </p>
              <p className="mt-8 font-display text-[clamp(1.45rem,2.05vw,2.1rem)] font-light leading-[1.08] tracking-[-0.02em] text-ink/78">
                <span className="block">Produto.</span>
                <span className="mt-2 block">Posicionamento.</span>
                <span className="mt-2 block">Estratégia.</span>
              </p>
            </article>
          </div>
        </section>

        <section className="bg-white px-6 py-16 sm:px-10 lg:px-14 lg:py-24 xl:px-20">
          <div className="mx-auto grid w-full max-w-[1240px] gap-9 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-14">
            <header className="max-w-[28rem]">
              <p className="section-kicker text-ink/48 before:bg-ink/24">Portfólio</p>
              <h2 className="mt-5 font-display text-[clamp(1.7rem,2.4vw,2.6rem)] leading-[1.06] tracking-[-0.02em]">
                Um portfólio pensado para gerar recorrência.
              </h2>
              <p className="mt-5 text-[15px] font-light leading-[1.78] text-ink/64">
                Tratamento, manutenção e finalização trabalhando juntos no dia a dia do salão.
              </p>
            </header>
            <div
              className="relative overflow-hidden bg-[#f6f2ed] p-5 shadow-[0_26px_60px_-36px_rgba(24,21,18,0.34)] sm:p-7"
              onMouseEnter={() => setPortfolioPaused(true)}
              onMouseLeave={() => setPortfolioPaused(false)}
            >
              <div className="relative flex items-end gap-4 sm:gap-5">
                <figure className="relative min-w-0 flex-1 overflow-hidden">
                  <img
                    key={activePortfolioItem.src}
                    src={activePortfolioItem.src}
                    alt={activePortfolioItem.alt}
                    className="h-[22rem] w-full object-cover object-center transition-[opacity,transform] duration-500 ease-out sm:h-[26rem] sm:scale-[1.015]"
                  />
                </figure>
                <figure className="w-[28%] shrink-0 overflow-hidden">
                  <img
                    src={nextPortfolioItem.src}
                    alt=""
                    aria-hidden
                    className="h-[18rem] w-full object-cover object-center opacity-88 sm:h-[21rem]"
                  />
                </figure>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink/46">
                  Mix profissional Ybera
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPortfolioIndex((i) => (i - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length)}
                    className="inline-flex h-9 w-9 items-center justify-center border border-black/[0.12] text-ink/70 transition hover:border-black/25 hover:text-ink"
                    aria-label="Produto anterior"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => setPortfolioIndex((i) => (i + 1) % PORTFOLIO_ITEMS.length)}
                    className="inline-flex h-9 w-9 items-center justify-center border border-black/[0.12] text-ink/70 transition hover:border-black/25 hover:text-ink"
                    aria-label="Próximo produto"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-20 sm:px-10 lg:px-14 lg:py-28 xl:px-20">
          <div className="mx-auto w-full max-w-[1240px]">
            <p className="section-kicker text-ink/48 before:bg-ink/24">Benefícios</p>
            <div className="mt-11 grid gap-5 md:grid-cols-2">
              {BENEFITS.map((item, index) => (
                <article
                  key={item.title}
                  className={`relative overflow-hidden border p-8 transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_18px_36px_-24px_rgba(24,21,18,0.22)] ${
                    index === 0
                      ? "border-black/[0.16] bg-[#f1e9df]"
                      : "border-black/[0.08] bg-[#f8f5f1]"
                  }`}
                >
                  <h3 className="font-display text-[1.52rem] leading-[1.05] tracking-[-0.02em] text-ink">{item.title}</h3>
                  <p className="mt-5 text-[15px] font-light leading-[1.75] text-ink/60">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f6f2ed] px-6 py-14 sm:px-10 lg:px-14 lg:py-20 xl:px-20">
          <div className="mx-auto grid w-full max-w-[1240px] gap-10 lg:grid-cols-[minmax(0,38%)_minmax(0,62%)] lg:items-start lg:gap-16">
            <header className="max-w-[26rem]">
              <p className="section-kicker text-ink/48 before:bg-ink/24">Prova de resultado</p>
              <h2 className="mt-5 font-display text-[clamp(1.9rem,2.7vw,3rem)] leading-[1.06] tracking-[-0.02em]">
                Evidência visual que converte cliente em recorrência.
              </h2>
            </header>
            <figure className="relative overflow-hidden bg-[#e9e4dd] shadow-[0_26px_60px_-36px_rgba(24,21,18,0.34)]">
              <img
                src="/images/37.jpg"
                alt="Resultado de brilho e alinhamento com before e after"
                className="h-full w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/55" />
              <span className="absolute left-4 top-4 text-[9px] font-medium uppercase tracking-[0.16em] text-white/84">Antes</span>
              <span className="absolute right-4 top-4 text-[9px] font-medium uppercase tracking-[0.16em] text-white/84">Depois</span>
            </figure>
          </div>
        </section>

        <section className="bg-white px-6 py-16 sm:px-10 lg:px-14 lg:py-24 xl:px-20">
          <div className="mx-auto w-full max-w-[1240px]">
            <p className="section-kicker text-ink/48 before:bg-ink/24">Como funciona</p>
            <div className="mt-12 grid gap-10 border-y border-black/[0.08] py-8 md:gap-12 lg:grid-cols-3 lg:gap-14 lg:py-10">
              {STEPS.map((item) => (
                <article key={item.step} className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink/34">{item.step}</p>
                  <h3 className="mt-5 font-display text-[1.62rem] leading-[1.05] tracking-[-0.02em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-5 max-w-[30ch] text-[15px] font-light leading-[1.78] text-ink/60">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f6f2ed] px-6 pb-0 pt-20 sm:px-10 lg:px-14 lg:pb-0 lg:pt-28 xl:px-20">
          <div className="mx-auto w-full max-w-[1240px]">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-center lg:gap-16">
              <div>
                <p className="section-kicker text-ink/48 before:bg-ink/24">Para quem é</p>
                <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(1.7rem,2.7vw,2.7rem)] leading-[1.08] tracking-[-0.02em] text-ink">
                  Para quem quer mais do que executar técnica.
                </h2>
                <div className="mt-8 space-y-6 border-t border-black/[0.08] pt-7">
                  {TARGETS.map((target) => (
                    <article key={target} className="border-b border-black/[0.08] pb-6 last:border-b-0 last:pb-0">
                      <p className="w-full max-w-none text-[17px] font-light leading-[1.42] tracking-[-0.012em] text-ink/80 md:text-[19px] md:leading-[1.38]">
                        {target}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <figure className="overflow-hidden shadow-[0_26px_60px_-36px_rgba(24,21,18,0.34)]">
                <img
                  src="/images/profissional1.png"
                  alt="Produto em contexto de salão com estética editorial premium"
                  className="h-[24rem] w-full object-cover object-center md:h-[30rem] lg:h-[36rem]"
                />
              </figure>
            </div>

            <div
              id="cadastro-profissional"
              className="relative left-1/2 mt-16 w-screen -translate-x-1/2 overflow-hidden bg-[#0B0B0B] bg-[url('/images/bg-pro.png')] bg-cover bg-no-repeat px-0 section-y text-white max-lg:bg-left lg:mt-20 lg:bg-center"
            >
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/60"
                aria-hidden="true"
              />
              <div className="relative z-[1] mx-auto grid w-full max-w-site shell-px gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
                <div className="overflow-hidden">
                  <img
                    src="/images/pro-art-people.png"
                    alt="Profissionais Ybera em ambiente de salão"
                    className="h-[26rem] w-full object-cover grayscale-[8%] transition duration-700 hover:scale-[1.02] max-lg:object-left md:h-[34rem] lg:h-[42rem]"
                  />
                </div>

                <div className="text-center lg:pl-8 lg:text-left">
                  <p className="section-kicker mx-auto justify-center text-white/55 before:bg-white/35 lg:mx-0 lg:justify-start">
                    Rede profissional Ybera
                  </p>
                  <h2 className="mx-auto mt-4 max-w-[26ch] font-display text-[clamp(1.65rem,2.4vw,2.45rem)] leading-[1.12] tracking-[-0.02em] text-white lg:mx-0">
                    Descubra o potencial do seu salão com o Ybera PRO.
                  </h2>
                  <p className="mx-auto mt-4 max-w-[34ch] text-[15px] font-light leading-[1.75] text-white/68 md:text-[16px] lg:mx-0">
                    Uma nova forma de crescer — com consistência, valor e direção.
                  </p>
                  <a
                    href="https://www.figma.com/proto/dqE7klcUpSFkR1BWVAG0cO/Site---PRO?node-id=2130-9224&viewport=-34353%2C7820%2C0.8&t=f5tFh4IcYfmrpRMZ-9&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2130%3A9224&show-proto-sidebar=1&page-id=2%3A40"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-auto mt-6 inline-flex h-12 items-center justify-center gap-2 border border-white/75 bg-white/8 px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white no-underline transition duration-300 hover:bg-white hover:text-[#14110f] lg:mx-0"
                  >
                    Conhecer o PRO
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}

