const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/user-model')

class AuthController {
    async register(req, res, next) {
        try {
            const { email, username, password } = req.body
            const candidate = await User.findOne({ $or: [{ username }, { email }] })
            if (candidate) {
                return res.status(400).json({ message: 'Email or username already exists' })
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({ email, username, password: hashedPassword })
            console.log(newUser)
            await newUser.save()
            console.log('New user saved successfully')
            res.status(201).json({ message: 'User registered successfully' })
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(400).json({ message: 'Invalid email or password' })
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY)
            res.status(200).json({ token })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController()
