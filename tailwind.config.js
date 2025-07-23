/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
theme: {
  extend: {
    colors: {
      'admin-primary': '#7c3aed',
      'admin-bg': '#18181b',
      'admin-accent': '#fbbf24',
    }
  }
} ,
  plugins: [],
}
