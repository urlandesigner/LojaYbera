import React from "react";

function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const D_ZOOM = 320;
const D_OUT = 320;
/** Imagem nova: fade + scale; fase “in” aguarda fim do stagger do conteúdo. */
const D_IMAGE_IN = 450;
const D_PHASE_IN = 780;
/** Animações do painel direito / card (alinhadas ao ritmo mais longo da troca). */
const D_CONTENT = 260;
const D_CARD_FADE = 280;
const VITRINE3_AUTO_MS = 5600;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Vitrine 3 — narrativa visual: transição coreografada (sem slide de carousel),
 * auto-rotação com pausa em hover / foco / interação; navegação inferior entre produtos.
 */
export function Vitrine3Section({ items = [] }) {
  const list = React.useMemo(() => items.filter(Boolean), [items]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  const [isFocusWithin, setIsFocusWithin] = React.useState(false);
  const [interactionHold, setInteractionHold] = React.useState(false);
  const [reduceMotion, setReduceMotion] = React.useState(() => prefersReducedMotion());

  const [heroPhase, setHeroPhase] = React.useState("idle");
  const [heroFrom, setHeroFrom] = React.useState(0);
  const [heroTo, setHeroTo] = React.useState(0);

  const safeCount = list.length;
  const timeoutIdsRef = React.useRef([]);
  const sequenceRef = React.useRef(0);
  const displayedIndexRef = React.useRef(0);

  const isPaused = isHovering || isFocusWithin || interactionHold;

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  React.useEffect(() => {
    if (activeIndex >= safeCount) {
      setActiveIndex(0);
    }
  }, [activeIndex, safeCount]);

  const clearTransitionTimeouts = React.useCallback(() => {
    timeoutIdsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutIdsRef.current = [];
  }, []);

  /** Coreografia hero antes da pintura (evita 1 frame com imagem errada). */
  React.useLayoutEffect(() => {
    if (safeCount <= 1) return;

    if (reduceMotion) {
      clearTransitionTimeouts();
      setHeroPhase("idle");
      displayedIndexRef.current = activeIndex;
      return;
    }

    const from = displayedIndexRef.current;
    const to = activeIndex;
    if (from === to) return;

    sequenceRef.current += 1;
    const gen = sequenceRef.current;
    clearTransitionTimeouts();

    setHeroFrom(from);
    setHeroTo(to);
    setHeroPhase("zoom");

    const schedule = (fn, delay) => {
      const id = window.setTimeout(() => {
        if (sequenceRef.current !== gen) return;
        fn();
      }, delay);
      timeoutIdsRef.current.push(id);
    };

    schedule(() => setHeroPhase("out"), D_ZOOM);
    schedule(() => {
      setHeroPhase("in");
      displayedIndexRef.current = to;
    }, D_ZOOM + D_OUT);
    schedule(() => {
      setHeroPhase("idle");
    }, D_ZOOM + D_OUT + D_PHASE_IN);

    return () => clearTransitionTimeouts();
  }, [activeIndex, safeCount, reduceMotion, clearTransitionTimeouts]);

  const goPrev = React.useCallback(() => {
    setInteractionHold(true);
    setActiveIndex((i) => (i - 1 + safeCount) % safeCount);
  }, [safeCount]);

  const goNext = React.useCallback(() => {
    setInteractionHold(true);
    setActiveIndex((i) => (i + 1) % safeCount);
  }, [safeCount]);

  const selectIndex = React.useCallback((index) => {
    setInteractionHold(true);
    setActiveIndex(index);
  }, []);

  /** Auto-rotação (sem barra de progresso). */
  React.useEffect(() => {
    if (safeCount <= 1) return;
    if (isPaused) return;
    const id = window.setTimeout(() => {
      setActiveIndex((i) => (i + 1) % safeCount);
    }, VITRINE3_AUTO_MS);
    return () => window.clearTimeout(id);
  }, [activeIndex, isPaused, safeCount]);

  const onSectionMouseLeave = React.useCallback(() => {
    setIsHovering(false);
    setInteractionHold(false);
  }, []);

  const onSectionFocusIn = React.useCallback(() => {
    setIsFocusWithin(true);
  }, []);

  const onSectionFocusOut = React.useCallback((e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocusWithin(false);
      setInteractionHold(false);
    }
  }, []);

  if (!safeCount) {
    return null;
  }

  const revealMotion = heroPhase === "in" && !reduceMotion;
  const rightFadeOut = heroPhase === "out";

  const outgoingHero =
    !reduceMotion && (heroPhase === "zoom" || heroPhase === "out") ? list[heroFrom] : null;
  const incomingHero =
    !reduceMotion && heroPhase === "in" ? list[heroTo] : null;
  /** Evita 1 frame com hero “nova” antes do layout effect iniciar o zoom. */
  const idleSlideIndex =
    heroPhase === "idle" && displayedIndexRef.current !== activeIndex
      ? displayedIndexRef.current
      : activeIndex;
  const idleHero = reduceMotion || heroPhase === "idle" ? list[idleSlideIndex] : null;

  return (
    <section
      id="vitrine-3"
      className="bg-pearl text-ink"
      aria-label="Vitrine editorial"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={onSectionMouseLeave}
      onFocusCapture={onSectionFocusIn}
      onBlurCapture={onSectionFocusOut}
    >
      <div className="grid min-h-0 grid-cols-1 grid-rows-[auto_auto_auto_auto] lg:min-h-[80vh] lg:grid-cols-[55%_45%] lg:grid-rows-[minmax(0,1fr)_auto]">
        {/* Coluna imagem 55% — mobile: altura fixa compacta; ordem 1 no grid */}
        <div className="group/imageCol relative row-start-1 max-lg:h-[400px] max-lg:min-h-[360px] max-lg:max-h-[440px] w-full shrink-0 overflow-hidden lg:col-start-1 lg:row-start-1 lg:h-auto lg:max-h-none lg:min-h-[80vh] lg:w-full">
          {/* Hero idle ou reduced motion */}
          {idleHero ? (
            <div className="absolute inset-0 z-[1]" aria-hidden={false}>
              <img
                src={idleHero.editorialImage}
                alt=""
                role="presentation"
                className="h-full min-h-0 w-full scale-100 object-cover lg:min-h-[80vh]"
                decoding="async"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(14,12,10,0.22)] via-[rgba(14,12,10,0.06)] to-transparent"
                aria-hidden
              />
              <EditorialOverlayCard item={idleHero} animateCard={false} reduceMotion={reduceMotion} />
            </div>
          ) : null}

          {/* Saída: zoom → fade */}
          {outgoingHero ? (
            <div
              className="absolute inset-0 z-[2]"
              aria-hidden
              style={{
                opacity: heroPhase === "out" ? 0 : 1,
                transition: `opacity ${D_OUT}ms ${EASE}`,
              }}
            >
              <img
                src={outgoingHero.editorialImage}
                alt=""
                role="presentation"
                decoding="async"
                className="h-full min-h-0 w-full object-cover lg:min-h-[80vh]"
                style={
                  heroPhase === "zoom"
                    ? {
                        animation: `vitrine3-hero-zoom ${D_ZOOM}ms ${EASE} forwards`,
                      }
                    : {
                        transform: "scale(1.03)",
                      }
                }
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(14,12,10,0.22)] via-[rgba(14,12,10,0.06)] to-transparent"
                aria-hidden
              />
              <EditorialOverlayCard item={outgoingHero} animateCard={false} reduceMotion={reduceMotion} />
            </div>
          ) : null}

          {/* Entrada: opacity + scale */}
          {incomingHero ? (
            <div className="absolute inset-0 z-[3]" aria-hidden={false}>
              <img
                src={incomingHero.editorialImage}
                alt=""
                role="presentation"
                decoding="async"
                className="h-full min-h-0 w-full object-cover motion-reduce:scale-100 motion-reduce:opacity-100 lg:min-h-[80vh]"
                style={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        transform: "scale(1)",
                        animation: `vitrine3-hero-in ${D_IMAGE_IN}ms ${EASE} both`,
                      }
                }
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(14,12,10,0.22)] via-[rgba(14,12,10,0.06)] to-transparent"
                aria-hidden
              />
              <EditorialOverlayCard item={incomingHero} animateCard reduceMotion={reduceMotion} />
            </div>
          ) : null}

          {safeCount > 1 ? (
            <div
              className={cn(
                "pointer-events-none absolute inset-y-0 left-0 right-0 z-[20] flex items-center justify-between px-2 sm:px-4 lg:px-5",
                "opacity-100 motion-reduce:opacity-100",
                "[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:transition-opacity [@media(hover:hover)]:duration-500 [@media(hover:hover)]:ease-out",
                "[@media(hover:hover)]:group-hover/imageCol:opacity-100",
              )}
            >
              <button
                type="button"
                aria-label="Produto anterior"
                className="pointer-events-auto flex h-12 w-12 items-center justify-center border-0 bg-transparent text-xl font-light text-white outline-none transition-[opacity,transform] duration-300 ease-out opacity-60 hover:scale-105 hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-1 focus-visible:ring-white/50 sm:h-14 sm:w-14 sm:text-2xl"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
              >
                <span aria-hidden>←</span>
              </button>
              <button
                type="button"
                aria-label="Próximo produto"
                className="pointer-events-auto flex h-12 w-12 items-center justify-center border-0 bg-transparent text-xl font-light text-white outline-none transition-[opacity,transform] duration-300 ease-out opacity-60 hover:scale-105 hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-1 focus-visible:ring-white/50 sm:h-14 sm:w-14 sm:text-2xl"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
              >
                <span aria-hidden>→</span>
              </button>
            </div>
          ) : null}
        </div>

      <nav
        className="row-start-2 border-t border-ink/[0.06] bg-pearl lg:col-span-2 lg:col-start-1 lg:row-start-2"
        aria-label="Selecionar produto na vitrine"
      >
        <div className="mx-auto flex w-full max-w-site flex-col items-stretch gap-0 py-2.5 max-lg:px-4 lg:relative lg:items-center lg:justify-center lg:py-5 lg:shell-px">
          <div className="flex w-full min-w-0 justify-center overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] lg:justify-center lg:overflow-visible [&::-webkit-scrollbar]:hidden">
            <div
              role="tablist"
              className="mx-auto flex max-w-none min-w-min flex-nowrap items-center justify-center gap-x-1 text-center sm:gap-x-2 lg:max-w-[960px]"
            >
              {list.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <React.Fragment key={item.name ?? String(index)}>
                    <span
                      role="tab"
                      tabIndex={0}
                      aria-selected={isActive}
                      className={cn(
                        "relative inline-block whitespace-nowrap cursor-pointer border-0 px-2 pt-2 pb-0 text-[14px] leading-snug tracking-[-0.01em] no-underline decoration-transparent outline-none sm:text-[15px]",
                        "after:pointer-events-none after:absolute after:left-2 after:top-full after:block after:h-px after:translate-y-2 after:bg-[#1a1a1a] after:content-[''] after:transition-[width,opacity] after:duration-300 after:ease-out",
                        "focus-visible:ring-1 focus-visible:ring-ink/25 focus-visible:ring-offset-2 focus-visible:ring-offset-pearl",
                        "transition-[color,font-weight,transform] duration-300 ease-out",
                        isActive
                          ? "origin-center scale-[1.02] font-medium text-[#0a0a0a] after:w-[76%] after:opacity-50 max-lg:after:w-[78%] max-lg:after:opacity-[0.55] hover:after:w-[83%] hover:after:opacity-[0.66]"
                          : "origin-center scale-100 font-light text-[#0a0a0a]/[0.52] after:w-[64%] after:opacity-0 hover:text-[#0a0a0a]/[0.78] hover:after:w-[82%] hover:after:opacity-[0.5]",
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectIndex(index);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          selectIndex(index);
                        }
                      }}
                    >
                      {item.navLabel ?? item.name}
                    </span>
                    {index < list.length - 1 ? (
                      <span
                        className="select-none whitespace-nowrap px-1 text-[14px] font-light text-ink/25 sm:text-[15px]"
                        role="presentation"
                        aria-hidden
                      >
                        |
                      </span>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <a
            href="/catalogo"
            className="hidden shrink-0 cursor-pointer items-center justify-center whitespace-nowrap border-b border-[#0a0a0a]/20 pb-0.5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a0a0a] opacity-90 transition-opacity duration-300 ease-out hover:opacity-60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/25 focus-visible:ring-offset-2 focus-visible:ring-offset-pearl lg:absolute lg:right-0 lg:inline-flex"
          >
            Ver todo o catálogo<span aria-hidden> →</span>
          </a>
        </div>
      </nav>

        {/* Coluna produto 45% — mobile: após nav (row 3); desktop: coluna direita */}
        <div className="relative row-start-3 flex w-full min-h-0 flex-col items-center justify-center bg-[#f2efe8] px-4 py-4 sm:px-5 lg:col-start-2 lg:row-start-1 lg:min-h-[80vh] lg:w-full lg:px-14 lg:py-20 xl:px-16">
          <div className="relative mx-auto flex w-full max-w-[460px] min-h-0 flex-col items-center justify-center px-1 sm:px-2 lg:min-h-[20rem] lg:flex-1">
            {/* Bloco em fade-out (zoom + out) */}
            {heroPhase === "zoom" || heroPhase === "out" ? (
              <div
                key={`out-${heroFrom}`}
                className="flex w-full max-w-[460px] flex-col items-center justify-center text-center"
                style={{
                  opacity: rightFadeOut ? 0 : 1,
                  transition: `opacity ${D_OUT}ms ${EASE}`,
                }}
              >
                <RightProductBlock item={list[heroFrom]} revealMotion={false} />
              </div>
            ) : null}

            {/* Conteúdo ativo + entrada em camadas na fase "in" */}
            {heroPhase === "in" || heroPhase === "idle" ? (
              <div
                key={heroPhase === "idle" ? `idle-${idleSlideIndex}` : `in-${heroTo}`}
                className={cn(
                  "flex w-full max-w-[460px] flex-col items-center justify-center text-center",
                  heroPhase === "in" && !reduceMotion ? "relative z-[1]" : "relative z-[1]",
                )}
              >
                <RightProductBlock
                  item={list[heroPhase === "idle" ? idleSlideIndex : heroTo]}
                  revealMotion={revealMotion}
                />
              </div>
            ) : null}
          </div>
        </div>

      <div className="row-start-4 border-t border-ink/[0.06] bg-pearl lg:hidden">
        <div className="mx-auto flex w-full max-w-site justify-center px-4 pb-5 pt-8">
          <a
            href="/catalogo"
            className="inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap border-b border-[#0a0a0a]/20 pb-0.5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a0a0a] opacity-90 transition-opacity duration-300 ease-out hover:opacity-60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/25 focus-visible:ring-offset-2 focus-visible:ring-offset-pearl"
          >
            Ver todo o catálogo<span aria-hidden> →</span>
          </a>
        </div>
      </div>

      </div>

    </section>
  );
}

