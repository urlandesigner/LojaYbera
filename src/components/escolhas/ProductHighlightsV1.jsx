import React from "react";

const editorialTitle = "Os mais escolhidos para começar.";
const editorialDescription = "Seleção pensada para cada momento do cuidado.";

function EscolhasHeading() {
  return (
    <div className="max-w-3xl">
      <p className="section-kicker">Escolhas essenciais</p>
      <h2 className="mt-4 font-display text-[28px] leading-[1.2] tracking-[-0.01em] text-ink md:text-6xl md:leading-[1.2]">
        {editorialTitle}
      </h2>
      <p className="mt-4 text-[16px] leading-[1.5] text-ink/72 md:text-lg md:leading-8">{editorialDescription}</p>
    </div>
  );
}

/**
 * Escolhas essenciais — layout original (vitrine V1).
 */
export function ProductHighlightsV1({ items }) {
  const essentials = items.slice(0, 3);
  const heroProduct = essentials[0];
  const shampooProduct = essentials[1];
  const soroProduct = essentials[2];
  const mascaraProduct = items[3] ?? soroProduct;

  const strongCardOverlay =
    "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.1), transparent)";
  const soroCardOverlay =
    "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0.15), transparent)";

  if (!heroProduct || !shampooProduct || !soroProduct) {
    return null;
  }

  return (
    <section className="bg-pearl section-y-cards">
      <div className="mx-auto w-full max-w-site shell-px">
        <div className="section-lead">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <EscolhasHeading />
            <a href="#produtos" className="button-editorial hidden shrink-0 md:inline-flex">
              Ver produtos
              <span className="text-base leading-none">→</span>
            </a>
          </div>
          <a href="#produtos" className="mt-8 inline-flex md:hidden button-editorial-compact">
            Ver produtos
            <span className="text-sm leading-none">→</span>
          </a>
        </div>

        <div className="mt-0 flex min-w-0 flex-col gap-[16px]">
          <div className="grid min-w-0 grid-cols-1 gap-[16px] lg:grid-cols-[minmax(0,60%)_minmax(0,40%)] lg:items-start">
            <article className="group relative min-h-[16rem] w-full min-w-0 overflow-hidden bg-[#161412] sm:min-h-[17.5rem] lg:h-[360px] lg:min-h-[360px] lg:max-h-[360px]">
              <img
                src={heroProduct.image}
                alt={heroProduct.name}
                className="absolute inset-0 z-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{ backgroundImage: strongCardOverlay }}
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute bottom-6 left-6 right-6 z-[2] text-left sm:bottom-6 sm:left-6 sm:right-6">
                <p className="font-display text-[clamp(36px,4.8vw,56px)] font-medium leading-[1.12] tracking-[-0.012em] text-white line-clamp-2">
                  Escova progressiva
                </p>
                <p className="mt-1 line-clamp-2 max-w-full font-sans text-[11px] font-normal leading-[1.45] text-white/90 sm:text-[12px]">
                  {heroProduct.note}
                </p>
              </div>
            </article>

            <div className="flex min-h-0 w-full min-w-0 flex-col gap-[16px] lg:h-[360px] lg:min-h-[360px] lg:max-h-[360px]">
              <article className="group relative min-h-[9rem] w-full shrink-0 overflow-hidden bg-[#141210] lg:h-[172px] lg:min-h-[172px] lg:max-h-[172px]">
                <img
                  src="/images/12.png"
                  alt="Mirra"
                  className="absolute inset-0 z-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="pointer-events-none absolute inset-0 z-[1]"
                  style={{ backgroundImage: strongCardOverlay }}
                  aria-hidden="true"
                />
                <div className="pointer-events-none absolute bottom-6 left-6 right-6 z-[2] text-left sm:bottom-6 sm:left-6 sm:right-6">
                  <p className="font-display text-[clamp(28px,3vw,44px)] font-medium leading-[1.1] tracking-[-0.012em] text-white line-clamp-2">
                    Mirra
                  </p>
                  <p className="mt-1 line-clamp-2 max-w-full font-sans text-[11px] font-normal leading-[1.45] text-white/90 sm:text-[12px]">
                    {shampooProduct.note}
                  </p>
                </div>
              </article>

              <article className="group relative min-h-[9rem] w-full shrink-0 overflow-hidden bg-[#141210] lg:h-[172px] lg:min-h-[172px] lg:max-h-[172px]">
                <img
                  src={shampooProduct.image}
                  alt={shampooProduct.name}
                  className="absolute inset-0 z-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="pointer-events-none absolute inset-0 z-[1]"
                  style={{ backgroundImage: strongCardOverlay }}
                  aria-hidden="true"
                />
                <div className="pointer-events-none absolute bottom-6 left-6 right-6 z-[2] text-left sm:bottom-6 sm:left-6 sm:right-6">
                  <p className="font-display text-[clamp(28px,3vw,44px)] font-medium leading-[1.1] tracking-[-0.012em] text-white line-clamp-2">
                    {shampooProduct.name}
                  </p>
                  <p className="mt-1 line-clamp-2 max-w-full font-sans text-[11px] font-normal leading-[1.45] text-white/90 sm:text-[12px]">
                    {shampooProduct.note}
                  </p>
                </div>
              </article>
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-[16px] lg:grid-cols-3 lg:items-start">
            <div className="flex h-full min-h-0 min-w-0 w-full flex-col justify-between overflow-hidden bg-[#0F0E0D] px-7 py-8 text-white md:px-8 md:py-8 lg:h-[360px] lg:min-h-[360px] lg:max-h-[360px] lg:shrink-0">
              <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <p className="mb-6 shrink-0 font-sans text-[12px] font-medium uppercase leading-none tracking-[0.14em] text-white/70 md:tracking-[0.18em]">
                  — Sobre a seleção
                </p>
                <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center">
                  <blockquote className="m-0 min-w-0 border-none p-0 font-display text-[clamp(28px,2.6vw,36px)] font-normal leading-[1.1] tracking-[-0.012em] text-[#F5F3EE]">
                    <span className="text-[0.95em] text-white/45" aria-hidden="true">
                      &ldquo;
                    </span>
                    Menos produto, mais <em className="font-display italic">desejo</em>. A curadoria é um filtro — e um convite.
                    <span className="text-[0.95em] text-white/45" aria-hidden="true">
                      &rdquo;
                    </span>
                  </blockquote>
                </div>
              </div>
              <p className="mt-auto shrink-0 pt-6 font-sans text-[11px] font-medium uppercase leading-none tracking-[0.2em] text-white/50 sm:text-[12px]">
                Direção de marca · Ybera
              </p>
            </div>

            <article className="group relative flex min-h-[9rem] w-full min-w-0 shrink-0 flex-row overflow-hidden bg-[#F0E9E0] lg:h-[172px] lg:min-h-[172px] lg:max-h-[172px]">
              <div className="flex w-[44%] min-w-0 max-w-[50%] shrink-0 flex-col justify-end gap-0.5 py-4 pl-4 pr-2 text-left sm:w-[42%] sm:pl-5 sm:pr-3 sm:py-4 lg:py-5">
                <p className="font-display text-[26px] font-medium leading-tight tracking-[-0.01em] text-[#141210] sm:text-[28px] md:text-[30px] line-clamp-2">
                  Máscara
                </p>
                <p className="line-clamp-3 max-w-full font-sans text-[10px] font-normal leading-[1.45] text-[#141210]/82 sm:text-[11px] md:line-clamp-2 md:text-[12px]">
                  {mascaraProduct.note}
                </p>
              </div>
              <div className="relative flex h-full min-h-0 min-w-0 flex-1 items-center justify-center self-stretch py-2 pr-3 pl-0 sm:py-2.5 sm:pr-4">
                <img
                  src="/images/18.png"
                  alt="Máscara"
                  className="h-[94%] max-h-[94%] w-auto max-w-full object-contain object-center transition duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </article>

            <article className="group relative min-h-[9rem] w-full min-w-0 shrink-0 overflow-hidden bg-[#141210] lg:h-[172px] lg:min-h-[172px] lg:max-h-[172px]">
              <img
                src={soroProduct.image}
                alt={soroProduct.name}
                className="absolute inset-0 z-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{ backgroundImage: soroCardOverlay }}
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute bottom-6 left-6 right-6 z-[2] text-left sm:bottom-6 sm:left-6 sm:right-6">
                <p className="font-display text-[clamp(28px,3vw,44px)] font-medium leading-[1.1] tracking-[-0.012em] text-[#FFFFFF] line-clamp-2">
                  {soroProduct.name}
                </p>
                <p className="mt-1 line-clamp-2 max-w-full font-sans text-[11px] font-normal leading-[1.45] text-[#FFFFFF] sm:text-[12px]">
                  {soroProduct.note}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
