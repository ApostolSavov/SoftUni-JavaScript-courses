(function setupBuy() {
    const buyBtn = document.getElementById('buyBtn')
    const url = 'http://localhost:3030/data/orders'

    buyBtn.addEventListener('click', buyFurniture)

    async function buyFurniture() {
        const checked = Array.from(document.querySelectorAll('tbody input:checked'))

        const items = checked
            .map(x => {
                const item = x.parentElement.parentElement
                return {
                    itemId: item.id,
                    itemName: item.querySelector('td.item-name').textContent.trim(),
                    itemPrice: item.querySelector('td.item-price').textContent.trim()
                }
            })

        if (items.length == 0) {
            return alert('No items selected!')
        }

        const user = JSON.parse(sessionStorage.getItem('authToken'))

        try {
            await request(url, {
                method: 'POST',
                headers: { "X-Authorization": user.accessToken },
                body: JSON.stringify({
                    userId: user.userId,
                    order: items
                })
            })

            checked.forEach(x => x.checked = false)
            alert('Your order was successful!')

        } catch (err) {

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