import React from "react";

function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

const CURATION_CATALOG_HREF = "/catalogo";

/** Intervalo em ms entre cada benefício ativo na rotação automática. */
const CURATION_ROTATION_MS = 5000;

/** Copy por objetivo — imagens distintas + foco de crop (object-position). */
const RESULT_GOALS = [
  {
    title: "Brilho",
    text: "Reflexo imediato, com aparência saudável e luminosa.",
    image: "/images/frente1.png",
    imageAlt: "Cabelo com brilho e reflexo luminoso",
    imgClass: "object-cover object-[center_28%]",
    ctaLabel: "Explorar cuidados para brilho",
    catalogSlug: "brilho",
    desktopCtaLabel: "Ver produtos para brilho →",
  },
  {
    title: "Maciez",
    text: "Toque suave desde o primeiro uso, com mais maleabilidade.",
    image: "/images/frente2.png",
    imageAlt: "Textura macia ao toque e movimento natural",
    imgClass: "object-cover object-[center_42%]",
    ctaLabel: "Explorar cuidados para maciez",
    catalogSlug: "maciez",
    desktopCtaLabel: "Ver produtos para maciez →",
  },
  {
    title: "Alinhamento",
    text: "Fio disciplinado, com menos frizz e mais controle ao longo do dia.",
    image: "/images/costas.png",
    imageAlt: "Fios alinhados e disciplinados",
    imgClass: "object-cover object-[center_35%]",
    ctaLabel: "Explorar disciplina e alinhamento",
    catalogSlug: "alinhamento",
    desktopCtaLabel: "Ver produtos para alinhamento →",
  },
  {
    title: "Força",
    text: "Mais resistência e menos quebra, com estrutura visivelmente recuperada.",
    image: "/images/mirra5.jpg.webp",
    imageAlt: "Fios com estrutura forte e recuperada",
    imgClass: "object-cover object-[center_30%]",
    ctaLabel: "Ver produtos para força",
    catalogSlug: "forca",
    desktopCtaLabel: "Ver produtos para força →",
  },
  {
    title: "Leveza",
    text: "Movimento natural, sem pesar ou comprometer o volume.",
    image: "/images/24.jpg.webp",
    imageAlt: "Cabelo leve com movimento natural",
    imgClass: "object-cover object-[center_25%]",
    ctaLabel: "Explorar leveza e movimento",
    catalogSlug: "leveza",
    desktopCtaLabel: "Ver produtos para leveza →",
  },
];

