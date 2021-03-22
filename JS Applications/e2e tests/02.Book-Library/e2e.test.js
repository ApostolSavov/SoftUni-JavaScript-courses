const { chromium } = require('playwright-chromium');
const { assert } = require('chai');

const host = 'http://localhost:3000';
const mockData = require('./books.json');

function json(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
}

let browser, page;

describe('E2E tests', async function () {
    this.timeout(8000)

    before(async () => { browser = await chromium.launch({ headless: false, slowMo: 500 }) })
    after(async () => { await browser.close })
    beforeEach(async () => { page = await browser.newPage(); await page.goto(host) })
    afterEach(async () => { await page.close() })

    it('Load books', async () => {
        //setting mock data to fulfill the incoming request and clicking the load button
        await page.route('**/jsonstore/collections/books*', (request) => request.fulfill(json(mockData)))
        await page.click('#loadBooks')
        //getting the text content of all rows in the table body
        const rows = await page.$$eval('tbody>tr', rows => rows.map(row => row.textContent))
        //checking if the correct title and author are present in the expected row
        assert.include(rows[0], 'Harry Potter and the Philosopher\'s Stone')
        assert.include(rows[0], 'J.K.Rowling')
        assert.include(rows[1], 'C# Fundamentals')
        assert.include(rows[1], 'Svetlin Nakov')
    })

    it('Add book', async () => {
        //making sure the right from is visible
        assert.equal(await (await page.$('#createForm')).isVisible(), true)
        //setting a handler for the alert dialog to save the message
        let alertMsg = ''
        page.on('dialog', async alert => { alertMsg = alert.message(); setTimeout(async () => await alert.dismiss(), 500) })
        //checking the empty field validation message with no filled fields
        await page.click('#createForm>button')
        assert.equal(alertMsg, 'All fields are required!')
        //reseting the message variable
        alertMsg = ''
        //checking the validation if only 1 field is filled
        await (await page.$('input[name="title"]')).fill('1984')
        await page.click('#createForm>button')
        assert.equal(alertMsg, 'All fields are required!')
        //setting the route to be fulfilled with the data from the sent request (not hardcoded data)
        await page.route('**/jsonstore/collections/books*', (route, request) => route.fulfill(json(request.postData())))
        //filling the fields properly and awaiting to intercept the request after clicking
        await (await page.$('input[name="title"]')).fill('1984')
        await (await page.$('input[name="author"]')).fill('George Orwell')
        const [request] = await Promise.all([
            page.waitForRequest(request => request.url().includes('/jsonstore/collections/books') && request.method() == 'POST'),
            page.click('#createForm>button')
        ])
        //checking if the post request data is as expected
        assert.deepEqual(JSON.parse(request.postData()), { title: '1984', author: 'George Orwell' })
    })

    it('Edit book', async () => {
        //loading the books
        await page.route('**/jsonstore/collections/books*', (route) => route.fulfill(json(mockData)))
        await page.click('#loadBooks')
        //setting the edit request to be fulfilled with the book data
        const book1 = { title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K.Rowling' }
        await page.route('**/jsonstore/collections/books/*', (route) => route.fulfill(json(book1)))
        //waiting for the request for the specific book
        const [request1] = await Promise.all([
            page.waitForRequest(request => request.url().includes('d953e5fb-a585-4d6b-92d3-ee90697398a0') && request.method() == 'GET'),
            page.click('tbody>tr button.editBtn')
        ])
        //checking if the edit form is visible, the response having the right data and the form fields being filled with it
        assert.equal(await (await page.$('#editForm')).isVisible(), true)
        assert.deepEqual(await (await request1.response()).json(), { title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K.Rowling' })
        assert.equal(await page.$eval('#editForm>input[name="title"]', (el) => el.value), 'Harry Potter and the Philosopher\'s Stone')
        assert.equal(await page.$eval('#editForm>input[name="author"]', (el) => el.value), 'J.K.Rowling')
        //changing the title
        await (await page.$('#editForm>input[name="title"]')).fill('Harry Potter and the Chamber of Secrets')
        //setting up the PUT request data
        const updatedBook = {
            title: await page.$eval('#editForm>input[name="title"]', (el) => el.value),
            author: await page.$eval('#editForm>input[name="author"]', (el) => el.value)
        }
        await page.route('**/jsonstore/collections/books/*', (route) => route.fulfill(json(updatedBook)))
        //waiting for the request
        const [request2] = await Promise.all([
            page.waitForRequest(request => request.url().includes('d953e5fb-a585-4d6b-92d3-ee90697398a0') && request.method() == 'PUT'),
            page.click('#editForm>button')
        ])
        //checking if the PUT request has the expected data
        assert.deepEqual(JSON.parse(request2.postData()), { title: 'Harry Potter and the Chamber of Secrets', author: 'J.K.Rowling' })
    })

    it.only('Delete book', async () => {
        //loading books
        await page.route('**/jsonstore/collections/books*', (route) => route.fulfill(json(mockData)))
        await page.click('#loadBooks')
        //setting up the request fulfillment
        await page.route('**/jsonstore/collections/books/*', (route) => route.fulfill({
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }))
        //setting a handler for the alert dialog to be accepted
        page.on('dialog', alert => setTimeout(() => alert.accept(), 500))
        //waiting for the request
        const [request] = await Promise.all([
            page.waitForRequest(request => request.url().includes('d953e5fb-a585-4d6b-92d3-ee90697398a0') && request.method() == 'DELETE'),
            page.click('tbody>tr button.deleteBtn')
        ])
        //asserting the correct id for the post to be deleted and the method
        assert.equal(request.method(), 'DELETE')
        assert.equal(request.url().includes('d953e5fb-a585-4d6b-92d3-ee90697398a0'), true)
    })
})