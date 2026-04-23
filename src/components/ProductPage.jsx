import React from "react";
import { productRailItems } from "../content";
import { FooterSection, Header, ProductRailSection } from "./HomeSections";

const product = {
  eyebrow: "Óleo reparador",
  name: "Óleo de Mirra Reparador 15ml",
  description:
    "Hidrata profundamente, reduz o frizz, fortalece os fios e proporciona brilho intenso.",
  price: "R$ 89,90",
  priceValue: 89.9,
  installment: "ou 3x de R$ 29,97 sem juros",
  pix: "R$ 85,41 no Pix",
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
  details: [
    {
      title: "Para que serve",
      text: "Finalização com brilho, menos frizz e fio com acabamento mais alinhado.",
    },
    {
      title: "Como usar",
      text: "Poucas gotas nas mãos; espalhe no comprimento e nas pontas, úmido ou seco.",
    },
    {
      title: "Quando usar",
      text: "Na finalização ou quando o fio pedir mais brilho, maciez e controle.",
    },
  ],
};

const categories = [
  {
    name: "Lisos e Alisados",
    image: "/images/frente1.png",
  },
  {
    name: "Cacheados e ondulados",
    image: "/images/24.jpg.webp",
  },
  {
    name: "Loiros e grisalhos",
    image: "/images/23.jpg.webp",
  },
  {
    name: "Secos e Ressecados",
    image: "/images/mirra5.jpg.webp",
  },
  {
    name: "Oleosos e Mistos",
    image: "/images/frente2.png",
  },
  {
    name: "Danificados e Quebradiços",
    image: "/images/27.jpg.webp",
  },
  {
    name: "Coloridos",
    image: "/images/26.jpg.webp",
  },
  {
    name: "Finos e Fragilizados",
    image: "/images/28.jpg.webp",
  },
];

const fullDescription = [
  "Textura leve que penetra sem pesar e devolve luminosidade — com a sensação de cuidado concentrado que só um óleo bem formulado entrega.",
  "Nutrição profunda aliada à ação antioxidante: ajuda a fortalecer o fio, prolongar o efeito de outros tratamentos e manter o brilho por mais tempo.",
  "Protege contra o desgaste do dia a dia — sol, poluição, calor do secador — e rende muito: poucas gotas bastam para um acabamento limpo.",
  "A mirra atravessa séculos de rituais de beleza; na Ybera vira um óleo reparador para quem busca resultado visível e um toque memorável.",
  "Conteúdo: 01 Óleo de Mirra Reparador 15ml — Ybera Paris.",
];

