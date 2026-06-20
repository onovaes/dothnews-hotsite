import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: isSsrBuild ? {} : {
        // Função (não objeto): formato exigido pelo rolldown/Vite 8 e compatível com
        // versões anteriores. Isola React/ReactDOM num chunk "vendor".
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor'
          }
        },
      },
    },
  },
  server: {
    port: 5299,
    host: '127.0.0.1',
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': 'http://127.0.0.1:3000',
    },
  },
}))
