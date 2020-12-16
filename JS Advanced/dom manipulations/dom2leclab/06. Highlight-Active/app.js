function focus() {
    let eventContainer = Array.from(document.getElementsByTagName('div')[0].children)

    eventContainer.forEach(x => {
        x.lastElementChild.addEventListener('focus', (e) => {
            e.target.parentNode.classList.add('focused')
        })
        x.lastElementChild.addEventListener('blur', (e) => {
            e.target.parentNode.classList.remove('focused')
        })

    })
}