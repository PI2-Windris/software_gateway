const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const proxy = require('express-http-proxy')
const validateRequest = require('./utils/validateRequest')
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use('/user_service/auth', createProxyMiddleware({
  target: `http://${process.env.USER_HOST}:${process.env.USER_PORT}`,
  changeOrigin: true,
  pathRewrite: {
    '^/user_service': ''
  }
}))

// Routes that need authentication should be after this middleware
app.use(validateRequest)

app.use('/user_service/users', createProxyMiddleware({
  target: `http://${process.env.USER_HOST}:${process.env.USER_PORT}`,
  changeOrigin: true,
  pathRewrite: {
    '^/user_service': ''
  }
}))

app.listen(process.env.PORT, () => {
  console.log('Server running on port ', process.env.PORT)
})