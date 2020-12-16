function solve() {
    let eventContainer = document.getElementById('quizzie')
    let result = document.querySelector('#results h1')
    let children = Array.from(eventContainer.children).filter(x => x.tagName === 'SECTION')
    let answers = ['onclick', 'JSON.stringify()', 'A programming API for HTML and XML documents']
    let counter = 0
    let right = 0

    eventContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'P' && children[counter].contains(e.target)) {
            if (answers.includes(e.target.innerHTML)) right++

            children[counter].style.display = 'none'
            counter++

            if (counter < 3) {
                children[counter].style.display = 'block'
            } else {
                result.parentNode.parentNode.style.display = 'block'
                if (right < 3) result.innerHTML = `You have ${right} right answers`
                else result.innerHTML = 'You are recognized as top JavaScript fan!'
            }
        }
    })
}
