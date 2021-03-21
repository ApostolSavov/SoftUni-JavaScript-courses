import { render } from '../node_modules/lit-html/lit-html.js'
import { selectTemplate } from './template.js'

const url = 'http://localhost:3030/jsonstore/advanced/dropdown'
const menu = document.getElementById('menu')
const addBtn = document.querySelector('input[value="Add"]')
const inputText = document.getElementById('itemText')

loadItems()

addBtn.addEventListener('click', addItem)

async function addItem(e) {
    e.preventDefault()
    if(inputText.value.trim() == ''){
        return alert('Empty fields!')
    }
    try {
        await fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: inputText.value
            })
        })
        inputText.value = ''
        alert('You have added a new entry.')
        loadItems()
    } catch (err) {
        console.log(err);
        alert('There was a problem.')
    }
}

async function loadItems() {
    try {
        const data = await (await fetch(url)).json()
        render(selectTemplate(Object.values(data)), menu)
    } catch (err) {
        console.log(err);
        alert('Please refresh the page.')
    }
}