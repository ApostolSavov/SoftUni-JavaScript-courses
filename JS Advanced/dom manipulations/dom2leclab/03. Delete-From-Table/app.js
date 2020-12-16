function deleteByEmail() {
    let data = {}
    Array.from(document.getElementsByTagName('tbody')[0].children)
        .forEach(x => {
            data[x.lastElementChild.textContent] = x.lastElementChild
        })
    let input = document.querySelector('input[name="email"]')
    let result = document.getElementById('result')

    if (data[input.value]) {
        data[input.value].parentNode.remove()
        delete data[input.value]
        result.textContent = 'Deleted.'
    } else {
        result.textContent = 'Not found.'
    }
}