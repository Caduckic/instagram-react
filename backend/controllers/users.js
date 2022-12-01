const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Comment = require('../models/comment')
const Post = require('../models/post')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  response.json(user)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.username || !body.name || !body.password || !body.icon) {
    return response.status(400).json({
      error: 'missing fields'
    })
  }

  if (body.username.length < 3 || body.password.length < 3) {
    return response.status(400).json({
      error: 'username and password must be more than 3 characters'
    })
  }

  const existingUser = await User.findOne({ username: body.username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
    icon: body.icon,
    hasStory: !body.hasStory ? false : body.hasStory,
    posts: [],
    comments: []
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (request, response) => {
  const token = request.token
  if (!token) {
    return response.status(400).json({ error: 'invalid or missing token' })
  }

  const user = await User.findById(request.params.id)

  if (user._id.toString() === token.id) {
    const comments = await Comment.find({ user: user._id })
    const posts = await Post.find({ user: user._id })
    
    posts.forEach(async post => {
      await post.remove()
    })
    comments.forEach(async comment => {
      const otherPost = await Post.findOne({ comments: { $in: comment._id } })
      otherPost.comments = otherPost.comments.filter(c => c.toString() !== comment._id.toString())
      await otherPost.save()
      await comment.remove()
    })

    await user.remove()

    response.status(204).end()
  }
  else {
    response.status(400).json({ error: 'Can not delete other user\'s accounts' })
  }
})

module.exports = usersRouter