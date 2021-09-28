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
    const element = this.shadowRoot.querySelector('#element-to-print');
    element.scrollTop = 0;
  }

  __downloadPdf(event) {
    const elementToPrint = this.shadowRoot.querySelector('#element-to-print');

    // Safari doesn't support huge canvas sizes, we lower the resolution for
    // Appled devices to make sure the PDF fits on the canvas.
    const isApple = () => navigator.vendor.match(/apple/i);

    if (!elementToPrint) {
      console.warn('The web component has not rendered yet, retrying in 100ms');
      setTimeout( () => this.__downloadPdf(event), 100);
      return
    }
    try {
      const options = {
        image: {
            type: 'jpeg',
            quality: 0.90
          },
          html2canvas: {
            scrollX: 0,
            scrollY: 0,
            scale: isApple() ? 1:4 // Do not abuse, higher values are glitchy and images may disappear
          }
      }
      html2pdf()
        .set(options)
        .from(elementToPrint)
        .toPdf()
        .save(event.detail?.fileName || 'file.pdf')
        .then(() => {
          const downloadedEvent = new Event('downloaded');
          this.dispatchEvent(downloadedEvent);
        });
    }
    catch(error) {
      throw new Error(error);
    }
  }

  render() {
    return html `<div id="element-to-print">${unsafeHTML(this.html)}</div>`;
  }

}

export default PrintToPdf;
