import {defineCustomElement} from 'vue';
import {CustomPdfPrintElement} from "./src/PrintPdfComponent";

const PdfPrint =  defineCustomElement(CustomPdfPrintElement);
customElements.define('print-to-pdf', PdfPrint);
