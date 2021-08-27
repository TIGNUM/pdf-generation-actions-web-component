import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    lib: {
      entry: 'index.ts',
      name: 'PrintToPdf',
      formats: ['es'],
      fileName: format => `index.${format}.js`
    },
    sourcemap: true,
    // Reduce bloat from legacy polyfills.
    target: 'esnext',
    minify: true
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: tag => tag.includes('-')
        }
      }
    })
  ]
});
