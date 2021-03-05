async function loadFurniture() {
    const tbody = document.getElementsByTagName('tbody')[0]
    const url = 'http://localhost:3030/data/furniture'

    try {
        const data = await request(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        tbody.innerHTML = data.map(x => createRow(x)).join('')

    } catch (err) {
        console.log(err);
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

    function createRow(data) {
        return `
                <tr id=${data._id}>
                <td>
                    <img
                        src=${data.img}>
                </td>
                <td class="item-name">
                    <p>${data.name}</p>
                </td>
                <td class="item-price">
                    <p>${data.price}</p>
                </td>
                <td>
                    <p>${data.factor}</p>
                </td>
                <td>
                    <input type="checkbox" ${sessionStorage.getItem('authToken') ? "" : "disabled"}/>
                </td>
                </tr>
            `
    }

}