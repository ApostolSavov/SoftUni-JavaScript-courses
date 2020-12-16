function growingWord() {
  let color = {
    red: 'blue',
    blue: 'green',
    green: 'red'
  }
  let paragraph = document.querySelector('#exercise p')
  let currSize = paragraph.style.fontSize
  if (!paragraph.style.color) {
    paragraph.style.color = color.red
    paragraph.style.fontSize = '2px'
  }
  else {
    paragraph.style.color = color[paragraph.style.color]
    paragraph.style.fontSize = `${currSize.slice(0, currSize.length - 2) * 2}px`
  }
}