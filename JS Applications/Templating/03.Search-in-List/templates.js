import { html } from '../node_modules/lit-html/lit-html.js'

export const list = (data, matches) => {
    return html`
        <ul>
            ${data.map((town) => listItem(town, matches))}
        </ul>
    `
}

const listItem = (town, matches = [null]) => {
    return html`<li class=${matches.includes(town) ? 'active' : '' }>${town}</li>`
}