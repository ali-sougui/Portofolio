import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ajoute ça si tu as des erreurs de chargement de fichiers
});
