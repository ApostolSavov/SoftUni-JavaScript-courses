export function movieCard(data) {
    return `
    <div class="card mb-4" id=${data._id} data-owner-id=${data._ownerId}>
        <img class="card-img-top" src=${data.img} alt="Card image cap" width="400">
        <div class="card-body">
            <h4 class="card-title">${data.title}</h4>
        </div>
        <div class="card-footer">
            <a href="#">
            <button type="button" class="btn btn-info" ${sessionStorage.getItem('authToken') ? '' : 'disabled'}>Details</button>
            </a>
        </div>
    </div>
    `
}

export function movieDetails(data, likes, userLike) {
    const owner = sessionStorage.getItem('userId') == data._ownerId ? true : false
    const liked = String(userLike) ? true : false

    return `
    <div class="container">
        <div class="row bg-light text-dark">
            <h1>Movie title: ${data.title}</h1>
            <div class="col-md-8">
                <img class="img-thumbnail" src=${data.img} alt="Movie">
            </div>
            <div class="col-md-4 text-center" id=${data._id} data-owner-id=${data._ownerId}>
                <h3 class="my-3 ">Movie Description</h3>
                <p>${data.description}</p>
                <a class="btn btn-danger" href="#" ${owner ? '' : 'style="display:none"'}>Delete</a>
                <a class="btn btn-warning" href="#" ${owner ? '' : 'style="display:none"'}>Edit</a>
                <a class="btn btn-primary" href="#" ${owner ? 'style="display:none"' : ''}>${liked ? 'Unlike' : 'Like'}</a>
                <span class="enrolled-span">Liked ${likes}</span>
            </div>
        </div>
    </div>
    `
}