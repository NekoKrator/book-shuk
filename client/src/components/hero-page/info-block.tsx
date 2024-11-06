import React from 'react'
import { observer } from 'mobx-react'
import { bookState } from '@/context/book-context'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SquarePlus } from 'lucide-react'
import { BookTypes } from '@/types/types'

interface InfoBlockProps {
    formatLocal: Intl.DateTimeFormat
    handleBookClick: (book: BookTypes) => void
    handleMostSavedBookClick: () => void
    booksExchanged: string
    totalBooks: number
    totalUsers: number
    averageBooksPerUser: string
    mostSavedBook: BookTypes | null
    mostPopularGenre: { genre: string; count: number; percentage: string }
}

const InfoBlock: React.FC<InfoBlockProps> = observer(({ formatLocal, handleBookClick, handleMostSavedBookClick, booksExchanged, totalBooks, totalUsers, averageBooksPerUser, mostSavedBook, mostPopularGenre }) => {
    return (
        <div className="flex flex-col justify-between w-1/2 h-full bg-[#122a5b] rounded-br-[30px] p-4 text-[#edeece]">
            {/* Info books list */}
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

                {/* Info statistics */}
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
                </div>
            </div>
        </div>
    )
})

export default InfoBlock
