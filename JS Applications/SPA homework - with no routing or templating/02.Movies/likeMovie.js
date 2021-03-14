import { request } from './utils.js'
import { getMovie, getLikes, getUserLikes } from './details.js'
import { movieDetails } from './templates.js'

const url = 'http://localhost:3030/data/likes'

export async function likeMovie(e, movieId) {
    try {
        await request(url, {
            method: 'POST',
            headers: { "X-Authorization": sessionStorage.getItem('authToken') },
            body: JSON.stringify({
                userId: sessionStorage.getItem('userId'),
                movieId: movieId
            })
        })

        document.getElementById('movie-details').innerHTML = movieDetails(...(await Promise.all(
            [getMovie(movieId), getLikes(movieId), getUserLikes(movieId)]
        )))

    } catch (err) {
        console.log(err);
    }
}