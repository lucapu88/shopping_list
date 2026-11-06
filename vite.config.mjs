import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { pwa } from './build/pwa.mjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    pwa(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
      ],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // Mantiene i target della build Vite 4, anche per la WebView Android.
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
  },
  optimizeDeps: {
    include: ["vue3-smooth-dnd"]
  },
});
