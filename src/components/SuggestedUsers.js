import SuggestedUser from "./SuggestedUser"

const SuggestedUsers = () => {
  return (
    <div className='end-suggested-users'>
      <div className="suggestions-header">
        <div className="suggestions-text">Suggestions For You</div>
        <div className="suggestions-button">See All</div>
      </div>
      <div className='end-suggested-users-container'>
        <SuggestedUser />
        <SuggestedUser />
        <SuggestedUser />
        <SuggestedUser />
        <SuggestedUser />
      </div>
    </div>
  )
}

export default SuggestedUsers