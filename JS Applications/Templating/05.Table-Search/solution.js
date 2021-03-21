import { render } from '../node_modules/lit-html/lit-html.js';
import { rowTemplate } from './template.js'

(function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   const tbody = document.getElementsByTagName('tbody')[0]

   loadEntries()

   async function onClick() {
      const cells = Array.from(tbody.getElementsByTagName('td'));
      const input = document.getElementById('searchField');

      if(input.value.trim() == ''){
         return alert('Please enter some search text.')
      }

      const rowIds = [...new Set(cells
         .filter(x => x.textContent.toLowerCase().includes(input.value))
         .map(x => x.parentElement.id))]

      await loadEntries(rowIds)
      input.value = ''
   }

   async function loadEntries(rowIds) {
      try {
         const data = await (await fetch('http://localhost:3030/jsonstore/advanced/table')).json()

         render(rowTemplate(Object.values(data), rowIds), tbody)
      } catch (err) {
         console.log(err);
         alert('Please refresh the page.')
      }
   }
})()

