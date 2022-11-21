const postsRouter = require('express').Router()
const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')

postsRouter.get('/', async (request, response) => {
  const posts = await Post.find({})
    .populate('user', { username: 1, icon: 1 })
    .deepPopulate('comments.user').exec((err, _post) => {
      if (err) console.log(err, _post)
    })

  response.json(posts)
})

postsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.user)

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
  const post = await Post.findById(request.params.id)
  const comments = await Comment.find({ post: { $in: post._id } })
  const user = await User.findOne({ posts: { $in: post._id } })

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
})

module.exports = postsRouter
