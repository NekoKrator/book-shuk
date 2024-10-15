const axios = require('axios')
const { User } = require('../models/user-model')
require('dotenv').config()

class BookController {
    async searchBook(req, res, next) {
        const { query } = req.query
        console.log('Search Query:', query)

        try {
            const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
                params: {
                    q: query,
                    key: process.env.GOOGLE_BOOKS_API_KEY,
                    maxResults: 5,
                },
            })

            if (!response.data.items) {
                console.error('No items found in response:', response.data)
                return res.status(404).json({ message: 'No books found' })
            }

            const books = response.data.items.map((item) => ({
                id: item.id,
                volumeInfo: item.volumeInfo,
            }))

            res.json(books)
        } catch (error) {
            console.error('Error fetching from Google Books API:', error)
            next(error)
        }
    }

    async addBook(req, res, next) {
        const { bookId, username, title, author } = req.body // Get book details from the request body

        // Find the user by username
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Now, add the bookId and book details to the user's availableBooks array
        user.availableBooks.push({ id: bookId, title, author }) // Store book details

        try {
            await user.save() // Save the updated user document
            res.json({ success: true })
        } catch (error) {
            console.error('Error saving user:', error)
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}

module.exports = new BookController()
