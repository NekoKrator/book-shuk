import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { BookTypes, BookItem } from '../../types/types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { userState } from '@/context/user-context'

interface BookSearchProps {
    searchQuery: string
    searchMode: 'add' | 'exchange'
}

const BookSearch: React.FC<BookSearchProps> = ({ searchQuery, searchMode }) => {
    const [books, setBooks] = useState<BookTypes[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchBooksFromApi = useCallback(async (inputQuery: string) => {
        if (!inputQuery.trim()) return
        try {
            setLoading(true)
            const { data } = await axios.get<BookItem[]>('http://localhost:3000/books/search', { params: { query: inputQuery } })

            if (Array.isArray(data)) {
                const fetchedBooks: BookTypes[] = data.map((item) => {
                    const volumeInfo = item.volumeInfo
                    return {
                        _id: item.id,
                        googleBookId: item.id,
                        title: volumeInfo.title || 'Unknown Title',
                        author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author',
                        publisher: volumeInfo.publisher || 'Unknown Publisher',
                        publishedDate: volumeInfo.publishedDate ? new Date(volumeInfo.publishedDate) : undefined,
                        description: volumeInfo.description || 'No description available',
                        pageCount: volumeInfo.pageCount || 0,
                        language: volumeInfo.language || 'Unknown',
                        smallImage: volumeInfo.imageLinks?.smallThumbnail || null,
                        largeImage: volumeInfo.imageLinks?.thumbnail || null,
                        users: [],
                    }
                })
                console.log(fetchedBooks)
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
    }, [])

    const fetchBooksFromDb = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await axios.get<BookTypes[]>(`http://localhost:3000/books/get`)
            console.log(data) // Проверяем, что приходит
            setBooks(data || []) // Устанавливаем данные, если они есть
        } catch (err) {
            console.error('Error fetching books from DB:', err)
            setError('Error fetching books from database')
            setBooks([]) // Очищаем список при ошибке
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (searchMode === 'add') {
            setBooks([])
            fetchBooksFromApi(searchQuery)
        } else if (searchMode === 'exchange') {
            fetchBooksFromDb()
        }
    }, [searchQuery, searchMode, fetchBooksFromApi, fetchBooksFromDb])

    const handleBookAction = async (book: BookTypes) => {
        try {
            if (searchMode === 'add' && userState.loggedInUser) {
                // Add book to user's library
                const response = await axios.post('http://localhost:3000/books/add', {
                    googleBookId: book.googleBookId,
                    username: userState.loggedInUser.username, // Use current logged-in user
                    title: book.title,
                    author: book.author,
                    smallImage: book.smallImage,
                    largeImage: book.largeImage,
                })

                if (response.data.success) {
                    alert(`Added "${book.title}" to your library!`)
                } else {
                    alert(`Error adding "${book.title}" to your library. Please try again.`)
                }
            } else if (searchMode === 'exchange') {
                // Handle exchange logic here, e.g., updating user's available books for exchange
                alert(`"${book.title}" is now available for exchange!`)
            }
        } catch (error) {
            console.error('Error handling book action:', error)
            alert('An error occurred. Please try again later.')
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8">
            {loading && <Loader2 className="w-6 h-6 animate-spin mx-auto" />}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!loading && !books.length && searchQuery && <p className="text-center">No books found</p>}

            {!loading && books.length > 0 && (
                <Table className="min-w-full table-fixed max-w-full overflow-x-auto">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left px-4 py-2 w-24">Image</TableHead>
                            <TableHead className="text-left px-4 py-2">Title</TableHead>
                            <TableHead className="text-left px-4 py-2">Author</TableHead>
                            <TableHead className="text-left px-4 py-2">Publisher</TableHead>
                            <TableHead className="text-left px-4 py-2 w-32">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {books.map((book) => (
                            <TableRow key={book.googleBookId}>
                                <TableCell className="px-4 py-2">{book.smallImage && <img src={book.smallImage} alt={book.title} className="w-16 h-24 object-cover" />}</TableCell>
                                <TableCell className="px-4 py-2">{book.title}</TableCell>
                                <TableCell className="px-4 py-2">{book.author}</TableCell>
                                <TableCell className="px-4 py-2">{book.publisher}</TableCell>
                                <TableCell className="px-4 py-2">
                                    <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => handleBookAction(book)}>
                                        {searchMode === 'add' ? 'Add' : 'Exchange'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}

export default BookSearch
