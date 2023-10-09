import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { 
      fontFamily: { 
          "roboto": ['Roboto', 'sans-serif'] 
      },
      colors: {
        "primary": "#032b41"
      } 
  }, 
  },
  plugins: [],
} satisfies Config;
