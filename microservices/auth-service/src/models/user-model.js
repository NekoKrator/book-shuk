const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        // availableBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', default: [] }],
        // exchangedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    },
    { timestamps: true }
)

const User = mongoose.model('User', UserSchema)

module.exports = { User }
