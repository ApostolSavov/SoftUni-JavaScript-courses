function addItem() {
    let input = document.getElementById('newText')
    let item = document.createElement('li')
    let link = '<a href="#">[Delete]</a>'
    item.innerHTML = input.value + link
    item.addEventListener('click', (e) => { 
        if(e.target.tagName === 'A') e.target.parentNode.remove()
    })
    document.getElementById('items').appendChild(item)
}