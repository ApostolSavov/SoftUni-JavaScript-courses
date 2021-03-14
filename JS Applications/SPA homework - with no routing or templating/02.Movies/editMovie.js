import { request } from './utils.js'
import { showSection } from './app.js'
import { getMovie, getLikes, getUserLikes } from './details.js'
import { movieDetails } from './templates.js'

const url = 'http://localhost:3030/data/movies'
const form = document.querySelector('#edit-movie>form')
let movieIdTemp = null

export async function setupEditMovie(e, movieId) {
    showSection('edit-movie')

    const submitBtn = form.querySelector('button')
    submitBtn.addEventListener('click', editMovie)

    const data = await getMovie(movieId)
    form.querySelector('[name="title"]').value = data.title
    form.querySelector('[name="description"]').value = data.description
    form.querySelector('[name="imageUrl"]').value = data.img

    movieIdTemp = movieId
}

async function editMovie(e) {
    e.preventDefault()
    e.stopPropagation()

    const formData = [...new FormData(form).entries()]
        .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {})

    if (Object.values(formData).includes('')) {
        throw new Error('Empty fields!')
    }

    try {
        await request(url + '/' + movieIdTemp, {
            method: 'PUT',
            headers: { "X-Authorization": sessionStorage.getItem('authToken') },
            body: JSON.stringify({
                title: formData.title,
                description: formData.description,
                img: formData.imageUrl,
            })
        })

        e.target.removeEventListener('click', editMovie)

        form.reset()

        document.getElementById('movie-details').innerHTML = movieDetails(...(await Promise.all([
            getMovie(movieIdTemp), getLikes(movieIdTemp), getUserLikes(movieIdTemp)
        ])))

        showSection('movie-details')

    } catch (err) {
        console.log(err);
    }
}