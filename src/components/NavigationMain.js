import imageService from '../utils/images'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const NavigationMain = ({ currentUser }) => {
  return (
    <div className='nav-container'>
      <div className="nav-logo-area">
        <div className="nav-logo">
          <span className="material-icons-outlined">photo_camera</span>
          <div>Instagram</div>
        </div>
      </div>
      <div className="nav-buttons-area">
        <div className="nav-home-container">
          <div className="nav-home">
            <span className="material-icons">home</span><div>Home</div>
          </div>
        </div>
        <div className="nav-search-container">
          <div className="nav-search">
            <span className="material-icons">search</span><div>Search</div>
          </div>
        </div>
        <div className="nav-explore-container">
          <div className="nav-explore">
            <span className="material-icons-outlined">explore</span><div>Explore</div>
          </div>
        </div>
        <div className="nav-message-container">
          <div className="nav-message">
            <span className="material-icons-outlined">chat</span><div>Message</div>
          </div>
        </div>
        <div className="nav-notification-container">
          <div className="nav-notification">
            <span className="material-icons-outlined">favorite_border</span><div>Notifications</div>
          </div>
        </div>
        <div className="nav-create-container">
          <div className="nav-create">
            <span className="material-icons-outlined">add_box</span><div>Create</div>
          </div>
        </div>
        <div className="nav-profile-container">
          <div className="nav-profile">
            <span className="nav-profile-icon-container">
              {!currentUser 
                ? null
                : <LazyLoadImage src={imageService.getUserImageById(currentUser.icon)}/>
              }
            </span>
            <div>Profile</div>
          </div>
        </div>
      </div>
      <div className="nav-more-button-area">
        <div className="nav-more-button">
          <span className="material-icons">menu</span><div>More</div>
        </div>
      </div>
    </div>
  )
}

export default NavigationMain
