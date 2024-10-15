const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
})

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        availableBooks: [BookSchema],
    },
    { timestamps: true }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
