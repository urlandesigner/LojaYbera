import React from "react";
import { FooterSection, Header, RoutineSection } from "./HomeSections";
import { routineSteps } from "../content";

const GROUP_BRANDS = [
  {
    name: "Ybera Paris",
    logo: "/images/paris.png",
    brandName: "Ybera Paris",
    description: "Cuidado capilar com leitura sofisticada, textura refinada e presença premium.",
  },
  {
    name: "Fashion Gold",
    logo: "/images/fashion.png",
    brandName: "Fashion Gold",
    description: "Rotina profissional para transformar textura, brilho e movimento dos fios.",
  },
  {
    name: "Terra Coco",
    logo: "/images/terracoco.png",
    brandName: "Terra Coco",
    description: "Cuidado inspirado em ativos naturais, com nutrição, leveza e sensorialidade.",
  },
  {
    name: "Black Diva",
    logo: "/images/blackdiva.png",
    brandName: "Black Diva",
    description: "Beleza, força e cuidado para cabelos com identidade, presença e expressão.",
  },
];

export default function BrandInstitutionalPage() {
  const brandsCarouselRef = React.useRef(null);
  const brandsCarouselIndexRef = React.useRef(0);
  const [brandsCarouselPaused, setBrandsCarouselPaused] = React.useState(false);

  React.useEffect(() => {
    const rail = brandsCarouselRef.current;
    if (!rail || GROUP_BRANDS.length <= 1) {
      return undefined;
    }
    if (typeof window === "undefined") {
      return undefined;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const items = Array.from(rail.querySelectorAll("[data-brand-item]"));
    if (!items.length) {
      return undefined;
    }

    const id = window.setInterval(() => {
      if (brandsCarouselPaused) return;
      const nextIndex = (brandsCarouselIndexRef.current + 1) % items.length;
      brandsCarouselIndexRef.current = nextIndex;
      const el = items[nextIndex];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      }
    }, 3600);

    return () => window.clearInterval(id);
  }, [brandsCarouselPaused]);

  return (
    <div className="min-h-screen bg-[#f5f2ee] text-[#171310]">
      <Header />

      <main className="mt-0">
        <section id="hero" className="relative min-h-[min(96vh,64rem)] overflow-hidden bg-[#12100f] text-white">
          <div className="absolute inset-0">
            <img
              src="/images/marca.png"
              alt="Retrato editorial com cabelo em destaque"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(102deg,rgba(10,8,7,0.84)_0%,rgba(10,8,7,0.56)_42%,rgba(10,8,7,0.24)_100%)]" />
          </div>
          <div className="relative mx-auto flex min-h-[inherit] w-full max-w-site flex-col justify-end px-[clamp(1.125rem,0.65rem+2.8vw,3.25rem)] pb-16 pt-20 sm:pb-20 sm:pt-24 md:pb-24 md:pt-28 lg:pb-28 lg:pt-32">
            <div className="max-w-[40rem]">
              <p className="section-kicker text-white/80 before:bg-white/45">Ybera</p>
              <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(2rem,5vw,4rem)] leading-[1.02] tracking-[-0.03em] text-white">
                Beleza que se revela
                <br />
                no cuidado.
              </h1>
              <p className="mt-6 max-w-[36ch] text-[15px] font-light leading-[1.8] text-white sm:text-base">
                O resultado ganha forma ao longo do tempo, quando o gesto certo vira linguagem e o cabelo responde
                com naturalidade.
              </p>
              <a
                href="/catalogo"
                className="mt-9 inline-flex h-12 items-center justify-center gap-2 border border-white/75 bg-white/12 px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white no-underline transition duration-300 hover:border-white hover:bg-white hover:text-[#14110f]"
              >
                Conhecer produtos
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section-y bg-[#f5f2ee]">
          <div className="mx-auto grid w-full max-w-site gap-10 shell-px lg:grid-cols-[1.04fr_0.96fr] lg:items-start lg:gap-16">
            <div>
              <p className="section-kicker text-[#2b2420]/58 before:bg-[#2b2420]/28">Origem da marca</p>
              <h2 className="mt-4 font-display text-[30px] font-light leading-[1.14] tracking-[-0.02em] md:text-[3.15rem]">
                Nascemos do olhar profissional.
              </h2>
              <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.78] text-[#2f2924]/72 md:text-[1.04rem]">
                Ybera nasce do uso real. De bancada, espelho, repetição e critério. O olhar profissional sempre foi
                o ponto de partida.
              </p>
              <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.78] text-[#2f2924]/72 md:text-[1.04rem]">
                Entendemos como o fio se comporta em textura, queda e movimento. Por isso o posicionamento e
                silencioso: menos promessa, mais linguagem de autoria.
              </p>
            </div>
            <figure className="overflow-hidden bg-[#ddd2c6] shadow-[0_26px_60px_-36px_rgba(24,21,18,0.34)]">
              <img
                src="/images/40.jpg.webp"
                alt="Ambiente editorial da marca"
                className="h-full w-full object-cover object-center"
              />
            </figure>
          </div>
        </section>

        <section className="section-y bg-white">
          <div className="mx-auto max-w-[58rem] shell-px text-center">
            <p className="section-kicker mx-auto justify-center text-[#2b2420]/52 before:bg-[#2b2420]/24">Filosofia</p>
            <h2 className="mt-4 font-display text-[30px] font-light leading-[1.14] tracking-[-0.02em] md:text-[3rem]">
              O resultado só permanece quando o cuidado se repete.
            </h2>
            <p className="mx-auto mt-6 max-w-[46ch] text-[15px] leading-[1.85] text-[#2f2924]/72 md:text-[1.04rem]">
              Menos excesso, mais intencao. Quando o gesto ganha precisao, o fio muda de postura: mais estavel, mais
              legivel, mais seu.
            </p>
          </div>
        </section>

        <RoutineSection steps={routineSteps} />

        <section className="section-y bg-[#14100d] text-white">
          <div className="mx-auto grid w-full max-w-site gap-10 shell-px lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16">
            <figure className="overflow-hidden shadow-[0_26px_60px_-36px_rgba(0,0,0,0.5)]">
              <img src="/images/51.jpg" alt="Fios com brilho e movimento" className="h-full w-full object-cover object-center" />
            </figure>
            <div>
              <p className="section-kicker text-white/56 before:bg-white/30">Ybera + Ana Castela</p>
              <p className="mt-5 font-display text-[2rem] font-light leading-[1.08] tracking-[-0.02em] md:text-[2.9rem]">
                Resultado que se sustenta no tempo.
              </p>
              <p className="mt-5 max-w-[40ch] text-[15px] leading-[1.75] text-white/72">
                Uma rotina construida com produtos profissionais, pensada para manter o fio alinhado, com brilho e
                leveza todos os dias.
              </p>
              <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/58">
                Ana Castela · Embaixadora Ybera
              </p>
            </div>
          </div>
        </section>

        <section className="section-y bg-[#f5f2ee]">
          <div className="mx-auto grid w-full max-w-site gap-10 shell-px lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:gap-16">
            <div>
              <p className="section-kicker text-[#2b2420]/58 before:bg-[#2b2420]/28">Contexto real</p>
              <h2 className="mt-4 font-display text-[30px] font-light leading-[1.14] tracking-[-0.02em] md:text-[2.8rem]">
                Onde a Ybera acontece
              </h2>
              <p className="mt-6 max-w-[44ch] text-[15px] leading-[1.8] text-[#2f2924]/72">
                Em salão, no lavatório, na finalização, no retorno da cliente. A marca vive onde o fio é observado de
                perto e cada escolha precisa sustentar o próximo atendimento.
              </p>
              <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.8] text-[#2f2924]/72">
                É nessa troca diária com especialistas que o repertório se amplia e o detalhe ganha valor prático.
              </p>
            </div>
            <figure className="overflow-hidden shadow-[0_26px_60px_-36px_rgba(24,21,18,0.34)]">
              <img src="/images/45.JPG" alt="Aplicação em contexto profissional real" className="h-full w-full object-cover object-center" />
            </figure>
          </div>
        </section>

        <section className="section-y bg-[#f5f2ee]">
          <div className="mx-auto grid w-full max-w-site gap-10 shell-px lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <figure className="overflow-hidden shadow-[0_26px_60px_-36px_rgba(24,21,18,0.34)]">
              <img src="/images/pro-art-people.png" alt="Bastidores profissionais Ybera" className="h-full w-full object-cover object-center" />
            </figure>
            <div>
              <p className="section-kicker text-[#2b2420]/58 before:bg-[#2b2420]/28">Profissional por natureza</p>
              <p className="mt-5 max-w-[40ch] font-display text-[2rem] font-light leading-[1.08] tracking-[-0.02em] md:text-[2.75rem]">
                Nascemos no profissional. Evoluímos no detalhe.
              </p>
              <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.8] text-[#2f2924]/72">
                Conexão com salão, leitura de uso real e rigor em cada escolha. Autoridade vem de rotina vivida, não
                de discurso.
              </p>
            </div>
          </div>
        </section>

        <section className="section-y bg-white">
          <div className="mx-auto w-full max-w-site shell-px">
            <header className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-[2rem] font-light leading-[1.1] tracking-[-0.02em] text-[#171310] md:text-[3rem]">
                Um universo de cuidado em diferentes expressões.
              </h2>
              <p className="mx-auto mt-5 max-w-[46ch] text-[15px] leading-[1.78] text-[#2f2924]/70">
                A Ybera integra um ecossistema de marcas com linguagens próprias, criadas para diferentes rotinas,
                texturas e formas de cuidado.
              </p>
            </header>

            <div className="mt-12">
              <div
                ref={brandsCarouselRef}
                onMouseEnter={() => setBrandsCarouselPaused(true)}
                onMouseLeave={() => setBrandsCarouselPaused(false)}
                onTouchStart={() => setBrandsCarouselPaused(true)}
                onTouchEnd={() => setBrandsCarouselPaused(false)}
                className="brand-brands-carousel lg:hidden"
              >
                <div className="brand-brands-carousel-track">
                  {GROUP_BRANDS.map((brand) => (
                    <article
                      key={brand.name}
                      data-brand-item
                      className="brand-brands-carousel-slide min-w-0 max-w-full"
                    >
                      <img
                        src={brand.logo}
                        alt={`${brand.brandName} logo`}
                        className="h-[96px] w-auto max-w-full object-contain object-left md:h-[108px]"
                        loading="lazy"
                        decoding="async"
                      />
                      <p className="mt-3 max-w-full text-wrap text-[14px] font-light leading-[1.68] text-[#3a332d]/70 md:text-[15px]">
                        {brand.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="hidden w-full grid-cols-4 gap-8 lg:grid">
                {GROUP_BRANDS.map((brand) => (
                  <article key={`desktop-${brand.name}`} className="min-w-0">
                    <img
                      src={brand.logo}
                      alt={`${brand.brandName} logo`}
                      className="mx-auto h-[108px] w-auto max-w-full object-contain object-center"
                      loading="lazy"
                      decoding="async"
                    />
                    <p className="mx-auto mt-4 max-w-full text-center text-[15px] font-light leading-[1.7] text-[#3a332d]/70">
                      {brand.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative min-h-[62vh] w-full overflow-hidden bg-[#120f0c]">
          <img
            src="/images/53.png"
            alt="Retrato final editorial da marca"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,7,0.22)_0%,rgba(10,8,7,0.5)_44%,rgba(10,8,7,0.78)_100%)]" />
          <div className="relative mx-auto flex min-h-[62vh] w-full max-w-site items-end shell-px pb-14 pt-16 md:pb-16">
            <div className="max-w-[58rem] lg:pr-0">
              <p className="font-display text-[clamp(2rem,4.8vw,4rem)] font-light leading-[1.04] tracking-[-0.02em] text-white">
                <span className="block lg:whitespace-nowrap">
                  O cuidado certo <em className="italic">muda tudo</em>.
                </span>
                <span className="block lg:whitespace-nowrap">Descubra o seu.</span>
              </p>
              <a
                href="/catalogo"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 border border-white/75 bg-white/12 px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white no-underline transition duration-300 hover:border-white hover:bg-white hover:text-[#14110f]"
              >
                Explorar produtos
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
