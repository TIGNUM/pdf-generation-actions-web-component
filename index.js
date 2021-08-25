import {defineCustomElement} from 'vue';
import {CustomPdfPrintElement} from "./src/PrintPdfComponent.js";

customElements.define('print-to-pdf', defineCustomElement(CustomPdfPrintElement));
