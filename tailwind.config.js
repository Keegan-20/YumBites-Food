/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
  ],
  theme: {
    screens: {
      'lg':{'min': '1024px'},
      // => @media (max-width: 1024px) { ... }  <= 1024px and above

      'md':{'min': '768px'},
      // => @media (min-width: 768px) { ... }

      'sm':{'min': '320px'},
      // => @media (min-width: 320px) { ... }
    },

    extend: {},
  },

  plugins:[],
}

