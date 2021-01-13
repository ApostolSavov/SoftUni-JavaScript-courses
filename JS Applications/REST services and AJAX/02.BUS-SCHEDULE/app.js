function solve() {
    let stopId = 'depot'
    let infoBox = document.getElementById('info').firstElementChild
    let departBtn = document.getElementById('depart')
    let arriveBtn = document.getElementById('arrive')
    let temp = ''

    function depart() {
        fetch(`https://judgetests.firebaseio.com/schedule/${stopId}.json`)
            .then(response => response.json())
            .then(data => {
                infoBox.textContent = `Next stop ${data.name}`
                temp = data
            })
            .catch(error => {
                infoBox.textContent = 'Error'
                departBtn.disabled = true
                arriveBtn.disabled = true
            })
        departBtn.disabled = true
        arriveBtn.disabled = false
    }

    function arrive() {
        infoBox.textContent = `Arriving at ${temp.name}`
        departBtn.disabled = false
        arriveBtn.disabled = true
        stopId = temp.next
    }

    return {
        depart,
        arrive
    };
}

let result = solve();