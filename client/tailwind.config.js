/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e293b', // Deep Slate Gray
        secondary: '#f5f5dc', // Warm Stone Beige
        accent: '#cd7f32', // Copper Orange
        background: '#ffffff', // Pure White
        text: '#333333', // Charcoal Black
        success: '#10b981', // Emerald Green
        warning: '#f59e0b', // Amber Yellow
        error: '#ef4444', // Coral Red
      },
      fontFamily: {
        heading: ['Inter', 'Poppins', 'sans-serif'],
        body: ['Open Sans', 'Source Sans Pro', 'sans-serif'],
        accent: ['Playfair Display', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

