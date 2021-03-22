const { chromium } = require('playwright-chromium');
const { assert } = require('chai');

const host = 'http://localhost:3000';
const mockData = require('./messenger.json');

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
    this.timeout(6000)

    before(async () => { browser = await chromium.launch({ headless: false, slowMo: 500 }) })
    after(async () => { await browser.close })
    beforeEach(async () => { page = await browser.newPage(); await page.goto(host) })
    afterEach(async () => { await page.close() })

    it('Loading messages', async () => {
        //setting the mock data and loading it
        await page.route('**/jsonstore/messenger*', (request) => request.fulfill(json(mockData)))
        await page.click('#refresh')
        //setting the strings to compare
        const actualString = await page.$eval('#messages', (el) => el.value)
        const expectedString = 'Spami: Hello, are you there?\n' +
            'Garry: Yep, whats up :?\n' +
            'Spami: How are you? Long time no see? :)\n' +
            'George: Hello, guys! :))\n' +
            'Spami: Hello, George nice to see you! :)))'
        //checking if the displayed messages are as expected
        assert.equal(actualString, expectedString)
    })

    it('Sending messages', async () => {
        //filling the sample data in the fields
        await (await page.$('#author')).fill('Pesho')
        await (await page.$('#content')).fill('Zdr kpr')
        //setting the request fulfillment with the data sent from the fields (not hardcoded directly as an argument), awaiting the request
        await page.route('**/jsonstore/messenger*', (route, request) => route.fulfill(json(request.postData())))
        const [request] = await Promise.all([
            page.waitForRequest(request => request.url().includes('/jsonstore/messenger') && request.method() == 'POST'),
            page.click('#submit')
        ])
        //checking if the request data corresponds to the expected data
        assert.deepEqual(JSON.parse(request.postData()), { author: 'Pesho', content: 'Zdr kpr' })
    })
})
