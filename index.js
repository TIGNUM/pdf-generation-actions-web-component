const template = document.createElement('template');
template.innerHTML = `
    <div>
        <slot>
             <div part="background" id="buttons-section" data-html2canvas-ignore="true">
                <button  class="get-pdf">Download PDF</button>
                <button id="printPdf" type="button" onclick="window.print()">Print</button>
            </div>
            <div id="element-to-print">
        
            </div>
        </slot>
    </div>
`;

export class Index extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['html-report'];
    }

    connectedCallback() {
        if (!this.htmlReport) {
            this.htmlReport = '';
        }
    }

    get htmlReport() {
        // attributes always string
        return this.getAttribute('html-report');
    }

    set htmlReport(value) {
        this.setAttribute('html-report', value);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            this.htmlReport = newVal;
        }
        listenForPdfGenerationCall(this, this.htmlReport);
    }

}

function listenForPdfGenerationCall (elem, htmlReportString) {
    const shadow = elem.shadowRoot;
    shadow.querySelector('#element-to-print').innerHTML = htmlReportString;
    const getPdfElement = shadow.querySelector('.get-pdf');
    getPdfElement.onclick = () => {
        const element = shadow.getElementById('element-to-print');
        html2pdf().from(element).save('generatedFile');
    };
}

window.customElements.define('actions-report', Index);
