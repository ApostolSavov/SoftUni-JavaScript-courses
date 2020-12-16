function addItem() {
    let input = document.getElementById('newItemText')
    let item = document.createElement('li')

    item.textContent = input.value
    document.getElementById('items').appendChild(item)
}