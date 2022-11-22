const postsRouter = require('express').Router()
const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

postsRouter.get('/', async (request, response) => {
  const posts = await Post.find({})
    .populate('user', { username: 1, icon: 1 })
    .deepPopulate('comments.user').exec((err, _post) => {
      if (err) console.log(err, _post)
    })

  response.json(posts)
})

postsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const post = new Post({
    description: body.description,
    image: body.image,
    likes: 0,
    date: new Date(),
    comments: [],
    user: user._id
  })

  const savedPost = await post.save()
  user.posts = user.posts.concat(savedPost._id)
  await user.save()

  response.status(201).json(savedPost)
})

postsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updatedPost = {
    description: body.description,
    image: body.image,
    likes: body.likes,
    date: body.date,
    comments: body.comments,
    user: body.user
  }

  const post = await Post
    .findByIdAndUpdate(request.params.id, updatedPost, { returnDocument: 'after' })
    .populate('user', { username: 1 })
    .populate('comments', { content: 1, user: 1 })

  response.status(201).json(post)
})

postsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  if (!token) {
    return response.status(400).json({ error: 'invalid or missing token' })
  }

  const post = await Post.findById(request.params.id)
  if (post.user.toString() === token.id) {
    const comments = await Comment.find({ post: { $in: post._id } })
    const user = await User.findById(post.user)
    
    user.posts = user.posts.filter(p => p.toString() !== post._id.toString())
    await user.save()

    comments.forEach(async comment => {
      const commentedUser = await User.findOne({ comments: { $in: comment._id } })
      commentedUser.comments = commentedUser.comments.filter(c => c.toString() !== comment._id.toString())
      await commentedUser.save()
      await comment.remove()
    })

    await post.remove()

    response.status(204).end()
  }
  else {
    response.status(400).json({ error: 'Cannot delete other user\' user posts' })
  }

  
})

module.exports = postsRouter
