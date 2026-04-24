import React from "react";
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

/** Fase do método Ybera para filtro editorial (sem UI de e-commerce). */
const PHASE = {
  TODOS: "todos",
  PREPARAR: "preparar",
  TRATAR: "tratar",
  SUSTENTAR: "sustentar",
};

const CATALOG_FILTERS = [
  { id: PHASE.TODOS, label: "Todos" },
  { id: PHASE.PREPARAR, label: "Preparar" },
  { id: PHASE.TRATAR, label: "Tratar" },
  { id: PHASE.SUSTENTAR, label: "Sustentar" },
];

const catalogItems = [
  {
    phase: PHASE.TRATAR,
    tag: "Lançamento",
    productName: "Óleo de Mirra Reparador",
    note: "Uso contínuo para selar brilho e toque ao longo dos dias.",
    price: "R$ 69,90",
    image: "/images/21.png",
    href: "/produto/oleo-de-mirra-reparador",
  },
  {
    phase: PHASE.PREPARAR,
    tag: "Essencial",
    productName: "Shampoo Multifuncional",
    note: "Uso constante no início do cuidado, com ritmo leve.",
    price: "R$ 107,90",
    image: "/images/7.png",
    href: "/produto/shampoo-multifuncao-cuidados-profundos",
  },
  {
    phase: PHASE.TRATAR,
    tag: "Tratamento",
    productName: "Máscara 2 em 1 Protect Control",
    note: "Aplicação recorrente para textura mais uniforme.",
    price: "R$ 107,90",
    image: "/images/15.png",
    href: "#produtos",
  },
  {
    phase: PHASE.SUSTENTAR,
    tag: "Finalização",
    productName: "Soro Vello Alfa-Lactobaby",
    note: "Cuidado contínuo para disciplina e leveza no dia a dia.",
    price: "R$ 249,90",
    image: "/images/16.png",
    href: "#produtos",
  },
  {
    phase: PHASE.TRATAR,
    tag: "Profissional",
    productName: "Escova Progressiva",
    note: "Uso frequente para manter o efeito ao longo do dia.",
    price: "R$ 99,90",
    image: "/images/17.png",
    href: "#produtos",
  },
  {
    phase: PHASE.SUSTENTAR,
    tag: "Preferido dos profissionais",
    productName: "Leave-in Disciplinante",
    note: "Repetição no cuidado para manter o fio obediente e leve.",
    price: "R$ 89,90",
    image: "/images/18.png",
    href: "#produtos",
  },
  {
    phase: PHASE.SUSTENTAR,
    tag: "Uso contínuo",
    productName: "Finalizador de Brilho",
    note: "Camadas leves ao longo da semana para sustentar o brilho.",
    price: "R$ 119,90",
    image: "/images/19.png",
    href: "#produtos",
  },
  {
    phase: PHASE.TRATAR,
    tag: "Ritual",
    productName: "Tratamento Nutritivo",
    note: "Rotina estável para corpo e maciez sem pesar.",
    price: "R$ 139,90",
    image: "/images/20.png",
    href: "#produtos",
  },
  {
    phase: PHASE.SUSTENTAR,
    tag: "Assinatura",
    productName: "Mirra Signature Care",
    note: "Recorrência no ritual para manter presença e brilho contidos.",
    price: "R$ 159,90",
    image: "/images/31.png",
    href: "#produtos",
  },
];

export default function CatalogPage() {
  const [activePhase, setActivePhase] = React.useState(PHASE.TODOS);

  const filteredItems = React.useMemo(() => {
    if (activePhase === PHASE.TODOS) return catalogItems;
    return catalogItems.filter((item) => item.phase === activePhase);
  }, [activePhase]);

  return (
    <div className="min-h-screen bg-white text-ink">
      <Header solid />
      <main className="pt-[calc(5rem+1px)]">
        <section className="bg-white section-y-cards">
          <div className="mx-auto w-full max-w-site shell-px">
            <div className="max-w-3xl section-lead">
              <p className="section-kicker">Catálogo</p>
              <h1 className="mt-4 font-display text-[28px] leading-[1.2] text-ink md:text-6xl md:leading-[0.96]">
                Escolha o cuidado certo
              </h1>
              <p className="mt-4 text-[16px] leading-[1.5] text-ink/66 md:text-lg md:leading-8">
                Uma seleção pensada para brilho, textura e movimento ao longo do dia
              </p>
            </div>

            <div
              className="mt-6 -mx-4 mb-8 flex justify-start overflow-x-auto overflow-y-hidden px-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
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

            <div
              key={activePhase}
              className="grid grid-cols-2 items-start gap-1 sm:gap-1.5 lg:grid-cols-3 lg:items-stretch lg:gap-2 animate-catalog-filter-reveal motion-reduce:animate-none"
            >
              {filteredItems.map((item) => (
                <a
                  key={item.productName}
                  href={item.href}
                  className="group relative flex min-h-0 w-full shrink-0 flex-col items-center overflow-hidden bg-[#F6F4F2] p-3 text-center transition duration-500 hover:-translate-y-1 sm:p-4 md:p-5 lg:min-h-[38rem] xl:min-h-[40rem]"
                >
                  <p className="self-start inline-flex items-center border border-black/6 bg-white px-2.5 py-1 text-[9px] font-semibold uppercase leading-normal tracking-[0.2em] text-ink">
                    {item.tag}
                  </p>

                  <div className="relative mt-3 flex w-full flex-none flex-col items-center justify-center px-2 py-1 lg:mt-6 lg:min-h-[15rem] lg:max-h-[21rem] lg:flex-[1_1_auto] lg:px-3 lg:pb-1">
                    <div className="absolute inset-0 z-[1] bg-black/0 transition duration-300 group-hover:bg-black/[0.04]" />
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="relative z-[2] h-auto max-h-[min(100%,15.5rem)] w-auto max-w-[82%] object-contain object-center transition duration-300 ease-out group-hover:scale-[1.02] sm:max-h-[min(100%,16.5rem)] md:max-h-[min(100%,17.5rem)]"
                    />
                  </div>

                  <div className="flex w-full max-w-full flex-col items-center px-1 pb-1 pt-2 sm:px-2 sm:pt-4 lg:mt-auto">
                    <h2 className="max-w-[min(100%,34ch)] text-balance text-pretty font-display text-[22px] font-light leading-[1.3] tracking-[-0.03em] text-ink sm:max-w-[min(100%,38ch)] md:text-[1.85rem] md:leading-[1.08] lg:text-[1.98rem] xl:text-[2.08rem]">
                      {item.productName}
                    </h2>
                    <p className="mt-2 max-w-[min(100%,38ch)] text-[16px] font-light leading-[1.5] text-ink/54 sm:mt-3.5 sm:max-w-[min(100%,42ch)] md:text-[0.8125rem] md:leading-relaxed lg:text-[0.875rem]">
                      {item.note}
                    </p>
                    <p className="mt-4 text-[15px] font-medium leading-[1.6] tabular-nums tracking-[0.02em] text-ink/66 sm:mt-6 md:text-[16px] md:leading-normal">
                      {catalogPriceDisplay(item.price)}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
