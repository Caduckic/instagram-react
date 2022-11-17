const TopNavigation = () => {
  return (
    <div className="top-nav">
      <div className="top-nav-logo">
        Instagram
      </div>
      <div className="top-nav-search-container">
        <span className="material-icons" id="top-nav-search-icon">search</span><input
          className="top-nav-search"
          placeholder="       Search"
        />
      </div>
      <div className="top-nav-notification">
        <span className="material-icons-outlined">favorite_border</span>
      </div>
    </div>
  )
}

export default TopNavigation
