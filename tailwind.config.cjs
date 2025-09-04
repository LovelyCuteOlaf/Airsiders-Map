module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#066686',
          dark: '#034d66',
        },
        secondary: {
          DEFAULT: '#534402',
          dark: '#423502'
        }
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    }
  },
  plugins: [],
}
