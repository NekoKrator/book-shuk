import React, { useState } from 'react'
import axios from 'axios'
import { observer } from 'mobx-react-lite'
import { userState } from '../../context/user-context' // Adjust the path accordingly

interface VolumeInfo {
    title: string
    authors?: string[]
}

interface Book {
    id: string
    volumeInfo: VolumeInfo
}

const BookSearch: React.FC = observer(() => {
    const [query, setQuery] = useState('')
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputQuery = e.target.value
        setQuery(inputQuery)

        if (inputQuery.length === 0) {
            setBooks([])
            setError('')
            return
        }

        setLoading(true)
        setError('')

        try {
            const response = await axios.get(`http://localhost:3000/books/search`, {
                params: { query: inputQuery },
            })

            if (Array.isArray(response.data)) {
                setBooks(response.data)
            } else {
                console.error('Unexpected response format:', response.data)
                setBooks([])
                setError('Unexpected response format')
            }
        } catch (error) {
            console.error('Error fetching books:', error)
            setError('Error fetching books')
            setBooks([])
        } finally {
            setLoading(false)
        }
    }

    const addBookToUser = async (book: Book) => {
        const { id, volumeInfo } = book
        const { title, authors } = volumeInfo

        console.log('Logged In User:', userState.loggedInUser)
        if (!userState.loggedInUser) {
            alert('You need to be logged in to add a book.')
            return
        }

        if (!userState.loggedInUser) {
            alert('You need to be logged in to add a book.')
            return
        }

        try {
            const response = await axios.post(`http://localhost:3000/books/add`, {
                bookId: id, // Send only the Google Books API ID
                username: userState.loggedInUser.username, // Send the logged-in user's username
                title: title,
                author: authors ? authors.join(', ') : 'Unknown Author',
            })
            if (response.data.success) {
                alert('The book has been added to your library!')
            } else {
                alert('Error adding book')
            }
        } catch (err) {
            console.error('Error adding book:', err)
        }
    }

    return (
        <div>
            <input type="text" value={query} onChange={handleSearch} placeholder="Search for books" />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {books.length === 0 && !loading && query.length > 0 && <p>Books not found</p>}
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        {book.volumeInfo.title} - {book.volumeInfo.authors?.join(', ')}
                        <button onClick={() => addBookToUser(book)}>Add book!</button>
                    </li>
                ))}
            </ul>
        </div>
    )
})

export default BookSearch
