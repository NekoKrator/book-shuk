import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { userState } from '../context/user-context'
import { authState } from '../context/auth-context'
import { bookState } from '../context/book-context'
import { ScrollArea } from '@/components/ui/scroll-area'
import BookDialog from '@/components/book-dialog'
import { BookTypes } from '../types/types'

const Home: React.FC = observer(() => {
    const username = authState.username
    const [selectedBook, setSelectedBook] = useState<BookTypes | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const formatLocal = new Intl.DateTimeFormat('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })

    useEffect(() => {
        if (username) {
            userState.loadUser(username).catch((err) => {
                console.error('Failed to load user:', err)
            })
        }
        bookState.loadAllBooks()
        userState.loadAllUsers()
    }, [username])

    const totalBooks = bookState.allBooks.length
    const totalUsers = userState.allUsers.length
    const booksExchanged = '0'
    const averageBooksPerUser = totalUsers > 0 ? (totalBooks / totalUsers).toFixed(2) : '0.00'
    const mostSavedBook = bookState.mostSavedBook
    const mostPopularGenre = bookState.mostPopularGenre || 'No genres found'

    const handleBookClick = (book: BookTypes) => {
        setSelectedBook(book)
        setIsDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false)
        setSelectedBook(null)
    }

    const handleMostSavedBookClick = () => {
        if (mostSavedBook) {
            handleBookClick(mostSavedBook)
        }
    }

    return (
        <div className="flex h-screen">
            <div className="relative w-1/2 h-full bg-cover bg-center rounded-bl-[30px] overflow-hidden" style={{ backgroundImage: "url('../../public/images/book-store.jpg')" }}>
                <div className="absolute inset-0 bg-black opacity-30"></div>

                <div className="flex flex-col items-center justify-center h-full text-[#edeece] relative z-51">
                    <div className="text-5xl font-bold">Bookשוק</div>
                    <div className="mt-4 text-xl font-bold">Exchange, Read, Repeat</div>
                </div>
            </div>

            <div className="flex flex-col justify-between w-1/2 h-full bg-[#122a5b] rounded-br-[30px] p-4 text-[#edeece]">
                <div className="m-5 mt-20">
                    <h3 className="text-lg font-semibold mb-3 text-[#edeece] ">Recently Added Books Ready for Exchange</h3>
                    <ScrollArea className="h-80">
                        {bookState.loading ? (
                            <div>Loading books...</div>
                        ) : bookState.error ? (
                            <div>Error loading books: {bookState.error}</div>
                        ) : bookState.allBooks.length > 0 ? (
                            bookState.allBooks
                                .slice(0, 50)
                                .reverse()
                                .map((bookProxy) => {
                                    const book = bookProxy as BookTypes
                                    return (
                                        <div
                                            key={book.googleBookId || book._id}
                                            className="flex items-start mb-2 bg-white text-[#122a5b] hover:bg-[#f9bc52] transition-colors duration-300 rounded-[10px]"
                                            onClick={() => handleBookClick(book)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <img src={book.smallImage || '/default-image.jpg'} alt={`${book.title} cover`} className="w-12 h-20 mr-2 object-cover rounded-l-[10px]" />
                                            <div>
                                                <div className="font-semibold">{book.title}</div>
                                                <div className="text-sm">{book.author}</div>
                                                <div className="text-sm mt-3">{book.createdAt ? formatLocal.format(new Date(book.createdAt as string)) : 'Date not available'}</div>
                                            </div>
                                        </div>
                                    )
                                })
                        ) : (
                            <div>No available books at the moment.</div>
                        )}
                    </ScrollArea>
                    <div className="flex mt-5 space-x-4">
                        <div className="w-1/2">
                            <div className="text-lg font-semibold">General Statistics</div>
                            <div className="relative mt-3 bg-[#f9bc52] text-[#122a5b] rounded-[5px] p-4">
                                <div className="flex flex-col">
                                    <div>Total Books Available: {totalBooks}</div>
                                    <div>Total Users: {totalUsers}</div>
                                    <div>Books Exchanged: {booksExchanged}</div>
                                    <div>Average Books per User: {averageBooksPerUser}</div>
                                    <div>
                                        Most Saved Book:
                                        <div onClick={handleMostSavedBookClick} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                                            {mostSavedBook ? `${mostSavedBook.title} (${mostSavedBook.users?.length || 0} users)` : 'No popular books found'}
                                        </div>
                                    </div>
                                    <div>Most Popular Genre: {mostPopularGenre}</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/2">
                            <div className="text-lg font-semibold">Additional Insights</div>
                            <div className="relative mt-3 bg-[#f9bc52] text-[#122a5b] rounded-[5px] p-4">
                                <div className="flex flex-col">
                                    <div>Most Active Users: </div>
                                    <div>Most Exchanged Genre: </div>
                                    <div>New Users This Month: </div>
                                    <div>Books Added This Week: </div>
                                    <div>
                                        Recently Popular Genre:
                                        <div style={{ color: 'blue', textDecoration: 'underline' }}>|| 'No recent data'</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-[20vh]"></div>

            <BookDialog isOpen={isDialogOpen} onClose={handleCloseDialog} book={selectedBook} />
        </div>
    )
})

export default Home
