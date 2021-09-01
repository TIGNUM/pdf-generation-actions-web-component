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
    this.__scrollTop = this.__scrollTop.bind(this);
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.shadowRoot.addEventListener('download-pdf', this.__downloadPdf);
    this.shadowRoot.addEventListener('scrollTop', this.__scrollTop);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('download-pdf', this.__downloadPdf);
    this.shadowRoot.removeEventListener('scrollTop', this.__scrollTop);
    super.disconnectedCallback && super.disconnectedCallback();
  }

  updated() {
    const event = new CustomEvent('updated', {
      bubbles: true,
      composed: true
    });
    this.shadowRoot.dispatchEvent(event);
  }

  __printPdf() {
    window.print();
  }

  __scrollTop() {
    const e = this.shadowRoot.querySelector('#element-to-print');
    e.scrollTop = 0;
  }

  __downloadPdf(event) {
    const elementToPrint = this.shadowRoot.querySelector('#element-to-print');
    if (!elementToPrint) {
      console.warn('The web component has not rendered yet, retrying in 100ms');
      setTimeout( ()=>this.__downloadPdf(event), 100);
      return
    }
    try {
    html2pdf().set({html2canvas: {scrollX: 0, scrollY:0}}).from(elementToPrint).save(event.detail?.fileName || 'file.pdf').then(()=>{
        const downloadedEvent = new Event('downloaded');
        this.dispatchEvent(downloadedEvent);
      });
    }
    catch(error) {
      console.log(error);
    }
  }

  render() {
    return html `<div id="element-to-print">${unsafeHTML(this.html)}</div>`;
  }

}

export default PrintToPdf;
