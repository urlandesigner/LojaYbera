export const heroStats = [
  {
    id: "resultado",
    label: "RESULTADO",
    value: "Alinhado do início ao fim",
    image: "/images/28.jpg.webp",
    alt: "Shampoo Multifunção em composição de lançamento",
    productHref: "/produto/shampoo-multifuncao-cuidados-profundos",
  },
  {
    id: "toque",
    label: "TOQUE",
    value: "Maciez que não pesa",
    image: "/images/5.png",
    alt: "Produto Ybera em composição premium",
    productHref: "/produto/oleo-de-mirra-reparador",
  },
  {
    id: "textura",
    label: "TEXTURA",
    value: "Brilho que acompanha o movimento",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80",
    alt: "Retrato de estúdio com foco em cabelos lisos, alinhados e brilhantes",
    productHref: "/produto/oleo-de-mirra-reparador",
  },
];

export const heroVisuals = {
  default:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80",
  detail:
    "https://images.unsplash.com/photo-1717160675643-53a7a2ebaa9f?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
  defaultAlt: "Modelo com cabelo impecável e brilho alinhado",
  detailAlt: "Aplicação de produto no cuidado capilar",
};

export const productCuration = [
  {
    eyebrow: "Passo 01",
    name: "Limpeza que devolve brilho e leveza",
    description:
      "Remove o excesso sem pesar. Deixa o fio limpo e pronto para tratar.",
    benefit: "Brilho natural. Movimento leve.",
    image: "/images/16.png",
  },
  {
    eyebrow: "Passo 02",
    name: "Tratamento que devolve corpo e maciez",
    description: "Nutre o fio e melhora a textura desde a primeira aplicação.",
    benefit: "Mais maciez, mais corpo, sem perder leveza.",
    image: "/images/21.png",
  },
  {
    eyebrow: "Passo 03",
    name: "Finalização que mantém brilho e alinhamento",
    description: "Sela o fio e prolonga o efeito do cuidado.",
    benefit: "Cabelo alinhado, leve e com brilho contínuo.",
    image: "/images/19.png",
  },
];

export const resultsGallery = [
  {
    title: "Brilho que acompanha o movimento",
    description: "",
    image: "/images/frente1.png",
    beforeImage: "/images/frente2.png",
    beforeAlt: "Resultado frontal antes do tratamento",
    afterAlt: "Resultado frontal depois do tratamento",
  },
  {
    title: "Antes e depois nas costas",
    description: "Comparação traseira com alinhamento e brilho mais evidentes",
    image: "/images/costas.png",
  },
];

export const routineSteps = [
  {
    step: "01",
    title: "Preparar",
    description: "Você prepara o fio para receber o tratamento.",
    productHint: "Shampoo",
  },
  {
    step: "02",
    title: "Tratar",
    description: "Você transforma a textura — e a forma como o cabelo responde ao toque.",
    productHint: "Máscara",
  },
  {
    step: "03",
    title: "Sustentar",
    description: "Você mantém o resultado visível ao longo do dia.",
    productHint: "Finalizador · Óleo",
  },
];

export const productHighlights = [
  {
    name: "Escova progressiva",
    note: "Alinha e trata em um ritual contínuo, com acabamento limpo e fio leve ao longo do dia.",
    image: "/images/29.jpg.webp",
    href: "#produtos",
  },
  {
    name: "Shampoo",
    note: "Limpeza que equilibra sem ressecar e prepara o cabelo para cada próximo passo.",
    image: "/images/27.jpg.webp",
    href: "/produto/shampoo-multifuncao-cuidados-profundos",
  },
  {
    name: "Mirra",
    note: "Óleo reparador com resina de mirra: brilho visível e toque memorável no fio.",
    image: "/images/12.png",
    href: "/produto/oleo-de-mirra-reparador",
  },
  {
    name: "Máscara",
    note: "Nutre a fibra, melhora a textura e prolonga o cuidado sem pesar.",
    image: "/images/32.png.webp",
    href: "#produtos",
  },
  {
    name: "Soro Vello",
    note: "Disciplina o fio, controla o frizz e mantém o movimento natural.",
    image: "/images/30.jpg.webp",
    href: "#produtos",
  },
];

