/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        screens: {
          xs: "375px",
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
        container: {
          center: true,
          padding: {
            DEFAULT: "1rem",
            sm: "1.5rem",
            md: "2rem",
            lg: "2.5rem",
            xl: "3rem",
            "2xl": "4rem",
          },
          screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1440px",
          },
        },
        spacing: {
          "18": "4.5rem",
          "22": "5.5rem",
          "safe-top": "env(safe-area-inset-top)",
          "safe-bottom": "env(safe-area-inset-bottom)",
        },
        minHeight: {
          "screen-safe": "calc(100vh - env(safe-area-inset-bottom))",
        },
      },
    },
    plugins: [],
  };