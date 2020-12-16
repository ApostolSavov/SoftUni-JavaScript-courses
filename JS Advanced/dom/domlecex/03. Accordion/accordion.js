function toggle() {
    let info = document.getElementById('extra')
    let button = document.getElementsByClassName('button')[0]
    if (button.innerHTML === 'More') {
        button.innerHTML = 'Less'
        info.style.display = 'block'
    }
    else {
        button.innerHTML = 'More'
        info.style.display = 'none'
    }
}