function EditorialOverlayCard({ item, animateCard, reduceMotion }) {
  const fadeIn =
    animateCard && !reduceMotion
      ? {
          animation: `vitrine3-fade-in ${D_CARD_FADE}ms ${EASE} both`,
          animationDelay: "150ms",
        }
      : undefined;

  return (
    <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-[2] px-4 pb-4 pt-6 sm:px-5 lg:px-10 lg:pb-10 lg:pt-16">
      <div
        className={cn(
          "w-full max-w-[min(24rem,calc(100%-2rem))] translate-x-0 translate-y-0 rounded-md border border-white/15 bg-[rgba(255,255,255,0.6)] px-3.5 py-3 text-left shadow-none backdrop-blur-[8px] lg:max-w-[24rem] lg:-translate-x-4 lg:-translate-y-5 lg:rounded-xl lg:px-7 lg:py-7",
          animateCard && !reduceMotion && "motion-reduce:animate-none",
        )}
        style={fadeIn}
      >
        <p className="text-[10px] font-medium uppercase leading-[1.35] tracking-[0.2em] text-ink/45 lg:text-[13px] lg:leading-[1.4] lg:tracking-[0.26em]">
          {item.overlayEyebrow}
        </p>
        <h2 className="mt-1.5 font-display text-[17px] font-light leading-[1.25] tracking-[-0.03em] text-[#0a0a0a] lg:mt-3 lg:text-[1.75rem] lg:leading-snug">
          {item.overlayTitle}
        </h2>
        <p className="mt-1.5 max-w-[32ch] text-[13px] font-light leading-[1.45] text-[#4a4a4a] lg:mt-3 lg:text-[0.9375rem] lg:leading-[1.55]">
          {item.overlayBody}
        </p>
      </div>
    </div>
  );
}

