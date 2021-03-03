(async function solution() {
    const baseUrl = 'http://localhost:3030/jsonstore/advanced/articles/'
    const main = document.getElementById('main')

    try {
        const res = await getData('list')

        errorHandling(res)

        const data = await res.json()

        main.innerHTML = data
            .map(article => template(article))
            .join('')

    } catch (err) {
        console.log(err)
    }

    main.addEventListener('click', async (e) => {
        if (e.target.tagName == 'BUTTON') {
            const btn = e.target
            const text = btn.parentElement.nextElementSibling
            const par = text.firstElementChild

            if (btn.textContent == 'More') {

                const res = await getData(`details/${btn.id}`)
                const data = await res.json()

                par.textContent = data.content
                btn.textContent = 'Less'
                text.style.display = 'block'
            } else {
                btn.textContent = 'More'
                text.style.display = 'none'
            }
        }
    })

    function getData(url) {
        return fetch(baseUrl + url)
    }

    function errorHandling(res) {
        if (!res.ok) {
            throw new Error('El Problemo occured.')
        }
    }

    function template(data) {
        return `<div class="accordion">
                <div class="head">
                <span>${data.title}</span>
                <button class="button" id=${data._id}>More</button>
                </div>
                <div class="extra">
                <p></p>
                </div>
                </div>`
    }
})()

