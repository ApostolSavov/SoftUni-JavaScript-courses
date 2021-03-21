import { login } from '../api/data.js'
import { loginTemplate } from './templates.js'

export async function loginPage(ctx) {
    ctx.render(loginTemplate())
}

export async function loginHandler(e, pageRef) {
    e.preventDefault()
    const form = document.getElementById('loginForm')

    if (Array.from(form.elements).map(x => x.value.trim()).includes('')) {
        return alert('Empty fields!')
    }

    await login(form.email.value, form.password.value)

    pageRef.redirect('/')
}