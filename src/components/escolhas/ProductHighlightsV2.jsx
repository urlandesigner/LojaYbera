import React from "react";

const editorialTitle = "Os mais escolhidos para começar.";
const editorialDescription = "Seleção pensada para cada momento do cuidado.";
const defaultHref = "#produtos";
/** Duração de cada etapa da timeline até avançar ao próximo produto (ms). */
const VITRINE_TIMELINE_STEP_MS = 6500;

function EscolhasHeading({ headingId }) {
  return (
    <div className="max-w-3xl">
      <p className="section-kicker">Escolhas essenciais</p>
      <h2
        id={headingId}
        className="mt-5 font-display text-5xl leading-[1.24] tracking-[-0.01em] text-ink md:text-6xl md:leading-[1.2]"
      >
        {editorialTitle}
      </h2>
      <p className="mt-6 text-base leading-8 text-ink/72 md:text-lg">{editorialDescription}</p>
    </div>
  );
}

function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Escolhas essenciais — vitrine V2: hero com card + timeline (linha, progresso e pontos) abaixo da imagem.
 */
export function ProductHighlightsV2({ items = [] }) {
  const list = React.useMemo(() => items.filter(Boolean), [items]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [previewIndex, setPreviewIndex] = React.useState(null);
  const [timelineAdvance, setTimelineAdvance] = React.useState(0);
  const [timelinePaused, setTimelinePaused] = React.useState(false);
  const mediaRootRef = React.useRef(null);
  const touchStartXRef = React.useRef(null);

  const safeCount = list.length;
  const displayedIndex =
    previewIndex != null && previewIndex >= 0 && previewIndex < safeCount ? previewIndex : activeIndex;

  React.useEffect(() => {
    if (!mediaRootRef.current) {
      return;
    }
    const videos = mediaRootRef.current.querySelectorAll("video[data-vitrine-index]");
    videos.forEach((node) => {
      const idx = Number(node.dataset.vitrineIndex);
      if (idx === displayedIndex) {
        node.play().catch(() => {});
      } else {
        node.pause();
        try {
          node.currentTime = 0;
        } catch {
          /* ignore */
        }
      }
    });
  }, [displayedIndex, safeCount]);

  React.useEffect(() => {
    if (activeIndex >= safeCount) {
      setActiveIndex(0);
    }
  }, [activeIndex, safeCount]);

  React.useEffect(() => {
    if (safeCount <= 1) {
      setTimelineAdvance(1);
      return undefined;
    }
    if (timelinePaused) {
      return undefined;
    }

    setTimelineAdvance(0);
    const start = performance.now();
    const intervalId = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - start) / VITRINE_TIMELINE_STEP_MS);
      setTimelineAdvance(t);
      if (t >= 1) {
        window.clearInterval(intervalId);
        setActiveIndex((i) => (i + 1) % safeCount);
        setPreviewIndex(null);
      }
    }, 32);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [activeIndex, safeCount, timelinePaused]);

  const goDelta = React.useCallback(
    (delta) => {
      if (safeCount <= 1) {
        return;
      }
      setPreviewIndex(null);
      setActiveIndex((i) => (i + delta + safeCount) % safeCount);
    },
    [safeCount],
  );

  const handleTouchStart = React.useCallback((event) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  }, []);

  const handleTouchEnd = React.useCallback(
    (event) => {
      const startX = touchStartXRef.current;
      const endX = event.changedTouches[0]?.clientX;
      touchStartXRef.current = null;
      if (startX == null || endX == null) {
        return;
      }
      const dx = startX - endX;
      const threshold = 48;
      if (Math.abs(dx) < threshold) {
        return;
      }
      if (dx > 0) {
        goDelta(1);
      } else {
        goDelta(-1);
      }
    },
    [goDelta],
  );

  if (!safeCount) {
    return null;
  }

  const vitrineId = "vitrine-escolhas-hero";
  const headingId = `${vitrineId}-heading`;
  const navId = `${vitrineId}-nav`;

  const segmentStart = safeCount > 0 ? (activeIndex + 0.5) / safeCount : 0;
  const segmentEnd =
    safeCount <= 1 ? 1 : activeIndex < safeCount - 1 ? (activeIndex + 1.5) / safeCount : 1;
  const lineFillProgress =
    safeCount <= 1 ? 1 : segmentStart + (segmentEnd - segmentStart) * timelineAdvance;

  return (
    <section className="bg-pearl pt-[84px] pb-0" aria-labelledby={headingId}>
      <div className="mx-auto w-full max-w-site shell-px">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <EscolhasHeading headingId={headingId} />
          <a href="#produtos" className="button-editorial shrink-0 self-start lg:self-end">
            Ver produtos
            <span className="text-base leading-none transition duration-300">→</span>
          </a>
        </div>
      </div>

      <div className="mt-10 lg:mt-12">
        <div className="relative left-1/2 w-[100dvw] max-w-[100dvw] -translate-x-1/2 overflow-x-clip">
          <div
            ref={mediaRootRef}
            className="relative isolate h-[clamp(504px,calc(52svh+84px),604px)] w-full overflow-hidden bg-[#ded8cf] lg:h-[clamp(684px,calc(58vh+84px),804px)]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {list.map((item, index) => {
              const isOn = displayedIndex === index;
              return (
                <div
                  key={item.name ?? String(index)}
                  className={cn(
                    "absolute inset-0 transition-[opacity,transform] duration-300 ease-in-out motion-reduce:transition-none",
                    isOn
                      ? "pointer-events-auto z-[1] scale-100 opacity-100"
                      : "pointer-events-none z-0 scale-[1.02] opacity-0",
                  )}
                  aria-hidden={!isOn}
                >
                  {item.video ? (
                    <video
                      data-vitrine-index={index}
                      className="absolute inset-0 h-full w-full object-cover object-center contrast-[1.04] brightness-[0.985] saturate-[1.02]"
                      src={item.video}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={item.name}
                    />
                  ) : (
                    <img
                      src={item.image}
                      alt=""
                      role="presentation"
                      className="absolute inset-0 h-full w-full object-cover object-center contrast-[1.04] brightness-[0.985] saturate-[1.02]"
                      decoding="async"
                      fetchPriority={index === 0 ? "high" : "low"}
                    />
                  )}
                </div>
              );
            })}
            <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/[0.24] via-black/[0.07] to-black/[0.06]" />
            <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(12,10,9,0.16)_0%,transparent_44%,transparent_100%)]" />

            <div className="pointer-events-none absolute inset-0 z-[3] mx-auto flex max-w-site flex-col lg:flex-row lg:items-end lg:justify-start">
              <div className="pointer-events-auto flex w-full flex-1 flex-col justify-end px-4 pb-8 pt-6 sm:px-6 lg:px-10 lg:pb-12 lg:pt-10 xl:px-12">
                <div
                  className="relative w-full max-w-[min(100%,28rem)] -translate-x-1.5 translate-y-0.5 border border-black/[0.06] bg-white p-10 shadow-[0_20px_44px_rgba(0,0,0,0.07)] sm:p-11 lg:-translate-x-3 lg:-translate-y-2.5 lg:p-12 xl:max-w-[29rem] xl:p-14"
                  role="region"
                  aria-roledescription="Destaque"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <div className="relative min-h-[10.5rem]">
                    {list.map((item, index) => {
                      const show = displayedIndex === index;
                      return (
                        <div
                          key={item.name ?? String(index)}
                          className={cn(
                            "transition-opacity duration-300 ease-in-out motion-reduce:transition-none",
                            show
                              ? "relative z-[1] opacity-100"
                              : "pointer-events-none absolute inset-0 z-0 opacity-0",
                          )}
                          aria-hidden={!show}
                        >
                          <h3 className="font-display text-[clamp(1.72rem,2.65vw,2.38rem)] font-bold leading-[1.05] tracking-[-0.023em] text-[#0e0c0a]">
                            {item.name}
                          </h3>
                          <p className="mt-5 max-w-[34ch] text-[0.9375rem] leading-[1.65] text-ink/54 sm:text-base sm:leading-[1.62]">
                            <span className="line-clamp-2">{item.note}</span>
                          </p>
                          <a
                            href={item.href ?? defaultHref}
                            className="pointer-events-auto mt-11 inline-flex w-fit items-center gap-2 border-b border-ink/14 pb-px text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/46 transition-colors duration-300 hover:border-ink/28 hover:text-ink/78 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:ring-offset-2"
                          >
                            Explorar
                            <span className="text-xs leading-none" aria-hidden>
                              →
                            </span>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <nav
            className="bg-pearl pt-6 pb-14 sm:pt-7 sm:pb-16 lg:pt-8 lg:pb-[4.25rem]"
            aria-label="Destaques da vitrine"
            onMouseEnter={() => setTimelinePaused(true)}
            onMouseLeave={() => {
              setTimelinePaused(false);
              setPreviewIndex(null);
            }}
          >
            <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10 xl:px-12">
              <div className="relative w-full pb-1 pt-2">
                <div
                  className="pointer-events-none absolute left-2 right-2 top-[23px] z-0 h-px bg-ink/[0.11] sm:left-3 sm:right-3"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute left-2 right-2 top-[23px] z-[1] h-px overflow-hidden bg-transparent sm:left-3 sm:right-3"
                  aria-hidden
                >
                  <div
                    className="h-full w-full origin-left bg-ink/[0.38]"
                    style={{ transform: `scaleX(${lineFillProgress})` }}
                  />
                </div>

                <div
                  id={navId}
                  role="tablist"
                  aria-label="Selecionar produto em destaque"
                  className="relative z-[2] grid w-full gap-x-1 pt-1 sm:gap-x-2"
                  style={{ gridTemplateColumns: `repeat(${safeCount}, minmax(0, 1fr))` }}
                >
                  {list.map((item, index) => {
                    const isActive = activeIndex === index;
                    return (
                      <span
                        key={item.name ?? String(index)}
                        role="tab"
                        tabIndex={0}
                        aria-selected={isActive}
                        className="group/tl flex min-w-0 cursor-pointer flex-col items-center gap-3 outline-none motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-ink/18 focus-visible:ring-offset-4 focus-visible:ring-offset-pearl"
                        onMouseEnter={() => setPreviewIndex(index)}
                        onFocus={() => setPreviewIndex(index)}
                        onBlur={() => setPreviewIndex(null)}
                        onClick={() => {
                          setActiveIndex(index);
                          setPreviewIndex(null);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setActiveIndex(index);
                            setPreviewIndex(null);
                          }
                        }}
                      >
                        <span
                          className={cn(
                            "relative z-[2] rounded-full bg-ink transition-[width,height,opacity,box-shadow] duration-200 ease-out motion-reduce:transition-none",
                            isActive
                              ? "h-3 w-3 opacity-100 shadow-[0_2px_10px_rgba(0,0,0,0.12)]"
                              : "h-[7px] w-[7px] opacity-[0.42] group-hover/tl:h-2.5 group-hover/tl:w-2.5 group-hover/tl:opacity-[0.88]",
                          )}
                          aria-hidden
                        />
                        <span
                          className={cn(
                            "max-w-[10.5rem] text-center text-[11px] leading-snug tracking-[-0.01em] transition-[opacity,font-weight] duration-200 ease-out sm:max-w-[12rem] sm:text-xs motion-reduce:transition-none",
                            isActive
                              ? "font-semibold text-ink opacity-100"
                              : "font-normal text-ink opacity-[0.48] group-hover/tl:opacity-[0.88]",
                          )}
                        >
                          {item.name}
                        </span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </nav>
          <p className="mx-auto max-w-site px-4 pb-4 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-ink/36 sm:px-6 md:hidden">
            Deslize na imagem para trocar
          </p>
        </div>
      </div>
    </section>
  );
}
