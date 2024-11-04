import { useState } from 'react'
import { BookPlus, Repeat } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function SearchBlock() {
    const [searchMode, setSearchMode] = useState<'add' | 'exchange'>('add')
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        navigate(`/search?q=${encodeURIComponent(searchQuery)}&mode=${searchMode}`)
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <motion.h1 className="text-center text-2xl md:text-3xl font-bold mb-6 text-[#122a5b]" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                Search the Book Community or Explore the World of Books
            </motion.h1>

            <div className="space-y-6">
                <div className="flex justify-center gap-2 mb-4">
                    <button onClick={() => setSearchMode('add')} className={`flex items-center px-4 py-2 rounded-full transition-all ${searchMode === 'add' ? 'bg-[#f9bc52] text-white shadow-lg scale-105' : 'bg-[#edeece] text-[#122a5b]'}`}>
                        <BookPlus className="w-4 h-4 mr-2" />
                        Profile Book Search
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
                            className="flex-grow px-4 py-3 rounded-lg border-2 border-[#122a5b] focus:outline-none focus:ring-2 focus:ring-[#f9bc52] bg-white"
                        />
                        <motion.button type="submit" className="ml-2 px-6 py-3 bg-[#122a5b] text-white rounded-lg hover:bg-opacity-90 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Search
                        </motion.button>
                    </div>

                    <p className="text-center text-sm text-[#122a5b] mt-2">Please select an action and confirm the book title.</p>
                </form>
            </div>
        </div>
    )
}
