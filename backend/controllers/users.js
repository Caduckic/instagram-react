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

  const user = new User({
    username: body.username,
    name: body.name,
    icon: body.icon,
    hasStory: !body.hasStory ? false : body.hasStory,
    posts: [],
    comments: []
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
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
})

module.exports = usersRouter