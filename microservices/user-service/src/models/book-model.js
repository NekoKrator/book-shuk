const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema(
    {
        googleBookId: { type: String, required: true },
        title: { type: String, required: true },
        author: { type: String, required: true },
        cover: { type: String },
        year: { type: Number },
        language: { type: String },
    },
    { timestamps: true }
)

const Book = mongoose.model('Book', BookSchema)

module.exports = { Book }
