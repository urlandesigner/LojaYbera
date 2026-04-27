import React from "react";
import { productRailItems } from "../content";
import ProductEditorialDescription from "./ProductEditorialDescription";
import { FooterSection, Header, ProductRailSection } from "./HomeSections";

const product = {
  eyebrow: "Óleo reparador",
  name: "Óleo de Mirra Reparador 15ml",
  description:
    "Finalizador de alta performance para reduzir frizz, alinhar os fios e entregar brilho com toque leve.",
  price: "R$ 89,90",
  priceValue: 89.9,
  installment: "ou 3x de R$ 29,97 sem juros no cartão",
  pix: "R$ 85,41 no Pix (5% off)",
  images: [
    {
      src: "/images/5.png",
      alt: "Produto Ybera em composição premium",
      fit: "contain",
    },
    {
      src: "/images/mirra1.jpg.webp",
      alt: "Óleo de Mirra Reparador Ybera",
      fit: "contain",
    },
    {
      src: "/images/mirra2.jpg.webp",
      alt: "Óleo de Mirra Reparador em fundo vermelho",
      fit: "contain",
    },
    {
      src: "/images/mirra3.jpg.webp",
      alt: "Textura do Óleo de Mirra Reparador",
      fit: "cover",
    },
    {
      src: "/images/mirra4.jpg.webp",
      alt: "Óleo de Mirra Reparador em destaque",
      fit: "contain",
    },
    {
      src: "/images/mirra5.jpg.webp",
      alt: "Aplicação do Óleo de Mirra Reparador no cabelo",
      fit: "cover",
    },
    {
      src: "/images/12.png",
      alt: "Produto Ybera em fundo claro",
      fit: "contain",
    },
    {
      src: "/images/13.png",
      alt: "Óleo de Mirra Reparador com textura",
      fit: "cover",
    },
  ],
  results: ["Brilho intenso", "Controle do frizz", "Toque macio"],
};

const THUMB_GAP_PX = 20;

