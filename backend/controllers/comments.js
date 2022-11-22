const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Post = require('../models/post')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({})
    .populate('user', { username: 1 })
  response.json(comments)
})

commentsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const post = await Post.findById(request.body.post)
  const user = request.user
  console.log(post, user)

  const comment = new Comment({
    content: body.content,
    post: post._id,
    user: user._id
  })

  const savedComment = await comment.save()
  post.comments = post.comments.concat(savedComment._id)
  user.comments = user.comments.concat(savedComment._id)
  await post.save()
  await user.save()

  response.status(201).json(savedComment)
})

commentsRouter.delete('/:id', async (request, response) => {
  const token = request.token

  if (!token) {
    return response.status(400).json({ error: 'invalid or missing token' })
  }
  const comment = await Comment.findById(request.params.id)
  const user = await User.findById(comment.user)
  const post = await Post.findById(comment.post)

  const postUser = await User.findById(post.user)

  if (user._id.toString() === token.id || postUser._id.toString() === token.id) {
    user.comments = user.comments.filter(c => c.toString() !== comment._id.toString())
    post.comments = post.comments.filter(c => c.toString() !== comment._id.toString())

    await user.save()
    await post.save()
    await comment.remove()

    response.status(204).end()
  }
  else {
    response.status(400).json({ error: 'Cannot delete other user\'s comments' })
  }
})

module.exports = commentsRouter