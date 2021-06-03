import html2pdf from 'html2pdf.js';
import { html, css, LitElement } from 'lit-element';

export class PrintToPdf extends LitElement {
  static styles = css`
    :host {
      color: var(--buttons-text-color, black);
      background: var(--buttons-background-color, white);
      background-color: var(--buttons-background, deepskyblue);
    }
  `;

  static get properties() {
    return {
      html: { type: String },
      fileName: { type: String }
    };
  }

  constructor() {
    super();
    this.html = '<p>Hi</p>';
    this.fileName = 'pdf-generated';
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

window.customElements.define('print-to-pdf', PrintToPdf);
