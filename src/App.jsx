import React from "react";
import {
  finalCta,
  heroStats,
  heroVisuals,
  vitrine3Items,
  productRailItems,
  resultsGallery,
  routineSteps,
  socialProofStories,
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
  ResultsSection,
  RoutineSection,
  SensoryBlock,
  SocialProofEditorialSection,
} from "./components/HomeSections";
import EditorialProductPage from "./components/EditorialProductPage";
import ProductPage from "./components/ProductPage";
import CatalogPage from "./components/CatalogPage";
import CurationSection from "./components/CurationSection";
import ProfessionalLinePage from "./components/ProfessionalLinePage";
import BrandInstitutionalPage from "./components/BrandInstitutionalPage";

/** Após abrir a home com hash (ex.: /#rotina), garante scroll à secção quando o DOM estiver pronto. */
function HomeHashScroll() {
  React.useEffect(() => {
    const raw = window.location.hash?.replace(/^#/, "");
    if (!raw) {
      return undefined;
    }
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const behavior = reduceMotion ? "auto" : "smooth";

    const scrollToTarget = () => {
      const el = document.getElementById(raw);
      if (el) {
        el.scrollIntoView({ behavior, block: "start" });
      }
    };

    scrollToTarget();
    const t1 = window.setTimeout(scrollToTarget, 120);
    const t2 = window.setTimeout(scrollToTarget, 400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return null;
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

  if (pathname.startsWith("/catalogo")) {
    return <CatalogPage />;
  }

  if (pathname.startsWith("/linha-profissional")) {
    return <ProfessionalLinePage />;
  }

  if (pathname.startsWith("/marca")) {
    return <BrandInstitutionalPage />;
  }

  return (
    <div className="min-h-screen bg-pearl text-ink">
      <Header />
      <HomeHashScroll />
      <main>
        <HeroSection stats={heroStats} visuals={heroVisuals} />
        <ProductRailSection items={productRailItems} />
        <ManifestoSection />
        <LaunchesSection items={productRailItems} />
        <section id="curadoria" className="bg-[#f7f2ec] section-y-cards max-lg:!pt-6 max-lg:!pb-5">
          {showResultadoRealSection && <SensoryBlock />}
          <CurationSection />
        </section>
        <div className="bg-[#0B0B0B]">
          <ResultsSection items={resultsGallery} />
        </div>
        <RoutineSection steps={routineSteps} />
        <Vitrine3Section items={vitrine3Items} />
        <SocialProofEditorialSection stories={socialProofStories} />
        <ProfessionalSection />
        <FinalCtaSection cta={finalCta} />
        <FooterSection />
      </main>
    </div>
  );
}
