const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema(
    {
        googleBookId: { type: String, required: true },
        title: { type: String, required: true },
        author: { type: String, required: true },
        publisher: { type: String, required: true },
        publishedDate: { type: Date },
        description: { type: String },
        pageCount: { type: Number },
        language: { type: String },
        tags: { type: [String] },
        rating: { type: Number },
        smallImage: { type: String, required: true },
        largeImage: { type: String, required: true },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
)

const Book = mongoose.model('Book', BookSchema)

module.exports = { Book }
