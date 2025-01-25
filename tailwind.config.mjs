/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Pliki w katalogu "app"
    './components/**/*.{js,ts,jsx,tsx}', // Pliki w katalogu "components"
    './node_modules/preline/dist/*.js', // Preline plugin
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Pliki w katalogu "pages"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('preline/plugin'), // Preline plugin
    require('daisyui'), // DaisyUI plugin
  ],
};
