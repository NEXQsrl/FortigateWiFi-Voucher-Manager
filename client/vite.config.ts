import path from "path"
import fs from "fs";
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config();


// Percorsi dei certificati SSL
const certPath = "./certs/cert.pem";
const keyPath = "./certs/key.pem";

// Verifica se i certificati esistono
const useSSL = fs.existsSync(certPath) && fs.existsSync(keyPath);


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      crypto: "crypto-browserify",
    },
  },
  server: {
    proxy: {
      '/api/mail/send': {
        target: "http://localhost:3000/api/mail/send", // L'indirizzo del server locale
        changeOrigin: true, // Cambia l'origine della richiesta
        rewrite: (path) => path.replace(/^\/api\/mail\/send/, '/api/mail/send'), // Mantiene il percorso originale
        /*configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log(`[Proxy /api/mail/send] ${req.method} ${req.url} -> ${proxyReq.path}`);
          });
        },*/
      },
      // Qui stiamo aggiungendo il prefisso "/api" al percorso dell'API
      '/api': {
        target: process.env.VITE_API_HOST, //'https://nqpffort01.nexq.it:7444/api', // L'URL del server esterno process.env.VITE_API_HOST
        changeOrigin: true, // Cambia l'origine della richiesta
        rewrite: (path) => path.replace(/^\/api/, ''), // Rimuove "/api" dal percorso della richiesta
      },
      // Nuovo proxy per "/api/mail/send"
      
    },
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: "all",
    https: useSSL
      ? {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      }
      : false, // Se i certificati non esistono, usa HTTP normale
  },
})
