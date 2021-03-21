import { render } from '../node_modules/lit-html/lit-html.js'
import { list } from './templates.js'
import { towns } from './towns.js'

const root = document.getElementById('towns');

(function search() {
   render(list(towns), root)

   document.getElementsByTagName('button')[0]
      .addEventListener('click', findTowns)
})()

function findTowns() {
   const input = document.getElementById('searchText')
   const string = input.value.trim().toLowerCase()

   if (string == '') {
      input.value = ''
      return alert('Please enter a search text.')
   }

   const matches = towns.filter(town => town.toLowerCase().includes(string))

   render(list(towns, matches), root)

   document.getElementById('result').textContent = `${matches.length} matches found`
   input.value = ''
}
