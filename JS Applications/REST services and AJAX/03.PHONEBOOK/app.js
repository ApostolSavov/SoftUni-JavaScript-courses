function attachEvents() {
    let loadBtn = document.getElementById('btnLoad')
    let phonebook = document.getElementById('phonebook')
    let createBtn = document.getElementById('btnCreate')
    let personInput = document.getElementById('person')
    let phoneInput = document.getElementById('phone')
    let dataRef = {}

    loadBtn.addEventListener('click', getPhones)

    phonebook.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') {
            let user = e.target.parentElement.textContent.slice(0, -6).split(':')
            let id = dataRef.find(x => x[1].person === user[0] && x[1].phone === user[1])[0]
            fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${id}.json`, { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    getPhones()
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    })

    createBtn.addEventListener('click', function (e) {
        fetch('https://phonebook-nakov.firebaseio.com/phonebook.json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                person: personInput.value,
                phone: phoneInput.value
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data)
                getPhones()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        personInput.value = ''
        phoneInput.value = ''
    })

    function getPhones(e) {
        fetch('https://phonebook-nakov.firebaseio.com/phonebook.json')
            .then(response => response.json())
            .then(data => {
                dataRef = Object.entries(data)
                phonebook.innerHTML = Object.entries(data).map(entry => {
                    return `<li>${entry[1].person}:${entry[1].phone}<button>Delete</button></li>`
                }).join('')
            })
    }
}

attachEvents();