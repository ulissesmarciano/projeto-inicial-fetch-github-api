const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info"><img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                            <div class="data">
                                <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                <p>👥 Seguidores: ${user.followers}</p>
                                <p>👤 Seguidores: ${user.following}</p>
                            </div>
                        </div>`
                        

        let repositorieItens = ''
        user.repositories.forEach(repo => repositorieItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
            <h2>Repositórios</h2>
            <ul>${repositorieItens}</ul>
            </div>`
        } 

        // let eventItens = ''
        // user.events.forEach(event => eventItens += `<li ><a>${event.repo.name}</a> - ${event.payload.commits?.[0].message}</li>`)
        
        // if (user.events.type === 'PushEvent' || 'CreateEvent'){
        //     this.userProfile.innerHTML += `<div class="events section">
        //     <h2>Eventos</h2>
        //     <ul>${eventItens}</ul>
        //     </div>`
        // }

        let eventListFiltered = user.events.filter(
            event => event.type === "PushEvent" || event.type === "CreateEvent"
        )
        let eventList = eventListFiltered.splice(0, 10)
        let events  = ''

        eventList.forEach(event => {
            let eventRepoName = ''
            let eventCommit = ''
            if (event.type === "PushEvent"){
                eventRepoName = event.repo.name
                eventCommit = event.payload.commits[0].message

            } else if (event.type === "CreateEvent"){
                eventRepoName = event.repo.name
                eventCommit = "Não possui commits"
            } else return

            events += `<li><a href="https://github.com/${eventRepoName}" target="_blank">${eventRepoName}</a> - ${eventCommit}</li>`
        })
        
        this.userProfile.innerHTML += `<div class="events">
                                        <h2>Eventos</h2>
                                        <ul>${events}</ul>
                                      </div>`
        
    },


    

    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    },
}

export { screen }