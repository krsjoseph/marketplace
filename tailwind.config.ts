import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#A3E635',
        'custom-pink': '#E879F9',
        'netural-400' : '#A3A3A3'
      }
    },
  },
  plugins: [],
} satisfies Config;