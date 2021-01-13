function attachEvents() {
    let loadBtn = document.querySelector('.load')
    let addBtn = document.querySelector('.add')
    let catches = document.getElementById('catches')
    let catchForm = document.getElementById('addForm')

    loadBtn.addEventListener('click', loadEntries)

    addBtn.addEventListener('click', function (e) {
        let values = getInputValues()

        fetch('https://fisher-game.firebaseio.com/catches.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "angler": values.angler,
                "weight": values.weight,
                "species": values.species,
                "location": values.location,
                "bait": values.bait,
                "captureTime": values.captureTime
            })
        })
            .then(res => {
                if (res.status != 200) console.log('There was a problem')
                else {
                    console.log('Succesfully added entry')
                    clearFields()
                    loadEntries()
                }
            })
            .catch(err => console.log('Request was rejected:', err.status))
    })

    catches.addEventListener('click', function (e) {
        if (e.target.className == 'update') {
            let values = getInputValues()
            let id = e.target.parentElement.attributes['data-id'].nodeValue

            fetch(`https://fisher-game.firebaseio.com/catches/${id}.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "angler": values.angler,
                    "weight": values.weight,
                    "species": values.species,
                    "location": values.location,
                    "bait": values.bait,
                    "captureTime": values.captureTime
                })
            })
                .then(res => {
                    if (res.status != 200) console.log('There was a problem')
                    else {
                        console.log('Succesfully updated entry')
                        clearFields()
                        loadEntries()
                    }
                })
                .catch(err => console.log('Request was rejected:', err.status))
        } else if (e.target.className == 'delete') {
            let id = e.target.parentElement.attributes['data-id'].nodeValue

            fetch(`https://fisher-game.firebaseio.com/catches/${id}.json`,
                { method: 'DELETE' })
                .then(res => {
                    if (res.status != 200) console.log('There was a problem')
                    else {
                        console.log('Succesfully deleted entry')
                        loadEntries()
                    }
                })
                .catch(err => console.log('Request was rejected:', err.status))
        }
    })

    function getInputValues() {
        return Object.fromEntries(
            Array.from(catchForm.querySelectorAll('.angler, .weight, .species, .location, .bait, .captureTime'))
                .map(x => [x.className, x.value])
        )
    }

    function loadEntries(e) {
        fetch('https://fisher-game.firebaseio.com/catches.json')
            .then(res => {
                if (res.status != 200) console.log('There was a problem')
                else return res.json()
            })
            .then(data => {
                catches.innerHTML = Object.entries(data).map(x => {
                    return `<div class="catch" data-id="${x[0]}">
                        <label>Angler</label>
                        <input type="text" class="angler" value="${x[1].angler}" />
                        <hr>
                        <label>Weight</label>      
                        <input type="number" class="weight" value="${x[1].weight}" />
                        <hr>
                        <label>Species</label>
                        <input type="text" class="species" value="${x[1].species}" />
                        <hr>
                        <label>Location</label>
                        <input type="text" class="location" value="${x[1].location}" />
                        <hr>
                        <label>Bait</label>
                        <input type="text" class="bait" value="${x[1].bait}" />
                        <hr>
                        <label>Capture Time</label>
                        <input type="number" class="captureTime" value="${x[1].captureTime}" />
                        <hr>
                        <button class="update">Update</button>
                        <button class="delete">Delete</button>
                        </div>`
                }).join('')
            })
            .catch(err => console.log('Request was rejected:', err.status))
    }

    function clearFields() {
        Array.from(catchForm.querySelectorAll('.angler, .weight, .species, .location, .bait, .captureTime'))
            .forEach(x => x.value = '')
    }
}

attachEvents();

