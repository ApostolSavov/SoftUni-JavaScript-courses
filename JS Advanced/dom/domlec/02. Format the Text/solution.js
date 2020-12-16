function solve() {
  let input = document.querySelector('p#input').innerHTML.split('.')
  let output = document.querySelector('div #output')
  let limit = Math.ceil(input.length / 3)

  for (let i = 0; i < limit; i++) {
    let createPar = document.createElement('p')
    createPar.innerHTML = input.splice(0, 3).filter(x => x).join('.') + '.'
    output.appendChild(createPar)
  }
}
