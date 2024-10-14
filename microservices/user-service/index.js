const express = require('express')
const errorHandler = require('../shared/middlewares/error-handler')
const userRoutes = require('./src/routes/users-routes')
const cors = require('cors')
const connectDB = require('./src/database/user-db')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3002

connectDB()

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
)
app.use(express.json())
app.use('/', userRoutes)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`)
})
