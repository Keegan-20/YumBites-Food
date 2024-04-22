/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
  ],
  theme: {
    screens: {
      'lg':{'max': '1024px'},
      // => @media (max-width: 1024px) { ... }  <= 1024px and below

      'semilg':{'max':'830px'},
      // => @media (max-width: 830px) { ... }  <= 830px and below

      'md':{'max': '768px'},
      // => @media (max-width: 768px) { ... }

      'semimd':{'max':'602px'},
      // => @media (max-width: 600px) { ... }

      'semism':{'max': '440px'},
      // => @media (max-width: 400px) { ... }

      'sm':{'max': '320px'},
      // => @media (max-width: 320px) { ... }
    },

    extend: {},
  },

  plugins:[],
}

