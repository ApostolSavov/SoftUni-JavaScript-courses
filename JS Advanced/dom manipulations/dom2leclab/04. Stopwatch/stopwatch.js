function stopwatch() {
    let timer = document.getElementById('time')
    let start = document.getElementById('startBtn')
    let stop = document.getElementById('stopBtn')
    let time = 0
    let intervalId = null

    start.addEventListener('click', (e) => {
        timer.textContent = '00:00'
        stop.disabled = false
        start.setAttribute('disabled', 'true')
        intervalId = setInterval(() => {
            time++
            let minutes = Math.trunc(time / 60) < 10 ? `0${Math.trunc(time / 60)}` : (time % 60)
            let seconds = (time % 60) < 10 ? `0${(time % 60)}` : (time % 60)
            timer.textContent = `${minutes}:${seconds}`
        }, 1000)
    })
    stop.addEventListener('click', (e) => {
        clearInterval(intervalId)
        stop.disabled = true
        start.disabled = false
    })
}