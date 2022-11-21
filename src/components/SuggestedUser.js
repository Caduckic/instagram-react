import imageService from '../utils/images'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const SuggestedUser = ({ user }) => {
  return (
    <div className="end-suggested-user">
      <div className="end-suggested-user-icon-container">
        <LazyLoadImage src={imageService.getUserImageById(user.icon)} />
      </div>
      <div className="end-username-container">
        <div className="end-username">
          {user.name}
        </div>
        <div className="end-username-after">
          Someone Else
        </div>
      </div>
      <a href="#follow" className="end-user-button">
        Follow
      </a>
    </div>
  )
}

export default SuggestedUser