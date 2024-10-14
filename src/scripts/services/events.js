import { baseUrl } from "../variables.js"

async function getEvents(username) {
    const response = await fetch(`${baseUrl}/${username}/events`)
    return await response.json()
}

export { getEvents }
