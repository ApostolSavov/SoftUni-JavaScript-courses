function attachGradientEvents() {
    let box = document.getElementById('gradient')
    let result = document.getElementById('result')

    box.addEventListener('mousemove', (e) => {
        result.textContent = Math.floor((e.offsetX / box.clientWidth) * 100) + '%'
    })
}