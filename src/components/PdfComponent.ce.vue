<script>
import { defineComponent, onMounted, onUnmounted} from 'vue';
import html2pdf from 'html2pdf.js';

export default defineComponent({
  name: 'PdfComponent',
  template: '<div id="element-to-print"></div>',
  methods: {
    getPdf(event) {
      const elementToPrint = this.shadowRoot.querySelector('#element-to-print');
      console.log('element',  elementToPrint, event)
      html2pdf().from(elementToPrint).save(event.detail.fileName);
    },
    connectedCallback() {
      console.log('entro al setup', window);
      window.addEventListener('download-pdf', this.getPdf);
    },
    disconnectedCallback() {
      window.removeEventListener('download-pdf', this.getPdf);
    }
  },
  setup() {
    console.log('entro al setup');
    this.connectedCallback();
    onMounted(() => { connectedCallback() })
    onUnmounted(() => { disconnectedCallback() })
  },
  styles: [
    `:host {
    --content-text-color: black;
    --content-background-color: white;
    }
    #element-to-print {
      color: var(--content-text-color);
      background: var(--content-background-color)
    }
    `
  ]
});
</script>