function ChevronGallery({ direction, disabled, label, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`hidden min-h-[3.25rem] w-9 shrink-0 items-center justify-center self-center text-ink transition lg:flex ${
        disabled ? "cursor-default opacity-25" : "opacity-45 hover:opacity-80"
      }`}
    >
      <span className="sr-only">{label}</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
        {direction === "prev" ? (
          <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M10 6l6 6-6 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

function ProductGallery() {
  const images = product.images;
  const [activeImage, setActiveImage] = React.useState(images[0]);
  const scrollRef = React.useRef(null);
  const viewportRef = React.useRef(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);
  const [thumbSize, setThumbSize] = React.useState(0);

  const needsArrows = images.length > 5;

  const updateScrollState = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
  }, []);

  React.useLayoutEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const measure = () => {
      if (typeof window === "undefined") return;
      const wide = window.matchMedia("(min-width: 1024px)").matches;
      if (wide && needsArrows) {
        const w = vp.clientWidth;
        const tw = Math.max(64, Math.floor((w - 4 * THUMB_GAP_PX) / 5));
        setThumbSize(tw);
      } else {
        setThumbSize(0);
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [needsArrows]);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [images.length, thumbSize, updateScrollState]);

  const scrollThumbs = React.useCallback(
    (dir) => {
      const el = scrollRef.current;
      if (!el) return;
      const gap = THUMB_GAP_PX;
      const firstBtn = el.querySelector("button");
      const step =
        thumbSize > 0 ? thumbSize + gap : (firstBtn?.offsetWidth ?? 72) + THUMB_GAP_PX;
      el.scrollBy({ left: dir * step, behavior: "smooth" });
    },
    [thumbSize],
  );

  const onSelectThumb = React.useCallback((image, index) => {
    setActiveImage(image);
    requestAnimationFrame(() => {
      const root = scrollRef.current;
      if (!root) return;
      const btn = root.querySelector(`button[data-thumb-idx="${index}"]`);
      btn?.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
    });
  }, []);

  return (
    <div className="mt-0 min-w-0 w-full max-w-full space-y-4 lg:space-y-5">
      <div className="relative mt-0 aspect-square w-full max-w-full overflow-hidden border-y border-black/[0.07] bg-mist shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_22px_48px_-28px_rgba(24,21,18,0.11)] sm:border sm:border-black/[0.08] sm:bg-white sm:shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_28px_56px_-32px_rgba(24,21,18,0.12)]">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(24,21,18,0.035)_100%)]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-[1]">
          <img
            key={activeImage.src}
            src={activeImage.src}
            alt={activeImage.alt}
            className={`h-full w-full object-center transition duration-500 ease-out ${
              activeImage.fit === "contain" ? "object-contain" : "object-cover"
            }`}
          />
        </div>
      </div>

      <div
        className={`flex min-w-0 max-w-full items-center ${needsArrows ? "gap-1 lg:gap-2" : ""}`}
        role="region"
        aria-label="Miniaturas da galeria"
      >
        {needsArrows ? (
          <ChevronGallery
            direction="prev"
            disabled={!canScrollLeft}
            label="Ver miniaturas anteriores"
            onClick={() => scrollThumbs(-1)}
          />
        ) : null}

        <div ref={viewportRef} className="min-w-0 flex-1 overflow-hidden">
          <div
            ref={scrollRef}
            role="tablist"
            aria-label="Galeria de imagens do produto"
            className="flex flex-nowrap gap-4 overflow-x-auto overscroll-x-contain pb-0.5 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] lg:gap-5 [&::-webkit-scrollbar]:hidden"
          >
            {images.map((image, index) => {
              const isActive = activeImage.src === image.src;
              const thumbStyle =
                thumbSize > 0
                  ? { width: thumbSize, height: thumbSize, flexShrink: 0 }
                  : undefined;
              const sizeClass =
                thumbSize > 0
                  ? ""
                  : needsArrows
                    ? "h-[3.25rem] w-[3.25rem] shrink-0 sm:h-14 sm:w-14"
                    : "aspect-square min-h-0 w-[3.25rem] shrink-0 sm:w-16 lg:min-w-0 lg:flex-1 lg:basis-0";
              return (
                <button
                  key={image.src}
                  type="button"
                  role="tab"
                  data-thumb-idx={index}
                  aria-selected={isActive}
                  aria-label={`Ver imagem: ${image.alt}`}
                  style={thumbStyle}
                  onClick={() => onSelectThumb(image, index)}
                  className={`aspect-square overflow-hidden border bg-white transition-[border-color,opacity] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink/25 ${sizeClass} ${
                    isActive
                      ? "border-ink/55"
                      : "border-black/[0.1] opacity-[0.82] hover:border-black/20 hover:opacity-100"
                  }`}
                >
                  <img src={image.src} alt="" className="h-full w-full object-cover object-center" />
                </button>
              );
            })}
          </div>
        </div>

        {needsArrows ? (
          <ChevronGallery
            direction="next"
            disabled={!canScrollRight}
            label="Ver próximas miniaturas"
            onClick={() => scrollThumbs(1)}
          />
        ) : null}
      </div>
    </div>
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function ProductInfo({ onBuy, buyCtaRef }) {
  return (
    <div className="flex min-w-0 w-full max-w-full flex-col lg:max-w-[32rem] lg:justify-self-end xl:max-w-[36rem]">
      <div className="order-1 max-lg:pt-1">
        <p className="section-kicker max-w-full text-ink/50 before:bg-mocha/45">{product.eyebrow}</p>
        <h1 className="mt-4 w-full max-w-none whitespace-normal font-display text-[32px] leading-[1.1] tracking-[-0.01em] text-ink [word-break:normal] [overflow-wrap:break-word] hyphens-none sm:mt-5 lg:mt-6 lg:text-[48px] lg:leading-[1.08] lg:text-balance">
          {product.name}
        </h1>

        <p className="mt-5 max-w-full text-base font-medium leading-[1.65] text-ink/68 sm:mt-6 sm:max-w-lg sm:text-[1.05rem] sm:leading-relaxed md:text-lg md:leading-8">
          {product.description}
        </p>

        <nav
          aria-label="Secções do produto"
          className="mt-5 flex flex-wrap items-center gap-x-1 gap-y-2 text-[10px] font-semibold uppercase leading-none tracking-[0.2em] text-ink/46 sm:mt-6 sm:text-[11px] sm:tracking-[0.18em]"
        >
          <a
            href="#pdp-como-usar"
            className="border-b border-transparent pb-0.5 transition hover:border-ink/30 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F4F0]"
          >
            Como usar
          </a>
          <span className="select-none px-2 text-ink/22" aria-hidden>
            ·
          </span>
          <a
            href="#pdp-informacoes-essenciais"
            className="border-b border-transparent pb-0.5 transition hover:border-ink/30 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F4F0]"
          >
            Informações essenciais
          </a>
        </nav>
      </div>

      <div className="order-2 mt-7 min-w-0 max-w-full pt-6 max-lg:border-t max-lg:border-black/[0.06] lg:mt-9 lg:border-t lg:border-black/10">
        <div className="flex min-w-0 flex-col gap-3 lg:gap-3.5">
          <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end lg:gap-x-5 lg:gap-y-0.5">
            <p className="shrink-0 font-display text-[22px] leading-[1.3] tracking-[-0.012em] text-ink sm:text-[2.25rem] sm:leading-[1.08] md:text-[2.65rem] md:leading-[1.14] lg:text-5xl lg:leading-[1.12]">
              {product.price}
            </p>
            <p className="min-w-0 max-w-full font-sans text-[12px] font-normal leading-snug text-ink/44 lg:flex-1 lg:basis-[12rem] lg:pb-px lg:text-[13px] lg:leading-relaxed lg:text-ink/48">
              {product.installment}
            </p>
          </div>
          <p className="font-sans text-[13px] font-medium leading-snug tracking-[0.01em] text-ink/70 lg:text-sm lg:leading-[1.45] lg:text-ink/75">
            {product.pix}
          </p>
        </div>
      </div>

      <div ref={buyCtaRef} className="order-3 mt-6 lg:mt-8">
        <button
          type="button"
          onClick={onBuy}
          className="group inline-flex h-14 w-full min-h-[3.5rem] min-w-[12rem] items-center justify-center gap-2 border border-ink bg-ink px-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 ease-out hover:border-[#2A2724] hover:bg-[#2A2724] active:scale-[0.98] lg:max-w-xs"
        >
          Comprar produto
          <span
            className="text-base leading-none transition-transform duration-300 ease-out group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            →
          </span>
        </button>
      </div>

      <div className="order-4 mt-7 min-w-0 max-w-full border border-black/[0.08] bg-white/75 p-4 lg:mt-9">
        <label
          htmlFor="shipping-zip"
          className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/48"
        >
          Calcule o frete
        </label>
        <div className="mt-3 grid grid-cols-[1fr_auto] items-stretch gap-2.5 sm:gap-3">
          <input
            id="shipping-zip"
            type="text"
            inputMode="numeric"
            placeholder="Digite seu CEP"
            aria-label="Digite seu CEP para calcular o frete"
            className="h-12 min-w-0 w-full border border-black/12 bg-white px-3.5 text-sm text-ink outline-none transition duration-300 placeholder:text-ink/32 focus:border-ink/40 sm:h-[52px] sm:px-4"
          />
          <button
            type="button"
            className="inline-flex h-12 min-w-[5.75rem] shrink-0 items-center justify-center whitespace-nowrap border border-ink/70 px-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition duration-300 hover:bg-ink hover:text-white active:scale-[0.98] sm:h-[52px] sm:min-w-0 sm:px-6"
          >
            Calcular frete
          </button>
        </div>
        <a
          href="#"
          className="mt-2 inline-flex items-center py-1.5 text-[11px] leading-none text-ink/42 underline-offset-[5px] transition hover:text-ink hover:underline"
        >
          Não sei meu CEP
        </a>
      </div>
    </div>
  );
}

function StickyBuyBar({ visible, onBuy }) {
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-all duration-300 ease-out ${
        visible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="border-t border-black/10 bg-[#f6f4f2]/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_42px_-24px_rgba(0,0,0,0.35)] backdrop-blur-[8px] sm:px-6">
        <div className="mx-auto grid w-full max-w-site grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <div className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[3.15rem_minmax(0,1fr)] sm:gap-3.5">
              <div className="aspect-square overflow-hidden border border-black/[0.08] bg-white">
                <img
                  src={product.images[0].src}
                  alt={product.name}
                  className="h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-[1.05rem] leading-tight text-ink sm:text-[1.2rem]">
                  {product.name}
                </p>
                <p className="mt-1 text-sm font-medium text-ink/68 sm:text-[0.95rem]">
                  {product.price}
                </p>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onBuy}
            className="inline-flex h-11 min-w-[10.5rem] items-center justify-center gap-2 border border-ink bg-ink px-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 ease-out hover:border-[#2A2724] hover:bg-[#2A2724] active:scale-[0.98] sm:h-12 sm:min-w-[12rem]"
          >
            Comprar produto
            <span className="text-base leading-none" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ isOpen, onClose }) {
  const [quantity, setQuantity] = React.useState(1);
  const subtotal = product.priceValue * quantity;

  React.useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition duration-300 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Fechar carrinho"
        onClick={onClose}
        className={`absolute inset-0 bg-black/28 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[31rem] flex-col bg-[#F6F4F2] text-ink shadow-[-24px_0_80px_rgba(0,0,0,0.16)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/42">
              Carrinho
            </p>
            <h2 className="mt-1 font-display text-3xl leading-none text-ink lg:text-[40px]">
              Sua sacola
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center text-2xl leading-none text-ink/52 transition hover:text-ink"
            aria-label="Fechar carrinho"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-7">
          <div className="grid grid-cols-[6.5rem_1fr] gap-5">
            <div className="aspect-square overflow-hidden bg-white">
              <img
                src={product.images[0].src}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-display text-2xl leading-[0.98] text-ink">
                {product.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-ink/58">
                Brilho intenso, controle do frizz e toque macio.
              </p>
              <p className="mt-4 text-sm font-semibold text-ink">
                {product.price}
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-y border-black/10 py-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/48">
              Quantidade
            </span>
            <div className="flex h-11 items-center border border-black/14 bg-white">
              <button
                type="button"
                aria-label="Diminuir quantidade"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="h-full px-4 text-lg text-ink/62 transition hover:text-ink"
              >
                −
              </button>
              <span className="min-w-10 text-center text-sm text-ink">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Aumentar quantidade"
                onClick={() => setQuantity((current) => current + 1)}
                className="h-full px-4 text-lg text-ink/62 transition hover:text-ink"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/42">
              Você também pode gostar
            </p>
            <div className="mt-4 grid grid-cols-[5rem_1fr] gap-4">
              <img
                src="/images/16.png"
                alt="Produto Ybera complementar"
                className="aspect-square bg-white object-contain"
              />
              <div>
                <h3 className="font-display text-xl leading-none text-ink">
                  Limpeza que devolve brilho
                </h3>
                <a
                  href="#"
                  className="mt-3 inline-flex text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/54 transition hover:text-ink"
                >
                  Ver produto →
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 bg-[#F6F4F2] px-6 py-6">
          <div className="flex items-center justify-between">
            <span className="text-sm uppercase tracking-[0.18em] text-ink/48">
              Subtotal
            </span>
            <span className="font-display text-3xl leading-none text-ink">
              {formatCurrency(subtotal)}
            </span>
          </div>
          <button
            type="button"
            className="mt-5 inline-flex h-[52px] w-full items-center justify-center gap-2 border border-ink bg-ink px-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 ease-out hover:border-[#2A2724] hover:bg-[#2A2724] active:scale-[0.98]"
          >
            Finalizar compra
            <span className="text-base leading-none">→</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 w-full text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/42 transition hover:text-ink"
          >
            Continuar comprando
          </button>
        </div>
      </aside>
    </div>
  );
}

export default function ProductPage() {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [showStickyBuyBar, setShowStickyBuyBar] = React.useState(false);
  const buyCtaRef = React.useRef(null);

  React.useEffect(() => {
    const node = buyCtaRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBuyBar(!entry.isIntersecting);
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-ink">
      <Header solid />
      <main className="mt-0">
        <section id="pdp-hero" className="overflow-x-clip bg-[#F7F4F0] px-0 pb-10 pt-[calc(5rem+1px+24px)] max-lg:px-0 lg:pt-[calc(5rem+1px+80px)] md:pb-[120px]">
          <div className="mx-auto mt-0 grid min-w-0 w-full max-w-site shell-px grid-cols-1 items-start gap-y-5 gap-x-0 md:gap-8 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-x-10 lg:gap-y-0 xl:gap-x-12">
            <ProductGallery />
            <div className="min-h-0 min-w-0 px-0 lg:sticky lg:top-[var(--pdp-sticky-top)] lg:self-start lg:max-h-[var(--pdp-sticky-max-h)] lg:overflow-x-hidden lg:overflow-y-auto lg:overscroll-y-contain">
              <ProductInfo onBuy={() => setIsCartOpen(true)} buyCtaRef={buyCtaRef} />
            </div>
          </div>
        </section>

        <ProductEditorialDescription />

        <div className="[&>#produtos]:pt-6 md:[&>#produtos]:pt-[60px]">
          <ProductRailSection
            items={productRailItems}
            eyebrow="Produtos"
            title="Produtos relacionados"
            description="Outros cuidados Ybera para completar sua rotina com brilho, leveza e movimento."
          />
        </div>
      </main>
      <FooterSection />
      <StickyBuyBar
        visible={showStickyBuyBar && !isCartOpen}
        onBuy={() => setIsCartOpen(true)}
      />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}
