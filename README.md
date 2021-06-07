# Pdf generation actions Web Component

[![https://www.npmjs.com published Package](https://github.com/TIGNUM/pdf-generation-actions-web-component/actions/workflows/release-package.yml/badge.svg)](https://github.com/TIGNUM/pdf-generation-actions-web-component/actions/workflows/release-package.yml)

Print or generate a pdf from the html passed as string to the Web Component

![Image of the Web Component](./demo/screenshot-component.png)

!Note: this package is not including polyfill, be aware of using it with modern browsers as IE11 is not covered

## How to load the component

    <print-to-pdf class="style-area" html="<p>Test</p>" fileName="pdf-generated"></print-to-pdf>

## Apply styles to the Web Component

Users of this component can set the value of --my-background, using the my-element tag as a CSS selector:

    <style>
      html {
        --theme-primary: green;
        --theme-secondary: aliceblue;
      }
      print-to-pdf {
        --buttons-background: blue;
        --buttons-text-color: var(--theme-primary);
        --buttons-background-color: var(--theme-secondary);
      }
    </style>

--my-background is configurable per instance of my-element:

    <style>
      print-to-pdf {
          --buttons-background: rgb(67, 156, 144);
      }
      print-to-pdf.example {
          --buttons-background: #111111;
      }
    </style>
      
      <print-to-pdf></print-to-pdf>
      
      <print-to-pdf class="example"></print-to-pdf>

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
