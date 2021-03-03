class Story {
    constructor(title, creator) {
        this.title = title
        this.creator = creator
        this._comments = []
        this._likes = []

    }

    get likes() {
        if (this._likes.length == 0) {
            return `${this.title} has 0 likes`
        } else if (this._likes.length == 1) {
            return `${this._likes[0].user} likes this story!`
        } else {
            return `${this._likes[0].user} and ${this._likes.length - 1} others like this story!`
        }
    }


    like(username) {
        if (this._likes.find(x => x.user == username)) {
            throw new Error(`You can't like the same story twice!`)
        } else if (username == this.creator) {
            throw new Error(`You can't like your own story!`)
        }
        this._likes.push(
            {
                user: username
            }
        )
        return `${username} liked ${this.title}!`
    }

    dislike(username) {
        if (!this._likes.find(x => x.user == username)) {
            throw new Error(`You can't dislike this story!`)
        }
        const index = this._likes.indexOf(this._likes.find(x => x.user == username))
        this._likes.splice(index, 1)
        return `${username} disliked ${this.title}`
    }

    comment(username, content, id) {
        const target = this._comments.find(x => x.Id == id)
        if (id == undefined || !target) {
            this._comments.push(
                {
                    Id: this._comments.length + 1,
                    Username: username,
                    Content: content,
                    Replies: []
                }
            )
            return `${username} commented on ${this.title}`
        } else if (target) {
            target.Replies.push(
                {
                    Id: `${target.Id}.${target.Replies.length + 1}`,
                    Username: username,
                    Content: content
                }
            )
            return `You replied successfully`
        }
    }

    toString(sortingType) {

        if (sortingType == 'asc') {

            this._comments.forEach(x => {
                x.Replies.sort((a, b) => a.Id - b.Id)
            })
            this._comments.sort((a, b) => a.Id - b.Id)

        } else if (sortingType == 'desc') {

            this._comments.forEach(x => {
                x.Replies.sort((a, b) => b.Id - a.Id)
            })
            this._comments.sort((a, b) => b.Id - a.Id)

        } else if (sortingType == 'username') {

            this._comments.forEach(x => {
                x.Replies.sort((a, b) => a.Username.localeCompare(b.Username))
            })
            this._comments.sort((a, b) => a.Username.localeCompare(b.Username))

        }

        return `Title: ${this.title}\n` +
            `Creator: ${this.creator}\n` +
            `Likes: ${this._likes.length}\n` +
            `Comments:${this._comments.length > 0 ? '\n' : ''}` +
            `${this._comments.map(x => {
                return `-- ${x.Id}. ${x.Username}: ${x.Content}` +
                    `${x.Replies.length > 0 ? '\n' + x.Replies.map(x => {
                        return `--- ${x.Id}. ${x.Username}: ${x.Content}`
                    }).join('\n') : ''}`
            }).join('\n').trim()}`;
    }
}

const test = new Story("My Story", "Pesho")



console.log(test.toString('username'));


