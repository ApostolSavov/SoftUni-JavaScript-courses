(function init() {
    
    loadFurniture()

    loginSwitch()

    async function logout(e) {
        e.preventDefault()

        try {
            await fetch('http://localhost:3030/users/logout', {
                method: 'GET',
                headers: { "X-Authorization": sessionStorage.getItem('authToken') }
            })
        } catch (err) {
            console.log(err);
            alert('Error ' + err.message)
        }
        sessionStorage.removeItem('authToken')
        alert('You have logged out.')
        location.pathname = 'index.html'
    }

    function loginSwitch() {
        if (sessionStorage.getItem('authToken')) {
            document.getElementById('logoutBtn').addEventListener('click', logout, { once: true })
        }
    }
})()