import React from "react";

/**
 * Fluxo guiado “Escolha pelo resultado” (quiz leve).
 * Canónico para reutilização (catálogo, landing, etc.).
 * A home monta este componente via `CurationQuizSection.jsx`.
 */

function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

const STEP1_OPTIONS = [
  { id: "Brilho", label: "Brilho" },
  { id: "Maciez", label: "Maciez" },
  { id: "Alinhamento", label: "Alinhamento" },
  { id: "Força", label: "Força" },
  { id: "Leveza", label: "Leveza" },
];

const STEP2_OPTIONS = [
  { id: "Ressecado", label: "Ressecado" },
  { id: "Sem vida", label: "Sem vida" },
  { id: "Com frizz", label: "Com frizz" },
  { id: "Opaco", label: "Opaco" },
];

/** Pool editorial — `goals` indica para quais escolhas do passo 1 o item entra. */
const PRODUCT_POOL = [
  {
    name: "Óleo de Mirra Reparador",
    note: "Brilho leve e fios mais disciplinados.",
    price: "R$ 69,90",
    image: "/images/21.png",
    href: "/produto/oleo-de-mirra-reparador",
    goals: ["Brilho", "Alinhamento", "Leveza", "Maciez"],
  },
  {
    name: "Shampoo Multifuncional",
    note: "Limpa com precisão e prepara o fio.",
    price: "R$ 107,90",
    image: "/images/7.png",
    href: "/produto/shampoo-multifuncao-cuidados-profundos",
    goals: ["Maciez", "Força", "Alinhamento", "Brilho", "Leveza"],
  },
  {
    name: "Máscara 2 em 1 Protect Control",
    note: "Hidratação e alinhamento da textura.",
    price: "R$ 107,90",
    image: "/images/15.png",
    href: "/catalogo",
    goals: ["Maciez", "Alinhamento", "Força"],
  },
  {
    name: "Finalizador de Brilho",
    note: "Realça o brilho e reduz a opacidade.",
    price: "R$ 119,90",
    image: "/images/19.png",
    href: "/catalogo",
    goals: ["Brilho", "Leveza", "Maciez"],
  },
  {
    name: "Leave-in Disciplinante",
    note: "Controle de frizz na finalização.",
    price: "R$ 89,90",
    image: "/images/18.png",
    href: "/catalogo",
    goals: ["Alinhamento", "Leveza", "Com frizz"],
  },
  {
    name: "Soro Vello Alfa-Lactobaby",
    note: "Movimento com controle de frizz.",
    price: "R$ 249,90",
    image: "/images/16.png",
    href: "/catalogo",
    goals: ["Leveza", "Alinhamento", "Com frizz", "Brilho"],
  },
  {
    name: "Tratamento Nutritivo",
    note: "Nutrição profunda e maciez.",
    price: "R$ 139,90",
    image: "/images/20.png",
    href: "/catalogo",
    goals: ["Maciez", "Força"],
  },
  {
    name: "Escova Progressiva",
    note: "Alinha os fios e prolonga o brilho.",
    price: "R$ 99,90",
    image: "/images/17.png",
    href: "/catalogo",
    goals: ["Alinhamento", "Brilho", "Força"],
  },
  {
    name: "Mirra Signature Care",
    note: "Brilho e disciplina no dia a dia.",
    price: "R$ 159,90",
    image: "/images/31.png",
    href: "/catalogo",
    goals: ["Brilho", "Alinhamento", "Força", "Maciez"],
  },
];

function step2Question(goalId) {
  const copy = {
    Brilho: "Como está seu cabelo em relação ao brilho hoje?",
    Maciez: "O que mais percebe ao tocar nos fios?",
    Alinhamento: "Qual sensação descreve melhor seus fios?",
    Força: "O que mais preocupa na estrutura do fio?",
    Leveza: "Como o movimento do seu cabelo está hoje?",
  };
  return copy[goalId] ?? "Como está seu cabelo hoje?";
}