/** Vitrine 3 — editorial premium (uma peça por vez). */
export const vitrine3Items = [
  {
    editorialImage: "/images/mirra5.jpg.webp",
    navLabel: "Mirra",
    overlayEyebrow: "Assinatura",
    overlayTitle: "Luz contida",
    overlayBody:
      "Resina de mirra em concentração íntima: o fio guarda silêncio e memória antes de deixar o brilho aparecer.",
    rightEyebrow: "Assinatura",
    name: "Óleo De Mirra Reparador",
    description:
      "Um brilho que não se impõe — se revela.\nNutre profundamente, deixando no fio um toque que permanece.",
    packshot: "/images/21.png",
    price: "A partir de R$ 69,90",
    href: "/produto/oleo-de-mirra-reparador",
  },
  {
    editorialImage: "/images/10.jpg",
    navLabel: "Escova",
    overlayEyebrow: "Gestos essenciais",
    overlayTitle: "O alinhamento começa no gesto.",
    overlayBody:
      "Disciplina o fio com leveza, revelando um acabamento contínuo — sem excesso, sem peso.",
    rightEyebrow: "Essencial",
    name: "Escova Progressiva",
    description:
      "Disciplina o fio com leveza, revelando um acabamento contínuo — sem excesso, sem peso.",
    packshot: "/images/16.png",
    price: "A partir de R$ 99,90",
    href: "#produtos",
  },
  {
    editorialImage: "/images/27.jpg.webp",
    navLabel: "Shampoo",
    overlayEyebrow: "Ritmo",
    overlayTitle: "O primeiro gesto que importa",
    overlayBody:
      "Equilíbrio entre retirar o excesso e deixar o fio respirar — preparado para o que vem depois, sem tensão.",
    rightEyebrow: "Novo",
    name: "Shampoo Protect Control",
    description:
      "Limpeza que respeita o ritmo do fio.\nRemove o excesso, preserva a estrutura.",
    packshot: "/images/24.png",
    price: "A partir de R$ 107,90",
    href: "/produto/shampoo-multifuncao-cuidados-profundos",
  },
  {
    editorialImage: "/images/45.JPG",
    navLabel: "Máscara",
    overlayEyebrow: "Permanência",
    overlayTitle: "Textura que demora",
    overlayBody:
      "Cada aplicação soma camadas de cuidado — o tempo reconhece no toque o que o fio passou a sustentar.",
    rightEyebrow: "Favorito",
    name: "Máscara 2 em 1 Protect Control",
    description:
      "Onde o cuidado se torna permanência.\nRecompõe, nutre e sustenta o que o fio precisa ao longo do tempo.",
    packshot: "/images/18.png",
    price: "A partir de R$ 107,90",
    href: "#produtos",
  },
  {
    editorialImage: "/images/38.jpg.webp",
    navLabel: "Soro Vello",
    overlayEyebrow: "Ar e movimento",
    overlayTitle: "Controle sem aprisionar",
    overlayBody:
      "O frizz se acalma em silêncio; o movimento segue visível, quase imperceptível no ar.",
    rightEyebrow: "Diário",
    name: "Soro Vello Alfa-Lactobaby",
    description:
      "Movimento com intenção.\nControla o frizz sem interromper a leveza natural do cabelo.",
    packshot: "/images/45.png",
    price: "A partir de R$ 249,90",
    href: "#produtos",
  },
];

