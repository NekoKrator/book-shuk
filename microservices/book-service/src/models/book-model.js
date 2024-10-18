const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema(
    {
        googleBookId: { type: String, required: true },
        title: { type: String, required: true },
        author: { type: String, required: true },
        smallImage: { type: String, required: true }, // Убедитесь, что это поле присутствует
        largeImage: { type: String, required: true }, // И это поле тоже
        // year: { type: Number },
        // language: { type: String },
    },
    { timestamps: true }
)

const Book = mongoose.model('Book', BookSchema)

module.exports = { Book }
