function solve() {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'
    let rows = Array.from(document.querySelectorAll('li'))
    let button = document.querySelector('button')
    button.addEventListener('click', function () {
        let input = document.querySelector('input').value
        if (input) {
            let index = alphabet.indexOf(input[0].toLowerCase())
            input = input[0].toUpperCase() + input.slice(1).toLowerCase()
            if (rows[index].textContent === '') rows[index].textContent += `${input}`
            else rows[index].textContent += `, ${input}`
            document.querySelector('input').value = ''
        }
    })
}