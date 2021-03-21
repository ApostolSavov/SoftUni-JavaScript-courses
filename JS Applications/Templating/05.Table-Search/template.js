import { html } from '../node_modules/lit-html/lit-html.js'

export const rowTemplate = (data, rowIds = [null]) => {
    return data.map(entry => {
        return html`
        <tr id=${entry._id} class=${rowIds.includes(entry._id) ? 'select' : ''}>
            <td>${entry.firstName} ${entry.lastName}</td>
            <td>${entry.email}</td>
            <td>${entry.course}</td>
        </tr>
        `}
    )
}