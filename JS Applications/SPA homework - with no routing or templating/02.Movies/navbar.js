import { showSection } from './app.js'
import { logout } from './logout.js'

const navbarRoutes = {
    'moviesHome': 'home-page',
    'loginLink': 'form-login',
    'registerLink': 'form-sign-up'
}

export function navbarRender() {
    const navbar = document.getElementsByClassName('navbar-nav')[0]
    const navLinks = Array.from(navbar.children)
    const type = sessionStorage.getItem('authToken') ? 'user' : 'guest'

    navLinks.forEach(link => {
        if (link.classList.contains(type)) {
            link.removeAttribute('style')
        } else {
            link.style.display = 'none'
        }
    })

    if (type == 'user') {
        navbar.querySelector('#welcome-text').textContent = `Welcome, ${sessionStorage.getItem('userEmail')}`
    }
}

export function navbarHandler(e) {
    if (e.target.id == 'welcome-text') {
        return
    } else if (e.target.id == 'logoutLink') {
        logout(e)
    } else if (e.target.tagName == 'A') {
        showSection(navbarRoutes[e.target.id])
    }
}