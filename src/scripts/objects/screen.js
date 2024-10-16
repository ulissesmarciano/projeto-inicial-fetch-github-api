const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info"><img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                            <p>👥 Seguidores: ${user.followers}</p>
                                            <p>👤 Seguidores: ${user.following}</p>
                                        </div>
                                      </div>`


        let repositorieItens = ''
        user.repositories.forEach(repo => repositorieItens +=   `<li>
                                                                    <a href="${repo.html_url}" target="_blank">${repo.name}
                                                                        <div class="languages">
                                                                            <p class="item">🍴 ${repo.forks || "Sem forks"}</p>
                                                                            <p class="item">⭐ ${repo.stargazers_count || "Sem estrelas"}</p>
                                                                            <p class="item">👀${repo.watchers || "Sem vizualizações"}</p>
                                                                            <p class="item">👨‍💻${repo.language ?? "Não possui linguagem"}</p>
                                                                        </div>
                                                                    </a>
                                                                </li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
            <h2>Repositórios</h2>
            <ul>${repositorieItens}</ul>
            </div>`
        }

        let eventsItens = ''

        user.events.forEach(event => {
            let eventRepoName = ''
            let eventCommit = ''
            if (event.type === "PushEvent") {
                eventRepoName = event.repo.name
                eventCommit = event.payload.commits[0].message

            } else if (event.type === "CreateEvent") {
                eventRepoName = event.repo.name
                eventCommit = "Não possui commits"
            } else return

            eventsItens += `<li><a href="https://github.com/${eventRepoName}" target="_blank">${eventRepoName}</a> - ${eventCommit}</li>`
        })

        this.userProfile.innerHTML += `<div class="events">
                                        <h2>Eventos</h2>
                                        <ul>${eventsItens}</ul>
                                      </div>`

    },




    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    },
}

export { screen }