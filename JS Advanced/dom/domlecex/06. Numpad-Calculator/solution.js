function solve() {
    let field = document.getElementById('expressionOutput')
    let result = document.getElementById('resultOutput')
    let clear = document.querySelector('button[value="Clear"]')
    let numpad = document.getElementsByClassName('keys')[0]

    operations = {
        '/': (x, y) => x / y,
        '*': (x, y) => x * y,
        '+': (x, y) => x + y,
        '-': (x, y) => x - y
    }

    let operator = ''

    numpad.addEventListener('click', (e) => {
        if (e.target.value !== '=') {
            if (['/', '*', '+', '-'].includes(e.target.value)) {
                operator = e.target.value
                field.textContent += ` ${e.target.value} `
            }
            else field.textContent += e.target.value
            
        } else {
            let arr = field.textContent.split(operator).filter(x => x != ' ')
            if (arr.every(Boolean))
                result.textContent = operations[operator](+arr[0], +arr[1])
            else
                result.textContent = 'NaN'
        }
    })

    clear.addEventListener('click', () => {
        field.innerText = ''
        result.innerText = ''
        first = ''
        operator = ''
        second = ''
    })
}