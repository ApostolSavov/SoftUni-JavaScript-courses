function solve() {
  let counters = Array.from(document.querySelectorAll('.link-1 p'))
  .map(x => Number(x.innerText[8]))
  let links = Array.from(document.querySelectorAll('.link-1 a'))
  let paragraphs = Array.from(document.querySelectorAll('.link-1 p'))
  let eventEl = document.querySelector('.stage .middled')
  eventEl.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' || e.target.tagName === 'SPAN') {
      let targetIndex = e.target.tagName == 'A' ? e.target : e.target.parentNode
      let index = links.indexOf(targetIndex);
      counters[index]++
      paragraphs[index].innerHTML = `visited ${counters[index]} times`
    }
  })
}