import { makeAutoObservable } from 'mobx'

class AuthStore {
    user: { username: string; token: string } | null = null

    constructor() {
        makeAutoObservable(this)
        this.loadUserFromLocalStorage()
    }

    login(credentials: { token: string; username: string }) {
        localStorage.setItem('token', credentials.token)
        localStorage.setItem('username', credentials.username)
        this.user = { username: credentials.username, token: credentials.token }
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        this.user = null
    }

    private loadUserFromLocalStorage() {
        const token = localStorage.getItem('token')
        const username = localStorage.getItem('username')
        if (token && username) {
            this.user = { username, token }
        }
    }
}

export const authStore = new AuthStore()
