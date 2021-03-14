export async function request(url, options) {
    const res = await fetch(url, options)

    errHandling(res)

    return res.json()
}

function errHandling(res) {
    if (!res.ok) {
        throw new Error('El problemo: ' + res.status)
    }
}