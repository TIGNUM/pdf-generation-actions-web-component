import html2pdf from 'html2pdf.js';
import {html, css, LitElement, customElement, property} from 'lit-element';

@customElement('print-to-pdf')
class PrintToPdf extends LitElement {
  @property() html = "<p>Hi</p>";

  static styles = css`
    :host {
      color: var(--content-text-color, black);
      background: var(--content-background-color, white);
    }
  `;

  constructor() {
    super();
    this.__getPdf = this.__getPdf.bind(this);
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    window.addEventListener('download-pdf', this.__getPdf);
  }

  disconnectedCallback() {
    window.removeEventListener('download-pdf', this.__getPdf);
    super.disconnectedCallback && super.disconnectedCallback();
  }

  firstUpdated() {
    const bodyPdf = this.renderRoot.querySelector('#element-to-print');
    bodyPdf.innerHTML = this.html;
  }

  __printPdf() {
    window.print();
  }

  __getPdf(event) {
    const elementToPrint = this.shadowRoot.querySelector('#element-to-print');
    html2pdf().from(elementToPrint).save(event.detail.fileName);
  }

  render() {
    return html`<div id="element-to-print"></div>`;
  }
}

export default PrintToPdf;
