import React from 'react'
import { observer } from 'mobx-react-lite'

interface Book {
    _id: string
    title: string
    author: string
}

interface BookListProps {
    books: Book[] // Объявляем пропс books
}

const BookList: React.FC<BookListProps> = observer(({ books }) => {
    if (books.length === 0) {
        return <p>No available books found.</p>
    }

    return (
        <div>
            <h2>Available Books</h2>
            <ul>
                {books.map((book) => (
                    <li key={book._id}>
                        <h3>{book.title}</h3>
                        <p>Author: {book.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
})

export default BookList
