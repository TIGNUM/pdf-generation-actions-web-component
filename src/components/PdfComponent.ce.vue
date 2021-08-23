<script>
import { defineComponent, onMounted, onUnmounted} from 'vue';
import html2pdf from 'html2pdf.js';

export default defineComponent({
  template: '<div id="element-to-print"></div>',
  getPdf: function(event) {
    const elementToPrint = this.shadowRoot.querySelector('#element-to-print');
    html2pdf().from(elementToPrint).save(event.detail.fileName);
  },
  connectedCallback: function() {
    debugger;
    window.addEventListener('download-pdf', this.getPdf);
  },
  disconnectedCallback: function() {
    window.removeEventListener('download-pdf', this.getPdf);
  },
  setup: function() {
    onMounted(() => this.connectedCallback);
    onUnmounted(() => this.disconnectedCallback);
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

