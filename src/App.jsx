import React from "react";
import {
  finalCta,
  heroStats,
  heroVisuals,
  productHighlights,
  productRailItems,
  realStories,
  resultsGallery,
  routineSteps,
  testimonials,
} from "./content";
import {
  FooterSection,
  FinalCtaSection,
  Header,
  HeroSection,
  LaunchesSection,
  ManifestoSection,
  ProductRailSection,
  ProductHighlightsSection,
  ProfessionalSection,
  RealStoriesSection,
  ResultsSection,
  RoutineSection,
  SensoryBlock,
  TestimonialsSection,
} from "./components/HomeSections";
import EditorialProductPage from "./components/EditorialProductPage";
import ProductPage from "./components/ProductPage";

function CurationSection() {
  const resultNeeds = [
    {
      title: "Brilho",
      text: "Reflexo imediato, com aparência saudável e luminosa.",
    },
    {
      title: "Maciez",
      text: "Toque suave desde o primeiro uso, com mais maleabilidade.",
    },
    {
      title: "Alinhamento",
      text: "Fio disciplinado, com menos frizz e mais controle ao longo do dia.",
    },
    {
      title: "Força",
      text: "Mais resistência e menos quebra, com estrutura visivelmente recuperada.",
    },
    {
      title: "Leveza",
      text: "Movimento natural, sem pesar ou comprometer o volume.",
    },
  ];
  const [openNeed, setOpenNeed] = React.useState(resultNeeds[0].title);

  return (
    <div className="mx-auto w-full max-w-[1440px] shell-px pb-16 pt-10 lg:pb-32 lg:pt-12 xl:pb-40 xl:pt-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14 xl:gap-20">
          <div className="lg:sticky lg:top-28">
            <p className="section-kicker">ESCOLHA PELO RESULTADO</p>
            <h2 className="mt-4 max-w-2xl font-display text-[2.45rem] leading-[0.96] text-ink md:mt-6 md:text-7xl">
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

          <div className="grid gap-6 md:gap-10">
            <div className="overflow-hidden bg-white">
              <img
                src="/images/frente1.png"
                alt="Cabelo com brilho, alinhamento e movimento"
                className="h-[17rem] w-full object-cover object-center transition duration-700 hover:scale-[1.02] md:h-[38rem]"
              />
            </div>

            <div className="divide-y divide-black/10 border-y border-black/10 md:hidden">
              {resultNeeds.map((item) => {
                const isOpen = openNeed === item.title;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setOpenNeed(item.title)}
                    className="w-full py-4 text-left transition"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-[2rem] leading-none text-ink">
                        {item.title}
                      </h3>
                      <span className="text-lg leading-none text-ink/48">
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>
                    {isOpen ? (
                      <p className="max-w-md pt-3 text-sm leading-7 text-ink/58">
                        {item.text}
                      </p>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div className="hidden divide-y divide-black/10 border-y border-black/10 md:block">
              {resultNeeds.map((item) => (
                <a
                  key={item.title}
                  href="#produtos"
                  className="group grid gap-4 py-6 transition md:grid-cols-[0.38fr_0.62fr] md:items-center"
                >
                  <h3 className="font-display text-4xl leading-none text-ink transition duration-300 group-hover:text-mocha md:text-5xl">
                    {item.title}
                  </h3>
                  <p className="max-w-md text-sm leading-7 text-ink/58 md:text-base">
                    {item.text}
                  </p>
                </a>
              ))}
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
        <ManifestoSection />
        <LaunchesSection items={productRailItems} />
        <ProductRailSection items={productRailItems} />
        <section id="curadoria" className="bg-[#f7f2ec]">
          {showResultadoRealSection && <SensoryBlock />}
          <CurationSection />
        </section>
        <div className="bg-[#0B0B0B]">
          <ResultsSection items={resultsGallery} />
        </div>
        <RoutineSection steps={routineSteps} />
        <ProductHighlightsSection items={productHighlights} />
        <TestimonialsSection items={testimonials} />
        <div className="bg-[#FFFFFF] px-0 py-6 lg:py-8">
          <div
            className="mx-auto w-full max-w-[1440px] shell-px border-t border-black/10"
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
