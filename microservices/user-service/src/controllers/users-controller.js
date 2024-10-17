const { User } = require('../models/user-model')
const { Book } = require('../models/book-model')

class UserController {
    async getUserProfile(req, res, next) {
        const { username } = req.params
        try {
            const userData = await User.findOne({ username }).populate('availableBooks')
            if (!userData) {
                return res.status(404).json({ message: 'User not found' })
            }
            res.json({
                username: userData.username,
                email: userData.email,
                availableBooks: userData.availableBooks,
            })
        } catch (error) {
            console.error('Error fetching user data:', error)
            next(error)
        }
    }
}

module.exports = new UserController()
