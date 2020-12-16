function encodeAndDecodeMessages() {
    let [input, output] = Array.from(document.getElementsByTagName('textarea'))
    let [send, show] = Array.from(document.getElementsByTagName('button'))
    let text = []

    send.addEventListener('click', (e) => {
        text = Array.from(input.value).map(x => String.fromCharCode(x.charCodeAt(0) + 1))
        output.value = text.join('')
        input.value = ''
    })

    show.addEventListener('click', (e) => {
        output.value = text.map(x => String.fromCharCode(x.charCodeAt(0) - 1)).join('')
    })
}