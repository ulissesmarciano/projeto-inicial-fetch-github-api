const user = {
    avatarUrl: '',
    name: '',
    bio: '',
    userName: '',
    repositories: [],
    following: '',
    followers: '',
    events: [],
    setInfo(gitHubUser){
        this.avatarUrl = gitHubUser.avatar_url
        this.name = gitHubUser.name
        this.bio = gitHubUser.bio
        this.userName = gitHubUser.login
        this.following = gitHubUser.following
        this.followers = gitHubUser.followers
    },

    setRepositories(gitHubRepositories){
        this.repositories = gitHubRepositories
    },

    setEvents(gitHubEvents){
        //this.events.payload.commits[0].message = gitHubEvents.name
        this.events = gitHubEvents
    }
    

}

export { user }