// @ts-ignore
import html2pdf from "html2pdf.js";
import {onMounted, onUnmounted} from "vue";

export const CustomPdfPrintElement = {
  props: ['html'],
  template: '<span id="element-to-print">{{html}}</span>',
  setup: function(props: any, context: any) {
    const getPdf = function(event: any) {
      const elementToPrint = document.getElementById('element-to-print');
      html2pdf().from(elementToPrint).save(event.detail.fileName);
    };
    console.log(props, context, getPdf, props.html);
    onMounted(() =>  window.addEventListener('download-pdf', getPdf));
    onUnmounted(() =>  window.removeEventListener('download-pdf', getPdf));
  },
  styles: [
    `
      :host {
        --content-text-color: black;
        --content-background-color: white;
      }
      #element-to-print {
        color: var(--content-text-color);
        background: var(--content-background-color)
      }
    `
  ]
}

