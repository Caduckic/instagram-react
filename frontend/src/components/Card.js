import imageService from '../utils/images'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useState } from 'react'

const Card = ({ post, user, comments }) => {
  const [comment, setComment] = useState('')

  const handleComment = (e) => {
    e.preventDefault()
    setComment('')
    console.log(comment)
  }

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-top">
          <div className="card-header">
            <div className="card-header-user-icon-container">
              <LazyLoadImage src={imageService.getUserImageById(user.icon)} />
            </div>
            <div className="card-header-name">
              {user.name}
            </div>
          </div>
          <div className="card-more-button">
            <span className="material-icons">more_horiz</span>
          </div>
        </div>
        <div className="card-middle">
          <LazyLoadImage src={imageService.getPostImageById(post.image)} />
        </div>
        <div className="card-bottom">
          <div className="card-buttons">
            <div className="card-button">
              <span className="material-icons">favorite_border</span>
            </div>
            <div className="card-button">
              <span className="material-icons-outlined">mode_comment</span>
            </div>
            <div className="card-button">
              <span className="material-icons-outlined">send</span>
            </div>
            <div className="card-button-bookmark">
              <span className="material-icons-outlined">bookmark_border</span>
            </div>
          </div>
          <div className="card-likes">
            {post.likes} likes
          </div>
          <div className="card-desc-view">
            <div className="card-desc">
              <span style={{ fontWeight: 'bold' }}>{user.name} </span>
              {post.desc}
            </div>
            <div className="card-view-comments">
              View all {comments.length} comments
            </div>
          </div>
          <div className="card-date">
            {post.date} DAYS AGO
          </div>
          <div className="card-comment-form-container">
            <form className="card-comment-form" onSubmit={handleComment}>
              <div className="card-emoji-button">
                <span className="material-icons">sentiment_satisfied_alt</span>
              </div>
              <textarea
                className="card-text-input"
                role="textbox"
                contentEditable="true"
                value={comment}
                onInput={({ target }) => {
                  setComment(target.value)
                }}
              />
              <button className="card-post-comment" type='submit'>
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
