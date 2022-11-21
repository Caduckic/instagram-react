const mongoose = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose)

const postSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  image: {
    type: Number,
    required: true
  },
  likes: {
    type: Number
  },
  date: {
    type: Date,
    required: true
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

postSchema.plugin(deepPopulate, {
  populate: {
    'comments.user': {
      select: 'username'
    }
  }
})

postSchema.set('toJSON',  {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Post', postSchema)
