function solve() {
    let rows = Array.from(document.querySelectorAll('tbody tr')).map(x => Array.from(x.children))
    let table = document.getElementsByTagName('table')[0]
    let output = document.querySelector('#check p')
    let [checkBtn, clearBtn] = Array.from(document.getElementsByTagName('button'))
    let allCells = Array.from(document.getElementsByTagName('input'))

    checkBtn.addEventListener('click', () => {
        let sums = [0, 0, 0, 0, 0, 0]
        for (let j = 0; j < 3; j++) {
            sums[0] += +rows[0][j].firstElementChild.value
            sums[1] += +rows[1][j].firstElementChild.value
            sums[2] += +rows[2][j].firstElementChild.value
            sums[3] += +rows[j][0].firstElementChild.value
            sums[4] += +rows[j][1].firstElementChild.value
            sums[5] += +rows[j][2].firstElementChild.value
        }
        if (sums.every(x => x === sums[0] && sums[0] != 0)) {
            table.style.border = '2px solid green'
            output.style.color = 'green'
            output.textContent = 'You solve it! Congratulations!'
        } else {
            table.style.border = '2px solid red'
            output.style.color = 'red'
            output.textContent = 'NOP! You are not done yet...'
        }
    })

    clearBtn.addEventListener('click', (e) => {
        allCells.forEach(cell => cell.value = '')
        table.style.border = ''
        output.style.color = ''
        output.textContent = ''
    })
}