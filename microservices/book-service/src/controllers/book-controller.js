const axios = require('axios')
const { User } = require('../models/user-model')
const { Book } = require('../models/book-model')
require('dotenv').config()

class BookController {
    async searchBook(req, res, next) {
        const { query } = req.query

        try {
            const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
                params: {
                    q: query,
                    key: process.env.GOOGLE_BOOKS_API_KEY,
                    maxResults: 5,
                },
            })

            console.log(response)

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
        const { googleBookId, username, title, author, smallImage, largeImage } = req.body

        try {
            const user = await User.findOne({ username })
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            let book = await Book.findOne({ googleBookId })
            if (!book) {
                const bookDetailsResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes/${googleBookId}`, {
                    params: {
                        key: process.env.GOOGLE_BOOKS_API_KEY,
                    },
                })

                const bookDetails = bookDetailsResponse.data.volumeInfo

                book = new Book({
                    googleBookId,
                    title,
                    author,
                    publisher: bookDetails.publisher || 'Unknown',
                    publishedDate: bookDetails.publishedDate ? new Date(bookDetails.publishedDate) : undefined,
                    description: bookDetails.description,
                    pageCount: bookDetails.pageCount,
                    language: bookDetails.language,
                    tags: bookDetails.categories || [],
                    rating: bookDetails.averageRating || null,
                    smallImage,
                    largeImage,
                })

                await book.save()
            } else {
                console.log('Book already exists:', book)
            }

            if (!book.users.includes(user._id)) {
                book.users.push(user._id)
                await book.save()
            }

            user.availableBooks.push(book._id)
            await user.save()

            res.json({ success: true, message: 'Book added to user library' })
        } catch (error) {
            console.error('Error adding book to user:', error)
            next(error)
        }
    }

    async getAllBooks(req, res, next) {
        try {
            const books = await Book.find().populate('users', 'username')
            res.json(books)
        } catch (error) {
            console.error('Error fetching all books:', error)
            next(error)
        }
    }
}

module.exports = new BookController()
