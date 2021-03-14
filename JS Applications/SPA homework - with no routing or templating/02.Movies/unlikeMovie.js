import { request } from './utils.js'
import { getMovie, getLikes, getUserLikes } from './details.js'
import { movieDetails } from './templates.js'

const url = 'http://localhost:3030/data/likes'

export async function unlikeMovie(e, movieId) {
    try {
        const likeId = (await getUserLikes(movieId))[0]._id

        await request(url + '/' + likeId, {
            method: 'DELETE',
            headers: { "X-Authorization": sessionStorage.getItem('authToken') }
        })

        document.getElementById('movie-details').innerHTML = movieDetails(...(await Promise.all(
            [getMovie(movieId), getLikes(movieId), getUserLikes(movieId)]
        )))

    } catch (err) {
        console.log(err);
    }
}