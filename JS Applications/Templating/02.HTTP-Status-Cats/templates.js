import { html } from '../node_modules/lit-html/lit-html.js'

export const list = (data) => {
    return html`
    <ul>
        ${data.map(catCard)}
    </ul>
    `
}

const catCard = (catData) => {
    return html`
        <li>
            <img src="./images/${catData.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button class="showBtn">Show status code</button>
                <div class="status" style="display: none" id=${catData.id}>
                    <h4>Status Code: ${catData.statusCode}</h4>
                    <p>${catData.statusMessage}</p>
                </div>
            </div>
        </li>
    `
}