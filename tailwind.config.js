/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,html,scss}'],
  theme: {
    extend: {
      colors: {
        ink: '#040407',
        subink: '#292D3D',
        mute: '#626983',
        faint: '#949EB7',
        line: '#DFE7F1',
        tint: '#F0F4FA',
        surface: '#F4F6FD',
        canvas: '#FFFFFF',
        night: '#0F1219',
        nightcard: '#292D3D',
        // ── Primary (azul/índigo) — escala DothNews ──────────────────────────
        primary: {
          DEFAULT: '#2B00C9',
          dark: '#0A1E98',
          soft: '#F4F6FD',
          50:  '#F4F6FD',
          100: '#D7DFFB',
          200: '#9EB0F8',
          300: '#6C82F7',
          400: '#394AF7',
          500: '#2B00C9',
          600: '#0A1E98',
          700: '#092166',
          800: '#061941',
          900: '#041028',
          950: '#030B1A',
        },
        // ── Neutral (cinza azulado) — escala DothNews ─────────────────────────
        neutral: {
          0:   '#FFFFFF',
          50:  '#F0F4FA',
          100: '#DFE7F1',
          200: '#C6D0E1',
          300: '#ADB7CD',
          400: '#949EB7',
          500: '#858A9C',
          600: '#626983',
          700: '#434A60',
          800: '#292D3D',
          900: '#0F1219',
          950: '#040407',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      maxWidth: {
        shell: '1200px',
      },
    },
  },
  plugins: [],
}
