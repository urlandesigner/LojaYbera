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

function CurationMobileEditorial({ activeIndex, onSelectIndex }) {
  const active = RESULT_GOALS[activeIndex];

  return (
    <div className="flex w-full min-w-0 max-w-full flex-col gap-1.5">
      <div
        className="flex w-full min-w-0 justify-start overflow-x-auto overscroll-x-contain px-0 py-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Escolher resultado"
      >
        <div className="flex min-w-min flex-nowrap items-start justify-start gap-x-5 sm:gap-x-6">
          {RESULT_GOALS.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <span
                key={item.title}
                role="tab"
                tabIndex={0}
                aria-selected={isActive}
                onClick={() => onSelectIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectIndex(index);
                  }
                }}
                className={cn(
                  "inline-flex shrink-0 cursor-pointer select-none flex-col items-stretch border-0 bg-transparent p-0 text-left font-display text-[14px] font-normal leading-[1.15] tracking-[-0.02em] text-black outline-none transition-opacity duration-200 ease-out focus-visible:ring-1 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f2ec] sm:text-[15px] md:text-[16px]",
                  isActive ? "opacity-100" : "opacity-50 hover:opacity-100",
                )}
              >
                <span className="whitespace-nowrap">{item.title}</span>
                {isActive ? (
                  <span
                    aria-hidden
                    className="mt-1 block h-px w-full shrink-0 bg-current opacity-80 sm:mt-1.5"
                  />
                ) : null}
              </span>
            );
          })}
        </div>
      </div>

      <article
        className="w-full min-w-0 max-w-full overflow-hidden rounded-xl bg-[#1a1816]"
        aria-live="polite"
      >
        <div className="relative aspect-[4/5] w-full max-w-full min-h-[15rem] max-h-[min(23rem,64dvh)] sm:min-h-[16.5rem] sm:max-h-[min(24.5rem,60dvh)]">
          {RESULT_GOALS.map((item, index) => {
            const isShown = index === activeIndex;
            return (
              <img
                key={item.title}
                src={item.image}
                alt={isShown ? item.imageAlt : ""}
                className={cn(
                  item.imgClass,
                  "absolute inset-0 h-full w-full transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-200 motion-reduce:transform-none",
                  isShown ? "z-[1] translate-y-0 scale-100 opacity-100" : "z-0 translate-y-1 scale-[1.01] opacity-0",
                )}
                aria-hidden={!isShown}
                draggable={false}
              />
            );
          })}

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[50%] bg-gradient-to-t from-[rgba(10,9,8,0.5)] via-[rgba(10,9,8,0.12)] to-transparent sm:h-[46%]"
            aria-hidden
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] flex flex-col justify-end px-5 pb-5 pt-20 text-left sm:px-5 sm:pb-6 sm:pt-24">
            <div
              key={active.title}
              className="pointer-events-auto motion-safe:animate-[curation-editorial-reveal_0.45s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none"
            >
              <h3 className="font-display text-[1.72rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-[1.88rem]">
                {active.title}
              </h3>
              <p className="mt-2 max-w-[32ch] text-[14px] font-light leading-[1.48] text-white/85 sm:mt-2.5 sm:text-[15px] sm:leading-[1.5]">
                {active.text}
              </p>
              <a
                data-curation-catalog-cta
                href={`${CURATION_CATALOG_HREF}?resultado=${active.catalogSlug}`}
                className="group/cta mt-3.5 inline-flex max-w-full flex-wrap items-baseline gap-x-1.5 border-b border-white/40 pb-px text-left text-[11px] font-medium uppercase tracking-[0.12em] text-white no-underline transition-[color,border-color] duration-300 ease-out hover:border-white/65 hover:text-white sm:mt-4"
              >
                <span className="leading-snug text-white">{active.ctaLabel}</span>
                <span
                  className="text-[0.8125rem] font-light leading-none text-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-0.5 motion-reduce:group-hover/cta:translate-x-0"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function CurationSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [rotationPaused, setRotationPaused] = React.useState(false);

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
    <div id="ybera-escolha-resultado-text-color-fix-v1" className="mx-auto w-full max-w-site shell-px">
      <div className="grid min-w-0 gap-4 max-lg:gap-y-0.5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14 xl:gap-20">
        <div className="section-lead min-w-0 max-w-full max-lg:!pb-0 max-lg:!pt-0 lg:sticky lg:top-28">
          <p className="section-kicker">ESCOLHA PELO RESULTADO</p>
          <h2 className="mt-1 max-w-2xl font-display text-[28px] leading-[1.2] tracking-[-0.01em] text-ink md:mt-3 md:text-7xl md:leading-[1.16] lg:mt-4">
            Menos produto.
            <br />
            Mais <em className="italic">cuidado</em>.
          </h2>
          <p className="mt-1 max-w-lg text-[16px] leading-[1.5] text-ink/64 md:mt-3 md:text-lg md:leading-8 lg:mt-4">
            Descubra o que seu cabelo realmente precisa.
          </p>
        </div>

        <div
          className="order-2 flex min-w-0 w-full max-w-full flex-col gap-1 max-lg:gap-3 lg:gap-8"
          onMouseEnter={() => setRotationPaused(true)}
          onMouseLeave={() => setRotationPaused(false)}
        >
          <div className="min-w-0 w-full max-w-full lg:hidden">
            <CurationMobileEditorial activeIndex={activeIndex} onSelectIndex={selectIndex} />
          </div>

          <div className="hidden lg:flex lg:flex-col lg:gap-8">
            <div className="order-1 flex flex-col gap-4 lg:order-2 lg:gap-6">
              <div className="divide-y divide-black/[0.09]">
                {RESULT_GOALS.map((item, index) => {
                  const isActive = index === activeIndex;
                  const panelId = `curation-panel-${index}`;
                  const headerId = `curation-header-${index}`;

                  return (
                    <div key={item.title} className="lg:py-4">
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
                        className="group/need flex w-full cursor-pointer flex-col text-left outline-none transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f2ec]"
                      >
                        <div className="min-h-0 lg:min-h-[3.25rem]">
                            <h3
                              className={cn(
                                "font-display text-[1.15rem] leading-[1.18] tracking-[-0.02em] transition-[color,font-weight,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:text-[1.65rem] md:leading-[1.18] lg:text-[1.55rem] lg:leading-[1.16]",
                                isActive
                                  ? "font-semibold text-ink"
                                  : "font-normal text-ink/[0.52] group-hover/need:text-ink/[0.72]",
                              )}
                            >
                              {item.title}
                            </h3>
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
                              <div
                                key={`${index}-${isActive ? activeIndex : "off"}`}
                                className={cn(
                                  isActive &&
                                    "motion-safe:animate-[curation-editorial-reveal_0.48s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none",
                                )}
                              >
                                <p
                                  className={cn(
                                    "max-w-lg text-[15px] leading-[1.58] transition-opacity duration-300 ease-out md:text-[15px] md:leading-relaxed lg:max-w-xl lg:text-[15px]",
                                    isActive
                                      ? "pb-0.5 pt-1 text-ink opacity-100 md:pt-1.5 lg:min-h-[4.9rem]"
                                      : "pointer-events-none pt-0 leading-[1.62] opacity-0 lg:min-h-[4.9rem]",
                                  )}
                                >
                                  {item.text}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      {isActive ? (
                        <a
                          data-curation-catalog-cta
                          href={`${CURATION_CATALOG_HREF}?resultado=${item.catalogSlug}`}
                          key={`curation-cta-${index}-${activeIndex}`}
                          className={cn(
                            "no-underline mt-2.5 inline-flex max-w-full items-center gap-2 self-start border-b border-ink/20 px-1 pb-px text-left text-[13px] font-medium leading-snug tracking-wide text-ink/72 transition-[color,border-color,opacity] duration-300 ease-out hover:border-ink/45 hover:text-ink",
                            "motion-safe:animate-[curationDesktopCta_0.38s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none",
                          )}
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
                "h-[min(26rem,52vh)] xl:h-[28rem]",
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
                      "absolute inset-0 h-full w-full transition-[opacity,transform] duration-[560ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-150 motion-reduce:transform-none",
                      isShown ? "z-10 scale-100 opacity-100" : "z-0 scale-[1.02] opacity-0",
                    )}
                    aria-hidden={!isShown}
                    draggable={false}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
