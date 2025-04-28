import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/functions': {
        target: 'http://localhost:54331',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/functions/, '/functions'),
      },
    },
  },
});
