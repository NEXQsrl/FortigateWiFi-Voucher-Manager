import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Qui stiamo aggiungendo il prefisso "/api" al percorso dell'API
      '/api': {
        target: 'https://nqpffort01.nexq.it:7444/api', // L'URL del server esterno process.env.VITE_API_HOST
        changeOrigin: true, // Cambia l'origine della richiesta
        rewrite: (path) => path.replace(/^\/api/, ''), // Rimuove "/api" dal percorso della richiesta
      },
    },
  },
})
