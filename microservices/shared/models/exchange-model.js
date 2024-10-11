const mongoose = require('mongoose')

const ExchangeSchema = new mongoose.Schema(
    {
        offeredBook: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
        requestedBook: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
        offeringUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        requestingUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'canceled'],
            default: 'pending',
        },
    },
    { timestamps: true }
)

const Exchange = mongoose.model('Exchange', ExchangeSchema)

module.exports = Exchange
