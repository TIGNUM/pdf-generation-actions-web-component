import html2pdf from 'html2pdf.js';
import { html, css, LitElement } from 'lit-element';

export class ActionsReport extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--my-element-text-color, #000);
      }
    `;
  }

  static get properties() {
    return {
      htmlString: { type: String }
    };
  }

  constructor() {
    super();
    this.htmlString = '<p>Hi</p>';
  }

  firstUpdated() {
    const bodyPdf = this.renderRoot.querySelector('#element-to-print');
    bodyPdf.innerHTML = this.htmlString;
  }

  __printPdf() {
    window.print();
  }

  __getPdf() {
    const elementToPrint = this.shadowRoot.querySelector('#element-to-print');
    html2pdf().from(elementToPrint).save('generated-pdf');
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

window.customElements.define('actions-report', ActionsReport);
