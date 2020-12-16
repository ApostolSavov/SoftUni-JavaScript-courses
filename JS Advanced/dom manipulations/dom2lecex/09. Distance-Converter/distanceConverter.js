function attachEventsListeners() {
    let input = document.getElementById('inputDistance')
    let output = document.getElementById('outputDistance')
    let button = document.getElementById('convert')
    let unitIn = input.nextElementSibling
    let unitOut = output.nextElementSibling
    let ratios = {
        km: 1000,
        m: 1,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.34,
        yrd: 0.9144,
        ft: 0.3048,
        in: 0.0254
    }

    button.addEventListener('click', (e) => {
        let base = input.value * ratios[unitIn.value]
        output.value = base / ratios[unitOut.value]
    })
}