import { defineCustomElement } from 'vue';
import PdfComponent from './src/components/PdfComponent.ce.vue';

const PrintToPdf = defineCustomElement(PdfComponent)

export {PrintToPdf}
console.log('PdfComponent', PdfComponent)
console.log('PrintToPdf', PrintToPdf)

export function register() {
  customElements.define('print-to-pdf', PrintToPdf)
}
