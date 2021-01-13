function attachEvents() {
    let load = document.getElementById('btnLoadPosts')
    let view = document.getElementById('btnViewPost')
    let select = document.getElementById('posts')
    let titleH1 = document.getElementById('post-title')
    let postBody = document.getElementById('post-body')
    let comments = document.getElementById('post-comments')

    load.addEventListener('click', () => {
        fetch(`https://blog-apps-c12bf.firebaseio.com/posts.json`)
            .then(res => {
                if (res.status != 200) throw new Error('There was a problem.')
                else return res.json()
            })
            .then(data => {
                select.innerHTML = Object.entries(data).map(x => {
                    return `<option value=${x[0]}>${x[1].title}</option>`
                }).join('')
            })
            .catch(err => console.log(err))
    })

    view.addEventListener('click', () => {
        fetch(`https://blog-apps-c12bf.firebaseio.com/posts/${select.value}.json`)
            .then(res => {
                if (res.status != 200) throw new Error('There was a problem.')
                else return res.json()
            })
            .then(data => {
                titleH1.textContent = data.title
                postBody.textContent = data.body
                comments.innerHTML = data.comments instanceof Array ?
                    data.comments.map(x => `<li>${x}</li>`).join('') : ''
            })
            .catch(err => console.log(err))
    })

}

attachEvents();