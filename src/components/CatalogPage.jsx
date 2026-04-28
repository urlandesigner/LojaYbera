import React from "react";
import EditorialProductCard from "./EditorialProductCard";
import { FooterSection, Header } from "./HomeSections";

function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

function catalogPriceDisplay(price) {
  if (price == null) return "";
  const s = String(price).trim();
  const m = s.match(/R\$\s*[\d.,]+/);
  return m ? m[0].replace(/\s+/g, " ") : s;
}

const CATALOG_CRONOGRAMA_KIT_HREF = "/produto/shampoo-multifuncao-cuidados-profundos";

/** Hero full width — kit cronograma capilar, banner clicável inteiro. */
function CatalogHeroBanner() {
  return (
    <a
      href={CATALOG_CRONOGRAMA_KIT_HREF}
      className="group relative left-1/2 block w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden bg-[#ebe4dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      aria-label="Ver kit cronograma capilar — página do produto"
    >
      <div className="relative min-h-[19.5rem] w-full sm:min-h-[22.5rem] md:min-h-[26rem] lg:min-h-[min(34rem,52vh)] xl:min-h-[min(38rem,56vh)]">
        <img
          src="/images/3.jpg"
          alt="Kit cronograma capilar Ybera — hidratação, nutrição e reconstrução"
          className="absolute inset-0 z-0 h-full w-full min-h-full min-w-full object-cover object-center"
          decoding="async"
        />
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-t from-[#1a1612]/80 via-[#1a1612]/28 via-[42%] to-transparent sm:via-[38%] md:bg-[linear-gradient(100deg,rgba(24,20,17,0.78)_0%,rgba(24,20,17,0.32)_44%,rgba(24,20,17,0.06)_68%,transparent_100%)]"
          aria-hidden
        />
        <div className="relative z-[2] mx-auto flex h-full min-h-[inherit] w-full max-w-site flex-col justify-end px-[clamp(1.125rem,0.65rem+2.8vw,3.25rem)] pb-8 pt-20 text-center text-white sm:pb-9 sm:pt-24 md:justify-center md:pb-12 md:pt-28 md:text-left lg:pb-14 lg:pt-32">
          <div className="mx-auto w-full max-w-[24rem] md:mx-0 md:max-w-[26rem] lg:max-w-[30rem]">
            <p className="text-[11px] font-semibold uppercase leading-normal tracking-[0.22em] text-white sm:text-xs">
              Cronograma capilar
            </p>
            <h2 className="mt-3 font-display text-[1.5rem] font-light leading-[1.14] tracking-[-0.03em] text-white sm:mt-3.5 sm:text-[1.75rem] md:mt-4 md:text-4xl md:leading-[1.08] lg:text-[2.65rem] lg:leading-[1.04]">
              Seu cuidado completo em uma rotina.
            </h2>
            <p className="mt-3 text-[14px] font-light leading-[1.55] text-white sm:mt-3.5 sm:text-[15px] md:mt-4 md:max-w-[32ch] md:text-base md:leading-relaxed">
              Hidratação, nutrição e reconstrução para acompanhar cada fase do seu cabelo.
            </p>
            <span className="mt-6 inline-flex h-11 items-center justify-center gap-2 border border-white bg-white/10 px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition duration-300 group-hover:border-white group-hover:bg-white/18 sm:mt-7 md:mt-8 md:h-12 md:px-7">
              Ver kit cronograma
              <span className="text-sm font-normal leading-none text-white" aria-hidden>
                →
              </span>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

/** Fase do método Ybera para filtro editorial (sem UI de e-commerce). */
const PHASE = {
  TODOS: "todos",
  PREPARAR: "preparar",
  TRATAR: "tratar",
  SUSTENTAR: "sustentar",
};

const CATALOG_FILTERS = [
  { id: PHASE.TODOS, label: "Todos" },
  { id: PHASE.PREPARAR, label: "Limpeza" },
  { id: PHASE.TRATAR, label: "Tratamento" },
  { id: PHASE.SUSTENTAR, label: "Finalização" },
];

/** Slugs alinhados à home “Escolha pelo resultado” (`?resultado=`). */
const CATALOG_RESULTADO_QUERY = "resultado";
const VALID_RESULTADO_SLUGS = ["brilho", "maciez", "alinhamento", "forca", "leveza"];

function readResultadoFromSearch() {
  if (typeof window === "undefined") {
    return null;
  }
  const raw = new URLSearchParams(window.location.search).get(CATALOG_RESULTADO_QUERY);
  return raw && VALID_RESULTADO_SLUGS.includes(raw) ? raw : null;
}

const catalogItems = [
  {
    phase: PHASE.TRATAR,
    tag: "Mais vendido",
    productName: "Óleo de Mirra Reparador",
    note: "Reduz frizz e entrega brilho leve.",
    price: "R$ 69,90",
    image: "/images/21.png",
    href: "/produto/oleo-de-mirra-reparador",
    resultados: ["brilho", "maciez", "alinhamento", "leveza", "forca"],
  },
  {
    phase: PHASE.PREPARAR,
    tag: "Uso diário",
    productName: "Shampoo Multifuncional",
    note: "Limpa sem ressecar e prepara os fios.",
    price: "R$ 107,90",
    image: "/images/7.png",
    href: "/produto/shampoo-multifuncao-cuidados-profundos",
    resultados: ["maciez", "forca", "brilho", "alinhamento"],
  },
  {
    phase: PHASE.SUSTENTAR,
    tag: "Para frizz",
    productName: "Soro Vello Alfa-Lactobaby",
    note: "Controla o frizz e preserva o movimento.",
    price: "R$ 249,90",
    image: "/images/16.png",
    href: "/produto/oleo-de-mirra-reparador",
    resultados: ["leveza", "alinhamento", "brilho", "maciez", "forca"],
  },
  {
    phase: PHASE.TRATAR,
    tag: "Hidratação",
    productName: "Máscara 2 em 1 Protect Control",
    note: "Repõe hidratação e alinha a textura.",
    price: "R$ 107,90",
    image: "/images/15.png",
    href: "/produto/oleo-de-mirra-reparador",
    resultados: ["maciez", "alinhamento", "forca", "brilho"],
  },
  {
    phase: PHASE.TRATAR,
    tag: "Brilho intenso",
    productName: "Escova Progressiva",
    note: "Alinha os fios e prolonga o brilho.",
    price: "R$ 99,90",
    image: "/images/17.png",
    href: "/produto/oleo-de-mirra-reparador",
    resultados: ["alinhamento", "brilho", "forca", "maciez", "leveza"],
  },
  {
    phase: PHASE.SUSTENTAR,
    tag: "Para frizz",
    productName: "Leave-in Disciplinante",
    note: "Facilita a finalização e reduz o frizz.",
    price: "R$ 89,90",
    image: "/images/18.png",
    href: "/produto/oleo-de-mirra-reparador",
    resultados: ["alinhamento", "leveza", "maciez", "brilho"],
  },
  {
    phase: PHASE.SUSTENTAR,
    tag: "Brilho intenso",
    productName: "Finalizador de Brilho",
    note: "Realça o brilho e reduz a opacidade.",
    price: "R$ 119,90",
    image: "/images/19.png",
    href: "/produto/oleo-de-mirra-reparador",
    resultados: ["brilho", "leveza", "maciez", "alinhamento"],
  },
  {
    phase: PHASE.TRATAR,
    tag: "Hidratação",
    productName: "Tratamento Nutritivo",
    note: "Nutre os fios e devolve maciez.",
    price: "R$ 139,90",
    image: "/images/20.png",
    href: "/produto/oleo-de-mirra-reparador",
    resultados: ["maciez", "forca", "brilho"],
  },
  {
    phase: PHASE.SUSTENTAR,
    tag: "Uso diário",
    productName: "Mirra Signature Care",
    note: "Mantém brilho e controle no dia a dia.",
    price: "R$ 159,90",
    image: "/images/31.png",
    href: "/produto/oleo-de-mirra-reparador",
    resultados: ["brilho", "alinhamento", "maciez", "forca", "leveza"],
  },
];

export default function CatalogPage() {
  const [activePhase, setActivePhase] = React.useState(PHASE.TODOS);
  const [resultadoSlug, setResultadoSlug] = React.useState(() => readResultadoFromSearch());

  React.useEffect(() => {
    const sync = () => setResultadoSlug(readResultadoFromSearch());
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const filteredItems = React.useMemo(() => {
    let list = activePhase === PHASE.TODOS ? catalogItems : catalogItems.filter((item) => item.phase === activePhase);
    if (resultadoSlug) {
      list = list.filter((item) => item.resultados?.includes(resultadoSlug));
    }
    return list;
  }, [activePhase, resultadoSlug]);

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-ink">
      <Header solid />
      <main className="pt-[calc(5rem+1px)]">
        <CatalogHeroBanner />
        <section className="bg-white section-y-cards">
          <div className="mx-auto w-full max-w-site shell-px">
            <div className="max-w-3xl section-lead">
              <p className="section-kicker">Catálogo</p>
              <h1 className="mt-4 font-display text-[28px] leading-[1.2] text-ink md:text-6xl md:leading-[0.96]">
                Escolha o cuidado certo
              </h1>
              <p className="mt-4 text-[16px] leading-[1.5] text-ink/66 md:text-lg md:leading-8">
                Encontre o cuidado ideal para seu cabelo
              </p>
            </div>

            <div className="sticky top-[calc(5rem+1px)] z-40 -mx-4 mb-8 mt-6 bg-white py-2.5 sm:mx-0 sm:px-0">
              <div
                className="flex justify-start overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-0 [&::-webkit-scrollbar]:hidden"
                role="tablist"
                aria-label="Etapas do cuidado"
              >
                <div className="flex min-w-min flex-nowrap items-start gap-x-8">
                {CATALOG_FILTERS.map((f) => {
                  const isActive = activePhase === f.id;
                  return (
                    <span
                      key={f.id}
                      role="tab"
                      aria-selected={isActive}
                      tabIndex={0}
                      onClick={() => setActivePhase(f.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActivePhase(f.id);
                        }
                      }}
                      className={cn(
                        "inline-flex shrink-0 cursor-pointer select-none flex-col items-stretch border-0 bg-transparent p-0 text-left font-display text-[21px] font-normal leading-[1.15] tracking-[-0.02em] text-black outline-none transition-opacity duration-200 ease focus-visible:ring-1 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:text-[22px] md:text-[28px] lg:text-[32px]",
                        isActive ? "opacity-100" : "opacity-50 hover:opacity-100",
                      )}
                    >
                      <span className="whitespace-nowrap">{f.label}</span>
                      {isActive ? (
                        <span
                          aria-hidden
                          className="mt-1.5 block h-px w-full shrink-0 bg-current opacity-80"
                        />
                      ) : null}
                    </span>
                  );
                })}
                </div>
              </div>
            </div>

            <div
              id="catalogo-grid"
              key={activePhase}
              className="grid grid-cols-2 items-stretch gap-2.5 sm:gap-3 lg:grid-cols-3 lg:gap-2 animate-catalog-filter-reveal motion-reduce:animate-none scroll-mt-[calc(5rem+1.5rem)]"
            >
              {filteredItems.map((item) => (
                <EditorialProductCard
                  key={item.productName}
                  variant="catalog"
                  href={item.href}
                  tag={item.tag}
                  image={item.image}
                  imageAlt={item.productName}
                  title={item.productName}
                  subtitle={item.note}
                  price={catalogPriceDisplay(item.price)}
                  className="h-full min-h-0 w-full self-stretch"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
