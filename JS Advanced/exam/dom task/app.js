function solve() {
   const author = document.getElementById('creator')
   const title = document.getElementById('title')
   const category = document.getElementById('category')
   const content = document.getElementById('content')
   const button = document.getElementsByClassName('btn create')[0]
   const main = document.querySelector('main section')
   const archive = document.querySelector('.archive-section ol')

   button.addEventListener('click', (e) => {
      e.preventDefault()

      main.innerHTML +=
         `<article>` +
         `<h1>${title.value}</h1>` +
         `<p>Category:` +
         `<strong>${category.value}</strong>` +
         `</p>` +
         `<p>Creator:` +
         `<strong>${author.value}</strong>` +
         `</p>` +
         `<p>${content.value}</p>` +
         `<div class="buttons">` +
         `<button class="btn delete">Delete</button>` +
         `<button class="btn archive">Archive</button>` +
         `</div>` +
         `</article>`
   })

   main.addEventListener('click', (e) => {
      if (e.target.className == 'btn delete') {
         e.target.parentElement.parentElement.remove()
      } else if (e.target.className == 'btn archive') {
         const archiveTitle = e.target.parentElement.parentElement.firstElementChild.textContent
         e.target.parentElement.parentElement.remove()
         archive.innerHTML +=
            `<li>${archiveTitle}</li>`

         Array.from(archive.children)
            .sort((a, b) => a.textContent.localeCompare(b.textContent))
            .forEach(x => archive.appendChild(x))


      }
   })
}
