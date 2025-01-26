import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import fs from "vite-plugin-fs";

export default defineConfig({
  plugins: [react(), nodePolyfills(), fs()],
  server: {
    proxy: {
      '/api': {
           target: 'http://127.0.0.1:8000',
           changeOrigin: true,
           secure: false,
       }
  }
},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
