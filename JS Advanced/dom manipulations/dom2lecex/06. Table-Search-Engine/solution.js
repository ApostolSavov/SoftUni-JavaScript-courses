function solve() {
   let input = document.getElementById('searchField')
   let button = document.getElementById('searchBtn')
   let rows = Array.from(document.getElementsByTagName('tbody')[0].children)

   button.addEventListener('click', (e) => {
      Array.from(document.querySelectorAll('tr.select')).forEach(x => x.classList.remove('select'))
      let match = input.value
      input.value = ''
      if (match) {
         rows.forEach(tr => {
            (Array.from(tr.children)).forEach(td => {
               if (td.textContent.includes(match)) {
                  tr.classList.add('select')
               }
            })
         })
      }
   })
}