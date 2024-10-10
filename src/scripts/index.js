
document.getElementById('btn-search').addEventListener('click', () => {
    const username = document.getElementById('input-search').value

    getUserProfile(username)
})


document.getElementById('input-search').addEventListener('keyup', (e) => {
    const username = e.target.value
    const key = e.wich || e.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) {
        getUserProfile(username)
    }
})




async function user(username) {
    const response = await fetch(`https://api.github.com/users/${username}`)
    return await response.json()
}

async function repos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`)
    return await response.json()
}

function getUserProfile(username) {


    user(username).then(userData => {
        console.log(userData);

        let userInfo = `<div class="info"><img src="${userData.avatar_url}" alt="Foto do perfil do usuário"/>
        <div class="data">
            <h1>${userData.name ?? 'Não possui nome cadastrado 😢'}</h1>
            <p>${userData.bio ?? 'Não possui bio cadastrada 😢'}</p>
        </div>
        </div>
        `

        document.querySelector('.profile-data').innerHTML = userInfo
        getUserRepositories(username)
    })
}

function getUserRepositories(username) {
    repos(username).then(reposData => {
        let repositoriesItens = ""
        reposData.forEach(repo => {
            repositoriesItens += `<li><a href="${repo.html_url}" target="">${repo.name}</a></li>`
        })

        document.querySelector('.profile-data').innerHTML += `<div class="repositories section">
                                                                <h2>Repositórios</h2>
                                                                <ul>${repositoriesItens}</ul>
                                                              </div>`

    })
}


