import { useState } from 'react'
import { BookPlus, Repeat, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import BookSearch from '../components/books/book-search' // Importing the BookSearch component

const SearchPage = () => {
    const { search } = useLocation()
    const queryParams = new URLSearchParams(search)
    const mode = queryParams.get('mode') || 'add'
    const title = queryParams.get('q') || ''

    const [searchMode, setSearchMode] = useState<'add' | 'exchange'>(mode as 'add' | 'exchange')
    const [searchQuery, setSearchQuery] = useState(title)

    const navigate = useNavigate()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        navigate(`/search?q=${encodeURIComponent(searchQuery)}&mode=${searchMode}`)
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8 mt-20">
            <motion.h1 className="text-center text-2xl md:text-3xl font-bold mb-6 text-[#122a5b]" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {searchMode === 'add' ? 'I Want To Add A Book To My Profile' : 'I Want To Find A Book To Exchange'}
            </motion.h1>

            <div className="space-y-6">
                <div className="flex justify-center gap-2 mb-4">
                    <button onClick={() => setSearchMode('add')} className={`flex items-center px-4 py-2 rounded-full transition-all ${searchMode === 'add' ? 'bg-[#f9bc52] text-white shadow-lg scale-105' : 'bg-[#edeece] text-[#122a5b]'}`}>
                        <BookPlus className="w-4 h-4 mr-2" />
                        Add Book Search
                    </button>
                    <button onClick={() => setSearchMode('exchange')} className={`flex items-center px-4 py-2 rounded-full transition-all ${searchMode === 'exchange' ? 'bg-[#f9bc52] text-white shadow-lg scale-105' : 'bg-[#edeece] text-[#122a5b]'}`}>
                        <Repeat className="w-4 h-4 mr-2" />
                        Exchange Book Search
                    </button>
                </div>

                <form onSubmit={handleSearch} className="relative w-full flex flex-col items-center gap-4">
                    <div className="flex w-full md:w-2/3">
                        <motion.input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={`${searchMode === 'add' ? 'Add' : 'Exchange'} a book...`}
                            className="flex-grow px-4 py-3 rounded-[10px] border-2 border-[#122a5b] focus:outline-none focus:ring-2 focus:ring-[#f9bc52] bg-white"
                        />
                        <motion.button type="submit" className="ml-2 px-6 py-3 flex items-center gap-2 bg-[#122a5b] text-white rounded-[10px] hover:bg-opacity-90 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <span>Search</span>
                            <Search className="w-5 h-5" />
                        </motion.button>
                    </div>
                </form>

                <BookSearch searchMode={searchMode} searchQuery={searchQuery} />
            </div>
        </div>
    )
}

export default SearchPage
