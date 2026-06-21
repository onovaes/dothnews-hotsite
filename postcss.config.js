export default {
  plugins: {
    // Tailwind 4: o plugin PostCSS mudou de pacote e já faz o vendor-prefixing
    // (autoprefixer não é mais necessário).
    '@tailwindcss/postcss': {},
  },
}
