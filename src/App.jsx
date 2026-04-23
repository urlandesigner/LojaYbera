import React from "react";
import {
  finalCta,
  heroStats,
  heroVisuals,
  vitrine3Items,
  productRailItems,
  realStories,
  resultsGallery,
  routineSteps,
  testimonials,
} from "./content";
import { Vitrine3Section } from "./components/escolhas/Vitrine3Section";
import {
  FooterSection,
  FinalCtaSection,
  Header,
  HeroSection,
  LaunchesSection,
  ManifestoSection,
  ProductRailSection,
  ProfessionalSection,
  RealStoriesSection,
  ResultsSection,
  RoutineSection,
  SensoryBlock,
  TestimonialsSection,
} from "./components/HomeSections";
import EditorialProductPage from "./components/EditorialProductPage";
import ProductPage from "./components/ProductPage";

/** Intervalo em ms entre cada benefício ativo na rotação automática. */
const CURATION_ROTATION_MS = 5000;

function CurationSection() {
  const resultNeeds = React.useMemo(
    () => [
      {
        title: "Brilho",
        text: "Reflexo imediato, com aparência saudável e luminosa.",
        image: "/images/frente1.png",
        imageAlt: "Cabelo com brilho, alinhamento e movimento",
      },
      {
        title: "Maciez",
        text: "Toque suave desde o primeiro uso, com mais maleabilidade.",
        image: "/images/frente2.png",
        imageAlt: "Cabelo com toque macio e movimento natural",
      },
      {
        title: "Alinhamento",
        text: "Fio disciplinado, com menos frizz e mais controle ao longo do dia.",
        image: "/images/costas.png",
        imageAlt: "Resultado com alinhamento e disciplina do fio",
      },
      {
        title: "Força",
        text: "Mais resistência e menos quebra, com estrutura visivelmente recuperada.",
        image: "/images/mirra5.jpg.webp",
        imageAlt: "Fios com aspecto mais forte e recuperado",
      },
      {
        title: "Leveza",
        text: "Movimento natural, sem pesar ou comprometer o volume.",
        image: "/images/24.jpg.webp",
        imageAlt: "Cabelo leve, com movimento e volume equilibrado",
      },
    ],
    [],
  );

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [rotationPaused, setRotationPaused] = React.useState(false);

  React.useEffect(() => {
    if (rotationPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % resultNeeds.length);
    }, CURATION_ROTATION_MS);

    return () => window.clearInterval(id);
  }, [rotationPaused, resultNeeds.length]);

  return (
    <div className="mx-auto w-full max-w-site shell-px">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14 xl:gap-20">
          <div className="lg:sticky lg:top-28">
            <p className="section-kicker">ESCOLHA PELO RESULTADO</p>
            <h2 className="mt-4 max-w-2xl font-display text-[2.45rem] leading-[1.18] tracking-[-0.01em] text-ink md:mt-6 md:text-7xl md:leading-[1.16]">
              Seu cabelo não precisa de mais produtos. Precisa do cuidado certo.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-ink/64 md:mt-7 md:leading-8 md:text-lg">
              Menos excesso. Mais intenção no resultado que você vê e sente.
            </p>
            <div className="mt-5 md:mt-10">
              <a href="#produtos" className="button-editorial">
                ENCONTRAR MEU CUIDADO
                <span className="text-base leading-none">→</span>
              </a>
            </div>
          </div>

          <div
            className="grid gap-6 md:gap-10"
            onMouseEnter={() => setRotationPaused(true)}
            onMouseLeave={() => setRotationPaused(false)}
          >
            <div className="relative h-[17rem] overflow-hidden bg-white md:h-[38rem]">
              {resultNeeds.map((item, index) => {
                const isShown = index === activeIndex;
                return (
                  <img
                    key={item.title}
                    src={item.image}
                    alt={item.imageAlt}
                    className={`absolute inset-0 h-full w-full object-cover object-center transition-[opacity,transform] duration-500 ease-out motion-reduce:duration-150 ${
                      isShown
                        ? "z-10 opacity-100"
                        : "z-0 opacity-0 pointer-events-none"
                    } hover:scale-[1.02]`}
                    aria-hidden={!isShown}
                  />
                );
              })}
            </div>

            <div className="divide-y divide-black/10 border-y border-black/10 md:hidden">
              {resultNeeds.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="group/need w-full py-4 text-left"
                    aria-expanded={isActive}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3
                        className={`font-display text-[2rem] leading-none transition-[color,font-weight,transform] duration-[230ms] ease-out motion-reduce:transform-none ${
                          isActive
                            ? "font-medium text-ink -translate-y-px"
                            : "font-normal text-ink/[0.56] group-hover/need:text-ink/[0.62] group-hover/need:-translate-y-px"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <span
                        className={`shrink-0 text-[0.8125rem] leading-none tracking-[-0.02em] text-ink transition-[opacity,transform] duration-[230ms] ease-out motion-reduce:transform-none ${
                          isActive
                            ? "opacity-100 group-hover/need:translate-x-[2px]"
                            : "opacity-[0.35] group-hover/need:translate-x-[2px]"
                        }`}
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                    {isActive ? (
                      <p className="max-w-md pt-3 text-sm leading-7 text-ink/[0.88] transition-[color,opacity] duration-[230ms] ease-out">
                        {item.text}
                      </p>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div className="hidden divide-y divide-black/10 border-y border-black/10 md:block">
              {resultNeeds.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <a
                    key={item.title}
                    href="#produtos"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className="group/row grid min-w-0 gap-4 py-6 md:grid-cols-[15.5rem_minmax(0,1fr)_2rem] md:items-start md:gap-x-8 md:gap-y-0"
                  >
                    <h3
                      className={`min-w-0 font-display text-4xl leading-[1.05] transition-[color,font-weight,transform] duration-[230ms] ease-out motion-reduce:transform-none md:text-5xl ${
                        isActive
                          ? "font-medium text-ink -translate-y-px"
                          : "font-normal text-ink/[0.56] group-hover/row:text-ink/[0.64] group-hover/row:-translate-y-px"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`min-w-0 max-w-lg self-start text-sm leading-7 transition-[color,opacity] duration-[230ms] ease-out md:pt-[0.55rem] md:text-base md:leading-relaxed ${
                        isActive
                          ? "text-ink/[0.88]"
                          : "text-ink/[0.6] group-hover/row:text-ink/[0.68]"
                      }`}
                    >
                      {item.text}
                    </p>
                    <span
                      className={`shrink-0 justify-self-end self-start text-[0.8125rem] leading-none tracking-[-0.02em] text-ink transition-[opacity,transform] duration-[230ms] ease-out motion-reduce:transform-none md:pt-[0.55rem] ${
                        isActive
                          ? "opacity-100 group-hover/row:translate-x-[2px]"
                          : "opacity-[0.35] group-hover/row:translate-x-[2px]"
                      }`}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
    </div>
  );
}

export default function App() {
  const pathname = window.location.pathname;
  // Section oculta temporariamente por não agregar valor na jornada atual.
  // Manter para possível uso futuro.
  const showResultadoRealSection = false;

  if (pathname.startsWith("/experiencia")) {
    return <EditorialProductPage />;
  }

  if (pathname.startsWith("/produto")) {
    return <ProductPage />;
  }

  return (
    <div className="min-h-screen bg-pearl text-ink">
      <Header />
      <main>
        <HeroSection stats={heroStats} visuals={heroVisuals} />
        <LaunchesSection items={productRailItems} />
        <ManifestoSection />
        <ProductRailSection items={productRailItems} />
        <section id="curadoria" className="bg-[#f7f2ec] py-[84px]">
          {showResultadoRealSection && <SensoryBlock />}
          <CurationSection />
        </section>
        <div className="bg-[#0B0B0B]">
          <ResultsSection items={resultsGallery} />
        </div>
        <RoutineSection steps={routineSteps} />
        <Vitrine3Section items={vitrine3Items} />
        <TestimonialsSection items={testimonials} />
        <div className="bg-[#FFFFFF] px-0 py-0">
          <div
            className="mx-auto w-full max-w-site shell-px border-t border-black/10"
            role="separator"
            aria-hidden="true"
          />
        </div>
        <RealStoriesSection items={realStories} />
        <ProfessionalSection />
        <FinalCtaSection cta={finalCta} />
        <FooterSection />
      </main>
    </div>
  );
}
