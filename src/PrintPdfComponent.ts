// @ts-ignore
import html2pdf from "html2pdf.js";
import {onMounted, onUnmounted, reactive} from "vue";

export const CustomPdfPrintElement = {
  props: ['htmlpdf'],
  template: '<div id="element-to-print">{{stringToRender.renderString}}</div>',
  setup: function(props: any) {
    const stringToRender = reactive({ renderString: props.htmlpdf })
    const getPdf = function(event: CustomEvent) {
      const elementToPrint = document.getElementById('element-to-print');
      html2pdf().from(elementToPrint).save(event.detail.fileName);
    };
    // @ts-ignore
    onMounted(() =>  window.addEventListener('download-pdf', getPdf));
    // @ts-ignore
    onUnmounted(() =>  window.removeEventListener('download-pdf', getPdf));
    return {
      stringToRender
    };
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

