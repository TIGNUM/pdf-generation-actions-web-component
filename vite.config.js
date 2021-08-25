import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    lib: {
      entry: 'index.js',
      name: 'PrintToPdf',
      formats: ['es'],
      fileName: format => `index.${format}.js`
    },
    sourcemap: true,
    // Reduce bloat from legacy polyfills.
    target: 'esnext',
    minify: true
  }
});
