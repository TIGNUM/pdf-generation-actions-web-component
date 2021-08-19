import html2pdf from 'html2pdf.js';

export default function (fileName = 'Pdf') {
  const elementToPrint = document.querySelector('#element-to-print');
  html2pdf().from(elementToPrint).save(fileName);
}
