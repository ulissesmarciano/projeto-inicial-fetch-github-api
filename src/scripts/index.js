import { getUser } from "./services/user.js"
import { getRepositories } from "./services/repositories.js"

import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"

document.getElementById('btn-search').addEventListener('click', () => {
    const username = document.getElementById('input-search').value
    if(validateEmptyInput(username)){
        return
    }
    getUserData(username)
})



document.getElementById('input-search').addEventListener('keyup', (e) => {
    const username = e.target.value
    const key = e.wich || e.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) {
        if(validateEmptyInput(username)){
            return
        }
        getUserData(username)
    }
})



function validateEmptyInput(username){
    if (username.length === 0) {
        alert('Preencha o campo com o nome do usuário do Github')
        return true
    }
}



async function getUserData(username) {

    const userResponse = await getUser(username)

    if (userResponse.message === "Not Found") {
        return screen.renderNotFound()
    }
    const repositoriesResponse = await getRepositories(username)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)

    screen.renderUser(user)
    

    // getUser(username).then(userData => {

   
}



