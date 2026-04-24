import React from "react";

/** Itens da grade editorial “Categorias” (PDP ou outras páginas). */
export const PRODUCT_CATEGORIES = [
  { name: "Lisos e Alisados", image: "/images/frente1.png" },
  { name: "Cacheados e ondulados", image: "/images/24.jpg.webp" },
  { name: "Loiros e grisalhos", image: "/images/23.jpg.webp" },
  { name: "Secos e Ressecados", image: "/images/mirra5.jpg.webp" },
  { name: "Oleosos e Mistos", image: "/images/frente2.png" },
  { name: "Danificados e Quebradiços", image: "/images/27.jpg.webp" },
  { name: "Coloridos", image: "/images/26.jpg.webp" },
  { name: "Finos e Fragilizados", image: "/images/28.jpg.webp" },
];

export function ProductCategoriesSection({
  categories = PRODUCT_CATEGORIES,
} = {}) {
  return (
    <section className="bg-white px-0 section-y-cards">
      <div className="mx-auto w-full max-w-site shell-px border-t border-black/[0.07] pt-0">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker">Categorias</p>
            <h2 className="mt-6 font-display text-[28px] leading-[1.2] text-ink md:text-6xl md:leading-[0.96]">
              Escolha pelo que o seu cabelo pede.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-ink/58">
            Uma leitura simples para encontrar o cuidado certo pelo tipo e momento do fio.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-4 lg:gap-x-4 lg:gap-y-12">
          {categories.map((category) => (
            <a key={category.name} href="#" className="group block">
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
