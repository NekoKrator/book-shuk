import { makeAutoObservable, runInAction } from 'mobx'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

interface DecodedToken {
    username: string
}

class UserState {
    loading = false
    error: string | null = null
    user: { username: string; email: string; availableBooks: { _id: string; title: string; author: string }[] } | null = null
    loggedInUser: { username: string; email: string } | null = null
    availableBooks: { _id: string; title: string; author: string }[] = []

    constructor() {
        makeAutoObservable(this)
        this.loadUserFromToken()
    }

    private async loadUserFromToken() {
        const token = localStorage.getItem('token')
        if (!token) return

        try {
            const decodedToken = jwtDecode<DecodedToken>(token)
            await this.loadLoggedInUser(decodedToken.username)
        } catch (error) {
            console.error('Error decoding token', error)
        }
    }

    async loadLoggedInUser(username: string) {
        try {
            const response = await axios.get(`http://localhost:3000/users/${username}`)
            runInAction(() => {
                this.loggedInUser = { username: response.data.username, email: response.data.email }
            })
        } catch (error) {
            console.error('Error loading logged in user', error)
        }
    }

    async loadUser(username: string) {
        this.loading = true
        this.error = null

        try {
            const response = await axios.get(`http://localhost:3000/users/${username}`)
            runInAction(() => {
                this.user = response.data
                this.availableBooks = response.data.availableBooks || []
                this.loading = false
            })
        } catch (error) {
            runInAction(() => {
                this.error = (error as Error).message
                this.loading = false
            })
        }
    }

    async addBook(book: { title: string; author: string }) {
        try {
            const response = await axios.post(`http://localhost:3000/books`, book)
            runInAction(() => {
                this.availableBooks.push(response.data)
                if (this.user) {
                    this.user.availableBooks.push(response.data)
                }
            })
        } catch (error) {
            console.error('Error adding book:', error)
        }
    }

    isCurrentUser(username: string) {
        return this.loggedInUser?.username === username
    }
}

export const userState = new UserState()
