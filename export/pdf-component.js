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

  static get observedAttributes() {
    return ['html'];
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

    this.retries = 0;

    this._render();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('download-pdf', this._downloadPdf);
    this.shadowRoot.removeEventListener('scrollTop', this._scrollTop);
    super.disconnectedCallback && super.disconnectedCallback();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.html = this.getAttribute('html') || '<p>No content passed</p>';
    this._render();
    const eventName = newValue === '' ? 'cleared' : 'updated';
    const event = new CustomEvent(eventName, {
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
    console.info(`progress event: ${message}`);
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

  async _downloadPdf(event) {
    const elementToPrint = this.shadowRoot.querySelector('#element-to-print');

    if (!elementToPrint.children[0]?.children?.length) {
      console.warn('The web component has not rendered yet, retrying in 100ms');
      this.retries++
      if (this.retries===31) {
        console.warn('Too many retries! quietly abandon pdf generation after 3s');
        const downloadedEvent = new Event('downloaded');
        this.dispatchEvent(downloadedEvent);
      }
      else {
        setTimeout(() => this._downloadPdf(event), 100);
      }
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
          scale: event.detail?.quality || 4
        }
      };

      const pages = [...elementToPrint.children[0].children];

      const pagesPdf = [];

      // Sync loop to prevent locking the main UI thread
      for (var i=0; i < pages.length; i++) {
        const page = pages[i];
        this._dispatchProgress(`Processing page ${i+1} / ${pages.length}`);
        const pdf = await html2pdf().set(options).from(page).toPdf().get('pdf');
        const buffer = await pdf.output('arraybuffer');
        pagesPdf.push(buffer);
      }

      this._dispatchProgress('Merging pages');
      const mergedPdf = await this.mergePdfs(pagesPdf);
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
      this.retries = 0;
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

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(shadowStyleElement);
    this.shadowRoot.appendChild(wrapperElement);
  }

}

customElements.define('print-to-pdf', PrintToPdf);

export default PrintToPdf;
