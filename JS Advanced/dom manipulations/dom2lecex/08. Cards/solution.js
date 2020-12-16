function solve() {
   let player1 = document.getElementById('player1Div')
   let player2 = document.getElementById('player2Div')
   let result = document.getElementById('result')
   let history = document.getElementById('history')
   let flag = false;

   [player1, player2].forEach(x => {
      x.addEventListener('click', (e) => {
         if (e.target !== e.currentTarget) {
            let spans = Array.from(result.children)
            if (flag) clear(spans)
            e.target.src = 'images/whiteCard.jpg'
            
            if (x.id === 'player1Div') result.firstElementChild.textContent = e.target.name
            else result.lastElementChild.textContent = e.target.name
               
            if (spans.every(x => x.textContent)) check(spans)
         }
      })
   })

   function check(spans) {
      let card1 = player1.querySelector(`img[name="${spans[0].textContent}"]`)
      let card2 = player2.querySelector(`img[name="${spans[2].textContent}"]`)
      flag = true

      if (+card1.name > +card2.name) {
         card1.style.border = '2px solid green'
         card2.style.border = '2px solid red'
      } else if (+card2.name > +card1.name) {
         card2.style.border = '2px solid green'
         card1.style.border = '2px solid red'
      }
      history.textContent += `[${card1.name} vs ${card2.name}] `
   }

   function clear(spans) {
      spans[0].textContent = ''
      spans[2].textContent = ''
      flag = false
   }
}