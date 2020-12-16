function notify(message) {
    let notification = document.getElementById('notification')
    notification.style.display = 'block'
    notification.textContent = message
    let timeoutId = setTimeout(() =>{
        notification.textContent = ''
        notification.style.display = 'none'
    } , 2000);
}