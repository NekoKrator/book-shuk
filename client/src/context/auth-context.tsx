import { makeAutoObservable } from 'mobx'

class AuthState {
    token: string | null = null
    username: string | null = null

    constructor() {
        makeAutoObservable(this)
        this.loadFromLocalStorage()
    }

    login(credentials: { token: string; username: string }) {
        localStorage.setItem('token', credentials.token)
        localStorage.setItem('username', credentials.username)
        this.token = credentials.token
        this.username = credentials.username
    }

    private loadFromLocalStorage() {
        this.token = localStorage.getItem('token')
        this.username = localStorage.getItem('username')
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        this.token = null
        this.username = null
    }

    isAuthenticated() {
        return !!this.token
    }
}

export const authState = new AuthState()
