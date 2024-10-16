import { baseUrl } from "../variables.js"

async function getEvents(username) {
    const response = await fetch(`${baseUrl}/${username}/events`)
    const events = await response.json()
    return events.filter(element => element.type === 'PushEvent' || element.type === 'CreateEvent').splice(0, 10)
    
}

export { getEvents }
