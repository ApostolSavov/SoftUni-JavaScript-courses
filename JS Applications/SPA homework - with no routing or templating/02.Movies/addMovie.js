import { request } from './utils.js'
import { showSection, setupHome } from './app.js'

const url = 'http://localhost:3030/data/movies'
const form = document.querySelector('#add-movie>form')

export function setupAddMovie() {
    showSection('add-movie')

    const submitBtn = form.querySelector('button')

    submitBtn.addEventListener('click', addMovie)
}

async function addMovie(e) {
    e.preventDefault()
    e.stopPropagation()

    const formData = [...new FormData(form).entries()]
        .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {})

    if (Object.values(formData).includes('')) {
        throw new Error('Empty fields!')
    }

    try {
        await request(url, {
            method: 'POST',
            headers: { "X-Authorization": sessionStorage.getItem('authToken') },
            body: JSON.stringify({
                title: formData.title,
                description: formData.description,
                img: formData.imageUrl,
            })
        })

        e.target.removeEventListener('click', addMovie)

        form.reset()

        showSection('home-page')
        setupHome()

    } catch (err) {
        console.log(err);
    }
}