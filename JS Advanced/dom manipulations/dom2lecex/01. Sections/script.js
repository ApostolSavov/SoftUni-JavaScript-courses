function create(words) {
   let content = document.getElementById('content')
   let divs = []
   words.forEach(x => {
      let temp = document.createElement('div')
      temp.innerHTML = `<p>${x}</p>`
      temp.firstElementChild.style.display = 'none'
      temp.addEventListener('click', (e) => {
         temp.firstElementChild.style.display = 'block'
      })
      divs.push(temp)
   })
   divs.forEach(x => {
      content.appendChild(x)
   })
}