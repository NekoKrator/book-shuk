import React, { useEffect, useState, useMemo } from 'react'
import { observer } from 'mobx-react'
import { userState } from '@/context/user-context'
import { authState } from '@/context/auth-context'
import { bookState } from '@/context/book-context'
import { ScrollArea } from '@/components/ui/scroll-area'
import BookDialog from '@/components/book-dialog'
import { BookTypes } from '@/types/types'
import SearchBlock from '@/components/hero-page/search-block'
import { SquarePlus } from 'lucide-react'

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
    const mostPopularGenre = bookState.mostPopularGenre || { genre: 'No genres found', count: 0, percentage: '0.00' }

    const quotes = useMemo(
        () => [
            { text: '"The only thing that you absolutely have to know is the location of the library."', author: 'Albert Einstein' },
            { text: '"So many books, so little time."', author: 'Frank Zappa' },
            { text: '"A good book is an event in my life."', author: 'Stendhal' },
            { text: '"I have always imagined that Paradise will be a kind of library."', author: 'Jorge Luis Borges' },
            { text: '"If you only read the books that everyone else is reading, you can only think what everyone else is thinking."', author: 'Haruki Murakami' },
        ],
        []
    )

    const [currentQuote, setCurrentQuote] = useState(quotes[0])

    useEffect(() => {
        const quoteInterval = setInterval(() => {
            setCurrentQuote((prev) => {
                const currentIndex = quotes.indexOf(prev)
                return quotes[(currentIndex + 1) % quotes.length]
            })
        }, 15000)

        return () => clearInterval(quoteInterval)
    }, [quotes])

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
            {/* block banner */}
            <div className="relative w-1/2 h-full bg-cover bg-center rounded-bl-[30px] overflow-hidden" style={{ backgroundImage: "url('../../public/images/book-store.jpg')" }}>
                <div className="absolute inset-0 bg-black opacity-30"></div>

                <div className="flex flex-col items-center justify-center h-full text-[#edeece] relative z-51">
                    <div className="text-5xl font-bold">Bookשוק</div>
                    <div className="mt-4 text-xl font-bold">Exchange, Read, Repeat</div>
                </div>
            </div>

            {/* block info */}
            <div className="flex flex-col justify-between w-1/2 h-full bg-[#122a5b] rounded-br-[30px] p-4 text-[#edeece]">
                {/* info books list */}
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
                                            className="relative flex items-start mb-2 bg-white text-[#122a5b] hover:bg-[#f9bc52] transition-colors duration-300 rounded-[10px]"
                                            onClick={() => handleBookClick(book)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <img src={book.smallImage || '/default-image.jpg'} alt={`${book.title} cover`} className="w-12 h-20 mr-2 object-cover rounded-l-[10px]" />
                                            <div className="flex flex-col justify-between">
                                                <div>
                                                    <div className="font-semibold">{book.title}</div>
                                                    <div className="text-sm">{book.author}</div>
                                                    <div className="text-sm mt-3">{book.createdAt ? formatLocal.format(new Date(book.createdAt as string)) : 'Date not available'}</div>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-4 right-4">
                                                <button className="p-2 rounded-full hover:text-blue-500 hover:bg-gray-200 transition-colors duration-300" onClick={() => {}} aria-label="Add Book">
                                                    <SquarePlus size={24} />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                        ) : (
                            <div>No available books at the moment.</div>
                        )}
                    </ScrollArea>
                    {/* info statistics */}
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
                                    <div>
                                        Most Popular Genre: {mostPopularGenre.genre} ({mostPopularGenre.count} books, {mostPopularGenre.percentage}% of all books)
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* info quote */}
                        <div className="w-1/2">
                            <div className="text-lg font-semibold">Words of Wisdom</div>
                            <div className="relative mt-3 bg-[#f9bc52] text-[#122a5b] rounded-[5px] p-4">
                                <div className="flex flex-col">
                                    <div className="text-center">{currentQuote.text}</div>
                                    <div className="text-right italic mt-2">— {currentQuote.author}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* info resources */}
                    <div className="mt-5">
                        <div className="text-lg font-semibold">Resources</div>
                        <div className="relative text-[#edeece] mt-3 flex space-x-4">
                            <a href="https://github.com/NekoKrator/book-shuk" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                            <a href="https://www.linkedin.com/in/daniil-fil-3905631a9/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </a>
                            <a href="https://t.me/nekokrator" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                Telegram
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* block search */}
            <div className="w-full h-[20vh] mt-80">
                <SearchBlock />
            </div>

            <BookDialog isOpen={isDialogOpen} onClose={handleCloseDialog} book={selectedBook} />
        </div>
    )
})

export default Home
