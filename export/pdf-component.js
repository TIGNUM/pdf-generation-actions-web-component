import html2pdf from 'html2pdf.js';
import {html, css, LitElement, customElement, property} from 'lit-element';
import {unsafeHTML} from "lit-html/directives/unsafe-html";

@customElement('print-to-pdf')
class PrintToPdf extends LitElement {
  @property() html = "<p>No content passed</p>";

  static styles = css`
    :host {
      color: var(--content-text-color, black);
      background: var(--content-background-color, white);
    }
  `;

  constructor() {
    super();
    this.__downloadPdf = this.__downloadPdf.bind(this);
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    window.addEventListener('download-pdf', this.__downloadPdf);
  }

  disconnectedCallback() {
    window.removeEventListener('download-pdf', this.__downloadPdf);
    super.disconnectedCallback && super.disconnectedCallback();
  }

  __printPdf() {
    window.print();
  }

  __downloadPdf(event) {
    const elementToPrint = this.shadowRoot.querySelector('#element-to-print');
    if (!elementToPrint) {
      console.warn('The web component has not rendered yet, retrying in 100ms');
      setTimeout( ()=>this.__downloadPdf(event), 100);
      return
    }
    html2pdf().from(elementToPrint).save(event.detail?.fileName || 'file.pdf');
  }

  render() {
    return html `<div id="element-to-print">${unsafeHTML(this.html)}</div>`;
  }

}

export default PrintToPdf;
