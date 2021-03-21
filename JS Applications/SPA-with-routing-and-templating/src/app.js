import page from '../node_modules/page/page.mjs'
import { render } from '../node_modules/lit-html/lit-html.js'

import { createItemHandler, createPage } from './views/create.js'
import { dashboardPage } from './views/dashboard.js'
import { loginHandler, loginPage } from './views/login.js'
import { registerHandler, registerPage } from './views/register.js'
import { detailsPage } from './views/details.js'
import { editItemHandler, editPage } from './views/edit.js'
import { myItemsPage } from './views/myFurniture.js'
import { navbarTemplate } from './views/templates.js'

import * as api from './api/data.js'

const navbarContainer = document.getElementsByTagName('header')[0]
const contentContainer = document.getElementsByClassName('container')[0]

contentContainer.addEventListener('click', mainClickHandler)
contentContainer.addEventListener('change', inputChangeHandler)
navbarContainer.addEventListener('click', logout)

page('/', genericPageSetup, dashboardPage)
page('/login', genericPageSetup, loginPage)
page('/register', genericPageSetup, registerPage)
page('/details/:id', genericPageSetup, detailsPage)
page('/create', genericPageSetup, createPage)
page('/edit/:id', genericPageSetup, editPage)
page('/my-furniture', genericPageSetup, myItemsPage)

page.start()

async function mainClickHandler(e) {
    if (e.target.id == 'createBtn') {
        await createItemHandler(e, page)
    } else if (e.target.id == 'editBtn') {
        await editItemHandler(e, page)
    } else if (e.target.id == 'registerBtn') {
        await registerHandler(e, page)
    } else if (e.target.id == 'loginBtn') {
        await loginHandler(e, page)
    } else if (e.target.id == 'delBtn') {
        await deleteItemHandler()
    }
}

async function inputChangeHandler(e) {
    const form = document.getElementsByTagName('form')[0]

    if (['editForm', 'createForm'].includes(form.id)) {
        api.fieldChangeValidation(e.target)
    }
}


function genericPageSetup(ctx, next) {
    render(navbarTemplate(sessionStorage.getItem('authToken'), ctx.path), navbarContainer)
    ctx.render = (templResult) => render(templResult, contentContainer)
    next()
}

async function deleteItemHandler() {
    const confirmed = confirm('Are you sure you want to delete this item')
    if (confirmed) {
        await api.deleteItem((location.pathname.split('/')).pop());
        page.redirect('/')
    }
}

async function logout(e) {
    if (e.target.id == 'logoutBtn') {
        await api.logout();
        page.redirect('/')
    }
}