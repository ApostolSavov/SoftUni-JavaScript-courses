function attachEvents() {
    const url = 'http://localhost:3030/data/catches'
    const headerLoginBtn = document.getElementById('guest').firstElementChild
    const loadBtn = document.getElementsByClassName('load')[0]
    const addBtn = document.getElementsByClassName('add')[0]
    const container = document.getElementById('catches')
    const form = document.getElementById('addForm')
    const inputs = Array.from(form.getElementsByTagName('input'))

    loginSwitch()

    loadBtn.addEventListener('click', loadCatches)
    container.addEventListener('click', catchesHandler)
    addBtn.addEventListener('click', createCatch)

    async function loadCatches() {
        try {
            const data = await request(url)

            catches.innerHTML = data
                .map(data => renderCatch(data, sessionStorage.getItem('authToken') ? true : false))
                .join('')

        } catch (err) {
            console.log(err);
            alert('Error ' + err.message)
        }
    }

    async function catchesHandler(e) {
        const id = e.target.parentElement.id

        if (e.target.className == 'update') {
            updateCatch(e, id)
        } else if (e.target.className == 'delete') {
            deleteCatch(id)
        }
    }

    async function createCatch() {
        values = inputs.map(x => x.value)
        if (validate(values)) {
            return alert('Empty fields')
        }

        try {
            await request(url, {
                method: 'POST',
                headers: { "X-Authorization": sessionStorage.getItem('authToken') },
                body: JSON.stringify({
                    angler: values[0],
                    weight: values[1],
                    species: values[2],
                    location: values[3],
                    bait: values[4],
                    ['captureTime ']: values[5]
                })
            })

            loadCatches()
            inputs.forEach(x => x.value = '')

        } catch (err) {
            console.log(err);
            alert('Error ' + err.message)
        }
    }

    async function updateCatch(e, id) {
        const catchFields = Array.from(e.target.parentElement.getElementsByTagName('input'))
            .map(x => x.value)

        try {
            await request(url + '/' + id, {
                method: 'PUT',
                headers: { "X-Authorization": sessionStorage.getItem('authToken') },
                body: JSON.stringify({
                    angler: catchFields[0],
                    weight: catchFields[1],
                    species: catchFields[2],
                    location: catchFields[3],
                    bait: catchFields[4],
                    ['captureTime ']: catchFields[5]
                })
            })

            alert('Catch has been updated')
            loadCatches()

        } catch (err) {
            console.log(err);
            alert('Error ' + err.message)
        }
    }

    async function deleteCatch(id) {
        try {
            await request(url + '/' + id, {
                method: 'DELETE',
                headers: { "X-Authorization": sessionStorage.getItem('authToken') }
            })

            loadCatches()

        } catch (err) {
            console.log(err);
            alert('Error ' + err.message)
        }
    }

    async function logout(e) {
        e.preventDefault()
        const token = sessionStorage.getItem('authToken')
        try {
            await fetch('http://localhost:3030/users/logout', {
                method: 'GET',
                headers: { "X-Authorization": token }
            })
        } catch (err) {
            console.log(err);
            alert('Error ' + err.message)
        }
        sessionStorage.removeItem('authToken')
        headerLoginBtn.textContent = 'Login'
        alert('You have logged out.')
        location.pathname = 'index.html'
    }


    async function request(url, options) {
        const res = await fetch(url, options)

        errHandling(res)

        return res.json()
    }

    function validate(formData) {
        if (formData.includes('')) {
            throw new Error('Empty Fields')
        }
    }

    function errHandling(res) {
        if (!res.ok) {
            throw new Error('El problemo' + res.status)
        }
    }

    function loginSwitch() {
        if (sessionStorage.getItem('authToken')) {
            addBtn.disabled = false
            headerLoginBtn.textContent = 'Logout'
            headerLoginBtn.addEventListener('click', logout, { once: true })
        }
    }

    function renderCatch(data, logged) {
        return `
        <div class="catch" id=${data._id}>
            <label>Angler</label>
            <input type="text" class="angler" value="${data.angler}" />
            <hr>
            <label>Weight</label>
            <input type="number" class="weight" value="${data.weight}" />
            <hr>
            <label>Species</label>
            <input type="text" class="species" value="${data.species}" />
            <hr>
            <label>Location</label>
            <input type="text" class="location" value="${data.location}" />
            <hr>
            <label>Bait</label>
            <input type="text" class="bait" value="${data.bait}" />
            <hr>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${data['captureTime ']}" />
            <hr>
            <button ${logged ? '' : 'disabled'} class="update">Update</button>
            <button ${logged ? '' : 'disabled'} class="delete">Delete</button>
        </div>
        `
    }
}

attachEvents();

