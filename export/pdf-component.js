import html2pdf from 'html2pdf.js';
import {PDFDocument} from 'pdf-lib';

import DOMPurify from 'dompurify';

class PrintToPdf extends HTMLElement {
  constructor() {
    super();
    // Create this.shadowRoot
    this.attachShadow({mode: 'open'});

    this.isRendered = false;

    this._downloadPdf = this._downloadPdf.bind(this);
    this._scrollTop = this._scrollTop.bind(this);
    this._render = this._render.bind(this);
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('download-pdf', this._downloadPdf);

    if (this.isRendered) { return; }

    this.isRendered = true;

    this.shadowRoot.addEventListener('scrollTop', this._scrollTop);

    this.html = this.getAttribute('html') || '<p>No content passed</p>';

    this.shadowRootStyle = this.getAttribute('style') || `
    :host {
      color: var(--content-text-color, black);
      background: var(--content-background-color, white);
    }
    `;
    this._render();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('download-pdf', this._downloadPdf);
    this.shadowRoot.removeEventListener('scrollTop', this._scrollTop);
    super.disconnectedCallback && super.disconnectedCallback();
  }

  updated() {
    this.render();
    const event = new CustomEvent('updated', {
      bubbles: true,
      composed: true
    });
    this.shadowRoot.dispatchEvent(event);
  }

  _printPdf() {
    window.print();
  }

  _scrollTop() {
    const element = this.shadowRoot.querySelector('#element-to-print');
    element.scrollTop = 0;
  }

  _dispatchProgress(message) {
    const progressEvent = new CustomEvent('progress', {
      bubbles: true,
      composed: true,
      detail: {message}
    });
    this.dispatchEvent(progressEvent);
  }

  // Copypaste from https://stackoverflow.com/questions/60234692/how-to-merge-two-pdf-files-using-jspdf
  async mergePdfs(pdfsToMerges) {
    const mergedPdf = await PDFDocument.create();
    const actions = pdfsToMerges.map(async pdfBuffer => {
      const pdf = await PDFDocument.load(pdfBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    });
    await Promise.all(actions);
    return await mergedPdf.save();
  }

  _downloadPdf(event) {
    const elementToPrint = this.shadowRoot.querySelector('#element-to-print');

    if (!elementToPrint) {
      console.warn('The web component has not rendered yet, retrying in 100ms');
      setTimeout(() => this._downloadPdf(event), 100);
      return;
    }
    try {
      const options = {
        image: {
          type: 'jpeg',
          quality: 0.75
        },
        html2canvas: {
          scrollX: 0,
          scrollY: 0,
          scale: 4
        }
      };

      const pages = [...elementToPrint.children[0].children];

      const pagesPdf = [];

      pages.forEach((page, index) => {
        const pdf = html2pdf().set(options).from(page).toPdf().get('pdf');
        const buffer = pdf.output('arraybuffer').then((buffer)=>{
          this._dispatchProgress(`Rendered page ${index}`);
          return buffer;
        });
        pagesPdf.push(buffer);
      });

      this._dispatchProgress('Loading pages');

      Promise.all(pagesPdf).then(async (pdfBuffers)=>{
        this._dispatchProgress('Merging pages');
        const mergedPdf = await this.mergePdfs(pdfBuffers);
        this._dispatchProgress('Downloading');
        const finalPdf = URL.createObjectURL(
          new Blob([mergedPdf]), {type: 'application/pdf'}
        );

        const anchor = document.createElement('a');
        anchor.href = finalPdf;
        anchor.download = event.detail?.fileName || 'file.pdf';
        anchor.click();
        const downloadedEvent = new Event('downloaded');
        this.dispatchEvent(downloadedEvent);
      });

    }
    catch (error) {
      throw new Error(error);
    }
  }

  _render() {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', 'element-to-print');
    wrapperElement.innerHTML = DOMPurify.sanitize(this.html);

    const shadowStyleElement = document.createElement('style');
    shadowStyleElement.textContent = this.shadowRootStyle;

    this.shadowRoot.appendChild(shadowStyleElement);
    this.shadowRoot.appendChild(wrapperElement);
  }

}

customElements.define('print-to-pdf', PrintToPdf);

export default PrintToPdf;
