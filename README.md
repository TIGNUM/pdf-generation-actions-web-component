# pdf-generation-actions-web-component

[![https://www.npmjs.com Package](https://github.com/TIGNUM/pdf-generation-actions-web-component/actions/workflows/npm-publish-package.yml/badge.svg?branch=main&event=workflow_run)](https://github.com/TIGNUM/pdf-generation-actions-web-component/actions/workflows/npm-publish-package.yml)

Print or pdf generation buttons for generating Tignum reports

## How to load the component

```html
 <actions-report class="style-area" html="<p>Test</p>"></actions-report>
```

## Apply styles to the web component
```css

    actions-report.style-area::part(ux) {
        text-align: center;
        color: #3d6fb4;
        text-decoration: underline;
        background-color: #3d6fb4;
    }

```

## Build

```
npm run build
``

## Test on browser

```
npm run test:web
```

and open:

```
[http://127.0.0.1:8082/test/test.html](http://127.0.0.1:8082/test/test.html)
```
