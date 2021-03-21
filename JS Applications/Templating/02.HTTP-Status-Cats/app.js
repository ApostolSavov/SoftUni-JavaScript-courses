import { render } from '../node_modules/lit-html/lit-html.js'
import { list } from './templates.js'
import { cats } from './catSeeder.js'

const root = document.getElementById('allCats')

render(list(cats), root)

root.addEventListener('click', cardDetails)

function cardDetails(e) {
    if (e.target.className == 'showBtn') {
        changeCard(e.target, 'block', true, 'Hide status code')
    } else if (e.target.className == 'showBtn visible') {
        changeCard(e.target, 'none', false, 'Show status code')
    }
}

function changeCard(target, display, visible, text) {
    target.nextElementSibling.style.display = display
    visible ? target.classList.add('visible') : target.classList.remove('visible')
    target.textContent = text
}