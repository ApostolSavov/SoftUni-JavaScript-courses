(function init() {
    const url = 'http://localhost:3030/users/'
    const regForm = document.getElementById('register-form')
    const loginForm = document.getElementById('login-form')
    const regBtn = regForm.getElementsByTagName('button')[0]
    const loginBtn = loginForm.getElementsByTagName('button')[0]

    regBtn.addEventListener('click', register)

    loginBtn.addEventListener('click', login)

    async function register(e) {
        e.preventDefault()
        const formData = new FormData(regForm)
        const values = [...formData.entries()].map(x => x[1])

        try {
            regValidation(values)

            await request(`${url}register`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: values[0],
                    password: values[1]
                })
            })

            alert('You have successfully registered.')
            regForm.reset()

        } catch (err) {
            console.log(err);
            alert('There was a problem: ' + err.message)
        }
    }

    async function login(e) {
        try {
            e.preventDefault()
            const formData = new FormData(loginForm)
            const values = [...formData.entries()].map(x => x[1])

            const data = await request(`${url}login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: values[0],
                    password: values[1]
                })
            })

            sessionStorage.setItem('authToken', data.accessToken)
            loginForm.reset()
            location.pathname = 'index.html'
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

    function regValidation(formData) {
        if (formData.includes('')) {
            throw new Error('Empty fields!')
        } else if (!/[\w]+@[a-z]+\.[a-z]+/.test(formData[0])) {
            throw new Error('Invalid email format!')
        } else if (formData[1] != formData[2]) {
            throw new Error('Passwords don\'t match')
        }
    }

    function errHandling(res) {
        if (!res.ok) {
            throw new Error('El problemo' + res.status)
        }
    }
})()