function loadCommits() {
    let name = document.getElementById('username')
    let repo = document.getElementById('repo')
    let list = document.getElementById('commits')

    fetch(`https://api.github.com/repos/${name.value}/${repo.value}/commits`)
        .then(res => {
            if (res.status !== 200) {
                list.innerHTML = `<li>Error: ${res.status} (${res.statusText})`
            } else {
                return res.json()
            }
        })
        .then(data => {
            list.innerHTML = data.map(x => `<li>${x.commit.author.name}: ${x.commit.message}</li>`).join('')
        })
        .catch(err => console.log(err))
}