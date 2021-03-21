import { render } from '../node_modules/lit-html/lit-html.js'
import { list } from './template.js'

const root = document.getElementById('root')
const input = document.getElementById('towns')

document.getElementById('btnLoadTowns').addEventListener('click', loadTowns)

function loadTowns(e) {
    e.preventDefault()
    if (input.value == '') {
        return alert('Please enter at least 1 town name.')
    }
    renderTowns()
    input.value = ''
}

function renderTowns() {
    render(list(getTowns()), root)
}

function getTowns() {
    return input.value
        .split(/[, ]+/g)
        .filter(x => x != '')
        .map(town => town.charAt(0).toUpperCase() + town.slice(1).toLowerCase())
}

