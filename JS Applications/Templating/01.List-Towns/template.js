import { html } from '../node_modules/lit-html/lit-html.js'

export const list = (data) => {
    return html`
        <ul>
            ${data.map(listItem)}
        </ul>
    `
}

const listItem = (itemData) => {
    return html`<li>${itemData}</li>`
}