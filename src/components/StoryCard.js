import imageService from '../utils/images'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const StoryCard = ({ users }) => {
  return (
    <div className="story-card">
      <div className="story-card-end">

      </div>
      <div className="story-card-users">
        {users.map(user => {
          return (
            <div key={user.id} className="story-card-story">
              <div className="story-card-user-icon-container">
                <LazyLoadImage src={imageService.getUserImageById(user.icon)} />
              </div>
              <div className="story-card-username">
                {user.name}
              </div>
            </div>
          )
        })}
      </div>
      <div className="story-card-end">

      </div>
    </div>
  )
}

export default StoryCard
