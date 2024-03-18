/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require('daisyui')],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-logo": "linear-gradient(45deg, hsla(175, 79%, 63%, 1) 0%, hsla(82, 96%, 57%, 1) 100%)",
        "hero-img": "url('/topography.svg')"
      },
      backgroundSize: {
        "nav-logo": "150px",
        "hero": "50%"
      }
    }
  },
  daisyui: {
    themes: ["dark"],
  },
};
