const { User } = require('../models/user-model')

class UserController {
    async getUserProfile(req, res, next) {
        const { username } = req.params
        try {
            const userData = await User.findOne({ username })
            if (!userData) {
                return res.status(404).json({ message: 'User not found' })
            }
            res.json({ username: userData.username, email: userData.email })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()
