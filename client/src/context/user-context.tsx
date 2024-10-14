import { makeAutoObservable, runInAction } from 'mobx'

class UserState {
    users: Array<{ username: string; email: string }> = []
    loading: boolean = false
    error: string | null = null
    user: { username: string; email: string } | null = null
    loggedInUser: { username: string; email: string } | null = null

    constructor() {
        makeAutoObservable(this)
    }

    async fetchUserByUsername(username: string) {
        this.loading = true
        this.error = null

        try {
            const response = await fetch(`http://localhost:3000/users/${username}`)
            if (!response.ok) {
                throw new Error('Не вдалося завантажити користувача')
            }
            const data = await response.json()

            runInAction(() => {
                this.user = data
            })
        } catch (error) {
            console.error(error)
            runInAction(() => {
                this.error = (error as Error).message
            })
        } finally {
            runInAction(() => {
                this.loading = false
            })
        }
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('username')

        this.loggedInUser = null
        this.user = null
    }
}

export const userState = new UserState()
