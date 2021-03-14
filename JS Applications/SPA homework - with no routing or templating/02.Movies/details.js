import { request } from './utils.js'
import { movieDetails } from './templates.js'
import { showSection } from './app.js'
import { deleteMovie } from './deleteMovie.js'
import { setupEditMovie } from './editMovie.js'
import { likeMovie } from './likeMovie.js'
import { unlikeMovie } from './unlikeMovie.js'

const url = 'http://localhost:3030/data/movies'
const likesUrl = 'http://localhost:3030/data/likes'
const section = document.getElementById('movie-details')

const buttonActions = {
    'delete': deleteMovie,
    'edit': setupEditMovie,
    'like': likeMovie,
    'unlike': unlikeMovie
}

section.addEventListener('click', movieDetailsHandler)

export async function setupDetails(e) {
    const movieEl = e.target.parentElement.parentElement.parentElement

    section.innerHTML = movieDetails(...(await Promise.all([
        getMovie(movieEl.id), getLikes(movieEl.id), getUserLikes(movieEl.id)
    ])))

    showSection('movie-details')
}

function movieDetailsHandler(e) {
    e.preventDefault()
    e.stopPropagation()

    if (!e.target.tagName == 'A') {
        return
    }

    const movieId = e.target.parentElement.id

    buttonActions[e.target.textContent.toLowerCase()](e, movieId)
}

export async function getMovie(id) {
    try {
        const data = await request(url + '/' + id)

        return data

    } catch (err) {
        console.log(err);
    }
}

export async function getLikes(id) {
    try {
        const data = await request(`${likesUrl}?where=movieId%3D%22${id}%22&distinct=_ownerId&count`)

        return data

    } catch (err) {
        console.log(err);
    }
}

export async function getUserLikes(id) {
    try {
        const data = await request(`${likesUrl}?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${sessionStorage.getItem('userId')}%22`)

        return data

    } catch (err) {
        console.log(err);
    }
}