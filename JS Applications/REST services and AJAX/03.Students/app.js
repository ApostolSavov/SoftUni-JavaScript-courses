(function init() {
    const url = 'http://localhost:3030/jsonstore/collections/students'
    const tbody = document.getElementById('tbody')
    const form = document.getElementById('form')
    const submitBtn = document.getElementById('submit')

    loadStudents()

    submitBtn.addEventListener('click', addStudent)

    async function addStudent(e) {
        e.preventDefault()

        const formData = new FormData(form)
        const values = [...formData.entries()].map(x => x[1])

        try {
            validate(values)

            await request(url, {
                method: 'POST',
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify({
                    firstName: values[0],
                    lastName: values[1],
                    facultyNumber: values[2],
                    grade: values[3]
                })
            })

            loadStudents()
            form.reset()

        } catch (err) {
            console.log(err);
            alert('There was a problem: ' + err.message);
        }
    }

    async function loadStudents() {
        try {
            const data = await request(url)

            tbody.innerHTML = Object.values(data)
                .map(data => createRow(data))
                .join('')

        } catch (err) {
            console.log(err);
            alert('There was a problem: ' + err.message);
        }
    }

    async function request(url, options) {
        const res = await fetch(url, options)

        errHandling(res)

        return res.json()
    }

    function createRow(data) {
        return `
        <tr>
            <td>${data.firstName}</td>
            <td>${data.lastName}</td>
            <td>${data.facultyNumber}</td>
            <td>${data.grade}</td>
        </tr>
`
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
})()