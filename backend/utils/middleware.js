const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    const decodedToken = jwt.verify(token, config.HASH_SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    else {
      request.token = decodedToken
      next()
    }
  }
  else next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token
  if (token) {
    request.user = await User.findById(token.id)
    next()
  }
  else {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
}

module.exports = {
  tokenExtractor,
  userExtractor
}
