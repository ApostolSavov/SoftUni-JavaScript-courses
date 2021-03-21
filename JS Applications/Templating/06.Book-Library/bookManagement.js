import { render } from '../node_modules/lit-html/lit-html.js'
import { form, row } from './templates.js'

const url = 'http://localhost:3030/jsonstore/collections/books'

export async function loadBooks() {
    const tbody = document.getElementsByTagName('tbody')[0]

    try {
        const data = await (await fetch(url)).json()

        render(row(Object.entries(data)), tbody)

    } catch (err) {
        console.log(err);
        alert('Please refresh the page')
    }
}

export async function setupEditForm(e) {
    const formContainer = document.getElementById('formContainer')
    const currentForm = document.getElementsByTagName('form')[0]
    const id = e.target.parentElement.id

    if (currentForm.id == 'edit-form' && document.getElementsByName('bookId')[0].value == id) {
        render(form(), formContainer)
        return
    }

    try {
        const data = await (await fetch(url + '/' + id)).json()

        render(form({ ...data, id }, 'edit'), formContainer)

    } catch (err) {
        console.log(err);
        alert('Please reload the page.')
    }
}

export async function editBook(e) {
    const formContainer = document.getElementById('formContainer')
    const formElement = e.target.parentElement
    const [title, author] = [formElement.title, formElement.author]
    const id = document.getElementsByName('bookId')[0].value

    try {
        validateInput([author.value, title.value])

        await fetch(url + '/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                author: author.value,
                title: title.value
            })
        })

        formElement.reset()
        render(form(), formContainer)
        await loadBooks()

    } catch (err) {
        console.log(err);
        alert('There was a problem: ' + err)
    }
}

export async function addBook(e) {
    const form = e.target.parentElement
    const [title, author] = [form.title, form.author]

    try {
        validateInput([title.value, author.value])

        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                author: author.value,
                title: title.value
            })
        })

        form.reset()
        await loadBooks()

    } catch (err) {
        console.log(err);
        alert('There was a problem: ' + err)
    }
}

export async function deleteBook(e) {
    const formContainer = document.getElementById('formContainer')
    const confirmed = confirm('Are you sure you want to delete this book?')
    if (!confirmed) {
        return
    }
    const id = e.target.parentElement.id
    try {
        await fetch(url + '/' + id, {
            method: 'DELETE'
        })

        render(form(), formContainer)
        await loadBooks()

    } catch (err) {
        console.log(err);
        alert('There was a problem: ' + err)
    }
}

function validateInput(data) {
    if (data.includes('')) {
        throw new Error('Empty fields!')
    }
}