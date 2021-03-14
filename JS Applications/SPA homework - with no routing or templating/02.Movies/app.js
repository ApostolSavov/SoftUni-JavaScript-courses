import { navbarRender, navbarHandler } from './navbar.js'
import { login } from './login.js'
import { register } from './register.js'
import { loadMovies } from './loadMovies.js'
import { setupAddMovie } from './addMovie.js'
import { setupDetails } from './details.js'

setupHome()

const navbar = document.getElementsByTagName('nav')[0]
const main = document.getElementById('sections-container')

navbar.addEventListener('click', navbarHandler)
main.addEventListener('click', mainHandler)

export function setupHome() {
    navbarRender()
    loadMovies()
}

export function showSection(id) {
    const sections = Array.from(main.children)

    sections.forEach(s => {
        if (s.id == id) {
            s.removeAttribute('style')
        } else {
            s.style.display = 'none'
        }
    })
}

function mainHandler(e) {

    if (!['A', 'BUTTON'].includes(e.target.tagName)) {
        return
    }

    mainRoutes((e.target.textContent).toLowerCase().trim())(e)
}

function mainRoutes(route) {
    const routes = {
        'register': register,
        'login': login,
        'add movie': setupAddMovie,
        'details': setupDetails

    }

    return routes[route]
}

