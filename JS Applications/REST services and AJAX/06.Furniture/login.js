(function init() {
    const url = 'http://localhost:3030/users/login'
    const loginForm = document.getElementById('login-form')
    const loginBtn = loginForm.getElementsByTagName('button')[0]

    loginBtn.addEventListener('click', login)

    async function login(e) {
        try {
            e.preventDefault()
            const formData = new FormData(loginForm)
            const values = [...formData.entries()].map(x => x[1])

            const data = await request(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: values[0],
                    password: values[1]
                })
            })

            console.log(data);

            sessionStorage.setItem('authToken', JSON.stringify({
                accessToken: data.accessToken,
                userId: data._id
            }))
            loginForm.reset()
            location.pathname = 'homeLogged.html'
            alert('You have logged in.')

        } catch (err) {
            console.log(err);
            alert('Wrong email, password or both.')
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