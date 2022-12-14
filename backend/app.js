const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const postsRouter = require('./controllers/posts')
const usersRouter = require('./controllers/users')
const commentsRouter = require('./controllers/comments')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log(error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/posts', postsRouter)
app.use('/api/users', usersRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/login', loginRouter)

module.exports = app