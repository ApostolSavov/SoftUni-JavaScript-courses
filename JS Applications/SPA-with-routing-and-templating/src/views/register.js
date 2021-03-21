import { register } from '../api/data.js'
import { registerTemplate } from './templates.js'

export async function registerPage(ctx) {
    ctx.render(registerTemplate())
}

export async function registerHandler(e, pageRef) {
    e.preventDefault()
    const form = document.getElementById('registerForm')

    if (Array.from(form.elements).map(x => x.value.trim()).includes('')) {
        return alert('Empty fields!')
    } else if (form.password.value != form.rePass.value) {
        return alert('Passwords don\'t match!')
    }

    await register(form.email.value, form.password.value)

    pageRef.redirect('/')
}