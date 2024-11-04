import { makeAutoObservable, runInAction } from 'mobx'
import axios from 'axios'
import { BookTypes } from '@/types/types'

class BookState {
    allBooks: BookTypes[] = []
    loading = false
    error: string | null = null

    constructor() {
        makeAutoObservable(this)
        this.loadAllBooks()
    }

    async loadAllBooks() {
        this.loading = true
        this.error = null

        try {
            const response = await axios.get<BookTypes[]>('http://localhost:3000/books/get')
            runInAction(() => {
                this.allBooks = response.data.map((book) => ({
                    ...book,
                    users: book.users || [],
                }))
                this.loading = false
            })
        } catch (error) {
            runInAction(() => {
                this.error = (error as Error).message
                this.loading = false
            })
        }
    }

    get mostSavedBook() {
        return this.allBooks.reduce(
            (maxBook, currentBook) => {
                const currentUserCount = (currentBook.users || []).length
                const maxUserCount = (maxBook.users || []).length
                return currentUserCount > maxUserCount ? currentBook : maxBook
            },
            { _id: '', title: '', author: '', users: [] } as BookTypes
        )
    }

    get mostPopularGenre() {
        const genreCount = this.allBooks.reduce((acc, book) => {
            if (book.tags) {
                book.tags.forEach((tag) => {
                    acc[tag] = (acc[tag] || 0) + 1
                })
            }
            return acc
        }, {} as Record<string, number>)

        const mostPopular = Object.keys(genreCount).reduce((maxGenre, genre) => (genreCount[genre] > (genreCount[maxGenre] || 0) ? genre : maxGenre), '')

        const count = genreCount[mostPopular] || 0
        const totalBooks = this.allBooks.length
        const percentage = totalBooks > 0 ? ((count / totalBooks) * 100).toFixed(2) : '0.00'

        return { genre: mostPopular, count, percentage }
    }
}

export const bookState = new BookState()
