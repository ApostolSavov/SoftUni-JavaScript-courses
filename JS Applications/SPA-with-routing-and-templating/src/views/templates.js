import { html } from '../../node_modules/lit-html/lit-html.js'

//navbar
export const navbarTemplate = (token, path) => {
    return html`
    <h1><a href="/">Furniture Store</a></h1>
    <nav>
        <a id="catalogLink" href="/" class=${path == '/' ? "active" : ''}>Dashboard</a>
        ${token ?
        html`<div id="user">
            <a id="createLink" href="/create" class=${path == '/create' ? "active" : ''}>Create Furniture</a>
            <a id="profileLink" href="/my-furniture" class=${path == '/my-furniture' ? "active" : ''}>My Publications</a>
            <a id="logoutBtn" href="javascript:void(0)">Logout</a>
        </div>`
            :
        html`<div id="guest">
            <a id="loginLink" href="/login" class=${path == '/login' ? "active" : ''}>Login</a>
            <a id="registerLink" href="/register" class=${path=='/register' ? "active" : '' }>Register</a>
        </div>`}
    </nav>`
}

//dashboard
export const catalogTemplate = (data, path) => {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>${path == '/' ? 'Welcome to Furniture System' : 'My Furniture'}</h1>
            <p>${path == '/' ? 'Select furniture from the catalog to view details' : 'This is a list of your publications'}.
            </p>
        </div>
    </div>
    <div class="row space-top">
        ${data.map(item => catalogItemTemplate(item))}
    </div>
`
}
export const catalogItemTemplate = (itemData) => {
    return html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${itemData.img}" />
                <p>Description here</p>
                <footer>
                    <p>Price: <span>${itemData.price} $</span></p>
                </footer>
                <div>
                    <a href=${'/details/' + itemData._id} class="btn btn-info"> Details</a>
                </div>
            </div>
        </div>
    </div>
    `
}


//create or edit
export const itemFormTemplate = (data) => {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>${data ? 'Edit' : 'Create New'} Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form id=${data ? 'editForm' : 'createForm'}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control" id="new-make" type="text" name="make" .value=${data ? data.make : ''}>
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control" id="new-model" type="text" name="model" .value=${data ? data.model : ''}>
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control" id="new-year" type="number" name="year" .value=${data ? data.year : ''}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control" id="new-description" type="text" name="description" .value=${data ? data.description : ''}>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control" id="new-price" type="number" name="price" .value=${data ? data.price : ''}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control" id="new-image" type="text" name="img" .value=${data ? data.img : ''}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material" .value=${data && data.material ? data.material : ''}>
                </div>
                <input type="submit" id=${data ? 'editBtn' : 'createBtn'} class="btn btn-${data ? 'info' : 'primary'}" value="${data ? 'Edit' : 'Create'}"/>
            </div>
        </div>
    </form>
    `
}

//register
export const registerTemplate = () => {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Register New User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form id="registerForm">
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class="form-control" id="email" type="text" name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class="form-control" id="password" type="password" name="password">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="rePass">Repeat</label>
                    <input class="form-control" id="rePass" type="password" name="rePass">
                </div>
                <input type="submit" id="registerBtn" class="btn btn-primary" value="Register" />
            </div>
        </div>
    </form>
    `
}

//login
export const loginTemplate = () => {
    return html`
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>Login User</h1>
                    <p>Please fill all fields.</p>
                </div>
            </div>
            <form id="loginForm">
                <div class="row space-top">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-control-label" for="email">Email</label>
                            <input class="form-control" id="email" type="text" name="email">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="password">Password</label>
                            <input class="form-control" id="password" type="password" name="password">
                        </div>
                        <input type="submit" id="loginBtn" class="btn btn-primary" value="Login" />
                    </div>
                </div>
            </form>
    `
}

//details
export const detailsTemplate = (data, token) => {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src="${data.img}" />
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <p>Make: <span>${data.make}</span></p>
            <p>Model: <span>${data.model}</span></p>
            <p>Year: <span>${data.year}</span></p>
            <p>Description: <span>${data.description}</span></p>
            <p>Price: <span>${data.price}</span></p>
            ${data.material ? html`<p>Material: <span>${data.material}</span></p>` : ''}
            <div>
                ${token == data._ownerId ? html`<a href=${'/edit/' + data._id} class="btn btn-info">Edit</a>` : ''}
                ${token == data._ownerId ? html`<a href="javascript:void(0)" id="delBtn" class="btn btn-red">Delete</a>` : ''}
            </div>
        </div>
    </div>
    `
}


//loading
export const loadingTemplate = () => {
    return html`
    <div class="col-md-12">
        <h2>Loading...</h2>
    </div>
`
}