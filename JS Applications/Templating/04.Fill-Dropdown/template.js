import { html } from '../node_modules/lit-html/lit-html.js'

export const selectTemplate = (data) => {
    return data.map(item => html`<option value="${item._id}">${item.text}</option>`)
}