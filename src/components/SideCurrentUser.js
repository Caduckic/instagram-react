import imageService from '../utils/images'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const SideCurrentUser = ({ user }) => {
  if (!user) return null
  return (
    <div className="end-current-user">
      <div className="end-current-user-icon-container">
        <LazyLoadImage src={imageService.getUserImageById(user.icon)}/>
      </div>
      <div className="end-username-container">
        <div className="end-username">
          {user.name}
        </div>
        <div className="end-username-after">
          Jeremy Roffey
        </div>
      </div>
      <a href="#switch" className="end-user-button">
        Switch
      </a>
    </div>
  )
}

export default SideCurrentUser
