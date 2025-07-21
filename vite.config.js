// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // redireciona imports de @mui/material/utils
      // para a versão ESM correta
      '@mui/material/utils': path.resolve(
        __dirname,
        'node_modules',
        '@mui',
        'material',
        'esm',
        'utils',
        'index.js'
      )
    }
  },
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material']
  }
});
