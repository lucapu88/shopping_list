import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { pwa } from './build/pwa';

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
    // Include il drag and drop nella build locale per renderlo disponibile anche offline.
  },
  optimizeDeps: {
    include: ["vue3-smooth-dnd"]
  },
});
