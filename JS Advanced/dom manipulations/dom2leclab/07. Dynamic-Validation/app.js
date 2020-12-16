function validate() {
    let pattern = /[a-z]+@[a-z]+\.[a-z]+/
    let input = document.getElementById('email')

    input.addEventListener('change', (e) => {
        if (!pattern.test(e.target.value)){
            input.classList.add('error')
        } else {
            input.classList.remove('error')
        }
    })
}