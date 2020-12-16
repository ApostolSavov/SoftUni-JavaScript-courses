function solve() {
   let output = document.getElementsByTagName('textarea')[0]
   let eventSource = document.getElementsByClassName('shopping-cart')[0]
   let cart = [[], 0]

   eventSource.addEventListener('click', (e) => {
      if (e.target.className === 'add-product') {
         let name = e.target.parentNode.previousElementSibling.firstElementChild.innerHTML
         let money = e.target.parentNode.nextElementSibling.innerHTML
         cart[0].push(name)
         cart[1] += +money
         output.innerHTML += `Added ${name} for ${money} to the cart.\n`

      } else if (e.target.className === 'checkout') {
         output.innerHTML += `You bought ${[...new Set(cart[0])].join(', ')} for ${(cart[1]).toFixed(2)}.`
         Array.from(document.getElementsByTagName('button')).forEach(x => x.setAttribute('disabled', ''))
      }
   })
}