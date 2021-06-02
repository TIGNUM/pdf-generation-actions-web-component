import html2pdf from 'html2pdf.js';

const template = document.createElement('template');
template.innerHTML = `
    <div>
        <slot>
             <div part="ux" id="buttons-section" data-html2canvas-ignore="true">
                <button class="get-pdf">Download PDF</button>
                <button id="printPdf" type="button" onclick="window.print()">Print</button>
            </div>
            <div part="preview">
                <div id="element-to-print">
                </div>
            </div>
        </slot>
    </div>
`;

export class PrintUI extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['html'];
    }

    connectedCallback() {
        if (!this.html) {
            this.html = '';
        }
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            this.html = newVal;
        }
        this.listenForPdfGenerationCall(this, this.html);
    }

    listenForPdfGenerationCall (elem, htmlString) {
      const shadow = elem.shadowRoot;
      const elementToPrint = shadow.getElementById('element-to-print');
      const getPdfElement = shadow.querySelector('.get-pdf');
      elementToPrint.innerHTML = htmlString;
      getPdfElement.onclick = () => {
          html2pdf().from(elementToPrint).save('generatedFile');
      };
    }
}

window.customElements.define('actions-report', PrintUI);
