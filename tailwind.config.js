module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        adelina: "480px",
        "custom-bp": "1px",
      },
      colors: {
        tejas: "#73745a",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
