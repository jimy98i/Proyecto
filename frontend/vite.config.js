// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    outDir: '../public/build', // Este es el directorio de salida que se copiará en la carpeta public de Laravel
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


