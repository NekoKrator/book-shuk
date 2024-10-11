const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, require: true, unique: true },
        username: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        availableBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', default: [] }],
        exchangedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    },
    { timeseries: true }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
