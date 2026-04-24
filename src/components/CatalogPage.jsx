import React from "react";
import { FooterSection, Header } from "./HomeSections";

function catalogPriceDisplay(price) {
  if (price == null) return "";
  const s = String(price).trim();
  const m = s.match(/R\$\s*[\d.,]+/);
  return m ? m[0].replace(/\s+/g, " ") : s;
}

const catalogItems = [
  {
    tag: "Lançamento",
    productName: "Óleo de Mirra Reparador",
    note: "Uso contínuo para selar brilho e toque ao longo dos dias.",
    price: "R$ 69,90",
    image: "/images/21.png",
    href: "/produto/oleo-de-mirra-reparador",
  },
  {
    tag: "Essencial",
    productName: "Shampoo Multifuncional",
    note: "Uso constante no início do cuidado, com ritmo leve.",
    price: "R$ 107,90",
    image: "/images/7.png",
    href: "/produto/shampoo-multifuncao-cuidados-profundos",
  },
  {
    tag: "Tratamento",
    productName: "Máscara 2 em 1 Protect Control",
    note: "Aplicação recorrente para textura mais uniforme.",
    price: "R$ 107,90",
    image: "/images/15.png",
    href: "#produtos",
  },
  {
    tag: "Finalização",
    productName: "Soro Vello Alfa-Lactobaby",
    note: "Cuidado contínuo para disciplina e leveza no dia a dia.",
    price: "R$ 249,90",
    image: "/images/16.png",
    href: "#produtos",
  },
  {
    tag: "Profissional",
    productName: "Escova Progressiva",
    note: "Uso frequente para manter o efeito ao longo do dia.",
    price: "R$ 99,90",
    image: "/images/17.png",
    href: "#produtos",
  },
  {
    tag: "Preferido dos profissionais",
    productName: "Leave-in Disciplinante",
    note: "Repetição no cuidado para manter o fio obediente e leve.",
    price: "R$ 89,90",
    image: "/images/18.png",
    href: "#produtos",
  },
  {
    tag: "Uso contínuo",
    productName: "Finalizador de Brilho",
    note: "Camadas leves ao longo da semana para sustentar o brilho.",
    price: "R$ 119,90",
    image: "/images/19.png",
    href: "#produtos",
  },
  {
    tag: "Ritual",
    productName: "Tratamento Nutritivo",
    note: "Rotina estável para corpo e maciez sem pesar.",
    price: "R$ 139,90",
    image: "/images/20.png",
    href: "#produtos",
  },
  {
    tag: "Assinatura",
    productName: "Mirra Signature Care",
    note: "Recorrência no ritual para manter presença e brilho contidos.",
    price: "R$ 159,90",
    image: "/images/31.png",
    href: "#produtos",
  },
];

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Header solid />
      <main className="pt-[calc(5rem+1px)]">
        <section className="bg-white section-y-cards">
          <div className="mx-auto w-full max-w-site shell-px">
            <div className="max-w-3xl section-lead">
              <p className="section-kicker">Catálogo</p>
              <h1 className="mt-4 font-display text-[28px] leading-[1.2] text-ink md:text-6xl md:leading-[0.96]">
                Escolha o cuidado certo
              </h1>
              <p className="mt-4 text-[16px] leading-[1.5] text-ink/66 md:text-lg md:leading-8">
                Uma seleção pensada para brilho, textura e movimento ao longo do dia
              </p>
            </div>

            <div className="mt-0 grid gap-1 sm:grid-cols-2 sm:gap-1.5 lg:grid-cols-3 lg:gap-2">
              {catalogItems.map((item) => (
                <a
                  key={item.productName}
                  href={item.href}
                  className="group relative flex min-h-[36rem] w-full shrink-0 flex-col items-center overflow-hidden bg-[#F6F4F2] p-4 text-center transition duration-500 hover:-translate-y-1 sm:min-h-[37rem] md:p-5 lg:min-h-[38rem] xl:min-h-[40rem]"
                >
                  <p className="self-start inline-flex items-center border border-black/6 bg-white px-2.5 py-1 text-[13px] font-semibold uppercase leading-[1.4] tracking-[0.2em] text-ink md:text-[9px] md:leading-normal">
                    {item.tag}
                  </p>

                  <div className="relative mt-6 flex w-full min-h-[13rem] max-h-[19rem] flex-[1_1_auto] flex-col items-center justify-center px-3 pb-1 sm:min-h-[14rem] sm:max-h-[20rem] md:min-h-[15rem] md:max-h-[21rem]">
                    <div className="absolute inset-0 z-[1] bg-black/0 transition duration-300 group-hover:bg-black/[0.04]" />
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="relative z-[2] h-auto max-h-[min(100%,15.5rem)] w-auto max-w-[82%] object-contain object-center transition duration-300 ease-out group-hover:scale-[1.02] sm:max-h-[min(100%,16.5rem)] md:max-h-[min(100%,17.5rem)]"
                    />
                  </div>

                  <div className="mt-auto flex w-full max-w-full flex-col items-center px-1 pb-1 pt-4 sm:px-2">
                    <h2 className="max-w-[min(100%,34ch)] text-balance text-pretty font-display text-[22px] font-light leading-[1.3] tracking-[-0.03em] text-ink sm:max-w-[min(100%,38ch)] md:text-[1.85rem] md:leading-[1.08] lg:text-[1.98rem] xl:text-[2.08rem]">
                      {item.productName}
                    </h2>
                    <p className="mt-3.5 max-w-[min(100%,38ch)] text-[16px] font-light leading-[1.5] text-ink/54 sm:max-w-[min(100%,42ch)] md:text-[0.8125rem] md:leading-relaxed lg:text-[0.875rem]">
                      {item.note}
                    </p>
                    <p className="mt-6 text-[15px] font-medium leading-[1.6] tabular-nums tracking-[0.02em] text-ink/66 md:text-[16px] md:leading-normal">
                      {catalogPriceDisplay(item.price)}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
