import {showSection} from './app.js'
import {setupHome} from './app.js'

export async function logout(e) {
    e.preventDefault()

    try {
        await fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: { "X-Authorization": sessionStorage.getItem('authToken') }
        })
    } catch (err) {
        console.log(err);
        alert(err)
    }
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('userEmail')

    alert('You have logged out.')
    
    showSection('home-page')
    setupHome()
}