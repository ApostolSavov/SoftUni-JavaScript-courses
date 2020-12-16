function subtract() {
    let first = +document.getElementById('firstNumber').value
    let second = +document.getElementById('secondNumber').value
    let result = document.createElement('div')
    result.innerHTML = first - second
    document.getElementById('result').appendChild(result)
}