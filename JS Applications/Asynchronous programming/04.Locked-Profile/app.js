async function lockedProfile() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles'
    const container = document.getElementById('container');

    await (async () => {
        try {
            const res = await fetch(url)

            if (!res.ok) {
                throw new Error('El Problemo occured.')
            }

            const data = await res.json()

            container.innerHTML = Object.values(data)
                .map(userData => template(userData))
                .join('')
        }
        catch (e) {
            console.log(e);
        }
    })()

    container.addEventListener('click', (e) => {
        if (e.target.tagName == 'BUTTON') {
            const btn = e.target
            const lock = btn.parentElement.querySelector('input[value="lock"]')
            const info = btn.previousElementSibling
            const state = ['none', ''].includes(info.style.display) ? true : false

            if (!(lock.checked) && state) {
                info.style.display = 'block'
                btn.textContent = 'Hide it'
            } else if (!(lock.checked) && !state) {
                info.style.display = 'none'
                btn.textContent = 'Show more'
            }
        }
    })

    function template(data) {
        return `<div class="profile">
				<img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="user${data._id}Locked" value="lock" checked>
				<label>Unlock</label>
				<input type="radio" name="user${data._id}Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user${data._id}Username" value="${data.username}" disabled readonly />
				<div id="user1HiddenFields">
					<hr>
					<label>Email:</label>
					<input type="email" name="user${data._id}Email" value="${data.email}" disabled readonly />
					<label>Age:</label>
					<input type="email" name="user${data._id}Age" value="${data.age}" disabled readonly />
				</div>
				<button>Show more</button>
			</div> `
    }
}