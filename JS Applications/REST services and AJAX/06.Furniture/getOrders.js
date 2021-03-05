(function setupGetOrders() {
    const getBtn = document.getElementById('getBtn')
    const ordersView = document.querySelectorAll('.orders span')
    const url = 'http://localhost:3030/data/orders'

    getBtn.addEventListener('click', getOrders)

    async function getOrders() {

        const user = JSON.parse(sessionStorage.getItem('authToken'))

        try {
            const data = await request(`${url}?where=_ownerId%3D"${user.userId}"`, {
                method: 'GET',
                headers: { "X-Authorization": user.accessToken }
            })

            const orders = data.reduce((a, { order }) => {
                return {
                    items: [...a.items, ...order.map(({ itemName }) => itemName)],
                    bill: a.bill + order.reduce((amount, { itemPrice }) => amount + Number(itemPrice), 0)
                }
            }, { items: [], bill: 0 })

            ordersView[0].textContent = orders.items.join(', ')
            ordersView[1].textContent = orders.bill + ' $'

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