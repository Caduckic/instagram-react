const SuggestedUser = () => {
  return (
    <div className="end-suggested-user">
      <div className="end-suggested-user-icon-container">
        <img src="elmo.png"/>
      </div>
      <div className="end-username-container">
        <div className="end-username">
          not jeff
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