const template = document.createElement('template');
template.innerHTML = `
    <div>
        <slot>
             <div id="buttons-section" data-html2canvas-ignore="true">
                <button id="getPDF" onclick="getPDF()">Download PDF</button>
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
    }

    getPDF(idDomSectionToPrint = 'element-to-print', nameForPdf = 'generatedFile.pdf') {
        const element = document.getElementById(idDomSectionToPrint);
        html2pdf().from(element).save(nameForPdf);
    }

}

window.customElements.define('actions-report', ActionsReport);

