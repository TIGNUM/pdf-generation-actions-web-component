import {defineCustomElement} from 'vue';
import {CustomPdfPrintElement} from "./src/PrintPdfComponent";

customElements.define('print-to-pdf', defineCustomElement(CustomPdfPrintElement));
