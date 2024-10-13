const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
)
app.use('/auth', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }))
app.use('/users', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }))
app.use('/books', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }))
app.use('/exchanges', createProxyMiddleware({ target: 'http://localhost:3004', changeOrigin: true }))

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`)
})
