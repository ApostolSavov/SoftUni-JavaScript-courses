function solve() {
   let button = document.getElementById('send')
   let template = document.getElementsByClassName('message my-message')[0]
   let messages = document.getElementById('chat_messages')
   button.addEventListener('click', function () {
      let input = document.getElementById('chat_input')
      let newMsg = template.cloneNode()
      newMsg.textContent = input.value
      if (newMsg) messages.appendChild(newMsg)
      input.value = ''
   })
}


