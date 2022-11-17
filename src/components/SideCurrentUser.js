const SideCurrentUser = () => {
  return (
    <div className="end-current-user">
      <div className="end-current-user-icon-container">
        <img src="elmo.png"/>
      </div>
      <div className="end-username-container">
        <div className="end-username">
          jeff
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
