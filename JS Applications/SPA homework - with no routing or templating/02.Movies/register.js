import { request } from './utils.js'
import { showSection } from './app.js'
import {setupHome} from './app.js'

export async function register(e) {
    e.preventDefault()

    const url = 'http://localhost:3030/users/register'
    const regForm = document.querySelector('#form-sign-up>form')
    const formData = new FormData(regForm)
    const values = [...formData.entries()].reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {})

    try {
        regValidation(Object.values(values))

        const data = await request(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: values.email,
                password: values.password
            })
        })

        sessionStorage.setItem('authToken', data.accessToken)
        sessionStorage.setItem('userId', data._id)
        sessionStorage.setItem('userEmail', data.email)

        alert('You have successfully registered.')
        regForm.reset()
        showSection('home-page')
        setupHome()

    } catch (err) {
        console.log(err);
        alert(err)
    }
}

function regValidation(formData) {
    if (formData.includes('')) {
        throw new Error('Empty fields!')
    } else if (!/[\w]+@[a-z]+\.[a-z]+/.test(formData[0])) {
        throw new Error('Invalid email format!')
    } else if (formData[1].length < 6) {
        throw new Error('Password should be at least 6 characters long!')
    } else if (formData[1] != formData[2]) {
        throw new Error('Passwords don\'t match!')
    }
}
