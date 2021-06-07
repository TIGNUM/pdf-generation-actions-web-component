import html2pdf from 'html2pdf.js';
import {html, css, LitElement, customElement, property} from 'lit-element';

@customElement('print-to-pdf')
class PrintToPdf extends LitElement {
  @property() html = "<p>Hi</p>";
  @property() fileName = "pdf-generated";

  static styles = css`
    :host {
      color: var(--buttons-text-color, black);
      background: var(--buttons-background-color, white);
      background-color: var(--buttons-background, deepskyblue);
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
      <div>
        <div id="buttons-section" data-html2canvas-ignore="true">
          <button @click="${this.__getPdf}">Download PDF</button>
          <button id="printPdf" type="button" @click="${this.__printPdf}">Print</button>
        </div>
        <div>
          <div id="element-to-print">
          </div>
        </div>
      </div>
    `;
  }
}

export default PrintToPdf;
