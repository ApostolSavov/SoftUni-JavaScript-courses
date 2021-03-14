import { request } from './utils.js'
import { showSection, setupHome } from './app.js'

const url = 'http://localhost:3030/data/movies'

export async function deleteMovie(e, movieId) {
    try {
        await request(url + '/' + movieId, {
            method: 'DELETE',
            headers: { "X-Authorization": sessionStorage.getItem('authToken') }
        })

        showSection('home-page')
        setupHome()

    } catch (err) {
        console.log(err);
    }
}