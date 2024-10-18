import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { userState } from '../../context/user-context'

interface Book {
    _id: string
    title: string
    author: string
    smallImage?: string
    imageLinks?: {
        smallThumbnail?: string
        thumbnail?: string
    }
}

interface BookListProps {
    books: Book[]
}

const BookList: React.FC<BookListProps> = observer(({ books }) => {
    const { username } = useParams<{ username: string }>()
    const isCurrentUser = userState.isCurrentUser(username || '')

    useEffect(() => {
        console.log('Books received:', books)
        books.forEach((book) => {
            if (book.smallImage) {
                console.log('Book image links:', book.smallImage)
            } else {
                console.log(`No image links available for book: ${book.title}`)
            }
        })
    }, [books])

    if (books.length === 0) {
        return <p>No available books found.</p>
    }

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://via.placeholder.com/50'
    }

    const handleExchange = (bookId: string) => {
        // Логика для начала обмена книгой
        console.log(`Request to exchange book with ID: ${bookId}`)
    }

    return (
        <div>
            <h2>Available Books</h2>
            <ul>
                {books.map((book) => (
                    <li key={book._id}>
                        <h3>{book.title}</h3>
                        <p>Author: {book.author}</p>
                        {book.smallImage ? <img src={book.smallImage} alt={`${book.title || 'Book'} cover`} style={{ marginRight: '10px', width: '50px', height: 'auto' }} onError={handleImageError} /> : <p>No image available</p>}

                        {userState.loggedInUser && !isCurrentUser && <button onClick={() => handleExchange(book._id)}>Exchange Book</button>}
                    </li>
                ))}
            </ul>
        </div>
    )
})

export default BookList
