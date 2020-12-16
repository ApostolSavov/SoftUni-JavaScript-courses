function attachEventsListeners() {
    let daysB = document.getElementById('daysBtn')
    let hoursB = document.getElementById('hoursBtn')
    let minutesB = document.getElementById('minutesBtn')
    let secondsB = document.getElementById('secondsBtn')
    let buttons = Array.from(document.querySelectorAll('input[type="button"]'))

    buttons.forEach(x => {
        x.addEventListener('click', (e) => {
            let seconds = secondsB.previousElementSibling.value
            if (e.target === daysB) seconds = daysB.previousElementSibling.value * 86400
            else if (e.target === hoursB) seconds = hoursB.previousElementSibling.value * 3600
            else if (e.target === minutesB) seconds = minutesB.previousElementSibling.value * 60
            let obj = {
                seconds: seconds,
                days: seconds / 86400,
                hours: seconds / 3600,
                minutes: seconds / 60
            }
            buttons.filter(x => x !== e.target).forEach(x => {
                x.previousElementSibling.value = obj[x.previousElementSibling.id]
            })
        })
    })
}