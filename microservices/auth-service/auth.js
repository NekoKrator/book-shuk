const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../shared/models/user-model')
const { connectDB } = require('./src/database/auth-db')
const { errorHandler } = require('../shared/middlewares/error-handler')
require('dotenv').config

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

connectDB()

app.post('/register', async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ email, username, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        next(error)
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user || (await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY)
        res.status(200).json({ token })
    } catch (error) {
        next(error)
    }
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`)
})