function RightProductBlock({ item, revealMotion }) {
  return (
    <>
      <div className="flex w-full max-w-[440px] flex-col items-center">
        <p
          className={cn(
            "text-[10px] font-medium uppercase leading-[1.35] tracking-[0.2em] text-ink/40 lg:text-[13px] lg:leading-[1.4] lg:tracking-[0.26em]",
            revealMotion && "motion-reduce:animate-none",
          )}
          style={
            revealMotion
              ? {
                  animation: `vitrine3-rise-fade ${D_CONTENT}ms ${EASE} both`,
                  animationDelay: "80ms",
                }
              : undefined
          }
        >
          {item.rightEyebrow}
        </p>
        <div className="mt-2 w-full max-lg:mt-1.5 lg:mt-4 lg:max-w-[448px]">
          {/* Animação no wrapper: evita que keyframes `transform` anulem o `-translate-x-2` do título (salto horizontal). */}
          <div
            className={cn("w-full", revealMotion && "motion-reduce:animate-none")}
            style={
              revealMotion
                ? {
                    animation: `vitrine3-rise-fade ${D_CONTENT}ms ${EASE} both`,
                    animationDelay: "130ms",
                  }
                : undefined
            }
          >
            <h3 className="-translate-x-1 font-display text-[1.125rem] font-light leading-[1.28] tracking-[-0.04em] text-[#0a0a0a] lg:-translate-x-2 lg:text-[2.15rem] lg:leading-[1.12]">
              {item.name}
            </h3>
          </div>
          <p
            className={cn(
              "mt-2 max-lg:mt-1.5 whitespace-pre-line text-[14px] font-light leading-[1.48] text-[#5c5c5c] lg:mt-3 lg:text-[1rem] lg:leading-[1.48]",
              revealMotion && "motion-reduce:animate-none",
            )}
            style={
              revealMotion
                ? {
                    animation: `vitrine3-rise-fade ${D_CONTENT}ms ${EASE} both`,
                    animationDelay: "195ms",
                  }
                : undefined
            }
          >
            {item.description}
          </p>
        </div>
      </div>

      <div className="mt-2.5 flex w-full justify-center lg:mt-8">
        <div
          className={cn("flex w-full max-w-[460px] justify-center", revealMotion && "motion-reduce:animate-none")}
          style={
            revealMotion
              ? {
                  animation: `vitrine3-fade-in ${D_CONTENT}ms ${EASE} both`,
                  animationDelay: "260ms",
                }
              : undefined
          }
        >
          <img
            src={item.packshot}
            alt=""
            role="presentation"
            className="max-h-[200px] w-auto max-w-full object-contain object-bottom lg:max-h-[500px]"
            decoding="async"
          />
        </div>
      </div>

      <div className="mt-2.5 flex w-full max-w-[440px] flex-col items-stretch gap-2.5 lg:mt-7 lg:max-w-[448px] lg:gap-10">
        <p
          className={cn(
            "text-center text-[14px] font-normal leading-[1.45] tracking-wide text-black lg:text-[1.0625rem] lg:leading-snug",
            revealMotion && "motion-reduce:animate-none",
          )}
          style={
            revealMotion
              ? {
                  animation: `vitrine3-fade-in ${D_CONTENT}ms ${EASE} both`,
                  animationDelay: "325ms",
                }
              : undefined
          }
        >
          {item.price}
        </p>
        <a
          href={item.href}
          className={cn(
            "mx-auto flex w-[70%] max-w-full items-center justify-center border-0 bg-[#000] px-14 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[#fff] transition-opacity duration-200 ease-out hover:bg-[#000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f2efe8] lg:mx-0 lg:w-full",
            revealMotion && "motion-reduce:animate-none",
          )}
          style={
            revealMotion
              ? {
                  animation: `vitrine3-fade-in ${D_CONTENT}ms ${EASE} both`,
                  animationDelay: "390ms",
                }
              : undefined
          }
        >
          Comprar
        </a>
      </div>
    </>
  );
}
