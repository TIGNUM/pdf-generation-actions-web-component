import html2pdf from 'html2pdf.js';
import {html, css, LitElement, customElement, property} from 'lit-element';

@customElement('print-to-pdf')
class PrintToPdf extends LitElement {
  @property() html = "<p>Hi</p>";
  @property() fileName = "pdf-generated";

  static styles = css`
    :host {
      color: var(--content-text-color, black);
      background: var(--content-background-color, white);
    }
    #buttons-section button {
      color: var(--buttons-text-color, white);
      background: var(--buttons-background, black);
      background-color: var(--buttons-background-color, black);
      border: var(--buttons-border, 1px dashed black);
      border-radius: var(--buttons-border-radius, white);
      font-size: var(--buttons-font-size, 1rem);
      height: var(--buttons-height, auto);
      min-width: var(--buttons-min-width, auto);
      padding: var(--buttons-padding, 1rem);
      text-transform: var(--buttons-text-transform, lowercase);
      cursor: var(--buttons-cursor, pointer);
      position: var(--buttons-position, relative)
    }
    #buttons-section button:hover {
      opacity: var(--buttons-opacity, .5)
    }
  `;

  constructor() {
    super();
  }

  firstUpdated() {
    const bodyPdf = this.renderRoot.querySelector('#element-to-print');
    bodyPdf.innerHTML = this.html;
  }

  __printPdf() {
    window.print();
  }

  __getPdf() {
    const elementToPrint = this.shadowRoot.querySelector('#element-to-print');
    html2pdf().from(elementToPrint).save(this.fileName);
  }

  render() {
    return html`
        <div id="buttons-section" data-html2canvas-ignore="true">
          <button @click="${this.__getPdf}">Download PDF</button>
          <button type="button" @click="${this.__printPdf}">Print</button>
        </div>
        <div id="element-to-print"></div>
    `;
  }
}

export default PrintToPdf;
