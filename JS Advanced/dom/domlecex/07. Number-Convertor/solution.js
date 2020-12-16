function solve() {
    let input = document.getElementById('input')
    let result = document.getElementById('result')
    let select = document.getElementById('selectMenuTo')
    let binary = document.createElement('option')
    let hexa = document.createElement('option')
    let button = document.getElementsByTagName('button')[0]

    let convert = (x, base) => Number(x, base).toString(base)

    binary.value = 'binary'
    binary.innerText = 'Binary'
    hexa.value = 'hexadecimal'
    hexa.innerText = 'Hexadecimal'

    select.appendChild(binary)
    select.appendChild(hexa)

    button.addEventListener('click', () => {
        let index = select.selectedIndex
        let num = input.value
        console.log(select[index].value);
        if (index == 1) result.value = convert(num, 2)
        else if (index == 2) result.value = (convert(num, 16)).toUpperCase()
    })
}
