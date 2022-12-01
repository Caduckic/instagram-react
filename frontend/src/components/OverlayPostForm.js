import { useState } from 'react'
import { useSelector } from 'react-redux'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import imageService from '../utils/images'
import postService from '../services/posts'

const OverlayPostForm = ({ setOverlay, posts, setPosts }) => {
  const [postImage, setPostImage] = useState(null)
  const [imageSelect, setImageSelect] = useState(false)
  const [displayDesc, setDisplayDesc] = useState(false)
  const [description, setDescription] = useState('')

  const user = useSelector(state => state.auth.user)

  const handlePost = async (e) => {
    e.preventDefault()

    const post = await postService.create({ image: postImage.id, description })
    setPosts(posts.concat(post))

    setOverlay('')
  }

  return (
    <>
      <div className='overlay-box-header-flex'>
        {postImage
          ?
          <div className='overlay-box-back-button'>
            <span className="material-icons" onClick={() => {
              if (displayDesc) {
                setDisplayDesc(false)
              } 
              else if (postImage !== null) {
                setPostImage(null)
              }
            }}>
              arrow_back
            </span>
          </div>
          : null
        }
        <div className='overlay-box-header'>
          Create new post
        </div>
        {postImage
          ?
          <button
            className='overlay-box-header-button'
            form={description.length > 3 ? 'overlay-post-form' : ''}
            onClick={() => {
              if (!displayDesc) {
                setDisplayDesc(true)
              }
            }}
          >
            {displayDesc ? 'Share' : 'Next'}
          </button>
          : null
        }
      </div>
      <form className='overlay-post-form' id='overlay-post-form' onSubmit={handlePost}>
        <div className='overlay-post-form-image'>
          {postImage === null
            ?
            <span className="material-icons" onClick={() => {
              setImageSelect(true)
            }}>
              add_photo_alternate
            </span>
            : null
          }
          {imageSelect && postImage === null
            ?
            <div className='overlay-post-image-select' onMouseLeave={() => setImageSelect(false)}>
              {imageService.getPostImages().map(image => {
                return (
                  <div
                    key={image.id}
                    className='image-select-container'
                    onClick={() => {
                      setPostImage(image)
                    }}
                  >
                    <LazyLoadImage src={image.image}/>
                    <div className='image-select-cover'></div>
                  </div>
                )
              })}
            </div>
            :
            null
          }
          {postImage
            ?
            <div className='overlay-post-selected-image'>
              <LazyLoadImage src={postImage.image} />
            </div>
            : null
          }
        </div>
        {displayDesc
          ?
          <div className='overlay-post-desc-container'>
            <div className='overlay-post-desc-user'>
              <LazyLoadImage src={imageService.getUserImageById(user.icon)} />
              <span>{user.username}</span>
            </div>
            <textarea
              className='overlay-post-desc-input'
              placeholder='Write a caption...'
              value={description}
              onChange={({ target }) => {
                setDescription(target.value)
              }}
            />
            <div className='overlay-post-desc-max'>
              {description.length}/2,200
            </div>
          </div>
          : null
        }
      </form>
    </>
  )
}

export default OverlayPostForm