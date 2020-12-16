function lockedProfile() {
    let button = Array.from(document.querySelectorAll('.profile button'))

    button.forEach(x => {
        x.addEventListener('click', (e) => {
            let lock = e.target.parentElement.querySelector('input[value="lock"]')
            let info = e.target.previousElementSibling
            console.log(info.style.display);
            let state = ['none', ''].includes(info.style.display) ? true : false
            if (!(lock.checked) && state) {
                info.style.display = 'block'
                x.textContent = 'Hide it'
            } else if (!(lock.checked) && !state) {
                info.style.display = 'none'
                x.textContent = 'Show more'
            }
        })
    })
}