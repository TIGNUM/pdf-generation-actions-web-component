import html2pdf from 'html2pdf.js';
import DOMPurify from 'dompurify';

class PrintToPdf extends HTMLElement {
  constructor() {
    super();
    // Create this.shadowRoot
    this.attachShadow({mode: 'open'});

    this._downloadPdf = this._downloadPdf.bind(this);
    this._scrollTop = this._scrollTop.bind(this);
    this._render = this._render.bind(this);
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('download-pdf', this._downloadPdf);

    this.shadowRoot.addEventListener('scrollTop', this._scrollTop);

    this.html = this.getAttribute('html') || "<p>No content passed</p>";

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
  };

  _printPdf() {
    window.print();
  };

  _scrollTop() {
    const element = this.shadowRoot.querySelector('#element-to-print');
    element.scrollTop = 0;
  };

  _downloadPdf(event) {
    const elementToPrint = this.shadowRoot.querySelector('#element-to-print');

    // Safari doesn't support huge canvas sizes, we lower the resolution for
    // Apple devices to make sure the PDF fits on the canvas.
    const isApple = navigator.vendor.match(/apple/i);

    // Firefox does not support a canvas size as big as chrome
    const isFirefox = navigator.userAgent.match(/firefox/i)

    // Do not abuse, higher values are glitchy and images may disappear or the
    // file may fail to render altogether
    let scale = 4;
    if (isFirefox) {
      scale = 3;
    }
    if (isApple) {
      scale = 1;
    }

    if (!elementToPrint) {
      console.warn('The web component has not rendered yet, retrying in 100ms');
      setTimeout( () => this._downloadPdf(event), 100);
      return
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
            scale: scale
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
  };

  _render() {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', 'element-to-print');
    wrapperElement.innerHTML = DOMPurify.sanitize(this.html);

    const shadowStyleElement = document.createElement('style');
    shadowStyleElement.textContent = this.shadowRootStyle;

    this.shadowRoot.appendChild(shadowStyleElement)
    this.shadowRoot.appendChild(wrapperElement)
  }

}

customElements.define('print-to-pdf', PrintToPdf);

export default PrintToPdf;
