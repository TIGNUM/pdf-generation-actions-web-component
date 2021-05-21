const template = document.createElement('template');
template.innerHTML = `
    <div>
        <slot>
            <link rel="stylesheet" href="https://d2gjspw5enfim.cloudfront.net/web-portal/pdf-generation/newLayout.css">
             <div part="background" id="buttons-section" data-html2canvas-ignore="true">
                <button  class="get-pdf">Download PDF</button>
                <button id="printPdf" type="button" onclick="window.print()">Print</button>
            </div>
            <div id="element-to-print">
        
            </div>
        </slot>
    </div>
`;

export class ActionsReport extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['html-report'];
    }

    connectedCallback() {
        console.log('ActionsReport added to DOM');
    }

    adoptedCallback() {
        console.log('ActionsReport was moved into a new DOM');
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            console.log(`${name} changed from ${oldVal} to ${newVal}`)
        }
        listenForPdfGenerationCall(this);
    }

}

function listenForPdfGenerationCall (elem) {
    const shadow = elem.shadowRoot;
    shadow.querySelector('#element-to-print').innerHTML = '<br><br>String HTML for the Pdf to be rendered';
    const getPdfElement = shadow.querySelector('.get-pdf');
    getPdfElement.onclick = () => {
        const element = shadow.getElementById('element-to-print');
        html2pdf().from(element).save('generatedFile');
    };
}


window.customElements.define('actions-report', ActionsReport);

