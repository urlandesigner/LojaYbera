/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    borderRadius: {
      none: "0px",
      sm: "0px",
      DEFAULT: "0px",
      md: "0px",
      lg: "0px",
      xl: "0px",
      "2xl": "0px",
      "3xl": "0px",
      full: "0px",
    },
    extend: {
      screens: {
        /** Notebook: 1024px–1440px — hero mais compacto */
        notebook: { raw: "(min-width: 1024px) and (max-width: 1440px)" },
        /** Desktop largo: mantém escala original do hero acima de 1440px */
        wide: "1441px",
      },
      maxWidth: {
        /** Alinha ao token --site-max; nunca ultrapassa a viewport (evita “quebra” com 1440px fixo). */
        site: "min(100%, var(--site-max))",
      },
      colors: {
        pearl: "#f6f1ea",
        sand: "#ddd1c2",
        mocha: "#8d7963",
        ink: "#181512",
        mist: "#f9f6f2",
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        sans: ['"Manrope"', "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(24, 21, 18, 0.08)",
      },
      backgroundImage: {
        halo:
          "radial-gradient(circle at top left, rgba(222, 208, 191, 0.42), transparent 38%), radial-gradient(circle at 80% 10%, rgba(141, 121, 99, 0.12), transparent 32%)",
      },
      letterSpacing: {
        editorial: "0.24em",
      },
    },
  },
  plugins: [],
};
