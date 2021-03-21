import { html } from '../node_modules/lit-html/lit-html.js'

export const form = (data = {}, type = 'add') => {
    return html`
    <form id="${type + '-form'}">
        ${type == 'edit' ? html`<input type="hidden" name="bookId" value="${data.id}">` : ''}
        <h3>${type.charAt(0).toUpperCase() + type.slice(1)} book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title..." value=${type=='edit'  ? data.title : ""}>
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author..." value=${type=='edit'  ? data.author : ""}>
        <input type="submit" value=${type == 'edit' ? 'Save' : 'Submit'} id=${type == 'edit' ? 'editBtn' : 'addBtn'}>
    </form>
    `
}

export const staticView = () => {
    return html`
    <button id="loadBooks">LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
    
        </tbody>
    </table>
    <div id="formContainer">
        ${form()}
    </div>
    `
}

export const row = (data) => {
    return data.map(([id, {author, title}]) => {
        return html`
        <tr>
            <td>${title}</td>
            <td>${author}</td>
            <td id=${id}>
                <button class="editBook">Edit</button>
                <button class="deleteBook">Delete</button>
            </td>
        </tr>
        `
    })
}

