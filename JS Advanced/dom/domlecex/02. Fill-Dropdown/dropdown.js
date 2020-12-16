function addItem() {
    let text = document.getElementById('newItemText').value
    let value = document.getElementById('newItemValue').value
    let option = document.createElement('option')
    option.setAttribute('value', value)
    option.textContent = text
    document.getElementById('menu').appendChild(option)
    document.getElementById('newItemText').value = ''
    document.getElementById('newItemValue').value = ''
}