function pickRecommendations(goalId, stateId) {
  const matched = PRODUCT_POOL.filter((p) => p.goals.includes(goalId));
  const base = matched.length >= 2 ? matched : PRODUCT_POOL.slice(0, 5);
  const idx = STEP2_OPTIONS.findIndex((s) => s.id === stateId);
  const offset = Math.max(0, idx % Math.max(1, base.length - 2));
  const rotated = [...base.slice(offset), ...base.slice(0, offset)];
  const seen = new Set();
  const out = [];
  for (const p of rotated) {
    if (seen.has(p.name)) continue;
    seen.add(p.name);
    out.push(p);
    if (out.length >= 4) break;
  }
  return out.slice(0, Math.max(2, Math.min(4, out.length)));
}

/** Quiz guiado — também exportado como `Quiz` para rotas futuras. */
export default function HomeQuiz() {
  const [view, setView] = React.useState("intro");
  const [goalId, setGoalId] = React.useState(null);
  const [stateId, setStateId] = React.useState(null);

  const recommendations = React.useMemo(() => {
    if (view !== "result" || !goalId || !stateId) return [];
    return pickRecommendations(goalId, stateId);
  }, [view, goalId, stateId]);

  const goBack = React.useCallback(() => {
    if (view === "result") {
      setView("step2");
      return;
    }
    if (view === "step2") {
      setView("step1");
      setStateId(null);
      return;
    }
    if (view === "step1") {
      setView("intro");
      setGoalId(null);
    }
  }, [view]);

  const startQuiz = React.useCallback(() => {
    setView("step1");
  }, []);

  const panelClass =
    "motion-safe:animate-[curationQuizIn_0.4s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:transform-none";

  return (
    <div className="mx-auto w-full max-w-site shell-px">
      <div className="relative mx-auto max-w-2xl lg:max-w-3xl">
        {view !== "intro" ? (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-2 border-0 bg-transparent p-0 text-[13px] font-medium text-ink/55 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/25 focus-visible:ring-offset-2"
            >
              <span aria-hidden className="text-base leading-none">
                ←
              </span>
              Voltar
            </button>
            {view !== "result" ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/40">
                {view === "step1" ? "1 / 2" : "2 / 2"}
              </p>
            ) : (
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/40">
                Resultado
              </p>
            )}
          </div>
        ) : null}

        <div className="overflow-hidden" aria-live="polite">
          {view === "intro" ? (
            <div key="intro" className={panelClass}>
              <p className="section-kicker">ESCOLHA PELO RESULTADO</p>
              <h2 className="mt-4 font-display text-[28px] font-light leading-[1.2] tracking-[-0.02em] text-ink md:mt-5 md:text-5xl md:leading-[1.12] lg:text-6xl">
                Menos produto. Mais <em className="italic">cuidado</em>.
              </h2>
              <p className="mt-4 max-w-lg text-[16px] leading-[1.55] text-ink/62 md:mt-5 md:text-lg md:leading-relaxed">
                Descubra o que seu cabelo realmente precisa.
              </p>
              <button
                type="button"
                onClick={startQuiz}
                className="button-editorial mt-8 w-full max-w-md sm:mt-10 sm:w-auto"
              >
                <span>Encontrar meu cuidado</span>
                <span className="text-base leading-none" aria-hidden>
                  →
                </span>
              </button>
            </div>
          ) : null}

          {view === "step1" ? (
            <div key="step1" className={cn(panelClass, "pb-2")} role="group" aria-labelledby="quiz-guided-q1">
              <p className="section-kicker">Sua escolha</p>
              <h2
                id="quiz-guided-q1"
                className="mt-4 font-display text-[26px] font-light leading-[1.15] tracking-[-0.02em] text-ink md:text-4xl md:leading-[1.1]"
              >
                O que você busca agora?
              </h2>
              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
                {STEP1_OPTIONS.map((opt) => (
                  <li key={opt.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setGoalId(opt.id);
                        setView("step2");
                      }}
                      className="group flex w-full min-h-[3.75rem] items-center justify-between border border-black/[0.1] bg-white/90 px-5 py-4 text-left shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] transition duration-200 ease-out hover:border-black/25 hover:bg-white active:scale-[0.99] motion-reduce:active:scale-100 md:min-h-[4.25rem] md:px-6"
                    >
                      <span className="font-display text-[1.35rem] font-normal leading-none tracking-[-0.02em] text-ink md:text-2xl">
                        {opt.label}
                      </span>
                      <span
                        className="text-[0.75rem] text-ink/35 transition group-hover:translate-x-0.5 group-hover:text-ink/55"
                        aria-hidden
                      >
                        →
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {view === "step2" && goalId ? (
            <div key="step2" className={cn(panelClass, "pb-2")} role="group" aria-labelledby="quiz-guided-q2">
              <p className="section-kicker">Sua escolha</p>
              <h2
                id="quiz-guided-q2"
                className="mt-4 font-display text-[26px] font-light leading-[1.15] tracking-[-0.02em] text-ink md:text-4xl md:leading-[1.1]"
              >
                {step2Question(goalId)}
              </h2>
              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
                {STEP2_OPTIONS.map((opt) => (
                  <li key={opt.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setStateId(opt.id);
                        setView("result");
                      }}
                      className="group flex w-full min-h-[3.75rem] items-center justify-between border border-black/[0.1] bg-white/90 px-5 py-4 text-left shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] transition duration-200 ease-out hover:border-black/25 hover:bg-white active:scale-[0.99] motion-reduce:active:scale-100 md:min-h-[4.25rem] md:px-6"
                    >
                      <span className="text-[15px] font-light leading-snug text-ink md:text-base">{opt.label}</span>
                      <span
                        className="shrink-0 text-[0.75rem] text-ink/35 transition group-hover:translate-x-0.5 group-hover:text-ink/55"
                        aria-hidden
                      >
                        →
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {view === "result" && recommendations.length ? (
            <div key="result" className={panelClass}>
              <p className="section-kicker">Sugestões para você</p>
              <h2 className="mt-4 font-display text-[26px] font-light leading-[1.15] tracking-[-0.02em] text-ink md:text-4xl">
                Uma seleção pensada para o seu momento
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink/58 md:text-base">
                Com base no que você indicou, estes cuidados costumam responder bem — explore com calma.
              </p>
              <ul className="mt-8 space-y-4 md:mt-10 md:space-y-5">
                {recommendations.map((p) => (
                  <li
                    key={p.name}
                    className="flex gap-4 border border-black/[0.08] bg-white/95 p-4 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset] md:gap-5 md:p-5"
                  >
                    <div className="relative h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden bg-[#F6F4F2] md:h-[6.5rem] md:w-[6.5rem]">
                      <img src={p.image} alt={p.name} className="h-full w-full object-contain object-center p-1" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
                      <h3 className="font-display text-[1.05rem] font-normal leading-tight tracking-[-0.02em] text-ink md:text-xl">
                        {p.name}
                      </h3>
                      <p className="text-[13px] font-light leading-relaxed text-ink/60 md:text-sm">{p.note}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                        <span className="text-[14px] font-semibold tabular-nums text-ink md:text-[15px]">
                          {p.price}
                        </span>
                        <a href={p.href} className="button-editorial-compact no-underline !h-10 !px-4 !text-[9px]">
                          <span>Ver produto</span>
                          <span className="text-sm leading-none" aria-hidden>
                            →
                          </span>
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-center text-[13px] font-light text-ink/45 md:mt-10">
                <a href="/catalogo" className="border-b border-black/20 pb-px text-ink/55 transition hover:border-black/40 hover:text-ink">
                  Ver catálogo completo
                </a>
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** Alias nomeado para importações futuras (`import { Quiz } from …`). */
export const Quiz = HomeQuiz;
