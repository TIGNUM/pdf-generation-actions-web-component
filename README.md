# Pdf generation actions Web Component

[![https://www.npmjs.com published Package](https://github.com/TIGNUM/pdf-generation-actions-web-component/actions/workflows/release-package.yml/badge.svg)](https://github.com/TIGNUM/pdf-generation-actions-web-component/actions/workflows/release-package.yml) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Print or generate a pdf from the html passed as string to the Web Component

![Image of the Web Component](./demo/screenshot-component.png)

!Note: this package is not including polyfill, be aware of using it with modern browsers as IE11 is not covered

## How to load the component

    <print-to-pdf html="<p>Test</p>"></print-to-pdf>

## Web Component listens for event "download-pdf"

Button to trigger the download of the pdf must emit a custom event and cass pass on the attributes the name of the file

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
        const obj = document.getElementById("print-pdf");
        obj.dispatchEvent(event);
    }

## Apply styles to the Web Component

This component has some styles that can be editable, and are defined in index.js in [static styles](https://github.com/TIGNUM/pdf-generation-actions-web-component/blob/main/index.js).
Example: By default the buttons section are configured like:

    #buttons-section {
      position: var(--buttons-section-position, relative);
      top: var(--buttons-section-top, relative);
      right: var(--buttons-section-right, 0);
      left: var(--buttons-section-left, auto);
      z-index: var(--button-section-z-index, 0);
    }

Users of this component can set the position of the buttons section overwriting the variable --buttons-section-position in print-to-pdf tag:

    <style>
      print-to-pdf {
        --buttons-section-position: absolute;
        --buttons-background-color: #0000ff;
        --buttons-border: 1px solid #0000ff;
        --buttons-border-radius: 15px;
        --buttons-text-color: white;
        --buttons-section-top: 8px;
    }
    </style>

It is also possible add css class specification:

    <print-to-pdf class="my-blue-element" html="<p>Test 1</p>" fileName="pdf-generated-1"></print-to-pdf>
    <print-to-pdf class="my-red-element" html="<p>Test 2</p>" fileName="pdf-generated-2"></print-to-pdf>

    <style>
      print-to-pdf.my-blue-element {
        --buttons-background-color: #0000ff;
      }
      print-to-pdf.my-red-element {
        --buttons-background-color: ##ff0000;
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
