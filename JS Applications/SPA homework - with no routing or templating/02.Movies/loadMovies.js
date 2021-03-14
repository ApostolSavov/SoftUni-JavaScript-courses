import { request } from './utils.js'
import { movieCard } from './templates.js'

export async function loadMovies() {
    const url = 'http://localhost:3030/data/movies'
    const moviesContainer = document.getElementsByClassName('card-deck')[0]

    document.getElementById('createMovieBtn').setAttribute('style', sessionStorage.getItem('authToken') ? '' : 'display:none')

    try {
        const data = await request(url)

        moviesContainer.innerHTML = data
            .map(movie => movieCard(movie))
            .join('')

    } catch (err) {
        console.log(err);
    }
}