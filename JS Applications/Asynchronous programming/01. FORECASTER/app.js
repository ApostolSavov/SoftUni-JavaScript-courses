function attachEvents() {
    let location = document.getElementById('location');
    let submit = document.getElementById('submit');
    let forecast = document.getElementById('forecast');

    let symbols = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;',
        'deg': '&#176;'
    }

    submit.addEventListener('click', () => {
        fetch(`https://judgetests.firebaseio.com/locations.json`)
            .then(res => {
                if (res.status !== 200) console.log('There was a problem')
                else return res.json()
            })
            .then(data => {
                let place = data.find(x => x.name === location.value)
                return Promise.all([
                    fetch(`https://judgetests.firebaseio.com/forecast/today/${place.code}.json`)
                        .then(res => res.json()).catch(err => err.json()),
                    fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${place.code}.json`)
                        .then(res => res.json()).catch(err => err.json()),
                ])
            })
            .then(data => {
                let [one, three] = [data[0], data[1]]
                let current = forecast.firstElementChild
                let upcoming = forecast.lastElementChild

                current.innerHTML = '<div class="label">Current conditions</div>'
                upcoming.innerHTML = '<div class="label">Three-day forecast</div>'

                current.innerHTML +=
                    `<span class="condition symbol">${symbols[one.forecast.condition]}</span>
                    <span class="condition">
                    <span class="forecast-data">${one.name}</span>
                    <span class="forecast-data">
                    ${one.forecast.low}${symbols.deg}/${one.forecast.high}${symbols.deg}
                    </span>
                    <span class="forecast-data">${one.forecast.condition}</span>
                    </span>`

                upcoming.innerHTML += three.forecast.map(x => {
                    return `<span class="upcoming">
                            <span class="symbol">${symbols[x.condition]}</span>
                            <span class="forecast-data">${three.name}</span>
                            <span class="forecast-data">
                            ${x.low}${symbols.deg}/${x.high}${symbols.deg}
                            </span>
                            <span class="forecast-data">${x.condition}</span>
                            </span>`
                }).join('')
                forecast.style.display = 'block'
            })
            .catch(err => {
                forecast.firstElementChild.textContent = 'Error'
                forecast.lastElementChild.textContent = ''
                forecast.style.display = 'block'
            })
    })
}

attachEvents();