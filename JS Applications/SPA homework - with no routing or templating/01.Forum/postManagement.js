import { request } from './utils.js'
import { topic, topicDetails, topicComments } from './templates.js'

const url = 'http://localhost:3030/jsonstore/collections/myboard'
const form = document.getElementById('post-form')
const main = document.getElementsByTagName('main')[0]
const topicContainer = document.getElementsByClassName('topic-content')[0]

export async function createPost() {

    const formData = [...new FormData(form).entries()]
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

    if (Object.values(formData).includes('')) {
        return alert('Empty fields!')
    }

    try {
        const data = await request(url + '/posts', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: formData.topicName,
                author: formData.username,
                createdOn: new Date().toJSON(),
                subs: Math.floor(Math.random() * 1000)
            })
        })

        await request(url + '/comments', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                author: formData.username,
                content: formData.postText,
                postId: data._id,
                createdOn: new Date().toJSON(),
                likes: Math.floor(Math.random() * 10)
            })
        })

        alert('You have successfully created a post.')
        form.reset()
        loadPosts()

    } catch (err) {
        console.log(err)
    }
}

export async function loadPosts() {
    const topicSectionMain = document.getElementsByClassName('topic-title')[0]

    try {
        const data = await request(url + '/posts')

        topicSectionMain.innerHTML = Object.values(data)
            .map(data => topic(data))
            .join('')

    } catch (err) {
        console.log(err)
    }
}

export async function openPost(postId) {
    try {
        const data = await request(url + '/posts/' + postId)
        const data1 = Object.values(await request(url + '/comments'))
            .filter(x => x.postId == postId)

        main.style.display = 'none'
        topicContainer.innerHTML = topicDetails(data)

        const commentsContainer = topicContainer.getElementsByClassName('comments-container')[0]
        commentsContainer.innerHTML = data1
            .map(comment => topicComments(comment))
            .join('')

        const postBtn = document.getElementById('post-commentBtn')
        postBtn.addEventListener('click', addComment)
        topicContainer.style.display = 'flex'

    } catch (err) {
        console.log(err);
    }
}

export async function addComment(e) {
    e.preventDefault()
    const form = document.getElementById('comment-form')
    const formData = [...new FormData(form).entries()]
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

    if (Object.values(formData).includes('')) {
        return alert('Empty fields!')
    }

    try {
        await request(url + '/comments', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                author: formData.username,
                content: formData.postText,
                postId: form.dataset.postid,
                createdOn: new Date().toJSON(),
                likes: Math.floor(Math.random() * 10)
            })
        })

        openPost(form.dataset.postid)

    } catch (err) {
        console.log(err)
    }
}