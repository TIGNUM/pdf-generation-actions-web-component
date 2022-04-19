# Pdf generation actions Web Component

[![https://www.npmjs.com published Package](https://github.com/TIGNUM/pdf-generation-actions-web-component/actions/workflows/release-package.yml/badge.svg)](https://github.com/TIGNUM/pdf-generation-actions-web-component/actions/workflows/release-package.yml) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Print or generate a pdf from the html passed as string to the Web Component

![Image of the Web Component](./demo/screenshot-component.png)

!Note: this package is not including polyfill, be aware of using it with modern browsers as IE11 is not covered

## Install the component

    npm i pdf-creation-actions-web-component

## Import the component

    import 'pdf-creation-actions-web-component';

## How to load the component

    <print-to-pdf html="<div class="pages-wrapper"><div class="page-1"><style>p {color: red}</style}<p>first page to preview and print</p></div></div>" style="{root style as  string}"></print-to-pdf>

## Web Component listens for event "download-pdf"

Button to trigger the download of the pdf must emit a custom event and pass on the attributes the name of the file

    <button id="print-pdf" onclick="downloadPdf('filename-requested')">Download Pdf</button>

Function that will emit the custom event:

    function downloadPdf(filename = 'no-file-name-provided') {
      const event = new CustomEvent("download-pdf", {
        composed: true,
        bubbles: true,
        detail: {
          fileName: filename,
        },
      });
      document.getElementById('pdfComponent').shadowRoot.dispatchEvent(event);
    }

    This part: document.getElementById('pdfComponent') can be replaced with the any access way to the component(id, class...) that contain the shadowRoot.

## Apply styles to the Web Component

This component has some styles that can be editable, and are defined in index.js in [static styles](https://github.com/TIGNUM/pdf-generation-actions-web-component/blob/main/index.js).
Example: By default the color and background are configured like:

    :host {
      color: var(--content-text-color, black);
      background: var(--content-background-color, white);
    }

The color and background can be modify by change this variables --content-text-color and ==content-background-color in print-to-pdf tag:

    <style>
      print-to-pdf {
        --content-text-color: white;
        --content-background-color: #0000ff;
    }
    </style>

It is also possible add css class specification:

    <print-to-pdf class="my-blue-element" html="<p>Test 1</p>" fileName="pdf-generated-1"></print-to-pdf>
    <print-to-pdf class="my-red-element" html="<p>Test 2</p>" fileName="pdf-generated-2"></print-to-pdf>

    <style>
      print-to-pdf.my-blue-element {
        --content-text-color: black;
      }
      print-to-pdf.my-red-element {
        --content-text-color: red;
      }
    }
    </style>


## Build

    npm run build


## Run Tests

    npm run test  

## Demo on browser

    npm run demo:web

and open:

    [http://127.0.0.1:8082/demo/index.html](http://127.0.0.1:8082/demo/index.html)

### TODOS

- [ ] Security checks, XSS injection on the html string passed to the component

- [ ] Improve styles support
