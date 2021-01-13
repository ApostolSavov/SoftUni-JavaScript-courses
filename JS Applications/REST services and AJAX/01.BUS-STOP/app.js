function getInfo() {
    let stopId = document.getElementById('stopId')
    let stopName = document.getElementById('stopName')
    let busesList = document.getElementById('buses')

    fetch(`https://judgetests.firebaseio.com/businfo/${stopId.value}.json`)
        .then(response => response.json())
        .then(data => {
            stopName.textContent = data.name
            busesList.innerHTML = Object.entries(data.buses).map(x =>{
               return `<li>Bus ${x[0]} arrives in ${x[1]}</li>`
            }).join('')
        })
        .catch((error) => {
            stopName.textContent = 'Error'
          })
}