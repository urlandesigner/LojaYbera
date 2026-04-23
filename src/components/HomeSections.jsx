import React from "react";

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
      <h2 className={`mt-5 font-display text-5xl leading-none md:text-6xl ${titleTone}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-6 text-base leading-8 md:text-lg ${bodyTone}`}>
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

export function Header({ solid = false }) {
  const [isPastHero, setIsPastHero] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navLinks = [
    { href: "#curadoria", label: "Produtos" },
    { href: "#rotina", label: "Como usar" },
    { href: "#resultado", label: "Resultados" },
    { href: "#profissionais", label: "Profissionais" },
  ];

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

  const headerForeground = isPastHero ? "text-ink" : "text-white";
  const menuTone = isPastHero ? "text-ink/84" : "text-white";
  const menuHoverTone = isPastHero ? "hover:text-ink" : "hover:text-white";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 pointer-events-auto transition-[background-color,border-color,color,backdrop-filter] duration-300 ${
          isPastHero
            ? "border-b border-black/[0.05] bg-[linear-gradient(180deg,rgba(246,244,242,0.9),rgba(246,244,242,0.82))] backdrop-blur-[7px]"
            : "border-none bg-[linear-gradient(180deg,rgba(18,14,12,0.42),rgba(18,14,12,0.2))] shadow-none backdrop-blur-[7px]"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between shell-px py-5">
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
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`transition ${isPastHero ? "text-ink/74 hover:text-ink" : "text-white/92 hover:text-white"}`}
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="font-display text-[clamp(28px,4.5vw,32px)] leading-[1.06] tracking-[-0.012em] text-white/92 transition hover:text-white"
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

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] items-end px-0 pb-12 pt-28 lg:pb-20">
        <div className="hero-content max-w-[84rem] w-full px-4 pb-4 pt-6 [text-shadow:0_2px_24px_rgba(0,0,0,0.38)] sm:px-0 md:pb-8 md:pt-0">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-white/35" aria-hidden="true" />
            <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-white/58">
              Jeito Ybera de ser
            </p>
          </div>
          <h1 className="mt-5 max-md:max-w-[16ch] text-balance font-display text-[clamp(32px,8vw,56px)] leading-[1.05] text-white md:max-w-6xl md:text-[6.1rem] md:leading-[0.84] xl:text-[7.9rem]">
            <span className="block md:whitespace-nowrap">Revelar a beleza</span>
            <span className="block md:whitespace-nowrap">que já existe</span>
            <span className="block md:whitespace-nowrap">em você</span>
          </h1>

          <div className="mt-12 flex items-center">
            <a
              href="#curadoria"
              className="button-editorial-dark"
            >
              Conhecer produtos
            </a>
          </div>

          <div
            className="mt-10 sm:hidden"
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
                    <button
                      key={stat.id}
                      ref={isLeading ? mobileLeadCardRef : null}
                      type="button"
                      onClick={() => {
                        if (!isLeading && !mobileIsSliding) {
                          startMobileSlide();
                        }
                      }}
                      className={`group relative flex h-auto w-[calc(100vw-5.5rem)] max-w-[24rem] shrink-0 flex-col overflow-hidden px-4 py-4 text-left backdrop-blur-[10px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] transition-all duration-500 ease-out ${
                        isLeading
                          ? "scale-[1.02] bg-[rgba(255,255,255,0.085)] opacity-100"
                          : "scale-100 bg-[rgba(255,255,255,0.03)] opacity-72"
                      }`}
                      aria-label={`${stat.label}: ${stat.value}`}
                    >
                      <div>
                        <p
                          className={`text-[9px] uppercase tracking-editorial transition-colors duration-300 ${
                            isLeading ? "text-white/52" : "text-white/32"
                          }`}
                        >
                          {stat.label}
                        </p>
                        <p
                          className={`mt-3 max-w-none text-[0.95rem] leading-6 transition-colors duration-300 ${
                            isLeading ? "text-white/96" : "text-white/72"
                          }`}
                        >
                          {stat.value}
                        </p>
                      </div>
                      {isLeading ? (
                        <div className="mt-5 h-px w-full overflow-hidden bg-white/8">
                          <div
                            className="h-full bg-white/45 transition-[width] duration-75 linear"
                            style={{ width: `${progress * 100}%` }}
                          />
                        </div>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="hidden max-w-[78rem] grid-cols-3 gap-4 sm:mt-14 sm:grid lg:gap-5">
            {stats.map((stat) => (
              <button
                key={stat.id}
                type="button"
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
                onClick={() => activateHero(stat.id)}
                className={`group relative flex h-auto flex-col overflow-hidden px-5 py-5 text-left backdrop-blur-[10px] transition-all duration-500 ease-out lg:px-6 lg:py-6 ${
                  activeHeroId === stat.id
                    ? "scale-[1.02] bg-[rgba(255,255,255,0.085)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] opacity-100"
                    : "scale-100 bg-[rgba(255,255,255,0.022)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] opacity-72 hover:bg-[rgba(255,255,255,0.03)] hover:opacity-86"
                }`}
                aria-label={`${stat.label}: ${stat.value}`}
              >
                <div>
                  <p
                    className={`text-[10px] uppercase tracking-editorial transition-colors duration-300 ${
                      activeHeroId === stat.id ? "text-white/52" : "text-white/32"
                    }`}
                  >
                    {stat.label}
                  </p>
                  <p
                    className={`mt-4 max-w-none text-[1.02rem] leading-7 transition-colors duration-300 md:text-[1.08rem] lg:text-[1.18rem] ${
                      activeHeroId === stat.id ? "text-white/96" : "text-white/72"
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>
                {activeHeroId === stat.id ? (
                  <div className="mt-8 h-px w-full overflow-hidden bg-white/8">
                    <div
                      className="h-full bg-white/45 transition-[width] duration-75 linear"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                ) : null}
              </button>
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
      <div className="mx-auto max-w-5xl shell-px pb-8 pt-28 text-center lg:pb-12 lg:pt-36">
        <p className="section-kicker mx-auto justify-center">RESULTADO REAL</p>
        <p className="mt-8 font-display text-4xl leading-tight text-ink md:text-6xl">
          O resultado aparece. E permanece.
        </p>
        <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-ink/68 md:text-lg">
          No brilho, no toque e no comportamento do fio ao longo do dia.
        </p>
      </div>
    </div>
  );
}

export function ManifestoSection() {
  return (
    <section className="bg-[#F6F4F2] px-0 py-24 text-ink lg:py-32 xl:py-40">
      <div className="mx-auto max-w-5xl shell-px text-center">
        <p className="section-kicker mx-auto justify-center text-ink/48 before:bg-ink/24">
          Manifesto
        </p>
        <h2 className="mx-auto mt-10 max-w-4xl font-display text-5xl leading-[1.02] tracking-[-0.03em] text-ink md:text-7xl">
          A beleza começa no <em className="italic">cuidado</em>.
          <br />
          O brilho é a memória dele.
        </h2>
        <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.34em] text-ink/42">
          Ybera · Desde 2005
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
      className="bg-[#0B0B0B] text-white"
      style={{ backgroundColor: "#0B0B0B", backgroundImage: "none", boxShadow: "none" }}
    >
      <div className="mx-auto w-full max-w-[1440px] shell-px pt-16 xl:pt-44">
        <div
          className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isInView ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-[6px]"
          }`}
        >
          <div className="max-w-3xl">
            <p className="section-kicker text-white/55 before:bg-white/35">Antes e depois</p>
            <h2 className="mt-4 font-display text-5xl leading-none text-white md:text-6xl">
              <span className="block">Você vê a diferença.</span>
              <span className="block">E sente.</span>
            </h2>
          </div>
        </div>
      </div>

      <div
        className={`mt-8 px-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] lg:mt-16 lg:px-0 xl:px-0 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
        style={{ transitionDelay: isInView ? "80ms" : "0ms" }}
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <article className="relative overflow-hidden">
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
                <div className="absolute bottom-8 left-8 right-0 md:bottom-10 md:left-10">
                  <p className="max-w-[320px] font-display text-3xl leading-relaxed tracking-wide text-white/80 md:text-4xl lg:text-[3rem]">
                    <span className="block">O cabelo responde</span>
                    <span className="block">desde o primeiro uso.</span>
                  </p>
                </div>
              </div>
            </article>

          <article className="relative overflow-hidden">
            <div className="relative aspect-square overflow-hidden p-1">
              <img
                src={items[1].image}
                alt={items[1].title}
                className="absolute inset-0 h-full w-full object-cover object-center"
                style={{ transform: `translateY(${parallaxOffset * 0.7}px)` }}
              />
              <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/18" />
              <div
                className={`absolute inset-y-[10%] left-1/2 w-px -translate-x-1/2 bg-white/40 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isInView ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                }`}
              />
              <div className="absolute inset-x-0 top-6 flex items-center justify-between px-0 lg:top-8 lg:px-0 xl:px-0">
                <span className="text-[10px] uppercase tracking-[0.24em] text-white/58">Sem o cuidado certo</span>
                <span className="text-[10px] uppercase tracking-[0.24em] text-white/78">Com Ybera</span>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] shell-px pb-16 pt-8 lg:pb-30 lg:pt-12 xl:pb-44">
        <div
          className={`text-center transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: isInView ? "180ms" : "0ms" }}
        >
          <p className="mb-0 font-display text-[1.9rem] leading-[1.08] text-white/74 md:text-[2.3rem]">
            <span className="block">Brilho que aparece. Toque que muda.</span>
            <span className="block">Movimento que continua.</span>
          </p>
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
      <span className="block">Os mais usados por quem busca</span>
      <span className="block">resultado de verdade.</span>
    </>
  ),
  description = "Selecionados por quem precisa de consistência, repetição e resultado real.",
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
    <section id="produtos" className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] shell-px pb-10 pt-18 lg:pb-12 lg:pt-20 xl:pb-14 xl:pt-24">
        <div className="max-w-3xl">
          <p className="section-kicker">{eyebrow}</p>
          <h2 className="mt-5 font-display text-5xl leading-[0.96] text-ink md:text-6xl">
            {title}
          </h2>
          <p className="mt-6 text-base leading-8 text-ink/68 md:text-lg">
            {description}
          </p>
        </div>
      </div>

      <div className="relative left-1/2 mt-7 w-screen -translate-x-1/2 pb-14 lg:mt-8 lg:pb-16 xl:pb-20">
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
          <div className="flex w-max gap-1 md:gap-1.5 lg:gap-2">
            {loopItems.map((item, index) => (
              <a
                key={`${item.result ?? item.name}-${index}`}
                href={item.href ?? "/produto/oleo-de-mirra-reparador"}
                data-rail-card
                className="group relative flex h-[34.5rem] w-[18.25rem] shrink-0 snap-start flex-col overflow-hidden bg-[#F6F4F2] p-3 transition duration-500 hover:-translate-y-1 md:h-[36rem] md:w-[20rem] md:p-3.5 lg:h-[37rem] lg:w-[calc((100vw-0.75rem)/4)] lg:p-4 xl:h-[39rem]"
              >
                <div className="relative h-[25rem] shrink-0 overflow-hidden bg-[#F6F4F2] md:h-[26rem] lg:h-[27rem] xl:h-[29rem]">
                  <span className="pointer-events-none absolute left-4 top-4 z-[2] inline-flex items-center border border-black/6 bg-white px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-ink">
                    {item.tag ?? "Mais vendidos"}
                  </span>
                  <div className="absolute inset-0 z-[1] bg-black/0 transition duration-300 group-hover:bg-black/[0.05]" />
                  <img
                    src={item.image}
                    alt={item.productName ?? item.result ?? item.name}
                    className="h-full w-full object-cover object-center transition duration-300 ease-out group-hover:scale-[0.985] group-hover:-translate-y-1"
                  />
                </div>
                <div className="relative flex h-[calc(100%-25rem)] flex-1 flex-col overflow-hidden px-1 pb-1 pt-4 md:h-[calc(100%-26rem)] lg:h-[calc(100%-27rem)] lg:pb-[4.75rem] xl:h-[calc(100%-29rem)] xl:pb-[5rem]">
                  <div className="relative flex-1">
                    <div className="transition-all duration-300 ease-out lg:group-hover:translate-y-2 lg:group-hover:opacity-0">
                      <h3 className="mt-2.5 min-h-[3.8rem] font-display text-[1.85rem] leading-[0.98] text-ink xl:text-[2rem]">
                        {item.result ?? item.name}
                      </h3>
                      <p className="mt-2 text-[13px] leading-6 text-ink/52 md:text-[14px]">
                        {item.productName ?? ""}
                      </p>
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 top-0 hidden min-h-[5.8rem] lg:block xl:min-h-[6.1rem]">
                      <p className="translate-y-3 opacity-0 font-display text-[1.98rem] leading-[0.98] text-ink transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 xl:text-[2.12rem]">
                        {item.productName ?? ""}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 lg:absolute lg:bottom-0 lg:left-1 lg:right-1 lg:mt-0 lg:translate-y-3 lg:pt-5 lg:opacity-0 lg:transition-all lg:duration-300 lg:ease-out lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                    <span className="inline-flex h-[46px] w-full items-center justify-center gap-2 bg-black px-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition duration-300">
                      Ver produto
                      <span className="text-sm leading-none transition duration-300 lg:group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LaunchesSection({ items }) {
  const leftProduct = {
    name: "Shampoo Multifuncional Cuidados Profundos",
    note: "Remove excessos, prepara a fibra e deixa o cabelo pronto para absorver tratamento de verdade.",
  };

      return (
    <section className="bg-[#ffffff] pt-24 lg:pt-28 xl:pt-32">
      <div className="mx-auto w-full max-w-[1440px] shell-px pb-10 lg:pb-12">
        <div className="max-w-4xl">
          <p className="section-kicker">LANÇAMENTOS</p>
          <h2 className="mt-6 font-display text-5xl leading-[0.96] text-ink md:text-6xl">
            O que chegou para mudar o seu cabelo
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-ink/64 md:text-lg">
            Novos produtos que entregam resultado desde o primeiro uso — no brilho, no toque e no controle do fio.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] shell-px pb-20 lg:hidden">
        <div className="space-y-12">
          <article className="space-y-6">
            <div className="group relative min-h-[24rem] overflow-hidden bg-[#e8ddd2]">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,13,11,0.04),rgba(17,13,11,0.16))]" />
              <img
                src="/images/27.jpg.webp"
                alt="Resultado no cabelo com brilho, textura e movimento"
                className="h-full w-full object-cover object-center transition duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-display text-[1.85rem] leading-[0.98] text-ink">
                {leftProduct.name}
              </h3>
              <p className="pt-5 text-sm leading-7 text-ink/56">
                {leftProduct.note}
              </p>
              <div className="pt-5">
                <a href={leftProduct.href ?? "/produto/oleo-de-mirra-reparador"} className="button-editorial">
                  COMPRAR PRODUTO
                  <span className="text-base leading-none transition duration-300">
                    →
                  </span>
                </a>
              </div>
            </div>
          </article>

          <article className="space-y-6">
            <div className="group relative min-h-[24rem] overflow-hidden bg-[#e8ddd2]">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,14,12,0.04),rgba(18,14,12,0.12))]" />
              <img
                src="/images/13.png"
                alt="Óleo de Mirra Reparador"
                className="h-full w-full object-cover object-center transition duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-display text-[1.85rem] leading-[0.98] text-ink">
                Óleo de Mirra Reparador
              </h3>
              <p className="pt-5 text-sm leading-7 text-ink/56">
                Finaliza sem pesar, reduz o frizz e mantém o alinhamento ao longo do dia.
              </p>
              <div className="pt-5">
                <a href="/produto/oleo-de-mirra-reparador" className="button-editorial">
                  COMPRAR PRODUTO
                  <span className="text-base leading-none transition duration-300">
                    →
                  </span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div className="relative left-1/2 hidden w-screen -translate-x-1/2 lg:block">
        <div className="grid lg:grid-cols-2">
          <div className="group relative min-h-[28rem] overflow-hidden sm:min-h-[34rem] lg:min-h-[40rem] xl:min-h-[46rem]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,13,11,0.04),rgba(17,13,11,0.16))]" />
            <img
              src="/images/27.jpg.webp"
              alt="Resultado no cabelo com brilho, textura e movimento"
              className="h-full w-full object-cover object-center transition duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
            />
          </div>

          <div className="group relative min-h-[28rem] overflow-hidden bg-[#e8ddd2] sm:min-h-[34rem] lg:min-h-[40rem] xl:min-h-[46rem]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,14,12,0.04),rgba(18,14,12,0.12))]" />
            <img
              src="/images/13.png"
              alt="Óleo de Mirra Reparador"
              className="h-full w-full object-cover object-center transition duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

      <div className="relative left-1/2 hidden w-screen -translate-x-1/2 pb-20 pt-8 lg:block lg:pb-24 lg:pt-10 xl:pb-28">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div className="flex flex-col px-0 lg:px-0 xl:px-0">
            <div>
              <h3 className="font-display text-[1.85rem] leading-[0.98] text-ink md:text-[1.95rem] xl:text-[2rem]">
                {leftProduct.name}
              </h3>
            </div>
            <div className="pt-5">
              <p className="text-sm leading-7 text-ink/56 md:text-[0.98rem]">
                {leftProduct.note}
              </p>
            </div>
            <div className="pt-5">
              <a href={leftProduct.href ?? "/produto/oleo-de-mirra-reparador"} className="button-editorial">
                COMPRAR PRODUTO
                <span className="text-base leading-none transition duration-300">
                  →
                </span>
              </a>
            </div>
          </div>

          <div className="flex flex-col px-0 lg:px-0 xl:px-0">
            <div>
              <h3 className="font-display text-[1.85rem] leading-[0.98] text-ink md:text-[1.95rem] xl:text-[2rem]">
                Óleo de Mirra Reparador
              </h3>
            </div>
            <div className="pt-5">
              <p className="text-sm leading-7 text-ink/56 md:text-[0.98rem]">
                Finaliza sem pesar, reduz o frizz e mantém o alinhamento ao longo do dia.
              </p>
            </div>
            <div className="pt-5">
              <a href="/produto/oleo-de-mirra-reparador" className="button-editorial">
                COMPRAR PRODUTO
                <span className="text-base leading-none transition duration-300">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RoutineSection({ steps }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const visualStates = [
    {
      label: "Preparar",
      src: "/images/frente2.png",
      alt: "Cabelo com leveza, limpeza e movimento natural",
      imageClass: "scale-[1.01] brightness-[0.98] contrast-[0.98] saturate-[0.96]",
      overlayClass: "bg-[linear-gradient(180deg,rgba(14,11,9,0.08),rgba(14,11,9,0.2)_72%,rgba(14,11,9,0.34))]",
    },
    {
      label: "Tratar",
      src: "/images/27.jpg.webp",
      alt: "Cabelo com mais corpo, densidade e tratamento visível",
      imageClass: "scale-[1.025] brightness-[1.02] contrast-[1.04] saturate-[1.02]",
      overlayClass: "bg-[linear-gradient(180deg,rgba(14,11,9,0.06),rgba(14,11,9,0.18)_72%,rgba(14,11,9,0.3))]",
    },
    {
      label: "Sustentar",
      src: "/images/frente1.png",
      alt: "Cabelo com brilho, alinhamento e acabamento final",
      imageClass: "scale-[1.035] brightness-[1.06] contrast-[1.06] saturate-[1.06]",
      overlayClass: "bg-[linear-gradient(180deg,rgba(14,11,9,0.04),rgba(14,11,9,0.14)_68%,rgba(14,11,9,0.26))]",
    },
  ];
  const currentVisual = visualStates[activeStep] ?? visualStates[0];

  return (
    <section id="rotina" className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] shell-px py-16 lg:py-24 xl:py-32">
        <div className="lg:hidden">
          <p className="section-kicker">O método Ybera</p>
          <h2 className="mt-3 font-display text-5xl leading-[0.94] text-ink">
            O ritual por trás do resultado
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-ink/66">
            O resultado começa no primeiro uso e se mantém no que você faz depois.
          </p>
        </div>

        <div className="mt-6 grid gap-8 lg:mt-0 lg:grid-cols-[0.88fr_1.12fr] lg:items-start xl:gap-20">
          <div className="order-1 lg:sticky lg:top-28">
            <article className="relative overflow-hidden bg-[#ebe4dc]">
              <div className="relative h-[18rem] overflow-hidden sm:min-h-[36rem] lg:min-h-[44rem] xl:min-h-[48rem]">
                {visualStates.map((visual, index) => {
                  const isActive = activeStep === index;

                  return (
                    <img
                      key={visual.label}
                      src={visual.src}
                      alt={visual.alt}
                      className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive ? `opacity-100 ${visual.imageClass}` : "scale-[1.01] opacity-0"
                      }`}
                    />
                  );
                })}
                <div
                  className={`absolute inset-0 transition duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${currentVisual.overlayClass}`}
                />
                <div className="absolute left-6 top-6 md:left-8 md:top-8">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/52">
                    {currentVisual.label}
                  </p>
                </div>
              </div>
            </article>
          </div>

          <div className="order-2">
            <div className="hidden lg:block">
              <SectionHeading
                eyebrow="O método Ybera"
                title="O ritual por trás do resultado"
                description="O resultado começa no primeiro uso e se mantém no que você faz depois."
              />
            </div>

            <div className="mt-6 divide-y divide-black/8 border-y border-black/8 lg:mt-12">
              {steps.map((step, index) => {
                const isActive = activeStep === index;

                return (
                  <article
                    key={step.step}
                    className={`grid cursor-pointer gap-3 px-1 py-5 transition-colors duration-300 md:grid-cols-[110px_1fr] md:items-start md:px-0 md:py-8 ${
                      isActive ? "opacity-100" : "opacity-78"
                    }`}
                    onMouseEnter={() => setActiveStep(index)}
                    onFocus={() => setActiveStep(index)}
                    onClick={() => setActiveStep(index)}
                    tabIndex={0}
                  >
                    <p
                      className={`font-display text-5xl leading-none transition-colors duration-300 md:text-6xl ${
                        isActive ? "text-ink" : "text-mocha/74"
                      }`}
                    >
                      {step.step}
                    </p>
                    <div className="max-w-xl">
                      <h3
                        className={`font-display text-3xl leading-none transition-colors duration-300 md:text-4xl ${
                          isActive ? "text-ink" : "text-ink/84"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-ink/66 md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductHighlightsSection({ items }) {
  const essentials = items.slice(0, 3);
  const heroProduct = essentials[0];
  const shampooProduct = essentials[1];
  const soroProduct = essentials[2];
  const mascaraProduct = items[3] ?? soroProduct;

  const editorialTitle = "Os mais escolhidos para começar.";
  const editorialDescription = "Seleção pensada para cada momento do cuidado.";

  const strongCardOverlay =
    "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.1), transparent)";
  const soroCardOverlay =
    "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0.15), transparent)";

  if (!heroProduct || !shampooProduct || !soroProduct) {
    return null;
  }

  return (
    <section className="bg-pearl">
      <div className="mx-auto w-full max-w-[1440px] shell-px py-14 md:py-20 xl:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Escolhas essenciais"
            title={editorialTitle}
            description={editorialDescription}
          />
          <a href="#produtos" className="button-editorial hidden shrink-0 md:inline-flex">
            Ver produtos
            <span className="text-base leading-none">→</span>
          </a>
        </div>
        <a
          href="#produtos"
          className="mt-6 inline-flex md:hidden button-editorial-compact"
        >
          Ver produtos
          <span className="text-sm leading-none">→</span>
        </a>

        <div className="mt-12 flex min-w-0 flex-col gap-[16px] md:mt-14 lg:mt-16">
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
              <p className="font-display text-[clamp(36px,4.8vw,56px)] font-medium leading-[0.94] tracking-[-0.02em] text-white line-clamp-2">
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
                <p className="font-display text-[clamp(28px,3vw,44px)] font-medium leading-[0.95] tracking-[-0.02em] text-white line-clamp-2">
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
                <p className="font-display text-[clamp(28px,3vw,44px)] font-medium leading-[0.95] tracking-[-0.02em] text-white line-clamp-2">
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
                <blockquote className="m-0 min-w-0 border-none p-0 font-display text-[clamp(28px,2.6vw,36px)] font-normal leading-[1.1] tracking-[-0.02em] text-[#F5F3EE]">
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
              <p className="font-display text-[clamp(28px,3vw,44px)] font-medium leading-[0.95] tracking-[-0.02em] text-[#FFFFFF] line-clamp-2">
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

export function TestimonialsSection({ items }) {
  return (
    <section id="depoimentos" className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] shell-px py-16 md:py-24 xl:py-32">
        <div className="max-w-3xl">
          <p className="section-kicker text-ink/48 before:bg-ink/24">Experiência real</p>
          <h2 className="mt-5 font-display text-5xl leading-none text-[#1A1A1A] md:text-6xl">
            Quem usa, sente a diferença.
          </h2>
          <p className="mt-6 text-base leading-8 text-[#666] md:text-lg">
            O resultado aparece no uso — e permanece depois.
          </p>
        </div>

        <div className="mt-10 md:hidden">
          <div className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-1">
            {items.map((item) => (
              <article
                key={`mobile-${item.author}`}
                className="w-[86vw] shrink-0 snap-start py-2"
              >
                <p className="font-display text-5xl leading-none text-[#b9b3ad]">“</p>
                <p className="mt-3 font-display text-[1.55rem] leading-[1.35] text-[#1A1A1A]">
                  {item.quote}
                </p>
                <div className="mt-6 h-px w-full bg-black/10" />
                <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#888]">
                  {item.author}{item.location ? ` · ${item.location}` : ""}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14 hidden gap-12 md:grid md:grid-cols-3 lg:gap-14">
          {items.map((item) => (
            <article key={item.author} className="py-2">
              <p className="font-display text-6xl leading-none text-[#b9b3ad]">“</p>
              <p className="mt-4 font-display text-[2rem] leading-[1.32] text-[#1A1A1A] lg:text-[2.15rem]">
                {item.quote}
              </p>
              <div className="mt-8 h-px w-full bg-black/10" />
              <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#888]">
                {item.author}{item.location ? ` · ${item.location}` : ""}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RealStoriesSection({ items }) {
  const railRef = React.useRef(null);
  const storySnapTimerRef = React.useRef(null);
  const storyAutoplayRef = React.useRef(null);
  const [activeStoryIndex, setActiveStoryIndex] = React.useState(0);
  const [isStoryInteracting, setIsStoryInteracting] = React.useState(false);

  const scrollByCard = React.useCallback((direction) => {
    const container = railRef.current;

    if (!container) {
      return;
    }

    const firstCard = container.querySelector("[data-story-card]");

    if (!firstCard) {
      return;
    }

    const cardWidth = firstCard.getBoundingClientRect().width;
    const styles = window.getComputedStyle(container.firstElementChild);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;

    container.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  }, []);

  const getStoryMetrics = React.useCallback(() => {
    const container = railRef.current;

    if (!container) {
      return null;
    }

    const cards = Array.from(container.querySelectorAll("[data-story-card]"));

    if (!cards.length) {
      return null;
    }

    const styles = window.getComputedStyle(container.firstElementChild);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const step = cardWidth + gap;
    const nearestIndex = Math.max(
      0,
      Math.min(cards.length - 1, Math.round(container.scrollLeft / step)),
    );

    return { container, cards, step, nearestIndex };
  }, []);

  const scrollToStoryIndex = React.useCallback((index, behavior = "smooth") => {
    const metrics = getStoryMetrics();

    if (!metrics) {
      return;
    }

    const boundedIndex = Math.max(0, Math.min(metrics.cards.length - 1, index));
    metrics.container.scrollTo({
      left: boundedIndex * metrics.step,
      behavior,
    });
    setActiveStoryIndex(boundedIndex);
  }, [getStoryMetrics]);

  const snapToNearestStory = React.useCallback(() => {
    const metrics = getStoryMetrics();

    if (!metrics) {
      return;
    }

    scrollToStoryIndex(metrics.nearestIndex, "smooth");
  }, [getStoryMetrics, scrollToStoryIndex]);

  const handleStoryScroll = React.useCallback(() => {
    const metrics = getStoryMetrics();

    if (!metrics) {
      return;
    }

    setActiveStoryIndex(metrics.nearestIndex);
    window.clearTimeout(storySnapTimerRef.current);
    storySnapTimerRef.current = window.setTimeout(() => {
      snapToNearestStory();
    }, 140);
  }, [getStoryMetrics, snapToNearestStory]);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const container = railRef.current;

    if (!container) {
      return undefined;
    }

    const setInitial = () => {
      const metrics = getStoryMetrics();
      if (!metrics) {
        return;
      }
      setActiveStoryIndex(metrics.nearestIndex);
    };

    setInitial();
    window.addEventListener("resize", setInitial);
    return () => {
      window.removeEventListener("resize", setInitial);
      window.clearTimeout(storySnapTimerRef.current);
    };
  }, [getStoryMetrics]);

  React.useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches || isStoryInteracting || items.length <= 1) {
      return undefined;
    }

    storyAutoplayRef.current = window.setInterval(() => {
      setActiveStoryIndex((current) => {
        const nextIndex = (current + 1) % items.length;
        scrollToStoryIndex(nextIndex, "smooth");
        return nextIndex;
      });
    }, 5200);

    return () => {
      window.clearInterval(storyAutoplayRef.current);
    };
  }, [isStoryInteracting, items.length, scrollToStoryIndex]);

  return (
    <section className="bg-[#FFFFFF] pb-32 xl:pb-40">
      <div className="mx-auto w-full max-w-[1440px] shell-px py-28 xl:py-36">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="Histórias reais"
            title="O cuidado transforma mais do que o cabelo."
            description="Histórias reais de quem transformou a rotina, a renda e a própria confiança."
          />
        </div>
      </div>

      <div className="relative left-1/2 w-screen -translate-x-1/2 bg-[#FFFFFF] px-0">
        <div className="absolute inset-y-0 left-0 z-[2] hidden items-center pl-6 lg:flex xl:pl-8">
          <button
            type="button"
            aria-label="Voltar histórias"
            onClick={() => scrollByCard(-1)}
            className="inline-flex h-11 w-11 items-center justify-center border border-black/10 bg-white/86 text-ink/78 transition duration-300 hover:border-black/18 hover:text-ink active:scale-[0.98]"
          >
            <span className="text-lg leading-none">←</span>
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 z-[2] hidden items-center pr-6 lg:flex xl:pr-8">
          <button
            type="button"
            aria-label="Avançar histórias"
            onClick={() => scrollByCard(1)}
            className="inline-flex h-11 w-11 items-center justify-center border border-black/10 bg-white/86 text-ink/78 transition duration-300 hover:border-black/18 hover:text-ink active:scale-[0.98]"
          >
            <span className="text-lg leading-none">→</span>
          </button>
        </div>

        <div
          ref={railRef}
          className="hide-scrollbar overflow-x-auto scroll-smooth bg-[#FFFFFF]"
          onScroll={handleStoryScroll}
          onTouchStart={() => setIsStoryInteracting(true)}
          onTouchEnd={() => {
            setIsStoryInteracting(false);
            snapToNearestStory();
          }}
          onMouseDown={() => setIsStoryInteracting(true)}
          onMouseUp={() => setIsStoryInteracting(false)}
          onMouseLeave={() => setIsStoryInteracting(false)}
        >
          <div className="flex w-max gap-7 lg:gap-10">
            {items.map((item, index) => (
              <article
                key={item.name}
                data-story-card
                className={`group w-[82vw] shrink-0 bg-[#F7F5F2] transition-[opacity,transform] duration-500 ease-out sm:w-[68vw] md:opacity-100 md:scale-100 lg:w-[calc((100vw-10rem)/3.1)] xl:w-[calc((100vw-14rem)/3.15)] ${
                  activeStoryIndex === index ? "opacity-100 scale-[1.005]" : "opacity-74 scale-100"
                }`}
              >
                <div className="overflow-hidden bg-[#F7F5F2]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[26rem] w-full object-cover object-center transition duration-700 group-hover:scale-[1.02] md:h-[30rem] lg:h-[33rem]"
                  />
                </div>
                <div className="px-5 pb-9 pt-6 lg:px-7 lg:pb-10">
                  <h3 className="font-display text-[2rem] leading-[0.98] text-ink md:text-[2.2rem]">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#888]">
                    {item.location}
                  </p>
                  <p className="mt-5 max-w-[22rem] font-display text-[20px] leading-[1.35] text-ink md:text-[24px] lg:text-[30px]">
                    “{item.quote}”
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProfessionalSection() {
  return (
    <section id="profissionais" className="bg-[#0B0B0B] px-0 py-16 text-white lg:py-32">
      <div className="mx-auto grid w-full max-w-[1440px] shell-px gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
        <div className="overflow-hidden">
          <img
            src="/images/28.jpg.webp"
            alt="Cuidado capilar profissional Ybera"
            className="h-[26rem] w-full object-cover object-center grayscale-[8%] transition duration-700 hover:scale-[1.02] md:h-[34rem] lg:h-[42rem]"
          />
        </div>

        <div className="lg:pl-8">
          <p className="section-kicker text-white/55 before:bg-white/35">
            Ybera para profissionais
          </p>
          <h2 className="mt-7 max-w-3xl font-display text-5xl leading-[0.94] text-white md:text-7xl">
            Resultado de salão, com consistência no dia a dia.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/64 md:text-lg">
            Linhas profissionais e protocolos pensados para quem precisa entregar resultado com segurança, técnica e repetição.
          </p>

          <div className="mt-6">
            <a href="#" className="button-editorial-dark">
              CONHECER LINHA PROFISSIONAL
              <span className="text-base leading-none">→</span>
            </a>
          </div>

          <div className="mt-12 hidden grid-cols-3 gap-6 border-y border-white/10 py-8 lg:grid">
            {[
              ["Técnica", "Protocolos claros para aplicar com mais confiança e precisão."],
              ["Resultado", "Um resultado que o cliente percebe no cabelo e reconhece no retorno."],
              ["Parceria", "Uma marca que cresce junto com quem faz do cuidado o seu trabalho."],
            ].map(([title, text]) => (
              <div key={title}>
                <h3 className="font-display text-3xl leading-none text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/55">{text}</p>
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

  return (
    <section className="relative overflow-hidden bg-[#15110e] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.06),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_32%)]" />
      <div className="mx-auto max-w-5xl shell-px py-32 text-center xl:py-44">
        <p className="section-kicker mx-auto justify-center text-white/50 before:bg-white/32">
          {cta.eyebrow}
        </p>
        <h2 className="mx-auto mt-8 max-w-4xl font-display text-5xl leading-[0.94] md:text-7xl">
          <span className="block">{titleLines[0]}</span>
          <span className="mt-2 block italic text-white/94">{titleLines[1] ?? ""}</span>
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/66 md:text-lg">
          {cta.description}
        </p>
        <div className="mt-12 flex justify-center">
          <a href="#produtos" className="button-editorial-dark cursor-pointer">
            {cta.primary}
            <span className="text-base leading-none transition duration-300">
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
        className={`mx-auto w-full max-w-[1440px] shell-px pb-8 pt-16 transition-all duration-700 ease-out lg:pb-8 lg:pt-28 ${
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
