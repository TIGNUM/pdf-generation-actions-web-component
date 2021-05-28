# pdf-generation-actions-web-component
Print or pdf generation buttons for generating Tignum reports

## How to load the component

```html
 <actions-report class="style-area" html-report="<p>Test</p>"></actions-report>
```

## Apply styles to the shadow dom
```css

    actions-report.style-area::part(background) {
        text-align: center;
        color: #3d6fb4;
        text-decoration: underline;
        background-color: #3d6fb4;
    }

```

## Build

```npm
$> npm run build
``