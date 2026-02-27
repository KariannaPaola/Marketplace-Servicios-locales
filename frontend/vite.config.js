import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // importante para que build funcione en Vercel
  build: {
    outDir: "dist",   // La carpeta que Vercel sirve
  },
});