import { defineCustomElement } from 'vue';
import PdfComponent from './src/components/PdfComponent.ce.vue';

const PrintToPdf = defineCustomElement(PdfComponent);

console.log('PdfComponent', PdfComponent);
console.log('PrintToPdf', PrintToPdf);

export function register() {
  customElements.define('print-to-pdf', PrintToPdf);
}

// It was never called
register();
