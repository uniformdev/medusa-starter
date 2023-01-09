// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./components/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "animate-one": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "animate-two": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "animate-three": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "animate-four": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(-100%)" },
        },
        rotating: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        fadeOut: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        one: "animate-one 1s linear infinite",
        two: "animate-two 1s linear infinite",
        three: "animate-three 1s linear infinite",
        four: "animate-four 1s linear infinite",
        "rotate-loading": "rotating .9s linear infinite",
        fade: "fadeOut 300ms ease-in-out",
      },
      colors: {
        main_gray: "var(--main_gray)",
        light_gray: "var(--light_gray)",
        bright_red: "var(--bright_red)",
        dodger_blue: "var(--dodger_blue)",
        metallic_bronze: "var(--metallic_bronze)",
        black_transparent: "var(--black_transparent)",
        ivory: "var(--ivory)",
        vis_vis: "var(--vis_vis)",
        alabaster: "var(--alabaster)",
        kournikova: "var(--kournikova)",

        // tourbar colors
        river_styx: "var(--river_styx)",
        swimmers_pool: "var(--swimmers_pool)",
        winter_chime: "var(--winter_chime)",
        cotton_ball: "var(--cotton_ball)",
        plaster: "var(--plaster)",
        pale_blue: "var(--pale_blue)",
        ebony_clay: "var(--ebony_clay)",
        bunker: "var(--bunker)",
        havelock_blue: "var(--havelock_blue)",
      },
      fontSize: {
        xxs: "10px",
      },
      fontFamily: {
        acumin: ['"acumin-pro"'],
        sans: ["var(--font-sans-regular)", ...fontFamily.sans],
        "sans-medium": ["var(--font-sans-medium)", ...fontFamily.sans],
        "sans-bold": ["var(--font-sans-bold)", ...fontFamily.sans],
        space_mono: ['"var(--font-mono-regular)"', fontFamily.mono],
      },
      lineHeight: {
        13: "52px",
      },
    },
  },
};
