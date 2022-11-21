const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Post = require('../models/post')
const User = require('../models/user')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({})
    .populate('user', { username: 1 })
  response.json(comments)
})

commentsRouter.post('/', async (request, response) => {
  const body = request.body
  const post = await Post.findById(request.body.post)
  const user = await User.findById(request.body.user)
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
  const comment = await Comment.findById(request.params.id)
  const user = await User.findOne({ comments: { $in: comment._id } })
  const post = await Post.findOne({ comments: { $in: comment._id } })

  user.comments = user.comments.filter(c => c.toString() !== comment._id.toString())
  post.comments = post.comments.filter(c => c.toString() !== comment._id.toString())

  await user.save()
  await post.save()
  await comment.remove()

  response.status(204).end()
})

module.exports = commentsRouter