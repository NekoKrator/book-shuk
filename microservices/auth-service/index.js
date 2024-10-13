const express = require('express')
const connectDB = require('./src/database/auth-db')
const errorHandler = require('../shared/middlewares/error-handler')
const authRoutes = require('./src/routes/auth-routes')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

connectDB()

app.use(express.json())
app.use('/', authRoutes)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`)
})
