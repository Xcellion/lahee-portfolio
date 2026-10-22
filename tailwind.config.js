/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        '7.5xl': [ '5.5rem', '1.2' ],
        '10xl': [ '8.75rem', '1' ],
      },
    },
    fontFamily: {
      sans: [
        // --- fallback
        // Default Google Fonts
        'Montserrat',
        // Safari for macOS and iOS (San Francisco)
        // '-apple-system',
        // Chrome < 56 for macOS (San Francisco)
        'BlinkMacSystemFont',
        // Windows
        'Segoe UI',
        // Android
        'Roboto',
        // Basic web fallback
        'Helvetica Neue',
        // Basic Ja fallback
        'Hiragino Sans', 'Hiragino Kaku Gothic ProN',
        // Basic web fallback
        'Arial',
        // Windows Ja
        'Yu Gothic', 'Meiryo',
        // Linux
        'Noto Sans',
        'Liberation Sans',
        // Sans serif fallback
        'sans-serif',
        // Emoji fonts
        'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' ],
      serif: [
        'Playfair Display', 'Times New Roman', 'YuMincho', 'Hiragino Mincho ProN',
        'Yu Mincho', 'MS PMincho',
        // Serif fallback
        'serif',
        // Emoji fonts
        'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji',
      ],
      garamond: [
        'Cormorant Garamond',
        // Serif fallback
        'serif',
        // Emoji fonts
        'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji',
      ],
    },
  },
  plugins: [],
}