export const productRailItems = [
  {
    tag: "Mais usado",
    result: "Limpeza equilibrada desde o primeiro uso",
    productName: "Shampoo de limpeza equilibrante",
    note: "Uso constante no início do cuidado",
    image: "/images/16.png",
  },
  {
    tag: "Alta recorrência",
    result: "Tratamento nutritivo com resposta rápida",
    productName: "Máscara de tratamento nutritivo",
    note: "Aplicação recorrente para brilho e proteção",
    image: "/images/21.png",
  },
  {
    tag: "Preferido dos profissionais",
    result: "Controle que mantém o movimento",
    productName: "Leave-in disciplinante",
    note: "Cuidado contínuo para disciplina e leveza",
    image: "/images/19.png",
  },
  {
    tag: "Uso contínuo",
    result: "Alinhamento que sustenta o resultado",
    productName: "Finalizador de brilho e alinhamento",
    note: "Uso frequente para manter o efeito ao longo do dia",
    image: "/images/18.png",
  },
  {
    tag: "Primeiro gesto",
    result: "Limpeza que prepara sem retirar presença",
    productName: "Shampoo multifuncional",
    note: "Uso constante no início do cuidado, com ritmo leve.",
    image: "/images/7.png",
    href: "/produto/shampoo-multifuncao-cuidados-profundos",
  },
  {
    tag: "Permanência",
    result: "Textura que responde a cada aplicação",
    productName: "Máscara 2 em 1 Protect Control",
    note: "Cada uso soma camadas de cuidado e uniformidade no toque.",
    image: "/images/15.png",
    href: "#produtos",
  },
  {
    tag: "Ao longo da semana",
    result: "Nutrição contínua para brilho e maciez",
    productName: "Tratamento nutritivo",
    note: "Rotina estável para corpo, maciez e brilho contidos.",
    image: "/images/20.png",
    href: "#produtos",
  },
  {
    tag: "Ritmo profundo",
    result: "Equilíbrio antes do que vem depois",
    productName: "Shampoo Protect Control",
    note: "Limpeza que respeita o fio e preserva a estrutura.",
    image: "/images/24.png",
    href: "/catalogo",
  },
];

/**
 * Prova social unificada (ex-testimonials + histórias com imagem).
 * Ordem: relato principal primeiro, depois secundários por impacto.
 */
export const socialProofStories = [
  {
    name: "Renata",
    age: 41,
    city: "Curitiba - PR",
    profession: "Profissional",
    type: "Profissional",
    location: "Curitiba · Cabeleireira autônoma",
    quote: "Cresci com a marca no mesmo ritmo em que recuperei minha confiança.",
    image:
      "https://images.unsplash.com/photo-1655837804588-472faea586ad?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Juliana",
    age: 27,
    city: "São Paulo - SP",
    profession: "Influencer",
    type: "Grupo de clientes",
    location: "São Paulo · Grupo de clientes",
    quote: "Comecei com amigas. Hoje é o que me sustenta.",
    image:
      "https://images.unsplash.com/photo-1775159878152-4dfd9f184ef3?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Marina",
    age: 34,
    city: "Belo Horizonte - MG",
    profession: "Artista",
    type: "Salão parceiro",
    location: "Belo Horizonte · Salão parceiro",
    quote: "Hoje eu trabalho com algo que faz sentido pra mim.",
    image:
      "https://images.unsplash.com/photo-1657546763472-5356953332a5?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Aline",
    age: 31,
    city: "Recife - PE",
    profession: "Profissional",
    type: "Cliente",
    location: "Recife · Rotina em casa e no salão",
    quote: "Simplificou minha rotina — e fortaleceu o que eu construo.",
    image:
      "https://images.unsplash.com/photo-1697151692231-49cd4094641e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Marina",
    age: 34,
    city: "Belo Horizonte - MG",
    profession: "Artista",
    type: "Cliente",
    location: "Belo Horizonte - MG",
    quote: "Primeiro vem o brilho. Depois, o cabelo fica leve de verdade.",
    image: "/images/frente1.png",
  },
  {
    name: "Juliana",
    age: 29,
    city: "São Paulo - SP",
    profession: "Influencer",
    type: "Cliente",
    location: "São Paulo - SP",
    quote: "Parece salão. Mas funciona no dia a dia.",
    image: "/images/frente2.png",
  },
  {
    name: "Renata",
    age: 41,
    city: "Curitiba - PR",
    profession: "Profissional",
    type: "Profissional",
    location: "Curitiba - PR",
    quote: "Faço menos. E o cabelo dura mais.",
    image: "/images/27.jpg.webp",
  },
];

export const finalCta = {
  eyebrow: "O CONVITE",
  title: "O resultado começa\nna escolha certa.",
  description: "Descubra o cuidado ideal para o seu cabelo e sinta a diferença desde o primeiro uso.",
  primary: "CONHECER PRODUTOS",
  primaryHref: "/catalogo",
};
