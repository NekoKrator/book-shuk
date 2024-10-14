import { makeAutoObservable } from 'mobx'

class AuthState {
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

    private loadUserFromLocalStorage() {
        const token = localStorage.getItem('token')
        const username = localStorage.getItem('username')
        if (token && username) {
            this.user = { username, token }
        }
    }
}

export const authState = new AuthState()
