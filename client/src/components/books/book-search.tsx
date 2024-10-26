import React, { useState } from 'react'
import axios from 'axios'
import { observer } from 'mobx-react-lite'
import { userState } from '../../context/user-context'
import { BookTypes, UserTypes, BookItem } from '../../types/types'

const BookSearch: React.FC = observer(() => {
    const [query, setQuery] = useState('')
    const [books, setBooks] = useState<BookTypes[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value
        setQuery(searchQuery)
        if (searchQuery) {
            setLoading(true)
            await fetchBooks(searchQuery)
        } else {
            setBooks([])
        }
    }

    // Update fetchBooks to resolve both errors
    const fetchBooks = async (inputQuery: string) => {
        try {
            const { data } = await axios.get<BookItem[]>('http://localhost:3000/books/search', { params: { query: inputQuery } })

            if (Array.isArray(data)) {
                const fetchedBooks: BookTypes[] = data.map((item) => {
                    const volumeInfo = item.volumeInfo

                    const users: UserTypes[] = item.users
                        ? item.users.map((user) => ({
                              _id: user._id,
                              email: user.email,
                              username: user.username,
                              availableBooks: user.availableBooks || [],
                              password: '', // Placeholder, if needed
                          }))
                        : []

                    return {
                        _id: item.id,
                        googleBookId: item.id,
                        title: volumeInfo.title || 'Unknown Title',
                        author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author',
                        publisher: volumeInfo.publisher || 'Unknown Publisher',
                        publishedDate: volumeInfo.publishedDate ? new Date(volumeInfo.publishedDate) : undefined, // Parse to Date or undefined
                        description: volumeInfo.description || 'No description available',
                        pageCount: volumeInfo.pageCount || 0,
                        language: volumeInfo.language || 'Unknown',
                        smallImage: volumeInfo.imageLinks?.smallThumbnail || null,
                        largeImage: volumeInfo.imageLinks?.thumbnail || null,
                        users: users,
                    }
                })
                setBooks(fetchedBooks)
            } else {
                setError('Unexpected response format')
            }
        } catch (err) {
            console.error('Error fetching books:', err)
            setError('Error fetching books')
            setBooks([])
        } finally {
            setLoading(false)
        }
    }

    const addBookToUser = async (book: BookTypes) => {
        if (!userState.loggedInUser) {
            alert('You need to be logged in to add a book.')
            return
        }

        const { googleBookId, title, author, publisher, publishedDate, description, pageCount, language, smallImage, largeImage } = book

        try {
            const response = await axios.post('http://localhost:3000/books/add', {
                googleBookId,
                title,
                author,
                publisher,
                publishedDate,
                description,
                pageCount,
                language,
                smallImage,
                largeImage,
                username: userState.loggedInUser.username,
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
                {books.map((book, index) => (
                    <li key={book.googleBookId || index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        {book.smallImage && <img src={book.smallImage} alt={`${book.title} cover`} style={{ marginRight: '10px', width: '50px', height: 'auto' }} />}
                        <div>
                            <p>
                                {book.title} - {book.author}
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
