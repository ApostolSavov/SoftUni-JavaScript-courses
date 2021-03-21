import { render } from '../node_modules/lit-html/lit-html.js'
import { staticView} from './templates.js'
import {loadBooks, addBook, deleteBook, editBook, setupEditForm} from './bookManagement.js'

const idTargets = {
    'loadBooks': loadBooks,
    'editBtn': editBook,
    'addBtn': addBook
}
const classTargets = {
    'editBook': setupEditForm,
    'deleteBook': deleteBook
}

renderStaticView()

document.body.addEventListener('click', clickHandler)

async function clickHandler(e) {
    e.preventDefault()

    if (e.target.id && idTargets[e.target.id]) {
        await idTargets[e.target.id](e)
    } else if (classTargets[e.target.className]) {
        await classTargets[e.target.className](e)
    }
}

function renderStaticView() {
    render(staticView(), document.body)
}

