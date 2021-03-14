import { createPost, loadPosts, openPost } from './postManagement.js'

loadPosts()

const form = document.getElementById('post-form')
const main = document.getElementsByTagName('main')[0]
const topicSectionMain = document.getElementsByClassName('topic-title')[0]
const topicContainer = document.getElementsByClassName('topic-content')[0]
const [cancelBtn, postBtn] = Array.from(form.querySelectorAll('.cancel,.public'))
const homeBtn = document.getElementById('homeBtn')

postBtn.addEventListener('click', (e) => { e.preventDefault(); createPost() })
cancelBtn.addEventListener('click', (e) => { e.preventDefault(); form.reset() })
topicSectionMain.addEventListener('click', topicHandler)
homeBtn.addEventListener('click', () => { topicContainer.style.display = 'none'; main.style.display = 'block' })

async function topicHandler(e) {
    e.preventDefault()

    if (e.target.tagName == 'H2') {
        const postId = e.target.parentElement.parentElement.id
        await openPost(postId)
    }
}
