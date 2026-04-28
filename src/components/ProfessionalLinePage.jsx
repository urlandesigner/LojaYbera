import React from "react";
import { FooterSection, Header } from "./HomeSections";

const BENEFITS = [
  {
    title: "Margem estratégica",
    text: "Mix profissional com percepção premium para elevar ticket médio e rentabilidade.",
  },
  {
    title: "Fidelização real",
    text: "Protocolos que geram resultado visível e recorrência natural de clientes.",
  },
  {
    title: "Diferenciação de marca",
    text: "Posicionamento de alto valor para destacar seu salão em um mercado saturado.",
  },
  {
    title: "Crescimento consistente",
    text: "Modelo comercial orientado a longo prazo com suporte para expansão local.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Cadastro",
    text: "Você envia seus dados profissionais e o perfil do seu negócio.",
  },
  {
    step: "02",
    title: "Avaliação",
    text: "Nossa equipe valida aderência de posicionamento e potencial de praça.",
  },
  {
    step: "03",
    title: "Ativação",
    text: "Você recebe curadoria de mix, materiais e plano comercial de início.",
  },
];

const TARGETS = [
  "Salões e studios premium",
  "Profissionais especialistas em transformação capilar",
  "Distribuidores e operações regionais",
];

export default function ProfessionalLinePage() {
  return (
    <div className="min-h-screen bg-[#f6f2ed] text-ink">
      <Header solid />
      <main className="pt-[calc(5rem+1px)]">
        <section className="relative overflow-hidden bg-[#12100f] text-white">
          <div className="absolute inset-0">
            <img
              src="/images/45.JPG"
              alt="Ambiente de salão profissional com estética editorial"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(102deg,rgba(10,8,7,0.88)_0%,rgba(10,8,7,0.58)_42%,rgba(10,8,7,0.2)_100%)]" />
          </div>
          <div className="relative mx-auto flex w-full max-w-site flex-col px-[clamp(1.125rem,0.65rem+2.8vw,3.25rem)] pb-16 pt-20 sm:pb-20 sm:pt-24 md:pb-24 md:pt-28 lg:pb-28 lg:pt-32">
            <div className="max-w-[40rem]">
              <p className="section-kicker text-white/74 before:bg-white/45">Linha profissional</p>
              <h1 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.02] tracking-[-0.03em] text-white">
                Escale seu negócio com uma marca feita para performance de salão.
              </h1>
              <p className="mt-6 max-w-[36ch] text-[15px] font-light leading-[1.8] text-white/82 sm:text-base">
                Mais que produtos: uma oportunidade de posicionamento premium, fidelização e crescimento.
              </p>
              <a
                href="#cadastro-profissional"
                className="mt-9 inline-flex h-12 items-center justify-center gap-2 border border-white/75 bg-white/12 px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white no-underline transition duration-300 hover:bg-white/20"
              >
                Quero fazer parte
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#f6f2ed] px-6 py-14 sm:px-10 lg:px-14 lg:py-20 xl:px-20">
          <div className="mx-auto grid w-full max-w-[1240px] gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
            <article className="max-w-[30rem]">
              <p className="section-kicker text-ink/48 before:bg-ink/24">O cenário atual</p>
              <h2 className="mt-5 font-display text-[clamp(1.6rem,2.3vw,2.5rem)] leading-[1.08] tracking-[-0.02em]">
                Profissionais entregam técnica, mas perdem margem e percepção de valor.
              </h2>
            </article>
            <article className="max-w-[38rem]">
              <p className="section-kicker text-ink/48 before:bg-ink/24">Nossa solução</p>
              <h2 className="mt-5 font-display text-[clamp(1.6rem,2.3vw,2.5rem)] leading-[1.08] tracking-[-0.02em]">
                A Ybera combina resultado cosmético, branding premium e estratégia comercial para elevar seu negócio.
              </h2>
            </article>
          </div>
        </section>

        <section className="bg-white px-6 py-14 sm:px-10 lg:px-14 lg:py-20 xl:px-20">
          <div className="mx-auto w-full max-w-[1240px]">
            <p className="section-kicker text-ink/48 before:bg-ink/24">Benefícios</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {BENEFITS.map((item) => (
                <article key={item.title} className="border border-black/[0.08] bg-[#f8f5f1] p-6">
                  <h3 className="font-display text-[1.42rem] leading-[1.1] tracking-[-0.02em] text-ink">{item.title}</h3>
                  <p className="mt-3 text-[15px] font-light leading-[1.7] text-ink/64">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f6f2ed] px-6 py-14 sm:px-10 lg:px-14 lg:py-20 xl:px-20">
          <div className="mx-auto grid w-full max-w-[1240px] gap-10 lg:grid-cols-[minmax(0,38%)_minmax(0,62%)] lg:items-start lg:gap-16">
            <header className="max-w-[26rem]">
              <p className="section-kicker text-ink/48 before:bg-ink/24">Prova de resultado</p>
              <h2 className="mt-5 font-display text-[clamp(1.6rem,2.2vw,2.5rem)] leading-[1.08] tracking-[-0.02em]">
                Evidência visual que converte cliente em recorrência.
              </h2>
            </header>
            <figure className="relative overflow-hidden bg-[#e9e4dd]">
              <img
                src="/images/37.jpg"
                alt="Resultado de brilho e alinhamento com before e after"
                className="h-full w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/55" />
              <span className="absolute left-4 top-4 text-[9px] font-medium uppercase tracking-[0.16em] text-white/84">Antes</span>
              <span className="absolute right-4 top-4 text-[9px] font-medium uppercase tracking-[0.16em] text-white/84">Depois</span>
            </figure>
          </div>
        </section>

        <section className="bg-white px-6 py-14 sm:px-10 lg:px-14 lg:py-20 xl:px-20">
          <div className="mx-auto w-full max-w-[1240px]">
            <p className="section-kicker text-ink/48 before:bg-ink/24">Como funciona</p>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {STEPS.map((item) => (
                <article key={item.step} className="border-t border-black/12 pt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">{item.step}</p>
                  <h3 className="mt-3 font-display text-[1.4rem] leading-[1.1] tracking-[-0.02em] text-ink">{item.title}</h3>
                  <p className="mt-3 text-[15px] font-light leading-[1.7] text-ink/64">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f6f2ed] px-6 pb-20 pt-14 sm:px-10 lg:px-14 lg:pb-24 lg:pt-20 xl:px-20">
          <div className="mx-auto w-full max-w-[1240px]">
            <p className="section-kicker text-ink/48 before:bg-ink/24">Para quem é</p>
            <div className="mt-7 grid gap-3 md:grid-cols-3">
              {TARGETS.map((target) => (
                <p key={target} className="border border-black/[0.08] bg-white px-5 py-4 text-[14px] font-medium leading-snug text-ink/78">
                  {target}
                </p>
              ))}
            </div>

            <div id="cadastro-profissional" className="mt-14 border border-black/[0.12] bg-[#14110f] px-6 py-10 text-white sm:px-8 lg:mt-16 lg:px-10 lg:py-12">
              <p className="section-kicker text-white/74 before:bg-white/45">Rede profissional Ybera</p>
              <h2 className="mt-5 max-w-[36rem] font-display text-[clamp(1.7rem,2.8vw,2.9rem)] leading-[1.04] tracking-[-0.02em] text-white">
                Candidate-se e transforme sua operação com uma marca de alto valor percebido.
              </h2>
              <a
                href="mailto:contato@ybera.com.br?subject=Cadastro%20Linha%20Profissional"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 border border-white/75 bg-white px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#14110f] no-underline transition duration-300 hover:bg-white/90"
              >
                Solicitar cadastro
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}

