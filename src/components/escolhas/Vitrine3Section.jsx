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
      <div className="flex min-h-0 flex-col lg:min-h-[80vh] lg:flex-row lg:items-stretch">
        {/* Coluna imagem 55% */}
        <div className="group/imageCol relative w-full min-h-[52svh] shrink-0 overflow-hidden lg:min-h-[80vh] lg:w-[55%]">
          {/* Hero idle ou reduced motion */}
          {idleHero ? (
            <div className="absolute inset-0 z-[1]" aria-hidden={false}>
              <img
                src={idleHero.editorialImage}
                alt=""
                role="presentation"
                className="h-full min-h-[52svh] w-full scale-100 object-cover lg:min-h-[80vh]"
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
                className="h-full min-h-[52svh] w-full object-cover lg:min-h-[80vh]"
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
                className="h-full min-h-[52svh] w-full object-cover motion-reduce:scale-100 motion-reduce:opacity-100 lg:min-h-[80vh]"
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

        {/* Coluna produto 45% */}
        <div className="relative flex w-full min-h-0 flex-1 flex-col items-center justify-center bg-[#f2efe8] px-4 py-16 sm:px-5 lg:min-h-[80vh] lg:w-[45%] lg:px-14 lg:py-20 xl:px-16">
          <div className="relative mx-auto flex w-full max-w-[460px] min-h-[20rem] flex-1 flex-col items-center justify-center px-1 sm:px-2 lg:min-h-0">
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
      </div>

      <nav
        className="border-t border-ink/[0.06] bg-pearl"
        aria-label="Selecionar produto na vitrine"
      >
        <div className="mx-auto flex w-full max-w-site flex-col items-center gap-6 py-4 shell-px sm:py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-5">
          <div className="flex w-full min-w-0 justify-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-1 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
            <div
              role="tablist"
              className="mx-auto flex max-w-[960px] flex-nowrap items-center justify-center gap-x-1 text-center sm:gap-x-2"
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
                          ? "origin-center scale-[1.02] font-medium text-[#0a0a0a] after:w-[70%] after:opacity-[0.58] hover:after:w-[83%] hover:after:opacity-[0.66]"
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
            className="inline-flex shrink-0 items-center whitespace-nowrap border-b border-ink/18 pb-0.5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/45 transition duration-200 hover:border-ink/32 hover:text-ink/78 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/22 focus-visible:ring-offset-2 focus-visible:ring-offset-pearl"
          >
            Ver todo o catálogo<span aria-hidden> →</span>
          </a>
        </div>
      </nav>

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
    <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-[2] px-4 pb-8 pt-12 sm:px-5 lg:px-10 lg:pb-10 lg:pt-16">
      <div
        className={cn(
          "max-w-[24rem] -translate-x-2 -translate-y-5 rounded-lg border border-white/15 bg-[rgba(255,255,255,0.6)] px-6 py-6 shadow-none backdrop-blur-[8px] sm:-translate-x-3 sm:px-7 sm:py-7 lg:-translate-x-4 lg:rounded-xl lg:px-7 lg:py-7",
          animateCard && !reduceMotion && "motion-reduce:animate-none",
        )}
        style={fadeIn}
      >
        <p className="text-[13px] font-medium uppercase leading-[1.4] tracking-[0.26em] text-ink/45 md:text-[10px] md:leading-normal">
          {item.overlayEyebrow}
        </p>
        <h2 className="mt-3 font-display text-[22px] font-light leading-[1.3] tracking-[-0.035em] text-[#0a0a0a] sm:text-[1.6rem] sm:leading-snug lg:text-[1.75rem]">
          {item.overlayTitle}
        </h2>
        <p className="mt-3 max-w-[32ch] text-[16px] font-light leading-[1.5] text-[#4a4a4a] sm:text-[0.9375rem] sm:leading-[1.55]">
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
            "text-[13px] font-medium uppercase leading-[1.4] tracking-[0.26em] text-ink/40 md:text-[10px] md:leading-normal",
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
        <div className="mt-4 w-full sm:max-w-[448px]">
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
            <h3 className="-translate-x-2 font-display text-[22px] font-light leading-[1.3] tracking-[-0.045em] text-[#0a0a0a] sm:text-[2.05rem] sm:leading-[1.12] lg:text-[2.15rem]">
              {item.name}
            </h3>
          </div>
          <p
            className={cn(
              "mt-3 whitespace-pre-line text-[16px] font-light leading-[1.5] text-[#5c5c5c] sm:text-[0.9375rem] sm:leading-[1.48] lg:text-[1rem]",
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

      <div className="mt-8 flex w-full justify-center">
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
            className="max-h-[438px] w-auto max-w-full object-contain object-bottom sm:max-h-[500px]"
            decoding="async"
          />
        </div>
      </div>

      <div className="mt-7 flex w-full max-w-[440px] flex-col items-stretch gap-8 sm:max-w-[448px] sm:gap-10">
        <p
          className={cn(
            "text-center text-[15px] font-normal leading-[1.6] tracking-wide text-black sm:text-[0.9375rem] sm:leading-snug md:text-base lg:text-[1.0625rem]",
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
            "flex w-full items-center justify-center border-0 bg-[#000] px-14 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[#fff] transition-opacity duration-200 ease-out hover:bg-[#000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f2efe8]",
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
