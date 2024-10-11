const express = require('express')
const proxy = require('http-proxy-middleware')
require('dotenv').config

const app = express()
const PORT = process.env.PORT || 3000

app.use('/auth', proxy({ target: 'http://localhost:3001', changeOrigin: true }))
app.use('/users', proxy({ target: 'http://localhost:3002', changeOrigin: true }))
app.use('/books', proxy({ target: 'http://localhost:3003', changeOrigin: true }))
app.use('/exchanges', proxy({ target: 'http://localhost:3004', changeOrigin: true }))

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`)
})
