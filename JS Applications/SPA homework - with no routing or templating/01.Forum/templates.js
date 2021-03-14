export function topicDetails(data) {
    return `
    <div class="topic-content">
            <!-- topic-title  -->
            <div class="topic-title">
                <div class="topic-name-wrapper">
                    <div class="topic-name">
                        <h2>${data.title}</h2>
                        <p>Date: <time>${data.createdOn}</time></p>
                    </div>
                    <div class="subscribers">
                        <p>Subscribers: <span>${data.subs}</span></p>
                        <!-- <button class="subscribe">Subscribe</button>
                        <button class="unsubscribe">Unsubscribe</button> -->
                    </div>
                </div>
            </div>
            <div class="comments-container">

            </div>
            <div class="answer-comment">
                <p><span>currentUser</span> comment:</p>
                <div class="answer">
                    <form id="comment-form" data-postId="${data._id}">
                        <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                        <div>
                            <label for="username">Username <span class="red">*</span></label>
                            <input type="text" name="username" id="username">
                        </div>
                        <button id="post-commentBtn">Post</button>
                    </form>
                </div>
            </div>

        </div>
    `
}

export function topicComments(data) {
    return `
<div class="comment">
                <header class="header">
                    <p><span>${data.author}</span> posted on <time>${data.createdOn}</time></p>
                </header>
                <div class="comment-main">
                    <div class="userdetails">
                        <img src="./static/profile.png" alt="avatar">
                    </div>
                    <div class="post-content">
                        <p>${data.content}</p>
                    </div>
                </div>
                <div class="footer">
                    <p><span>${data.likes}</span> likes</p>
                </div>
            </div>
`
}

export function topic(data) {
    return `
    <div class="topic-container">
        <div class="topic-name-wrapper">
            <div class="topic-name" id=${data._id}>
                <a href="#" class="normal">
                    <h2>${data.title}</h2>
                </a>
                <div class="columns">
                    <div>
                        <p>Date: <time>${data.createdOn}</time></p>
                        <div class="nick-name">
                            <p>Username: <span>${data.author}</span></p>
                        </div>
                    </div>
                    <div class="subscribers">
                        <p>Subscribers: <span>${data.subs}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

export function home() {
    return `
    <main>
    <div class="new-topic-border">
        <div class="header-background">
            <span>New Topic</span>
        </div>
        <form id="post-form">
            <div class="new-topic-title">
                <label for="topicName">Title <span class="red">*</span></label>
                <input type="text" name="topicName" id="topicName">
            </div>
            <div class="new-topic-title">
                <label for="username">Username <span class="red">*</span></label>
                <input type="text" name="username" id="username">
            </div>
            <div class="new-topic-content">
                <label for="postText">Post <span class="red">*</span></label>
                <textarea type="text" name="postText" id="postText" rows="8" class="height"></textarea>
            </div>
            <div class="new-topic-buttons">
                <button class="cancel">Cancel</button>
                <button class="public">Post</button>
            </div>

        </form>
    </div>

    <div class="topic-title">

    </div>
</main>
    `
}
