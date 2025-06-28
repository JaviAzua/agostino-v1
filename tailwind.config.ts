import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  variants: {
    extend: {
      cursor: ["hover", "group-hover"],
    },
  },
  theme: {
    extend: {
      fontFamily: {
        dm: ["DM Sans Variable", "sans-serif"],
        "darker-grotesque": ["Darker Grotesque Variable", "sans-serif"],
      },
      colors: {
        persian_orange: {
          "100": "#391c06",
          "200": "#71370b",
          "300": "#aa5311",
          "400": "#e26f16",
          "500": "#ed8f49",
          "600": "#f1a76e",
          "700": "#f4bd92",
          "800": "#f8d3b7",
          "900": "#fbe9db",
          DEFAULT: "#ed8f49",
        },
        night: {
          "100": "#030405",
          "200": "#070809",
          "300": "#0a0d0e",
          "400": "#0e1113",
          "500": "#121619",
          "600": "#39454e",
          "700": "#607585",
          "800": "#92a3b0",
          "900": "#c9d1d8",
          DEFAULT: "#121619",
        },
        brunswick_green: {
          "100": "#090e0c",
          "200": "#121d17",
          "300": "#1b2b23",
          "400": "#25392e",
          "500": "#2d4739",
          "600": "#4c7760",
          "700": "#6fa387",
          "800": "#9fc2af",
          "900": "#cfe0d7",
          DEFAULT: "#2d4739",
        },
        cambridge_blue: {
          "100": "#172921",
          "200": "#2e5241",
          "300": "#457b62",
          "400": "#5da483",
          "500": "#85baa1",
          "600": "#9ec9b5",
          "700": "#b7d6c7",
          "800": "#cfe4da",
          "900": "#e7f1ec",
          DEFAULT: "#85baa1",
        },
        honeydew: {
          "100": "#2e401e",
          "200": "#5c813b",
          "300": "#8ab762",
          "400": "#bad5a3",
          "500": "#eaf2e3",
          "600": "#eef5e9",
          "700": "#f2f7ee",
          "800": "#f7faf4",
          "900": "#fbfcf9",
          DEFAULT: "#eaf2e3",
        },
        cool_gray: {
          DEFAULT: "#8c86aa",
          100: "#1b1924",
          200: "#363348",
          300: "#514c6b",
          400: "#6d668f",
          500: "#8c86aa",
          600: "#a4a0bb",
          700: "#bbb7cc",
          800: "#d2cfdd",
          900: "#e8e7ee",
        },
        madder: {
          DEFAULT: "#b10f2e",
          100: "#240309",
          200: "#470612",
          300: "#6b091b",
          400: "#8f0c24",
          500: "#b10f2e",
          600: "#eb163d",
          700: "#f0506e",
          800: "#f58b9e",
          900: "#fac5cf",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
