import { request } from './utils.js'
import { showSection } from './app.js'
import {setupHome} from './app.js'

export async function login(e) {
    e.preventDefault()

    const url = 'http://localhost:3030/users/login'
    const loginForm = document.querySelector('#form-login>form')
    const formData = new FormData(loginForm)
    const values = [...formData.entries()].reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {})

    try {
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

        alert('You have successfully logged in.')

        loginForm.reset()
        showSection('home-page')
        setupHome()

    } catch (err) {
        console.log(err);
        alert('Wrong email, password or both.')
        loginForm.reset()
    }
}