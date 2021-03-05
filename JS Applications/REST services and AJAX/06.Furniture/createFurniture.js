(function createFurniture() {
    const form = document.getElementById('create-form')
    const createBtn = form.getElementsByTagName('button')[0]
    const url = 'http://localhost:3030/data/furniture'

    createBtn.addEventListener('click', addFurniture)

    async function addFurniture(e) {
        e.preventDefault()

        const formData = [...new FormData(form).entries()].reduce((a, [key, val]) => {
            return { ...a, [key]: val }
        }, {})

        if (Object.values(formData).includes('')) {
            return alert('Empty fields!')
        }
        try {
            const data = await request(url, {
                method: 'POST',
                headers: { "X-Authorization": JSON.parse(sessionStorage.getItem('authToken')).accessToken },
                body: JSON.stringify({
                    name: formData.name,
                    price: formData.price,
                    factor: formData.factor,
                    img: formData.img,
                })
            })

            form.reset()
            alert('You have successfully added the item!')
            loadFurniture()
            
        } catch (err) {
            console.log(err);
        }
    }

    async function request(url, options) {
        const res = await fetch(url, options)

        errHandling(res)

        return res.json()
    }

    function errHandling(res) {
        if (!res.ok) {
            throw new Error('El problemo' + res.status)
        }
    }
})()