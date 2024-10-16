import React, { useState } from 'react'
import axios from 'axios'
import { observer } from 'mobx-react-lite'
import { userState } from '../../context/user-context'

interface VolumeInfo {
    title?: string
    authors?: string[]
    imageLinks?: {
        smallThumbnail?: string
        thumbnail?: string
    }
}

interface Book {
    id: string
    volumeInfo?: VolumeInfo
}

const BookSearch: React.FC = observer(() => {
    const [query, setQuery] = useState('')
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchBooks = async (inputQuery: string) => {
        try {
            const { data } = await axios.get('http://localhost:3000/books/search', { params: { query: inputQuery } })
            setBooks(Array.isArray(data) ? data : [])
            if (!Array.isArray(data)) setError('Unexpected response format')
        } catch (err) {
            console.error('Error fetching books:', err)
            setError('Error fetching books')
            setBooks([])
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputQuery = e.target.value
        setQuery(inputQuery)
        setError('')

        if (inputQuery.trim() === '') {
            setBooks([])
            return
        }

        setLoading(true)
        fetchBooks(inputQuery)
    }

    const addBookToUser = async (book: Book) => {
        if (!userState.loggedInUser) {
            alert('You need to be logged in to add a book.')
            return
        }

        const { id, volumeInfo } = book
        if (!volumeInfo) {
            alert('Invalid book data.')
            return
        }

        const { title, authors, imageLinks } = volumeInfo
        const smallImageUrl = imageLinks?.smallThumbnail || ''
        const largeImageUrl = imageLinks?.thumbnail || ''

        try {
            const response = await axios.post('http://localhost:3000/books/add', {
                googleBookId: id,
                username: userState.loggedInUser.username,
                title: title || 'Unknown Title',
                author: authors?.join(', ') || 'Unknown Author',
                smallImage: smallImageUrl,
                largeImage: largeImageUrl,
            })
            alert(response.data.success ? 'The book has been added to your library!' : 'Error adding book')
        } catch (err) {
            console.error('Error adding book:', err)
        }
    }

    return (
        <div>
            <input type="text" value={query} onChange={handleSearch} placeholder="Search for books" />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !books.length && query && <p>No books found</p>}
            <ul>
                {books.map((book) => (
                    <li key={book.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        {book.volumeInfo?.imageLinks?.smallThumbnail && <img src={book.volumeInfo.imageLinks.smallThumbnail} alt={`${book.volumeInfo.title || 'Book'} cover`} style={{ marginRight: '10px', width: '50px', height: 'auto' }} />}
                        <div>
                            <p>
                                {book.volumeInfo?.title || 'Unknown Title'} - {book.volumeInfo?.authors?.join(', ') || 'Unknown Author'}
                            </p>
                            <button onClick={() => addBookToUser(book)}>Add book!</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
})

export default BookSearch