function ProductGallery() {
  const [activeImage, setActiveImage] = React.useState(product.images[0]);

  return (
    <div className="mt-0 min-w-0 w-full max-w-full space-y-3 sm:space-y-3.5 lg:sticky lg:top-28 lg:space-y-4 lg:self-start">
      <div className="relative mt-0 aspect-square w-full max-w-full overflow-hidden border-y border-black/[0.07] bg-mist shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_22px_48px_-28px_rgba(24,21,18,0.11)] sm:border sm:border-black/[0.08] sm:bg-white sm:shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_28px_56px_-32px_rgba(24,21,18,0.12)]">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(24,21,18,0.035)_100%)]"
          aria-hidden="true"
        />
        <img
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          className={`relative z-[1] h-full w-full object-top transition duration-500 ease-out ${
            activeImage.fit === "contain" ? "object-contain" : "object-cover"
          }`}
        />
      </div>

      <div
        className="flex min-h-[3.25rem] min-w-0 max-w-full snap-x snap-mandatory gap-2.5 overflow-x-auto overscroll-x-contain px-4 pb-1 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-0 sm:snap-none [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Galeria de imagens do produto"
      >
        {product.images.map((image) => {
          const isActive = activeImage.src === image.src;
          return (
            <button
              key={image.src}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Ver imagem: ${image.alt}`}
              onClick={() => setActiveImage(image)}
              className={`aspect-square w-[4.125rem] shrink-0 snap-start overflow-hidden border bg-white transition duration-300 sm:min-h-0 sm:w-auto sm:min-w-0 ${
                isActive
                  ? "border-ink/45 ring-1 ring-ink/15"
                  : "border-black/[0.08] opacity-[0.78] hover:border-black/14 hover:opacity-100"
              } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink/25`}
            >
              <img src={image.src} alt="" className="h-full w-full object-cover" />
            </button>
          );
        })}
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

function ProductInfo({ onBuy }) {
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

        <p className="mt-4">
          <a
            href="/experiencia"
            className="inline-flex border-b border-ink/20 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/48 transition hover:border-ink/40 hover:text-ink"
          >
            Ler a experiência editorial
          </a>
        </p>

        <p className="mt-5 max-w-full text-pretty text-[10px] font-semibold uppercase leading-[1.55] tracking-[0.18em] text-ink/44 sm:mt-6 sm:max-w-xl sm:leading-relaxed sm:tracking-[0.2em]">
          {product.results.join(" · ")}
        </p>
      </div>

      <ul className="order-5 mt-8 w-full max-w-full divide-y divide-black/[0.055] max-lg:space-y-0 max-lg:border-t max-lg:border-black/[0.06] max-lg:pt-2 lg:order-2 lg:mt-10 lg:space-y-3.5 lg:divide-y-0 lg:border-l lg:border-t-0 lg:border-mocha/38 lg:pl-5 lg:pt-0">
        {product.details.map((detail) => (
          <li
            key={detail.title}
            className="min-w-0 max-w-full py-4 first:pt-3 last:pb-1 sm:max-w-xl sm:first:pt-4 lg:py-0 lg:first:pt-0 lg:last:pb-0"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mocha/88">
              {detail.title}
            </p>
            <p className="mt-1.5 break-words text-[0.9375rem] leading-relaxed text-ink/74">{detail.text}</p>
          </li>
        ))}
      </ul>

      <div className="order-2 mt-7 min-w-0 max-w-full pt-6 max-lg:border-t max-lg:border-black/[0.06] lg:order-3 lg:mt-9 lg:border-t lg:border-black/10">
        <div className="flex min-w-0 flex-col gap-3 lg:gap-3.5">
          <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end lg:gap-x-5 lg:gap-y-0.5">
            <p className="shrink-0 font-display text-[2.25rem] leading-[0.92] tracking-[-0.02em] text-ink sm:text-[2.65rem] sm:leading-none md:text-5xl">
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

      <div className="order-3 mt-6 lg:order-4 lg:mt-8">
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

      <div className="order-4 mt-7 min-w-0 max-w-full border border-black/[0.08] bg-white/75 p-4 lg:order-5 lg:mt-9">
        <label
          htmlFor="shipping-zip"
          className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/48"
        >
          Consulte o frete
        </label>
        <div className="mt-3 grid grid-cols-[1fr_auto] items-stretch gap-2.5 sm:gap-3">
          <input
            id="shipping-zip"
            type="text"
            inputMode="numeric"
            placeholder="Digite seu CEP"
            aria-label="Digite seu CEP para consultar o frete"
            className="h-12 min-w-0 w-full border border-black/12 bg-white px-3.5 text-sm text-ink outline-none transition duration-300 placeholder:text-ink/32 focus:border-ink/40 sm:h-[52px] sm:px-4"
          />
          <button
            type="button"
            className="inline-flex h-12 min-w-[5.75rem] shrink-0 items-center justify-center whitespace-nowrap border border-ink/70 px-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition duration-300 hover:bg-ink hover:text-white active:scale-[0.98] sm:h-[52px] sm:min-w-0 sm:px-6"
          >
            Calcular
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
            <h2 className="mt-1 font-display text-3xl leading-none text-ink">
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

function CategorySection() {
  return (
    <section className="bg-white px-0 pb-20 lg:pb-32">
      <div className="mx-auto w-full max-w-[1440px] shell-px border-t border-black/[0.07] pt-14 sm:pt-16 lg:pt-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker">Categorias</p>
            <h2 className="mt-6 font-display text-5xl leading-[0.96] text-ink md:text-6xl">
              Escolha pelo que o seu cabelo pede.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-ink/58">
            Uma leitura simples para encontrar o cuidado certo pelo tipo e momento do fio.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-4 lg:gap-x-4 lg:gap-y-12">
          {categories.map((category) => (
            <a
              key={category.name}
              href="#"
              className="group block"
            >
              <div className="aspect-square overflow-hidden bg-[#F6F4F2]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.035]"
                />
              </div>
              <h3 className="mt-4 font-display text-2xl leading-none text-ink transition duration-300 group-hover:text-mocha md:text-3xl">
                {category.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductDescriptionSection() {
  return (
    <section className="bg-white px-0 pb-16 pt-0 lg:pb-28 lg:pt-0">
      <div className="mx-auto grid w-full max-w-[1440px] shell-px gap-8 pt-10 sm:gap-10 sm:pt-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-20 lg:pt-16">
        <div>
          <p className="section-kicker">Descrição do produto</p>
          <h2 className="mt-5 max-w-md font-display text-5xl leading-[0.96] text-ink sm:mt-6 md:text-6xl">
            O cuidado completo em poucas gotas.
          </h2>
        </div>

        <div className="max-w-3xl">
          <div className="space-y-4 text-base leading-[1.7] text-ink/70 sm:space-y-5 sm:leading-8">
            {fullDescription.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? "font-display text-3xl leading-tight text-ink md:text-4xl"
                    : index === fullDescription.length - 1
                      ? "text-sm leading-7 text-ink/55"
                      : ""
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProductPage() {
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white text-ink">
      <Header solid />
      <main className="mt-0">
        <section className="overflow-x-clip bg-mist pb-10 max-lg:px-0 max-lg:pt-[calc(5rem+1px)] lg:pb-16 lg:pt-36">
          <div className="mx-auto mt-0 grid min-w-0 w-full max-w-[1440px] shell-px grid-cols-1 items-start gap-y-5 gap-x-0 md:gap-8 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-x-10 lg:gap-y-0 xl:gap-x-12">
            <ProductGallery />
            <div className="min-w-0 px-0">
              <ProductInfo onBuy={() => setIsCartOpen(true)} />
            </div>
          </div>
        </section>

        <ProductDescriptionSection />

        <ProductRailSection
          items={productRailItems}
          eyebrow="Produtos"
          title="Produtos relacionados"
          description="Outros cuidados Ybera para completar sua rotina com brilho, leveza e movimento."
        />

        <CategorySection />
      </main>
      <FooterSection />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}