export default function CurationSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [rotationPaused, setRotationPaused] = React.useState(false);

  const active = RESULT_GOALS[activeIndex];

  const selectIndex = React.useCallback((index) => {
    setActiveIndex(index);
  }, []);

  React.useEffect(() => {
    if (rotationPaused) {
      return undefined;
    }
    if (typeof window === "undefined") {
      return undefined;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % RESULT_GOALS.length);
    }, CURATION_ROTATION_MS);

    return () => window.clearInterval(id);
  }, [rotationPaused]);

  return (
    <div className="mx-auto w-full max-w-site shell-px">
      <div className="grid gap-5 max-lg:gap-y-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14 xl:gap-20">
        <div className="section-lead max-lg:!pb-3 lg:sticky lg:top-28">
          <p className="section-kicker">ESCOLHA PELO RESULTADO</p>
          <h2 className="mt-2 max-w-2xl font-display text-[28px] leading-[1.2] tracking-[-0.01em] text-ink md:mt-4 md:text-7xl md:leading-[1.16]">
            Menos produto.
            <br />
            Mais <em className="italic">cuidado</em>.
          </h2>
          <p className="mt-2 max-w-lg text-[16px] leading-[1.5] text-ink/64 md:mt-4 md:text-lg md:leading-8">
            Descubra o que seu cabelo realmente precisa.
          </p>
        </div>

        <div
          className="flex flex-col gap-4 lg:gap-8"
          onMouseEnter={() => setRotationPaused(true)}
          onMouseLeave={() => setRotationPaused(false)}
        >
          {/* Mobile: lista primeiro · Desktop: imagem primeiro */}
          <div className="order-1 flex flex-col gap-4 lg:order-2 lg:gap-6">
            <div className="divide-y divide-black/[0.09] border-y border-black/[0.09]">
              {RESULT_GOALS.map((item, index) => {
                const isActive = index === activeIndex;
                const panelId = `curation-panel-${index}`;
                const headerId = `curation-header-${index}`;

                return (
                  <div key={item.title} className="py-3.5 md:py-4">
                    <div
                      id={headerId}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => selectIndex(index)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          selectIndex(index);
                        }
                      }}
                      className={cn(
                        "group/need flex w-full cursor-pointer flex-col rounded-[2px] text-left outline-none transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f2ec]",
                        isActive ? "-mx-1 px-1" : "-mx-1 px-1 hover:bg-black/[0.02]",
                      )}
                    >
                      <div className="flex min-h-[2.875rem] items-center justify-between gap-3 md:min-h-[3.125rem] lg:min-h-[3.25rem]">
                        <h3
                          className={cn(
                            "font-display text-[1.15rem] leading-[1.22] tracking-[-0.02em] transition-[color,font-weight,letter-spacing] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:text-[1.65rem] md:leading-[1.18] lg:text-[1.55rem] lg:leading-[1.16]",
                            isActive
                              ? "font-semibold text-ink"
                              : "font-normal text-ink/[0.48] group-hover/need:text-ink/[0.58]",
                          )}
                        >
                          {item.title}
                        </h3>
                        <span
                          className={cn(
                            "flex h-8 shrink-0 items-center justify-center text-[0.8125rem] leading-none tracking-[-0.02em] transition-[opacity,transform,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none lg:h-9",
                            isActive
                              ? "translate-x-0.5 text-ink opacity-100"
                              : "text-ink/[0.28] opacity-70 group-hover/need:translate-x-0.5 group-hover/need:text-ink/45",
                          )}
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </div>

                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={headerId}
                        className={cn(
                          "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                          isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <p
                            className={cn(
                              "max-w-lg pb-0.5 pt-1.5 text-[15px] leading-[1.62] transition-opacity duration-300 ease-out md:text-[15px] md:leading-relaxed lg:max-w-xl lg:text-[15px]",
                              isActive ? "text-ink/[0.92] opacity-100" : "opacity-0",
                            )}
                          >
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </div>
                    {isActive ? (
                      <a
                        data-curation-catalog-cta
                        href={`${CURATION_CATALOG_HREF}?resultado=${item.catalogSlug}`}
                        className="motion-safe:animate-[curationDesktopCta_0.38s_cubic-bezier(0.22,1,0.36,1)_both] mt-2.5 hidden max-w-lg border-b border-ink/20 px-1 pb-px text-left text-[13px] font-medium leading-snug tracking-wide text-ink/72 transition-[color,border-color,opacity] duration-300 ease-out hover:border-ink/45 hover:text-ink motion-reduce:animate-none lg:inline-block"
                      >
                        {item.desktopCtaLabel}
                      </a>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={cn(
              "relative order-2 overflow-hidden rounded-[2px] bg-[#ece8e2] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] lg:order-1",
              "h-[7.25rem] sm:h-[8rem] lg:h-[min(26rem,52vh)] xl:h-[28rem]",
            )}
          >
            {RESULT_GOALS.map((item, index) => {
              const isShown = index === activeIndex;
              return (
                <img
                  key={item.title}
                  src={item.image}
                  alt={isShown ? item.imageAlt : ""}
                  className={cn(
                    item.imgClass,
                    "absolute inset-0 h-full w-full transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-150 motion-reduce:transform-none",
                    isShown ? "z-10 scale-100 opacity-100" : "z-0 scale-[1.02] opacity-0",
                  )}
                  aria-hidden={!isShown}
                  draggable={false}
                />
              );
            })}

            <div className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-t from-black/[0.08] via-transparent to-transparent lg:hidden" aria-hidden />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center px-3 pb-3 pt-10 lg:hidden">
              <div className="pointer-events-auto w-full max-w-sm">
                <a
                  href={CURATION_CATALOG_HREF}
                  className="button-editorial-dark flex w-full items-center justify-between gap-3 no-underline !h-11 !px-5 !text-[10px] !tracking-[0.16em]"
                >
                  <span>{active.ctaLabel}</span>
                  <span className="text-sm leading-none" aria-hidden>
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
