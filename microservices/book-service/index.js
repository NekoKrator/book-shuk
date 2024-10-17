const express = require('express')
const errorHandler = require('../shared/middlewares/error-handler')
const bookRoutes = require('./src/routes/book-routes')
const connectDB = require('./src/database/user-db')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3003

connectDB()

app.use(express.json())
app.use('/', bookRoutes)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`)
})
