// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
  ],
  base: '/',
  build: {
    outDir: 'dist', // Generar el build en frontend/dist
    emptyOutDir: true, // Vaciar la carpeta build antes de crear nuevos archivos
  },
  assetsInclude: ['**/*.tiff'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias para que puedas importar de manera sencilla desde src
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    historyApiFallback: true,
    cors: true, // Habilitar CORS para evitar problemas MIME
  }
})


