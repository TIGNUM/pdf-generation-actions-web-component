# pdf-generation-actions-web-component

[![https://www.npmjs.com Package](https://github.com/TIGNUM/pdf-generation-actions-web-component/actions/workflows/npm-publish-package.yml/badge.svg?branch=main&event=workflow_run)](https://github.com/TIGNUM/pdf-generation-actions-web-component/actions/workflows/npm-publish-package.yml)

Print or generate a pdf from the html passed as string to the Web Component

## How to load the component

    <actions-report class="style-area" html="<p>Test</p>"></actions-report>


## Apply styles to the Web Component

    actions-report.style-area::part(ux) {
        text-align: center;
        color: #3d6fb4;
        text-decoration: underline;
        background-color: #3d6fb4;
    }

## Build

    npm run build


## Run Tests

    npm run test  

## Demo on browser

    npm run demo:web

and open:

    [http://127.0.0.1:8082/demo/test.html](http://127.0.0.1:8082/demo/test.html)
