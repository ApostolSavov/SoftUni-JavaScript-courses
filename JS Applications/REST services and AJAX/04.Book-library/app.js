(function init() {
    const url = 'http://localhost:3030/jsonstore/collections/books'
    const loadBtn = document.getElementById('loadBooks')
    const tableBody = document.getElementsByTagName('tbody')[0]
    const form = document.getElementsByTagName('form')[0]
    const [title, author] = Array.from(form.getElementsByTagName('input'))
    const submitBtn = form.lastElementChild
    const formTitle = form.firstElementChild

    loadBooks()

    loadBtn.addEventListener('click', loadBooks)

    submitBtn.addEventListener('click', submitHandler)

    tableBody.addEventListener('click', tableBtnHandler)

    //delegates the event to the corresponding button
    async function tableBtnHandler(e) {
        if (e.target.className == 'edit') {

            await changeForm(e)

        } else if (e.target.className == 'delete') {

            await deleteBook(e.target.parentElement.parentElement.id)
        }
    }

    //changes the submit action based on class
    async function submitHandler(e) {
        e.preventDefault()

        if (e.target.className == 'edit-form') {
            await editBook(url + '/' + form.dataset.id)
        } else {
            await createBook()
        }

        resetForm()
    }

    //loads all book entries in the table
    async function loadBooks() {
        try {
            const data = await request(url)

            tableBody.innerHTML = Object.entries(data)
                .map(data => createRow(data))
                .join('')

        } catch (err) {
            console.log(err);
            alert('There was a problem: ' + err.message)
        }
    }

    //adds a new book entry
    async function createBook() {
        try {
            validateInput([author.value, title.value])

            await request(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    author: author.value,
                    title: title.value
                })
            })

            resetForm()
            await loadBooks()

        } catch (err) {
            console.log(err);
            alert('There was a problem: ' + err.message)
        }
    }

    //changes a certain book entry
    async function editBook(bookUrl) {
        try {
            validateInput([author.value, title.value])

            await request(bookUrl, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    author: author.value,
                    title: title.value
                })
            })

            submitBtn.className = ''

            resetForm()
            await loadBooks()

        } catch (err) {
            console.log(err);
            alert('There was a problem: ' + err.message)
        }
    }

    //deletes a book entry
    async function deleteBook(id) {
        const confirmed = confirm('Are you sure you want to delete this book?')
        if (!confirmed) {
            return
        }
        try {
            await request(url + '/' + id, {
                method: 'DELETE'
            })

            resetForm()
            await loadBooks()

        } catch (err) {
            console.log(err);
            alert('There was a problem: ' + err.message)
        }
    }

    //If the edit from is active and the edit button is clicked again
    //for the same row/entry - the form will be reset, for convenince
    async function changeForm(e) {
        const entryId = e.target.parentElement.parentElement.id

        if (entryId == form.dataset.id) {
            resetForm()
            return
        }

        form.dataset.id = entryId
        formTitle.textContent = 'Edit FORM'
        submitBtn.textContent = 'Save'
        submitBtn.className = 'edit-form'

        try {
            const data = Object.values(await request(url + '/' + entryId));

            [title.value, author.value] = [data[1], data[0]]

        } catch (err) {
            console.log(err);
            alert('There was a problem: ' + err.message)
        }
    }

    //resets the form and classes/attributes for the edit form
    function resetForm() {
        form.dataset.id = ''
        formTitle.textContent = 'FORM'
        submitBtn.textContent = 'Submit'
        submitBtn.className = ''
        form.reset()
    }

    //checks if the inputs are blank
    function validateInput(data) {
        if (data.includes('')) {
            throw new Error('Empty fields!')
        }
    }

    //returns a populated row template
    function createRow([id, { title, author }]) {
        return `
        <tr id=${id}>
            <td>${title}</td>
            <td>${author}</td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>
        </tr>
        `
    }

    //executes a request and returns a promise of the data being parsed, which should be awaited anyway
    async function request(url, options) {
        const res = await fetch(url, options)

        errHandling(res)

        return res.json()
    }

    //checks if the response status is ok
    function errHandling(res) {
        if (!res.ok) {
            throw new Error('El problemo' + res.status)
        }
    }
})()