function solve() {
  let generateInput = document.getElementsByTagName('textarea')[0]
  let generateBtn = generateInput.nextElementSibling
  let output = document.getElementsByTagName('textarea')[1]
  let buyBtn = output.nextElementSibling
  let table = document.getElementsByTagName('tbody')[0]

  generateBtn.addEventListener('click', () => {
    JSON.parse(generateInput.value).forEach(item => {
      table.innerHTML += `<tr><td><img src=${item.img}></td>
                          <td><p>${item.name}</p></td>
                          <td><p>${item.price}</p></td>
                          <td><p>${item.decFactor}</p></td>
                          <td><input type="checkbox"/></td></tr>`
    })
  })

  buyBtn.addEventListener('click', (e) => {
    let checked = Array.from(table.children).filter(row => row.querySelector('input:checked'))

    output.value = 'Bought furniture: ' +
      checked.map(x => x.getElementsByTagName('p')[0].textContent).join(', ')
    output.value += '\nTotal price: ' +
      (checked.reduce((a, b) => a + +b.getElementsByTagName('p')[1].textContent, 0)).toFixed(2)
    output.value += '\nAverage decoration factor: ' +
      checked.reduce((a, b) => a + +b.getElementsByTagName('p')[2].textContent, 0) / checked.length
  })
}