import React from "react";
import EditorialProductCard from "./EditorialProductCard";

function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

function useInView(options = {}) {
  const ref = React.useRef(null);
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;

    if (!node || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
  titleClassName = "",
  descriptionClassName = "",
}) {
  const alignment = align === "center" ? "mx-auto text-center" : "";
  const titleTone = invert ? "text-white" : "text-ink";
  const bodyTone = invert ? "text-white/70" : "text-ink/72";
  const kickerTone = invert
    ? "section-kicker text-white/55 before:bg-white/35"
    : "section-kicker";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <p className={kickerTone}>{eyebrow}</p>
      <h2
        className={cn(
          "mt-4 font-display text-[28px] leading-[1.2] tracking-[-0.01em] md:text-6xl md:leading-[1.2]",
          titleTone,
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-[16px] leading-[1.5] md:text-lg md:leading-8",
            descriptionClassName || bodyTone,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function BagIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="7.15"
        y="8.35"
        width="9.7"
        height="9.9"
        rx="0"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <g transform="translate(0.12 0)">
        <path
          d="M10.05 8.15C10.05 6.95 10.98 6 12.18 6H12.82C14.02 6 14.95 6.95 14.95 8.15"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

function SearchIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle
        cx="10.75"
        cy="10.75"
        r="4.85"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M14.35 14.35L18.15 18.15"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InstagramIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect
        x="4.75"
        y="4.75"
        width="14.5"
        height="14.5"
        rx="0"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <circle cx="12" cy="12" r="3.35" stroke="currentColor" strokeWidth="1.35" />
      <circle cx="17" cy="7.15" r="0.9" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M13.3 5.4V14.2C13.3 16.08 11.78 17.6 9.9 17.6C8.3 17.6 7 16.3 7 14.7C7 13.1 8.3 11.8 9.9 11.8C10.32 11.8 10.67 11.87 11 12V10.05C10.65 9.98 10.28 9.95 9.9 9.95C7.28 9.95 5.15 12.08 5.15 14.7C5.15 17.32 7.28 19.45 9.9 19.45C12.8 19.45 15.15 17.1 15.15 14.2V10.15C16.12 10.88 17.32 11.32 18.62 11.32V9.47C16.34 9.47 14.45 7.62 14.45 5.4H13.3Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Menu principal — intenção: catálogo (página), cuidados/resultados (âncoras na home), profissionais (externo). */
const YBERA_NAV_PROFISSIONAIS_HREF = "https://www.ybera.com.br/";

const PRIMARY_HEADER_NAV = [
  { id: "catalogo", label: "Catálogo", href: "/catalogo", emphasis: true },
  { id: "cuidados", label: "Cuidados", href: "/#rotina", sectionId: "rotina" },
  { id: "resultados", label: "Resultados", href: "/#resultado", sectionId: "resultado" },
  {
    id: "profissionais",
    label: "Profissionais",
    href: YBERA_NAV_PROFISSIONAIS_HREF,
    external: true,
  },
];

function isAppHomePathname() {
  const p = window.location.pathname;
  return p === "/" || p === "";
}

export function Header({ solid = false }) {
  const [isPastHero, setIsPastHero] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (solid) {
      setIsPastHero(true);
      return undefined;
    }

    const onScroll = () => {
      if (window.scrollY <= 24) {
        setIsPastHero(false);
        return;
      }

      const hero = document.getElementById("hero");

      if (!hero) {
        setIsPastHero(window.scrollY > 56);
        return;
      }

      const heroBottom = hero.getBoundingClientRect().bottom;
      setIsPastHero(heroBottom <= 96 || window.scrollY > 56);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  React.useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = React.useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const onHomeSectionNavClick = React.useCallback(
    (event, sectionId) => {
      if (!sectionId || !isAppHomePathname()) {
        return;
      }
      event.preventDefault();
      closeMobileMenu();
      const el = document.getElementById(sectionId);
      if (!el) {
        return;
      }
      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      const next = `#${sectionId}`;
      if (window.location.hash !== next) {
        window.history.replaceState(null, "", next);
      }
    },
    [closeMobileMenu],
  );

  const headerForeground = isPastHero ? "text-ink" : "text-white";
  const menuTone = isPastHero ? "text-ink/84" : "text-white";
  const menuHoverTone = isPastHero ? "hover:text-ink" : "hover:text-white";

  return (
    <>
      <header
        id="ybera-menu-refactor-navigation-v1"
        className={`fixed inset-x-0 top-0 z-50 pointer-events-auto transition-[background-color,border-color,color,backdrop-filter] duration-300 ${
          isPastHero
            ? "border-b border-black/[0.05] bg-[linear-gradient(180deg,rgba(246,244,242,0.9),rgba(246,244,242,0.82))] backdrop-blur-[7px]"
            : "border-none bg-[linear-gradient(180deg,rgba(18,14,12,0.42),rgba(18,14,12,0.2))] shadow-none backdrop-blur-[7px]"
        }`}
      >
        <div className="mx-auto flex w-full max-w-site items-center justify-between shell-px py-5">
          <a href="/" className="inline-flex items-center">
            <img
              src="/ybera-logo.webp"
              alt="Ybera"
              className={`h-9 w-auto opacity-95 transition duration-300 sm:h-11 ${
                isPastHero ? "brightness-0" : "brightness-0 invert"
              }`}
            />
          </a>

          <div
            className={`hidden items-center gap-8 transition-colors duration-300 md:flex ${headerForeground}`}
          >
            <nav className="flex items-center gap-10 text-[12px] font-medium uppercase tracking-[0.22em]">
              {PRIMARY_HEADER_NAV.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => onHomeSectionNavClick(e, link.sectionId)}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={cn(
                    "transition",
                    link.emphasis
                      ? isPastHero
                        ? "font-semibold text-ink hover:text-ink"
                        : "font-semibold text-white hover:text-white"
                      : isPastHero
                        ? "text-ink/74 hover:text-ink"
                        : "text-white/92 hover:text-white",
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="#"
              aria-label="Buscar"
              className="inline-flex items-center justify-center transition duration-300 hover:opacity-80 hover:scale-[1.03]"
            >
              <SearchIcon className="h-[22px] w-[22px]" />
            </a>

            <a
              href="#"
              aria-label="Abrir sacola"
              className="relative inline-flex items-center justify-center transition duration-300 hover:opacity-80 hover:scale-[1.03]"
            >
              <BagIcon className="h-[23px] w-[23px]" />
            </a>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <a
              href="#"
              aria-label="Abrir sacola"
              className={`inline-flex h-10 w-10 items-center justify-center transition duration-300 ${
                isPastHero ? "text-ink/82 hover:text-ink" : "text-white hover:text-white"
              }`}
            >
              <BagIcon className="h-[20px] w-[20px]" />
            </a>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              className={`inline-flex min-h-10 min-w-10 items-center justify-center text-[11px] font-semibold uppercase tracking-[0.24em] transition duration-300 ${menuTone} ${menuHoverTone}`}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="mr-2">{isMobileMenuOpen ? "FECHAR" : "MENU"}</span>
              <span className="relative h-[10px] w-[16px]">
                <span
                  className={`absolute left-0 top-0 h-px w-full transition duration-300 ${
                    isMobileMenuOpen ? "translate-y-[4px] rotate-45" : ""
                  } ${isPastHero ? "bg-ink/90" : "bg-white"}`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full transition duration-300 ${
                    isMobileMenuOpen ? "-translate-y-[4px] -rotate-45" : ""
                  } ${isPastHero ? "bg-ink/90" : "bg-white"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] md:hidden ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={closeMobileMenu}
          className={`absolute inset-0 bg-black/55 backdrop-blur-[4px] transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute right-0 top-0 flex h-full w-[86vw] max-w-[27rem] flex-col bg-[linear-gradient(180deg,rgba(23,18,15,0.98),rgba(16,13,11,0.96))] px-7 pb-8 pt-[5rem] text-white shadow-[-18px_0_60px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-7 py-5">
            <img
              src="/ybera-logo.webp"
              alt="Ybera"
              className="h-9 w-auto brightness-0 invert opacity-95"
            />
            <button
              type="button"
              onClick={closeMobileMenu}
              className="inline-flex min-h-10 min-w-10 items-center justify-center text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition duration-300 hover:text-white/82"
              aria-label="Fechar menu"
            >
              <span className="mr-2">FECHAR</span>
              <span className="relative h-[10px] w-[16px]">
                <span className="absolute left-0 top-0 h-px w-full translate-y-[4px] rotate-45 bg-white" />
                <span className="absolute bottom-0 left-0 h-px w-full -translate-y-[4px] -rotate-45 bg-white" />
              </span>
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-6">
            {PRIMARY_HEADER_NAV.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  onHomeSectionNavClick(e, link.sectionId);
                  if (!link.sectionId || !isAppHomePathname()) {
                    closeMobileMenu();
                  }
                }}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={cn(
                  "font-display text-[22px] leading-[1.3] tracking-[-0.012em] transition md:text-[clamp(28px,4.5vw,32px)] md:leading-[1.06]",
                  link.emphasis ? "font-semibold text-white hover:text-white" : "text-white/92 hover:text-white",
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
}

export function HeroSection({ stats, visuals }) {
  const defaultHeroId = stats.find((item) => item.id === "resultado")?.id ?? stats[0]?.id;
  const [activeHeroId, setActiveHeroId] = React.useState(defaultHeroId);
  const [isPaused, setIsPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const durationMs = 6500;
  const elapsedRef = React.useRef(0);
  const lastTickRef = React.useRef(null);
  const mobileSlideDurationMs = 460;
  const touchStartXRef = React.useRef(null);
  const mobileTrackRef = React.useRef(null);
  const mobileLeadCardRef = React.useRef(null);
  const statsById = React.useMemo(
    () => new Map(stats.map((item) => [item.id, item])),
    [stats],
  );
  const buildInitialMobileOrder = React.useCallback(() => {
    const defaultIndex = stats.findIndex((item) => item.id === defaultHeroId);
    const safeIndex = defaultIndex === -1 ? 0 : defaultIndex;
    const ids = stats.map((item) => item.id);
    return [...ids.slice(safeIndex), ...ids.slice(0, safeIndex)];
  }, [defaultHeroId, stats]);
  const [mobileOrder, setMobileOrder] = React.useState(buildInitialMobileOrder);
  const [mobileIsSliding, setMobileIsSliding] = React.useState(false);
  const [mobileSlideDistance, setMobileSlideDistance] = React.useState(0);

  React.useEffect(() => {
    setActiveHeroId(defaultHeroId);
  }, [defaultHeroId]);

  React.useEffect(() => {
    setMobileOrder(buildInitialMobileOrder());
  }, [buildInitialMobileOrder]);

  const measureMobileSlideDistance = React.useCallback(() => {
    const track = mobileTrackRef.current;
    const leadCard = mobileLeadCardRef.current;

    if (!track || !leadCard) {
      return 0;
    }

    const trackStyle = window.getComputedStyle(track);
    const gap = Number.parseFloat(trackStyle.columnGap || trackStyle.gap || "0") || 0;
    return leadCard.getBoundingClientRect().width + gap;
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 640 || mobileIsSliding) {
      return undefined;
    }

    const refreshDistance = () => {
      setMobileSlideDistance(measureMobileSlideDistance());
    };

    refreshDistance();
    window.addEventListener("resize", refreshDistance);

    return () => {
      window.removeEventListener("resize", refreshDistance);
    };
  }, [measureMobileSlideDistance, mobileIsSliding, mobileOrder]);

  const rotateMobileOrder = React.useCallback(() => {
    setMobileOrder((currentOrder) => {
      if (currentOrder.length <= 1) {
        return currentOrder;
      }

      const nextOrder = [...currentOrder.slice(1), currentOrder[0]];
      setActiveHeroId(nextOrder[0]);
      return nextOrder;
    });
    setMobileIsSliding(false);
    setProgress(0);
  }, []);

  const startMobileSlide = React.useCallback(() => {
    if (mobileIsSliding) {
      return;
    }

    const distance = measureMobileSlideDistance();

    if (distance <= 0) {
      rotateMobileOrder();
      return;
    }

    setMobileSlideDistance(distance);
    setMobileIsSliding(true);
  }, [measureMobileSlideDistance, mobileIsSliding, rotateMobileOrder]);

  React.useEffect(() => {
    elapsedRef.current = 0;
    lastTickRef.current = null;
    setProgress(0);
  }, [activeHeroId]);

  React.useEffect(() => {
    if (typeof window === "undefined" || stats.length <= 1) {
      return undefined;
    }

    if (isPaused) {
      lastTickRef.current = null;
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      const now = window.performance.now();
      const delta = lastTickRef.current == null ? 0 : now - lastTickRef.current;
      lastTickRef.current = now;
      elapsedRef.current += delta;

      if (elapsedRef.current >= durationMs) {
        if (window.innerWidth < 640) {
          if (!mobileIsSliding) {
            startMobileSlide();
          }
        } else {
          setActiveHeroId((currentId) => {
            const currentIndex = stats.findIndex((item) => item.id === currentId);
            const safeIndex = currentIndex === -1 ? 0 : currentIndex;
            return stats[(safeIndex + 1) % stats.length].id;
          });
        }
        elapsedRef.current = 0;
        lastTickRef.current = now;
        setProgress(0);
        return;
      }

      setProgress(elapsedRef.current / durationMs);
    }, 50);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [activeHeroId, durationMs, isPaused, mobileIsSliding, startMobileSlide, stats]);

  const activateHero = React.useCallback((heroId) => {
    setActiveHeroId(heroId);
    setProgress(0);
  }, []);

  const handleHeroTouchStart = React.useCallback((event) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
    setIsPaused(true);
  }, []);

  const handleHeroTouchEnd = React.useCallback(
    (event) => {
      const startX = touchStartXRef.current;
      const endX = event.changedTouches[0]?.clientX;
      touchStartXRef.current = null;
      setIsPaused(false);

      if (startX == null || endX == null) {
        return;
      }

      const deltaX = startX - endX;
      const threshold = 42;

      if (Math.abs(deltaX) < threshold) {
        return;
      }

      if (deltaX > 0 && !mobileIsSliding) {
        startMobileSlide();
      }
    },
    [mobileIsSliding, startMobileSlide],
  );

  const handleMobileTrackTransitionEnd = React.useCallback(
    (event) => {
      if (
        !mobileIsSliding ||
        event.propertyName !== "transform" ||
        event.target !== mobileTrackRef.current
      ) {
        return;
      }

      rotateMobileOrder();
    },
    [mobileIsSliding, rotateMobileOrder],
  );

  const activeHero = stats.find((item) => item.id === activeHeroId) ?? stats[0];
  const mobileOrderedStats = mobileOrder
    .map((id) => statsById.get(id))
    .filter(Boolean);

  const heroStatProductHref = (stat) =>
    stat.productHref ?? "/produto/oleo-de-mirra-reparador";

  return (
    <section id="hero" className="relative isolate overflow-hidden bg-[#13100e] text-white">
      <div className="absolute inset-0">
        <img
          src={visuals.default}
          alt={visuals.defaultAlt}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out ${
            activeHeroId === defaultHeroId ? "opacity-54" : "opacity-0"
          }`}
        />
        {stats.map((item) => (
          <img
            key={item.id}
            src={item.image}
            alt={item.alt}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out ${
              activeHeroId === item.id ? "opacity-54" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,10,9,0.58)_0%,rgba(12,10,9,0.34)_34%,rgba(12,10,9,0.12)_62%,rgba(12,10,9,0.22)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.18)_0%,rgba(12,10,9,0.12)_38%,rgba(12,10,9,0.68)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_46%,rgba(0,0,0,0.28),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.05),transparent_18%)]" />

      <div className="relative mx-auto flex min-h-[100dvh] min-h-screen w-full max-w-site flex-col shell-px pt-[80px]">
        <div
          className="min-h-0 flex-1 notebook:flex-none notebook:min-h-0 notebook:h-[min(10dvh,5.5rem)]"
          aria-hidden="true"
        />
        <div className="hero-content max-w-[84rem] w-full pb-10 pt-6 [text-shadow:0_2px_24px_rgba(0,0,0,0.38)] md:pb-14 md:pt-0 notebook:pb-7 notebook:pt-1">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-white/35" aria-hidden="true" />
            <p className="text-[13px] font-medium uppercase leading-[1.4] tracking-[0.26em] text-white/58 md:text-[11px] md:leading-normal">
              Jeito Ybera de ser
            </p>
          </div>
          <h1 className="mt-5 max-w-[320px] font-display text-[44px] leading-[1.1] tracking-[-0.008em] text-white md:mt-5 md:max-w-[min(100%,26ch)] md:text-[length:clamp(44px,5vw,64px)] md:leading-[1.06] md:tracking-[-0.01em] notebook:mt-4 notebook:max-w-[min(100%,24ch)] notebook:text-[length:clamp(48px,5vw,64px)] notebook:leading-[1.05] wide:mt-5 wide:max-w-[min(100%,54rem)] wide:text-[7.9rem] wide:leading-[1.1] wide:tracking-[-0.008em]">
            <span className="block md:whitespace-nowrap notebook:font-medium wide:whitespace-nowrap wide:font-medium">
              Revelar a beleza
            </span>
            <span className="mt-[0.14em] block md:mt-[0.12em] md:whitespace-nowrap notebook:mt-[0.08em] notebook:font-normal notebook:tracking-[0.018em] notebook:text-white/[0.9] wide:mt-2 wide:whitespace-nowrap wide:font-normal wide:tracking-[0.012em] wide:text-white/[0.92]">
              que já existe em você
            </span>
          </h1>

          <div className="mt-8 flex items-center md:mt-10 notebook:mt-6 wide:mt-10">
            <a href="/catalogo" className="button-editorial-dark">
              Conhecer produtos
            </a>
          </div>

          <div
            className="mt-8 sm:hidden"
            onTouchStart={handleHeroTouchStart}
            onTouchEnd={handleHeroTouchEnd}
          >
            <div className="overflow-hidden">
              <div
                ref={mobileTrackRef}
                onTransitionEnd={handleMobileTrackTransitionEnd}
                className="flex gap-3 will-change-transform"
                style={{
                  transform: mobileIsSliding
                    ? `translate3d(-${mobileSlideDistance}px,0,0)`
                    : "translateX(0)",
                  transition: mobileIsSliding
                    ? `transform ${mobileSlideDurationMs}ms cubic-bezier(0.22,1,0.36,1)`
                    : "none",
                }}
              >
                {mobileOrderedStats.map((stat, index) => {
                  const isLeading = index === 0;

                  return (
                    <a
                      key={stat.id}
                      ref={isLeading ? mobileLeadCardRef : null}
                      href={heroStatProductHref(stat)}
                      className={`group/cta relative flex min-h-[52px] w-[min(24rem,calc(100vw-4.5rem))] shrink-0 cursor-pointer flex-col overflow-hidden px-4 py-4 text-left no-underline [-webkit-tap-highlight-color:transparent] transition-[background-color,backdrop-filter,box-shadow,opacity,filter] duration-[250ms] ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#13100e] ${
                        isLeading
                          ? "scale-[1.02] bg-[rgba(255,255,255,0.052)] opacity-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.075),0_4px_22px_rgba(0,0,0,0.07)] backdrop-blur-[9px] hover:bg-[rgba(255,255,255,0.078)] hover:backdrop-blur-[12px] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.11),0_10px_36px_rgba(0,0,0,0.12)] hover:brightness-[1.04]"
                          : "scale-100 bg-[rgba(255,255,255,0.028)] opacity-90 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.055),0_2px_14px_rgba(0,0,0,0.05)] backdrop-blur-[8px] hover:bg-[rgba(255,255,255,0.045)] hover:opacity-100 hover:backdrop-blur-[10px] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.085),0_8px_28px_rgba(0,0,0,0.09)] hover:brightness-[1.03]"
                      }`}
                      aria-label={`${stat.label}: ${stat.value}. Ver produto em destaque`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-[13px] uppercase leading-[1.4] tracking-editorial transition-colors duration-[250ms] ease-out group-hover/cta:text-white/54 ${
                              isLeading ? "text-white/48" : "text-white/36"
                            }`}
                          >
                            {stat.label}
                          </p>
                          <p
                            className={`mt-3 max-w-none text-[15px] font-normal leading-[1.6] transition-colors duration-[250ms] ease-out group-hover/cta:text-white ${
                              isLeading ? "text-white/86" : "text-white/66"
                            }`}
                          >
                            {stat.value}
                          </p>
                        </div>
                        <span
                          className="pointer-events-none shrink-0 self-start pt-0.5 text-[12px] font-normal leading-none text-white/50 transition-transform duration-[250ms] ease-out group-hover/cta:translate-x-[3px] group-focus-visible:translate-x-[3px]"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </div>
                      {isLeading ? (
                        <div className="mt-5 h-px w-full overflow-hidden bg-white/8">
                          <div
                            className="h-full bg-white/45 transition-[width] duration-75 linear"
                            style={{ width: `${progress * 100}%` }}
                          />
                        </div>
                      ) : null}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="hidden max-w-[78rem] grid-cols-3 gap-4 sm:mt-10 sm:grid lg:gap-5 notebook:mt-7 notebook:gap-3 wide:mt-10 wide:gap-5">
            {stats.map((stat) => (
              <a
                key={stat.id}
                href={heroStatProductHref(stat)}
                onMouseEnter={() => {
                  setIsPaused(true);
                  activateHero(stat.id);
                }}
                onMouseLeave={() => setIsPaused(false)}
                onFocus={() => {
                  setIsPaused(true);
                  activateHero(stat.id);
                }}
                onBlur={() => setIsPaused(false)}
                className={`group/cta relative flex min-h-[52px] cursor-pointer flex-col overflow-hidden px-5 py-5 text-left no-underline [-webkit-tap-highlight-color:transparent] transition-[background-color,backdrop-filter,box-shadow,opacity,filter] duration-[250ms] ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#13100e] lg:px-6 lg:py-6 notebook:min-h-[48px] notebook:px-4 notebook:py-4 ${
                  activeHeroId === stat.id
                    ? "scale-[1.02] bg-[rgba(255,255,255,0.052)] opacity-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.075),0_6px_26px_rgba(0,0,0,0.08)] backdrop-blur-[9px] hover:bg-[rgba(255,255,255,0.078)] hover:backdrop-blur-[12px] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.11),0_12px_40px_rgba(0,0,0,0.11)] hover:brightness-[1.04]"
                    : "scale-100 bg-[rgba(255,255,255,0.028)] opacity-90 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.055),0_2px_16px_rgba(0,0,0,0.06)] backdrop-blur-[8px] hover:bg-[rgba(255,255,255,0.045)] hover:opacity-100 hover:backdrop-blur-[10px] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.085),0_8px_30px_rgba(0,0,0,0.09)] hover:brightness-[1.03]"
                }`}
                aria-label={`${stat.label}: ${stat.value}. Ver produto em destaque`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-[10px] uppercase tracking-editorial transition-colors duration-[250ms] ease-out group-hover/cta:text-white/54 ${
                        activeHeroId === stat.id ? "text-white/48" : "text-white/36"
                      }`}
                    >
                      {stat.label}
                    </p>
                    <p
                      className={`mt-4 max-w-none text-[1.02rem] font-normal leading-7 transition-colors duration-[250ms] ease-out group-hover/cta:text-white md:text-[1.08rem] lg:text-[1.18rem] notebook:mt-3 notebook:leading-[1.55] wide:mt-4 wide:leading-7 ${
                        activeHeroId === stat.id ? "text-white/86" : "text-white/66"
                      }`}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <span
                    className="pointer-events-none shrink-0 self-start pt-0.5 text-[12px] font-normal leading-none text-white/50 transition-transform duration-[250ms] ease-out group-hover/cta:translate-x-[3px] group-focus-visible:translate-x-[3px]"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
                {activeHeroId === stat.id ? (
                  <div className="mt-8 h-px w-full overflow-hidden bg-white/8 notebook:mt-5 wide:mt-8">
                    <div
                      className="h-full bg-white/45 transition-[width] duration-75 linear"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                ) : null}
              </a>
            ))}
          </div>

          <img
            src={visuals.detail}
            alt={visuals.detailAlt}
            className="hidden h-0 w-0"
          />

        </div>
      </div>
    </section>
  );
}

export function SensoryBlock() {
  return (
    <div className="bg-halo">
      <div className="mx-auto max-w-5xl shell-px pb-12 pt-0 text-center md:pb-20">
        <p className="section-kicker mx-auto justify-center">RESULTADO REAL</p>
        <p className="mt-4 font-display text-[28px] leading-[1.2] text-ink md:text-6xl md:leading-tight">
          O resultado aparece. E permanece.
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-[16px] leading-[1.5] text-ink/68 md:text-lg md:leading-8">
          No brilho, no toque e no comportamento do fio ao longo do dia.
        </p>
      </div>
    </div>
  );
}

export function ManifestoSection() {
  return (
    <section className="bg-[#FAF8F6] px-0 pt-16 pb-16 text-ink md:pt-[120px] md:pb-[120px]">
      <div className="mx-auto max-w-4xl shell-px text-center">
        <p className="section-kicker mx-auto justify-center text-ink/48 before:bg-ink/24">
          Manifesto
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-[28px] leading-[1.2] tracking-[-0.016em] text-ink md:text-[60px] md:leading-[1.18]">
          A beleza começa no <em className="italic">cuidado</em>.
          <br />
          O brilho é o que fica.
        </h2>
        <p className="mt-4 text-[13px] font-semibold uppercase leading-[1.4] tracking-[0.34em] text-ink/28 md:text-[11px] md:leading-normal">
          Ybera desde 2005
        </p>
      </div>
    </section>
  );
}

export function ResultsSection({ items }) {
  const [sectionRef, isInView] = useInView({ threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
  const [parallaxOffset, setParallaxOffset] = React.useState(0);
  const [showAfter, setShowAfter] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateParallax = () => {
      if (mediaQuery.matches || !sectionRef.current) {
        setParallaxOffset(0);
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const normalized = Math.max(0, Math.min(progress, 1));
      setParallaxOffset((normalized - 0.5) * 36);
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);

    return () => {
      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("resize", updateParallax);
    };
  }, [sectionRef]);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      setShowAfter(true);
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setShowAfter((current) => !current);
    }, 2000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section
      id="resultado"
      ref={sectionRef}
      className="scroll-mt-[calc(var(--header-height)+10px)] bg-[#0B0B0B] section-y text-white max-lg:!py-6"
      style={{ backgroundColor: "#0B0B0B", backgroundImage: "none", boxShadow: "none" }}
    >
      <div className="mx-auto w-full max-w-none shell-px">
        <div
          className={`section-lead max-lg:!pb-2 md:!pb-20 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isInView ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-[6px]"
          }`}
        >
          <div className="max-w-3xl">
            <p className="section-kicker text-white/55 before:bg-white/35">Antes e depois</p>
            <h2 className="mt-2 font-display text-[28px] leading-[1.15] text-white max-lg:mt-2 md:mt-4 md:text-6xl md:leading-none">
              <span className="block">Você vê.</span>
              <span className="block">
                E <em className="italic">sente</em>.
              </span>
            </h2>
          </div>
        </div>
      </div>

      <div
        className={`mt-0 px-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] max-lg:-mt-1 lg:mt-0 lg:px-0 xl:px-0 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
        style={{ transitionDelay: isInView ? "80ms" : "0ms" }}
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-10">
          {/* Hero antes/depois — apenas desktop (lg+) */}
          <article className="relative hidden overflow-hidden lg:block">
            <div className="relative aspect-square overflow-hidden">
              <img
                src={items[0].beforeImage}
                alt={items[0].beforeAlt}
                className={`absolute inset-0 h-full w-full object-cover object-center transition duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  showAfter ? "scale-[1.01] opacity-0" : "scale-[1.02] opacity-100"
                }`}
                style={{ transform: `translateY(${parallaxOffset * 1.05}px) scale(${showAfter ? 1.01 : 1.02})` }}
              />
              <img
                src={items[0].image}
                alt={items[0].afterAlt ?? items[0].title}
                className={`absolute inset-0 h-full w-full object-cover object-center transition duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  showAfter ? "scale-[1.03] opacity-100" : "scale-[1.01] opacity-0"
                }`}
                style={{ transform: `translateY(${parallaxOffset * 1.05}px) scale(${showAfter ? 1.03 : isInView ? 1.01 : 1.03})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 px-8 pb-8 pt-16 md:px-10 md:pb-10 md:pt-20">
                <p className="max-w-none pr-0 font-display text-[28px] leading-[1.2] tracking-wide text-white/80 md:text-3xl md:leading-relaxed lg:text-4xl xl:text-[3rem]">
                  <span className="block">Resposta desde o</span>
                  <span className="block">primeiro uso.</span>
                </p>
              </div>
            </div>
          </article>

          {/* Comparativo lado a lado — protagonista no mobile */}
          <article className="relative overflow-hidden">
            <div className="relative aspect-square overflow-hidden max-lg:aspect-auto max-lg:h-[clamp(26.25rem,38svh,32.5rem)] max-lg:w-full max-lg:overflow-hidden lg:aspect-square lg:h-auto lg:min-h-0 lg:p-1">
              <img
                src={items[1].image}
                alt={items[1].title}
                className="absolute inset-0 h-full w-full object-cover max-lg:object-[center_22%] lg:object-center"
                style={{ transform: `translateY(${parallaxOffset * 0.7}px)` }}
              />
              <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/18" />
              <div
                className={`absolute inset-y-[10%] left-1/2 w-px -translate-x-1/2 bg-white/40 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] max-lg:inset-y-[14%] ${
                  isInView ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                }`}
              />
              <div className="absolute inset-x-0 top-3 flex items-start justify-between gap-2 px-3 max-lg:top-3 max-lg:px-3 lg:top-8 lg:items-center lg:justify-between lg:gap-0 lg:px-0 xl:px-0">
                <span className="max-w-[46%] text-[10px] uppercase leading-[1.35] tracking-[0.18em] text-white/62 lg:max-w-none lg:text-[13px] lg:leading-[1.4] lg:tracking-[0.24em] lg:text-white/58 md:text-[10px] md:leading-normal">
                  Sem o cuidado certo
                </span>
                <span className="max-w-[46%] text-right text-[10px] uppercase leading-[1.35] tracking-[0.18em] text-white/82 lg:max-w-none lg:text-[13px] lg:leading-[1.4] lg:tracking-[0.24em] lg:text-white/78 md:text-[10px] md:leading-normal">
                  Com Ybera
                </span>
              </div>
            </div>

            <div className="flex min-h-[6.5rem] flex-col items-center justify-center bg-[#0B0B0B] px-4 py-8 text-center sm:min-h-[7rem] sm:px-5 sm:py-10 lg:hidden">
              <p className="mx-auto max-w-none text-center font-display text-[clamp(0.9375rem,3.25vw,1.125rem)] font-light leading-tight tracking-[0.02em] text-white/88 max-lg:whitespace-nowrap">
                Resposta desde o primeiro uso.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function ProductRailSection({
  items,
  eyebrow = "Cuidado em movimento",
  title = (
    <>
      Os mais usados por quem busca
      <br />
      <em className="italic">resultado real</em>.
    </>
  ),
  description = "Escolhas de quem valoriza consistência e rotina.",
  viewAllHref = "/catalogo",
  viewAllLabel = "Ver todos",
}) {
  const railRef = React.useRef(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const loopItems = React.useMemo(() => [...items, ...items, ...items], [items]);
  const currentIndexRef = React.useRef(items.length);
  const isAnimatingRef = React.useRef(false);
  const settleTimerRef = React.useRef(null);
  const scrollSnapTimerRef = React.useRef(null);
  const autoplayResumeTimerRef = React.useRef(null);

  const getCards = React.useCallback(() => {
    if (!railRef.current) {
      return [];
    }

    return Array.from(railRef.current.querySelectorAll("[data-rail-card]"));
  }, []);

  const snapToIndex = React.useCallback(
    (index, behavior = "smooth") => {
      const container = railRef.current;
      const cards = getCards();

      if (!container || !cards.length) {
        return;
      }

      const boundedIndex = Math.max(0, Math.min(index, cards.length - 1));
      const targetLeft = cards[boundedIndex].offsetLeft;

      currentIndexRef.current = boundedIndex;
      isAnimatingRef.current = behavior === "smooth";
      container.scrollTo({ left: targetLeft, behavior });

      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = window.setTimeout(() => {
        isAnimatingRef.current = false;

        if (currentIndexRef.current < items.length) {
          const loopIndex = currentIndexRef.current + items.length;
          currentIndexRef.current = loopIndex;
          container.scrollTo({
            left: cards[loopIndex].offsetLeft,
            behavior: "auto",
          });
        } else if (currentIndexRef.current >= items.length * 2) {
          const loopIndex = currentIndexRef.current - items.length;
          currentIndexRef.current = loopIndex;
          container.scrollTo({
            left: cards[loopIndex].offsetLeft,
            behavior: "auto",
          });
        }
      }, behavior === "smooth" ? 620 : 0);
    },
    [getCards, items.length],
  );

  const pauseAutoplayBriefly = React.useCallback(() => {
    window.clearTimeout(autoplayResumeTimerRef.current);
    setIsPaused(true);
    autoplayResumeTimerRef.current = window.setTimeout(() => {
      setIsPaused(false);
    }, 900);
  }, []);

  const stepBy = React.useCallback(
    (direction) => {
      if (isAnimatingRef.current) {
        return;
      }

      const container = railRef.current;
      const cards = getCards();

      if (!container || !cards.length) {
        return;
      }

      if (direction < 0 && currentIndexRef.current <= items.length) {
        currentIndexRef.current = items.length * 2 - 1;
        container.scrollTo({
          left: cards[items.length * 2 - 1].offsetLeft,
          behavior: "auto",
        });
      }

      pauseAutoplayBriefly();
      snapToIndex(currentIndexRef.current + direction, "smooth");
    },
    [getCards, items.length, pauseAutoplayBriefly, snapToIndex],
  );

  const goToNext = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isAnimatingRef.current) {
      return;
    }

    stepBy(1);
  }, [stepBy]);

  const goToPrevious = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isAnimatingRef.current) {
      return;
    }

    stepBy(-1);
  }, [stepBy]);

  React.useEffect(() => {
    if (typeof window === "undefined" || !railRef.current) {
      return undefined;
    }

    const container = railRef.current;
    const cards = getCards();

    if (cards.length > items.length) {
      currentIndexRef.current = items.length;
      container.scrollTo({
        left: cards[items.length].offsetLeft,
        behavior: "auto",
      });
    }

    const snapToNearest = () => {
      if (isAnimatingRef.current) {
        return;
      }

      const cards = getCards();

      if (!cards.length) {
        return;
      }

      const nearestIndex = cards.reduce(
        (closestIndex, card, index) => {
          const currentDistance = Math.abs(card.offsetLeft - container.scrollLeft);
          const closestDistance = Math.abs(cards[closestIndex].offsetLeft - container.scrollLeft);
          return currentDistance < closestDistance ? index : closestIndex;
        },
        0,
      );

      snapToIndex(nearestIndex, "smooth");
    };

    const handleScroll = () => {
      if (isAnimatingRef.current) {
        return;
      }

      window.clearTimeout(scrollSnapTimerRef.current);
      scrollSnapTimerRef.current = window.setTimeout(() => {
        snapToNearest();
      }, 140);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.clearTimeout(settleTimerRef.current);
      window.clearTimeout(scrollSnapTimerRef.current);
      window.clearTimeout(autoplayResumeTimerRef.current);
    };
  }, [getCards, items.length, snapToIndex]);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      return undefined;
    }

    const autoplayId = window.setInterval(() => {
      if (isPaused || isAnimatingRef.current) {
        return;
      }

      snapToIndex(currentIndexRef.current + 1, "smooth");
    }, 5000);

    return () => {
      window.clearInterval(autoplayId);
    };
  }, [isPaused, snapToIndex]);

  return (
    <section id="produtos" className="bg-white section-y-cards">
      <div className="mx-auto w-full max-w-site shell-px section-lead">
        <div className="max-w-3xl text-left">
          <p className="section-kicker mx-0 justify-start">{eyebrow}</p>
          <h2 className="mt-4 font-display text-[28px] leading-[1.2] text-ink md:text-6xl md:leading-[0.96]">
            {title}
          </h2>
        </div>
        <div className="mt-4 flex w-full min-w-0 flex-row flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <p className="max-w-3xl min-w-0 flex-1 text-left text-[16px] leading-[1.5] text-ink/68 md:text-lg md:leading-8">
            {description}
          </p>
          {viewAllHref ? (
            <a
              href={viewAllHref}
              className="inline-flex shrink-0 cursor-pointer items-center whitespace-nowrap border-b border-ink/20 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/85 transition-opacity duration-300 ease-out hover:border-ink/40 hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:text-[11px]"
            >
              {viewAllLabel}
              <span aria-hidden className="ml-1.5 text-[0.7em]">
                →
              </span>
            </a>
          ) : null}
        </div>
      </div>

      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <div className="absolute inset-y-0 left-0 z-[3] flex items-center pl-3 sm:pl-4 lg:pl-5 xl:pl-6">
          <button
            type="button"
            aria-label="Voltar produtos"
            onClick={goToPrevious}
            className="inline-flex h-10 w-10 items-center justify-center border border-white/24 bg-black/28 text-black backdrop-blur-[4px] transition duration-300 hover:bg-black/36 active:scale-[0.96] sm:h-11 sm:w-11 lg:border-black/12 lg:bg-white/78 lg:text-black lg:backdrop-blur-sm lg:hover:border-black/22 lg:hover:bg-white lg:hover:text-black"
          >
            <span className="text-lg leading-none">←</span>
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 z-[3] flex items-center pr-3 sm:pr-4 lg:pr-5 xl:pr-6">
          <button
            type="button"
            aria-label="Avançar produtos"
            onClick={goToNext}
            className="inline-flex h-10 w-10 items-center justify-center border border-white/24 bg-black/28 text-black backdrop-blur-[4px] transition duration-300 hover:bg-black/36 active:scale-[0.96] sm:h-11 sm:w-11 lg:border-black/12 lg:bg-white/78 lg:text-black lg:backdrop-blur-sm lg:hover:border-black/22 lg:hover:bg-white lg:hover:text-black"
          >
            <span className="text-lg leading-none">→</span>
          </button>
        </div>
        <div
          ref={railRef}
          className="hide-scrollbar snap-x snap-mandatory overflow-x-auto scroll-smooth"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="flex w-max items-stretch gap-1 md:gap-1.5 lg:gap-2">
            {loopItems.map((item, index) => (
              <EditorialProductCard
                key={`${item.result ?? item.name}-${index}`}
                railCard
                variant="rail"
                href={item.href ?? "/produto/oleo-de-mirra-reparador"}
                tag={item.tag ?? "Mais vendidos"}
                image={item.image}
                imageAlt={item.productName ?? item.result ?? item.name}
                title={item.result ?? item.name}
                subtitle={item.productName ?? item.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const launchEditorialItems = [
  {
    name: "Shampoo Multifuncional",
    concept: "O primeiro passo que respira.",
    functional: "Limpa com precisão e prepara o fio para o que vem depois.",
    href: "/produto/shampoo-multifuncao-cuidados-profundos",
    cta: "Ver produto",
    image: "/images/27.jpg.webp",
    imageAlt: "Resultado no cabelo com brilho, textura e movimento",
    imageHoverClass: "group-hover:scale-[1.025]",
    overlayClass:
      "pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(17,13,11,0.04),rgba(17,13,11,0.16))]",
    mobileShell:
      "group relative aspect-[3/4] w-full min-w-0 overflow-hidden sm:aspect-[3/4] md:aspect-[3/4] md:min-h-[18rem]",
    desktopShell:
      "group relative min-h-[28rem] overflow-hidden sm:min-h-[34rem] lg:min-h-[40rem] xl:min-h-[46rem]",
  },
  {
    name: "Óleo de Mirra Reparador",
    concept: "Um brilho que se revela no movimento.",
    functional: "Finaliza com leveza e prolonga o alinhamento ao longo do dia.",
    /** Texto mais curto só no grid abaixo de lg (remove "ao longo do dia"). */
    functionalMobile: "Finaliza com leveza e prolonga o alinhamento.",
    href: "/produto/oleo-de-mirra-reparador",
    cta: "Ver produto",
    image: "/images/13.png",
    imageAlt: "Óleo de Mirra Reparador",
    imageHoverClass: "group-hover:scale-[1.02]",
    overlayClass:
      "pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,14,12,0.04),rgba(18,14,12,0.12))]",
    mobileShell:
      "group relative aspect-[3/4] w-full min-w-0 overflow-hidden bg-[#e8ddd2] sm:aspect-[3/4] md:aspect-[3/4] md:min-h-[18rem]",
    desktopShell:
      "group relative min-h-[28rem] overflow-hidden bg-[#e8ddd2] sm:min-h-[34rem] lg:min-h-[40rem] xl:min-h-[46rem]",
  },
];

function LaunchEditorialCta({ href, label, align = "center", emphasis = "soft", compact = false }) {
  void emphasis;
  const pt = compact ? "pt-5 sm:pt-6" : "pt-7";
  const wrap =
    align === "start"
      ? cn("self-start", pt)
      : align === "end"
        ? cn("self-end", pt)
        : cn("self-center", pt);
  const btnClass = compact
    ? "button-editorial-compact no-underline h-12"
    : "button-editorial no-underline";
  return (
    <div className={wrap}>
      <a href={href} className={btnClass}>
        <span>{label}</span>
        <span className={compact ? "text-sm leading-none" : "text-base leading-none"} aria-hidden>
          →
        </span>
      </a>
    </div>
  );
}

/** `columnIndex` 0 = protagonista (esquerda); 1 = direita com mais contraste e ritmo alinhado à imagem. */
function LaunchProductBlock({ item, headingClass, columnIndex = 0, compact = false }) {
  const isLeft = columnIndex === 0;

  const root = cn(
    "flex w-full min-w-0 flex-col",
    compact ? "items-center pt-0 text-center" : "pt-1",
    !compact &&
      (isLeft
        ? "max-w-[min(100%,44rem)] items-center text-center lg:pt-8"
        : "max-w-[min(100%,46rem)] items-center text-center lg:pt-8"),
  );

  /** Mobile compact (só grid Lançamentos &lt; lg): alinhado a EditorialProductCard variant rail. */
  const title = compact
    ? cn(
        "mx-auto w-full max-w-[min(100%,28ch)] text-balance text-pretty font-display text-[17px] font-semibold leading-[1.24] tracking-[-0.02em] text-ink line-clamp-2 sm:max-w-[min(100%,30ch)] md:max-w-[min(100%,31ch)]",
      )
    : cn(
        "w-full text-pretty font-display tracking-[-0.02em] leading-[1.06]",
        headingClass,
        isLeft
          ? "max-w-[min(100%,40rem)] sm:max-w-[min(100%,42rem)] lg:max-w-[min(100%,44rem)]"
          : "max-w-[min(100%,39rem)] sm:max-w-[min(100%,41rem)] lg:max-w-[min(100%,43rem)]",
      );

  const body = cn(
    "w-full",
    compact ? "mt-1 min-w-0 max-w-none sm:mt-1.5" : "mt-5 sm:mt-6",
    !compact &&
      (isLeft
        ? "max-w-[min(100%,33rem)] sm:max-w-[min(100%,36rem)] lg:max-w-[min(100%,38rem)]"
        : "max-w-[min(100%,32rem)] sm:max-w-[min(100%,35rem)] lg:max-w-[min(100%,37rem)]"),
    compact && "mx-auto max-w-[min(100%,28ch)] sm:max-w-[min(100%,30ch)] md:max-w-[min(100%,31ch)]",
  );

  const descriptionTone = cn(
    compact
      ? "text-center text-[12.5px] font-light leading-[1.42] text-ink/60 sm:text-[13px] md:text-[13px]"
      : "text-[1rem] font-light leading-[1.7] sm:text-[1.0625rem] sm:leading-[1.72]",
    !compact && (isLeft ? "text-ink/42" : "text-[#1f1f1f]/76"),
  );

  const ctaAlign = "center";
  const ctaEmphasis = isLeft ? "soft" : "strong";

  return (
    <div className={root}>
      <h3 className={title}>{item.name}</h3>
      <div className={body}>
        <p className={descriptionTone}>
        {`${item.concept} ${compact && item.functionalMobile != null ? item.functionalMobile : item.functional}`}
      </p>
      </div>
      <LaunchEditorialCta
        href={item.href}
        label={item.cta}
        align={ctaAlign}
        emphasis={ctaEmphasis}
        compact={compact}
      />
    </div>
  );
}

export function LaunchesSection({ items }) {
  void items;

  const titleHeadingLeft =
    "font-light text-ink text-[22px] leading-[1.3] sm:text-[2.08rem] sm:leading-[1.06] md:text-[2.18rem] lg:text-[2.32rem] xl:text-[2.46rem]";
  const titleHeadingRight =
    "font-normal text-[#0a0a0a] text-[22px] leading-[1.3] sm:text-[2.06rem] sm:leading-[1.06] md:text-[2.14rem] lg:text-[2.3rem] xl:text-[2.44rem]";
  const desktopHeadingLeft =
    "font-light text-ink text-[2.14rem] md:text-[2.3rem] xl:text-[2.44rem]";
  const desktopHeadingRight =
    "font-normal text-[#080808] text-[2.12rem] md:text-[2.28rem] xl:text-[2.42rem]";

  return (
    <section
      id="lancamentos"
      className="overflow-x-hidden bg-[#ffffff] section-y-cards max-md:!pt-12 max-md:!pb-[102px] md:max-lg:!pt-[120px] md:max-lg:!pb-[140px]"
    >
      <div className="mx-auto w-full max-w-site shell-px">
        <div className="max-w-4xl section-lead">
          <p className="section-kicker">LANÇAMENTOS</p>
          <h2 className="mt-4 font-display text-[28px] font-light leading-[1.2] text-ink md:text-6xl md:leading-[0.96]">
            O que muda no seu cabelo
            <br />
            começa com <em className="italic">um novo gesto</em>
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] font-light leading-[1.5] text-ink/54 md:text-[1.0625rem] md:leading-[1.75]">
            No ritual, cada gesto prepara o fio. O resultado aparece no brilho.
          </p>
        </div>
      </div>

      <div
        id="ybera-lancamentos-spacing-double-v1"
        className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 lg:hidden"
      >
        <div className="grid grid-cols-2 gap-x-0 gap-y-10 sm:gap-y-11 md:gap-y-12">
          {launchEditorialItems.map((item, index) => (
            <article key={item.name} className="flex min-w-0 flex-col gap-6 pb-6 sm:gap-8 sm:pb-8">
              <div className={cn(item.mobileShell, "w-full")}>
                <div className={item.overlayClass} aria-hidden />
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className={`h-full w-full min-w-0 object-cover object-center transition duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${item.imageHoverClass}`}
                />
              </div>
              <div className="min-w-0 px-2 sm:px-3 md:px-4">
                <LaunchProductBlock
                  item={item}
                  headingClass=""
                  columnIndex={index}
                  compact
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="relative left-1/2 hidden w-screen -translate-x-1/2 lg:block">
        <div className="grid lg:grid-cols-2">
          {launchEditorialItems.map((item) => (
            <div key={item.name} className={item.desktopShell}>
              <div className={item.overlayClass} aria-hidden />
              <img
                src={item.image}
                alt={item.imageAlt}
                className={`h-full w-full object-cover object-center transition duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${item.imageHoverClass}`}
            />
          </div>
          ))}
        </div>
      </div>

      <div className="relative left-1/2 hidden w-screen -translate-x-1/2 mt-6 lg:mt-8 lg:block">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          {launchEditorialItems.map((item, index) => (
            <div
              key={item.name}
              className={cn(
                "flex w-full flex-col px-6 sm:px-10 lg:px-12 xl:px-16",
                index === 0 ? "items-center" : "items-center",
              )}
            >
              <LaunchProductBlock
                item={item}
                headingClass={index === 0 ? desktopHeadingLeft : desktopHeadingRight}
                columnIndex={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ROUTINE_VISUAL_SRCS = [
  "/images/costas.png",
  "/images/32.png.webp",
  "/images/frente1.png",
];

const ROUTINE_MOBILE_CAROUSEL_MS = 5200;
const ROUTINE_MOBILE_SWIPE_MIN = 44;

/** Destinos do CTA implícito por etapa (mobile) — produto ou catálogo alinhado ao hint. */
const ROUTINE_MOBILE_METODO_HREFS = [
  "/produto/shampoo-multifuncao-cuidados-profundos",
  "/catalogo",
  "/produto/oleo-de-mirra-reparador",
];

/** Carrossel compacto só abaixo do breakpoint lg; desktop mantém a grelha existente. */
function RoutineMetodoMobileCarousel({ steps, visualStates, activeStep, setActiveStep }) {
  const [paused, setPaused] = React.useState(false);
  const touchX0 = React.useRef(null);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  const count = Math.min(steps.length, visualStates.length);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReduceMotion(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined" || reduceMotion || count < 1) return undefined;
    const mq = window.matchMedia("(min-width: 1024px)");
    const id = window.setInterval(() => {
      if (mq.matches || paused) return;
      setActiveStep((i) => (i + 1) % count);
    }, ROUTINE_MOBILE_CAROUSEL_MS);
    return () => window.clearInterval(id);
  }, [count, paused, reduceMotion, setActiveStep]);

  const resumeLater = React.useCallback(() => {
    window.setTimeout(() => setPaused(false), 2800);
  }, []);

  const onTouchStart = React.useCallback((e) => {
    touchX0.current = e.touches[0].clientX;
    setPaused(true);
  }, []);

  const onTouchEnd = React.useCallback(
    (e) => {
      if (touchX0.current == null) return;
      const x = e.changedTouches[0]?.clientX;
      if (x == null) return;
      const dx = x - touchX0.current;
      touchX0.current = null;
      if (dx < -ROUTINE_MOBILE_SWIPE_MIN) setActiveStep((i) => (i + 1) % count);
      else if (dx > ROUTINE_MOBILE_SWIPE_MIN) setActiveStep((i) => (i - 1 + count) % count);
      resumeLater();
    },
    [count, resumeLater, setActiveStep],
  );

  const goTo = React.useCallback(
    (index) => {
      setPaused(true);
      setActiveStep(index);
      resumeLater();
    },
    [resumeLater, setActiveStep],
  );

  if (!count) {
    return null;
  }

  return (
    <div
      className="mt-1 w-full lg:hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        id="ybera-metodo-mobile-cta-implicit-v1"
        role="region"
        aria-roledescription="carousel"
        aria-label="Etapas do método Ybera"
        className="relative touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative h-[23.25rem] w-full overflow-hidden rounded-sm bg-[#ebe4dc] sm:h-[25rem] sm:max-h-[min(78dvh,32rem)]">
          {steps.slice(0, count).map((step, index) => {
            const vis = visualStates[index];
            const active = index === activeStep;
            const href = ROUTINE_MOBILE_METODO_HREFS[index] ?? "/catalogo";
            return (
              <a
                key={step.step}
                href={href}
                className={cn(
                  "group/slide absolute inset-0 block overflow-hidden rounded-sm transition-[opacity,transform] ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20 active:scale-[0.99] active:opacity-[0.94] motion-reduce:active:scale-100 motion-reduce:active:opacity-100",
                  active ? "z-[1] cursor-pointer opacity-100" : "z-0 cursor-default opacity-0 pointer-events-none",
                  reduceMotion ? "duration-0" : "duration-500",
                )}
                aria-hidden={!active}
                aria-label={`${step.step} ${step.title}: ver detalhes`}
                tabIndex={active ? 0 : -1}
              >
                <img
                  src={vis.src}
                  alt=""
                  role="presentation"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-[center_22%]"
                />
                {/* Gradiente baixo → topo (base mais escura), alinhado ao tom editorial das rotinas / hero. */}
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(14,11,9,0.06)_0%,rgba(14,11,9,0.1)_38%,rgba(14,11,9,0.38)_72%,rgba(10,8,7,0.72)_100%)]"
                  aria-hidden
                />
                <div className="pointer-events-none absolute bottom-0 left-0 z-[2] max-w-[min(100%,22.5rem)] px-5 pb-14 pt-20 text-left sm:max-w-[min(100%,24rem)] sm:px-6 sm:pb-16 sm:pt-24">
                  <p className="font-display text-[2.25rem] leading-none tracking-[-0.02em] text-white sm:text-[2.4rem]">
                    {step.step}
                  </p>
                  <h3 className="mt-2.5 font-display text-[1.28rem] font-medium leading-[1.12] tracking-[-0.02em] text-white sm:mt-3 sm:text-[1.4rem]">
                    {step.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[13px] font-light leading-relaxed text-white sm:text-[0.875rem]">
                    {step.description}
                  </p>
                  {step.productHint ? (
                    <span className="mt-2.5 inline-flex w-fit items-center gap-2 border-b border-white/55 pb-0.5 text-[10px] font-semibold uppercase leading-normal tracking-[0.14em] text-white transition-[border-color,gap] duration-200 ease-out group-hover/slide:border-white group-hover/slide:gap-2.5 sm:mt-3 sm:tracking-[0.16em]">
                      <span>{step.productHint}</span>
                      <span className="text-sm leading-none text-white" aria-hidden="true">
                        →
                      </span>
                    </span>
                  ) : null}
                </div>
              </a>
            );
          })}
          <div className="pointer-events-auto absolute bottom-4 left-0 right-0 z-[3] flex justify-center gap-2 sm:bottom-5">
            {steps.slice(0, count).map((_, i) => (
              <button
                key={`routine-dot-${String(i)}`}
                type="button"
                aria-label={`Etapa ${i + 1} de ${count}`}
                aria-current={i === activeStep ? "true" : undefined}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out",
                  i === activeStep ? "w-6 bg-white" : "w-1.5 bg-white/35 hover:bg-white/55",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RoutineSection({ steps }) {
  const [activeStep, setActiveStep] = React.useState(2);
  const [stepRevealKey, setStepRevealKey] = React.useState(0);
  const skipRevealOnMount = React.useRef(true);

  const visualStates = React.useMemo(
    () => [
      {
        label: "Preparar",
        src: "/images/costas.png",
        alt: "Cabelo em estado natural, antes do ritual de tratamento",
        overlayClass:
          "bg-[linear-gradient(180deg,rgba(14,11,9,0.08),rgba(14,11,9,0.2)_72%,rgba(14,11,9,0.34))]",
      },
      {
        label: "Tratar",
        src: "/images/32.png.webp",
        alt: "Textura em transformação — tratamento e resposta do fio",
        overlayClass:
          "bg-[linear-gradient(180deg,rgba(14,11,9,0.06),rgba(14,11,9,0.18)_72%,rgba(14,11,9,0.3))]",
      },
      {
        label: "Sustentar",
        src: "/images/frente1.png",
        alt: "Resultado final com brilho, alinhamento e movimento",
        overlayClass:
          "bg-[linear-gradient(180deg,rgba(14,11,9,0.04),rgba(14,11,9,0.14)_68%,rgba(14,11,9,0.26))]",
      },
    ],
    [],
  );

  const currentVisual = visualStates[activeStep] ?? visualStates[0];

  React.useEffect(() => {
    ROUTINE_VISUAL_SRCS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  React.useEffect(() => {
    if (skipRevealOnMount.current) {
      skipRevealOnMount.current = false;
      return;
    }
    setStepRevealKey((k) => k + 1);
  }, [activeStep]);

  const activateStep = React.useCallback((index) => {
    setActiveStep(index);
  }, []);

  return (
    <section
      id="rotina"
      className="scroll-mt-[calc(var(--header-height)+10px)] bg-white section-y max-lg:!pt-10 max-lg:!pb-7"
    >
      <div className="mx-auto w-full max-w-site shell-px">
        <div className="section-lead max-lg:!pb-4 lg:hidden">
          <p className="section-kicker">O método Ybera</p>
          <h2 className="mt-2.5 mb-2 font-display text-[clamp(1.5rem,4.2vw+0.65rem,1.625rem)] leading-[1.2] tracking-[-0.02em] text-ink lg:mt-4 lg:mb-3 lg:text-5xl lg:leading-[0.94]">
            O resultado não acontece por acaso.
          </h2>
          <p className="mt-0 max-w-xl text-[0.9375rem] leading-[1.48] text-ink/[0.74] max-lg:mt-1 lg:mt-0 lg:text-base lg:leading-7">
            Ele começa no primeiro passo e se constrói na sequência.
          </p>
        </div>

        <RoutineMetodoMobileCarousel
          steps={steps}
          visualStates={visualStates}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />

        <div className="mt-0 hidden lg:grid lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch lg:gap-8 xl:gap-20">
          <div className="order-1 lg:sticky lg:top-28 lg:h-full">
            <article className="relative h-full min-h-0 overflow-hidden bg-[#ebe4dc]">
              <div className="relative h-full min-h-[44rem] w-full shrink-0 overflow-hidden xl:min-h-[48rem]">
                {visualStates.map((visual, index) => {
                  const isActive = activeStep === index;

                  return (
                    <img
                      key={visual.label}
                      src={visual.src}
                      alt={visual.alt}
                      loading="eager"
                      decoding="async"
                      className={cn(
                        "pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300 ease-in-out",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                  );
                })}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0",
                    currentVisual.overlayClass,
                  )}
                  aria-hidden
                />
                <div className="pointer-events-none absolute left-4 top-4 md:left-8 md:top-8">
                  <p
                    key={currentVisual.label}
                    className="animate-routine-metodo-label-reveal text-[12px] uppercase leading-[1.35] tracking-[0.2em] text-white/52 md:text-[10px] md:leading-normal md:tracking-[0.24em]"
                  >
                    {currentVisual.label}
                  </p>
                </div>
              </div>
            </article>
          </div>

          <div className="order-2 flex min-h-0 flex-col lg:h-full">
            <div className="shrink-0 lg:pb-6 xl:pb-8">
              <SectionHeading
                eyebrow="O método Ybera"
                title="O resultado não acontece por acaso."
                description="Ele começa no primeiro passo e se constrói na sequência."
                titleClassName="mb-3 lg:mb-4"
                descriptionClassName="mt-0 text-[16px] leading-[1.5] text-ink/[0.74] md:text-lg md:leading-7"
              />
            </div>

            <div className="flex min-h-0 flex-1 flex-col lg:min-h-0">
              <div className="min-h-0" role="tablist" aria-label="Etapas do método Ybera">
                {steps.map((step, index) => {
                  const isActive = activeStep === index;
                  const productHint = step.productHint;

                  return (
                    <article
                      key={step.step}
                      role="tab"
                      aria-selected={isActive}
                      tabIndex={0}
                      className={cn(
                        "relative grid cursor-pointer gap-3 py-5 pl-1 pr-1 transition-[color,opacity] duration-200 ease-out md:grid-cols-[110px_minmax(0,1fr)] md:items-start md:gap-x-4 md:px-0 md:pr-2",
                        isActive ? "opacity-100" : "opacity-[0.52]",
                      )}
                      onMouseEnter={() => activateStep(index)}
                      onFocus={() => activateStep(index)}
                      onClick={() => activateStep(index)}
                    >
                      <p
                        className={cn(
                          "font-display text-[clamp(1.85rem,4.6vw+0.75rem,2.35rem)] leading-[0.95] transition-[color,font-weight] duration-200 ease-out max-lg:leading-[0.92] lg:text-6xl lg:leading-none",
                          isActive ? "font-medium text-[#0a0a0a]" : "font-light text-ink",
                        )}
                      >
                        {step.step}
                      </p>
                      <div className="min-w-0 max-w-xl max-lg:max-w-[min(100%,36rem)] md:pr-1">
                        {isActive ? (
                          <div
                            key={`${activeStep}-${stepRevealKey}`}
                            className="animate-routine-metodo-step-reveal"
                          >
                            <h3 className="inline-flex max-w-full flex-wrap items-baseline gap-x-2 gap-y-0.5 font-display text-[clamp(1.125rem,2.8vw+0.55rem,1.25rem)] font-bold leading-[1.22] text-[#0a0a0a] max-lg:tracking-[-0.02em] md:max-lg:gap-x-2.5 md:max-lg:text-[clamp(1.1875rem,2vw+0.75rem,1.35rem)] lg:gap-x-3 lg:text-4xl lg:leading-none lg:tracking-normal">
                              <span>{step.title}</span>
                              <span
                                aria-hidden
                                className="text-[0.8125rem] font-normal leading-none text-[#0a0a0a]/50 motion-safe:animate-routine-method-arrow-in md:text-[1.05rem] lg:text-[1.125rem]"
                              >
                                →
                              </span>
                            </h3>
                            <p className="mt-1.5 text-[0.9375rem] leading-[1.5] text-ink max-lg:mt-1.5 md:mt-2 md:text-[15px] md:leading-7 lg:mt-2.5 lg:text-base lg:leading-relaxed">
                              {step.description}
                            </p>
                            {productHint ? (
                              <p className="mt-1.5 text-[10px] font-medium uppercase leading-snug tracking-[0.1em] text-ink/[0.92] max-lg:mt-1.5 md:mt-2.5 md:text-xs md:leading-normal md:tracking-[0.12em]">
                                {productHint}
                              </p>
                            ) : null}
                          </div>
                        ) : (
                          <>
                            <h3 className="font-display text-[clamp(1.125rem,2.8vw+0.55rem,1.25rem)] font-normal leading-[1.22] text-ink max-lg:tracking-[-0.02em] md:max-lg:text-[clamp(1.1875rem,2vw+0.75rem,1.35rem)] lg:text-4xl lg:leading-none lg:tracking-normal">
                              {step.title}
                            </h3>
                            <p className="mt-1.5 text-[0.9375rem] leading-[1.5] text-ink max-lg:mt-1.5 md:mt-2 md:text-[15px] md:leading-7 lg:mt-2.5 lg:text-base lg:leading-relaxed">
                              {step.description}
                            </p>
                            {productHint ? (
                              <p className="mt-1.5 text-[10px] font-medium uppercase leading-snug tracking-[0.1em] text-ink/[0.92] max-lg:mt-1.5 md:mt-2.5 md:text-xs md:leading-normal md:tracking-[0.12em]">
                                {productHint}
                              </p>
                            ) : null}
                          </>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Prova social em carrossel editorial: 1 card ativo + cards secundários. */
export function SocialProofEditorialSection({ stories = [] }) {
  const AUTO_ROTATE_MS = 5000;
  const list = React.useMemo(
    () => stories.filter((s) => s && s.image && s.quote).slice(0, 4),
    [stories],
  );
  const [order, setOrder] = React.useState(() => list.map((_, index) => index));
  const [isPaused, setIsPaused] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [isContentVisible, setIsContentVisible] = React.useState(true);
  const touchStartXRef = React.useRef(null);
  const transitionTimerRef = React.useRef(null);

  React.useEffect(() => {
    setOrder(list.map((_, index) => index));
  }, [list.length]);

  const transitionToOrder = React.useCallback((reorderFn) => {
    if (list.length <= 1 || isAnimating) return;
    window.clearTimeout(transitionTimerRef.current);
    setIsAnimating(true);
    setIsContentVisible(false);
    transitionTimerRef.current = window.setTimeout(() => {
      setOrder(reorderFn);
      setIsContentVisible(true);
      setIsAnimating(false);
    }, 360);
  }, [isAnimating, list.length]);

  const goNext = React.useCallback(() => {
    transitionToOrder((prev) => (prev.length > 1 ? [...prev.slice(1), prev[0]] : prev));
  }, [transitionToOrder]);

  const goPrev = React.useCallback(() => {
    transitionToOrder((prev) => (prev.length > 1 ? [prev[prev.length - 1], ...prev.slice(0, -1)] : prev));
  }, [transitionToOrder]);

  React.useEffect(() => {
    if (list.length <= 1 || isPaused || isAnimating || !isContentVisible) return undefined;
    const id = window.setTimeout(goNext, AUTO_ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [goNext, isAnimating, isContentVisible, isPaused, list.length]);

  const handleTouchStart = (event) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartXRef.current == null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const deltaX = touchStartXRef.current - endX;
    touchStartXRef.current = null;
    if (Math.abs(deltaX) < 36) return;
    if (deltaX > 0) goNext();
    else goPrev();
  };

  React.useEffect(() => {
    return () => {
      window.clearTimeout(transitionTimerRef.current);
    };
  }, []);

  if (!list.length) return null;

  const active = list[order[0]];
  const compactCards = order.slice(1).map((sourceIndex) => list[sourceIndex]);

  const activeMeta = [active.profession || active.type, active.city || active.location].filter(Boolean).join(" · ");

  return (
    <section
      id="historias-resultado"
      className="overflow-x-hidden bg-[#f7f5f2] section-y text-ink"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setIsPaused(false);
      }}
    >
      <div className="mx-auto w-full max-w-site shell-px">
        <header className="max-w-2xl pb-6 md:pb-10">
          <p className="section-kicker text-ink/48 before:bg-ink/24">Prova social</p>
          <h2 className="mt-4 font-display text-[28px] font-light leading-[1.2] tracking-[-0.012em] text-[#12100f] md:text-[clamp(1.85rem,3.2vw,2.45rem)] md:leading-[1.08]">
            Resultados que se <em className="italic">comprovam</em>.
          </h2>
        </header>

        {/* Mobile: um card por vez, largura editorial, swipe + autoplay */}
        <div className="md:hidden">
          <div
            className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex justify-center px-4">
              <article
                key={`social-mobile-${order[0]}-${active.name}`}
                className="relative aspect-[4/5] w-[calc(100vw-32px)] max-w-full min-h-[17.5rem] overflow-hidden rounded-[8px] bg-[#e8e2d9]"
              >
                <img
                  src={active.image}
                  alt={`Retrato de ${active.name}`}
                  className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-in-out ${isContentVisible ? "opacity-100" : "opacity-0"}`}
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className={`pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,7,0.08)_0%,rgba(10,8,7,0.28)_48%,rgba(10,8,7,0.78)_100%)] transition-opacity duration-700 ease-in-out ${isContentVisible ? "opacity-100" : "opacity-0"}`}
                  aria-hidden
                />
                <div
                  className={`absolute inset-x-0 bottom-0 z-[1] p-5 transition-[opacity,transform] duration-700 ease-in-out sm:p-6 ${isContentVisible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
                >
                  <p className="line-clamp-6 max-w-none text-pretty font-display text-[clamp(1.5rem,5.2vw,1.75rem)] font-light leading-snug tracking-[-0.012em] text-white">
                    &ldquo;{active.quote}&rdquo;
                  </p>
                  <div className="mt-4 w-10 border-t border-white/30" />
                  <p className="mt-3 break-words font-display text-[clamp(1.25rem,4vw,1.375rem)] font-light leading-snug text-white">
                    {active.name}
                  </p>
                  <p className="mt-2 max-w-full break-words text-[11px] font-medium uppercase leading-snug tracking-[0.14em] text-white/85 sm:text-[12px] sm:tracking-[0.16em]">
                    {activeMeta}
                  </p>
        </div>
              </article>
      </div>
        </div>
        </div>

        {/* Desktop: faixa original 1 + 3 */}
        <div className="relative hidden md:block">
          <div
            className="relative h-[clamp(420px,45vw,520px)] w-full overflow-hidden"
            style={{
              "--card-gap": "clamp(1.5rem,2.2vw,2rem)",
              "--card-w": "calc((100% - (var(--card-gap) * 3)) / 4)",
            }}
          >
            <div
              className="flex h-full w-full items-center gap-[var(--card-gap)]"
              style={{
                transform: "translateX(0)",
                transition: "transform 520ms cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <article className="relative h-full w-[var(--card-w)] shrink-0 overflow-hidden rounded-[8px] bg-[#e8e2d9]">
                <img
                  src={active.image}
                  alt={`Retrato de ${active.name}`}
                  className={`h-full w-full object-cover object-center transition-opacity duration-700 ease-in-out ${isContentVisible ? "opacity-100" : "opacity-0"}`}
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className={`pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,7,0.08)_0%,rgba(10,8,7,0.24)_52%,rgba(10,8,7,0.7)_100%)] transition-opacity duration-700 ease-in-out ${isContentVisible ? "opacity-100" : "opacity-0"}`}
                  aria-hidden
                />
                <div className={`absolute inset-x-0 bottom-0 p-6 lg:p-8 transition-[opacity,transform] duration-700 ease-in-out ${isContentVisible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}>
                  <p className="line-clamp-4 max-w-[24rem] text-pretty font-display text-[1.18rem] font-light leading-[1.24] tracking-[-0.01em] text-white lg:text-[1.3rem] xl:text-[1.45rem]">
                    &ldquo;{active.quote}&rdquo;
                  </p>
                  <div className="mt-4 w-12 border-t border-white/30" />
                  <p className="mt-3 font-display text-sm font-light text-white">{active.name}</p>
                  <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-white">
                    {activeMeta}
                  </p>
                </div>
              </article>

              {compactCards.map((item, idx) => (
              <article
                  key={`social-compact-${item.name}-${idx}`}
                  className="group relative flex h-[62%] w-[var(--card-w)] shrink-0 flex-col items-start overflow-hidden rounded-[8px] border border-black/[0.045] bg-[#f3f0ea] px-7 py-5 text-left opacity-[0.8] transition-[opacity,transform,background-color] duration-500 ease-out hover:bg-[#f6f3ee] hover:opacity-[0.97]"
                >
                  <div className="flex min-w-0 items-start gap-3.5">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#e5dfd6]">
                  <img
                    src={item.image}
                        alt={`Retrato de ${item.name}`}
                        className="h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-[1.04]"
                        loading="lazy"
                        decoding="async"
                  />
                </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-[1.02rem] font-light leading-none text-ink/90 lg:text-[1.08rem]">{item.name}</p>
                      <p className="mt-1 truncate text-[9px] font-medium uppercase tracking-[0.2em] text-ink/42">
                        {[item.profession || item.type, item.city || item.location].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 min-w-0">
                    <p className="line-clamp-3 font-display text-[20px] leading-[1.2] text-ink/72">
                      &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
                  <span
                    className="pointer-events-none absolute bottom-0 right-6 translate-y-[8%] font-display text-[6.7rem] leading-none text-ink/45"
                    aria-hidden
                  >
                    ”
                  </span>
              </article>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProfessionalSection() {
  return (
    <section
      id="profissionais"
      className="relative overflow-hidden bg-[#0B0B0B] bg-[url('/images/bg-pro.png')] bg-cover bg-no-repeat px-0 section-y text-white max-lg:bg-left lg:bg-center"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/60"
        aria-hidden="true"
      />
      <div className="relative z-[1] mx-auto grid w-full max-w-site shell-px gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
        <div className="overflow-hidden">
          <img
            src="/images/pro-art-people.png"
            alt="Profissionais Ybera em ambiente de salão"
            className="h-[26rem] w-full object-cover grayscale-[8%] transition duration-700 hover:scale-[1.02] max-lg:object-left md:h-[34rem] lg:h-[42rem]"
          />
        </div>

        <div className="lg:pl-8">
          <p className="section-kicker text-white/55 before:bg-white/35">
            Ybera para profissionais
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-[28px] leading-[1.2] text-white md:text-7xl md:leading-[0.94]">
            Resultado de salão.
            <br />
            Consistência no <em className="italic">dia a dia</em>.
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-[1.5] text-white/64 md:text-lg md:leading-8">
            Linhas profissionais pensadas para quem trabalha com técnica e repetição.
          </p>

          <div className="mt-6">
            <a href="#" className="button-editorial-dark">
              CONHECER LINHA PROFISSIONAL
              <span className="text-base leading-none">→</span>
            </a>
          </div>

          <div className="mt-12 hidden grid-cols-3 gap-6 border-y border-white/10 py-8 lg:grid">
            {[
              ["Técnica", "Protocolos claros para aplicar com precisão."],
              ["Resultado", "Resultado percebido no cabelo e no retorno."],
              ["Parceria", "Uma marca que cresce com quem faz do cuidado seu trabalho."],
            ].map(([title, text]) => (
              <div key={title}>
                <h3 className="font-display text-[22px] leading-[1.3] text-white md:text-3xl md:leading-none">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-white/55 md:text-sm md:leading-7">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCtaSection({ cta }) {
  const titleLines = String(cta.title).split("\n");
  const primaryHref = cta.primaryHref ?? "#produtos";

  return (
    <section className="relative overflow-hidden bg-[#15110e] section-y text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.06),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_32%)]" />
      <div className="mx-auto max-w-5xl shell-px text-center">
        <p className="section-kicker mx-auto justify-center text-white/50 before:bg-white/32">
          {cta.eyebrow}
        </p>
        <h2 className="mx-auto mt-4 max-w-4xl font-display text-[28px] leading-[1.2] text-white md:text-7xl md:leading-[0.94]">
          <span className="block">{titleLines[0]}</span>
          <span className="mt-2 block italic text-white/94">{titleLines[1] ?? ""}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-[1.5] text-white/66 md:text-lg md:leading-8">
          {cta.description}
        </p>
        <div className="mt-12 flex justify-center">
          <a
            href={primaryHref}
            className="inline-flex h-[52px] cursor-pointer items-center justify-center gap-2 border border-white bg-white px-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink no-underline transition-all duration-300 ease-out hover:border-white hover:bg-white/95 active:scale-[0.98]"
          >
            {cta.primary}
            <span className="text-base leading-none text-ink transition duration-300">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function FooterSection() {
  const productLinks = ["Como funciona", "Para quem é", "Benefícios", "FAQ"];
  const companyLinks = ["Sobre a Ybera", "Contato", "Suporte"];
  const supportInfo = ["pro@ybera.com.br", "+55 22 99251-1907", "Segunda a sexta das 8h00 às 16h30"];
  const [openFooterSection, setOpenFooterSection] = React.useState(null);
  const [footerRef, footerInView] = useInView({ threshold: 0.06, rootMargin: "0px 0px -6% 0px" });

  const toggleFooterSection = React.useCallback((sectionId) => {
    setOpenFooterSection((current) => (current === sectionId ? null : sectionId));
  }, []);

  return (
    <footer className="bg-[#15110e] text-white">
      <div
        ref={footerRef}
        className={`mx-auto w-full max-w-site shell-px pt-[120px] pb-[50px] transition-all duration-700 ease-out ${
          footerInView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <div className="lg:hidden">
          <div>
            <img
              src="/ybera-logo.webp"
              alt="Ybera"
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="mt-6 w-full max-w-none text-sm leading-[1.6] text-white/60">
              O cuidado certo muda o brilho, o toque e a confiança.
              {" "}Todos os dias.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 text-sm text-white/62">
              <a href="#" className="transition hover:text-white">
                Política de Privacidade
              </a>
              <a href="#" className="transition hover:text-white">
                Termos de Uso
              </a>
            </div>
          </div>

          <div
            className={`mt-8 transition-opacity duration-300 ${
              openFooterSection == null || openFooterSection === "product" ? "opacity-100" : "opacity-65"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleFooterSection("product")}
              className="flex w-full items-center justify-between py-4 text-left opacity-70 transition duration-300 ease-out hover:opacity-100 active:scale-[0.98]"
              aria-expanded={openFooterSection === "product"}
            >
              <h3 className="text-[13px] font-medium uppercase tracking-[0.06em] text-white/74">
                Produto
              </h3>
              <span
                className={`inline-block text-sm text-white/54 transition-transform duration-300 ease-out ${
                  openFooterSection === "product" ? "rotate-90" : ""
                }`}
              >
                →
              </span>
            </button>
            <div
              className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out ${
                openFooterSection === "product"
                  ? "max-h-48 translate-y-0 opacity-100"
                  : "max-h-0 translate-y-2 opacity-0"
              }`}
            >
              <div className="pb-4 pl-4 text-[14px] text-white/70">
                {productLinks.map((link) => (
                  <a key={link} href="#" className="block py-1.5 transition duration-300 ease-out hover:text-white">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`border-t border-[rgba(255,255,255,0.06)] transition-opacity duration-300 ${
              openFooterSection == null || openFooterSection === "company" ? "opacity-100" : "opacity-65"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleFooterSection("company")}
              className="flex w-full items-center justify-between py-4 text-left opacity-70 transition duration-300 ease-out hover:opacity-100 active:scale-[0.98]"
              aria-expanded={openFooterSection === "company"}
            >
              <h3 className="text-[13px] font-medium uppercase tracking-[0.06em] text-white/74">
                Empresa
              </h3>
              <span
                className={`inline-block text-sm text-white/54 transition-transform duration-300 ease-out ${
                  openFooterSection === "company" ? "rotate-90" : ""
                }`}
              >
                →
              </span>
            </button>
            <div
              className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out ${
                openFooterSection === "company"
                  ? "max-h-48 translate-y-0 opacity-100"
                  : "max-h-0 translate-y-2 opacity-0"
              }`}
            >
              <div className="pb-4 pl-4 text-[14px] text-white/70">
                {companyLinks.map((link) => (
                  <a key={link} href="#" className="block py-1.5 transition duration-300 ease-out hover:text-white">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`border-t border-[rgba(255,255,255,0.06)] transition-opacity duration-300 ${
              openFooterSection == null || openFooterSection === "support" ? "opacity-100" : "opacity-65"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleFooterSection("support")}
              className="flex w-full items-center justify-between py-4 text-left opacity-70 transition duration-300 ease-out hover:opacity-100 active:scale-[0.98]"
              aria-expanded={openFooterSection === "support"}
            >
              <h3 className="text-[13px] font-medium uppercase tracking-[0.06em] text-white/74">
                Atendimento
              </h3>
              <span
                className={`inline-block text-sm text-white/54 transition-transform duration-300 ease-out ${
                  openFooterSection === "support" ? "rotate-90" : ""
                }`}
              >
                →
              </span>
            </button>
            <div
              className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out ${
                openFooterSection === "support"
                  ? "max-h-52 translate-y-0 opacity-100"
                  : "max-h-0 translate-y-2 opacity-0"
              }`}
            >
              <div className="space-y-2 pb-4 pl-4 text-[14px] leading-6 text-white/70">
                {supportInfo.map((entry) => (
                  <p key={entry}>{entry}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6">
            <div className="flex items-center justify-center gap-8">
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex items-center justify-center text-white/62 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:opacity-100 hover:text-white"
              >
                <InstagramIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="inline-flex items-center justify-center text-white/62 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:opacity-100 hover:text-white"
              >
                <TikTokIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
            <p className="mt-5 text-center text-sm text-white/40">
              © 2005–2026 Ybera Group. Todos os direitos reservados.
            </p>
          </div>
        </div>

        <div className="hidden lg:grid lg:grid-cols-[1.35fr_0.72fr_0.72fr_0.92fr] lg:gap-16 xl:gap-20">
          <div className="max-w-md">
            <img
              src="/ybera-logo.webp"
              alt="Ybera"
              className="h-10 w-auto brightness-0 invert sm:h-11"
            />
            <p className="mt-8 max-w-sm text-sm leading-7 text-white/60 md:text-base">
              Cuidado capilar profissional com resultado visível, brilho contínuo
              e uma rotina que acompanha o fio no dia a dia.
            </p>

            <div className="mt-8 flex flex-col gap-3 text-sm text-white/58">
              <a href="#" className="transition hover:text-white">
                Política de Privacidade
              </a>
              <a href="#" className="transition hover:text-white">
                Termos de Uso
              </a>
            </div>

            <div className="mt-9 flex items-center gap-6">
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex items-center justify-center text-white/62 transition hover:text-white"
              >
                <InstagramIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="inline-flex items-center justify-center text-white/62 transition hover:text-white"
              >
                <TikTokIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/34">
              Produto
            </h3>
            <div className="mt-7 flex flex-col gap-5 text-sm text-white/56 md:text-base">
              {productLinks.map((link) => (
                <a key={link} href="#" className="transition hover:text-white">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/34">
              Empresa
            </h3>
            <div className="mt-7 flex flex-col gap-5 text-sm text-white/56 md:text-base">
              {companyLinks.map((link) => (
                <a key={link} href="#" className="transition hover:text-white">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/34">
              Atendimento
            </h3>
            <div className="mt-7 space-y-5 text-sm leading-7 text-white/56 md:text-base">
              {supportInfo.map((entry) => (
                <p key={entry}>{entry}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 hidden border-t border-white/[0.035] pt-8 lg:block">
          <p className="text-center text-sm text-white/40">
            © 2005–2026 Ybera Group. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
