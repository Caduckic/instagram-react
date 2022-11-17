const Card = () => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-top">
          <div className="card-header">
            <div className="card-header-user-icon-container">
              <img src="elmo.png" />
            </div>
            <div className="card-header-name">
              jeff
            </div>
          </div>
          <div className="card-more-button">
            <span className="material-icons">more_horiz</span>
          </div>
        </div>
        <div className="card-middle">
          <img src="elmo.png"/>
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
            707 likes
          </div>
          <div className="card-desc-view">
            <div className="card-desc">
              <span style={{ fontWeight: 'bold' }}>Jeff </span>
              here's elmo brah
            </div>
            <div className="card-view-comments">
              View all 6 comments
            </div>
          </div>
          <div className="card-date">
            2 DAYS AGO
          </div>
          <div className="card-comment-form-container">
            <form className="card-comment-form">
              <div className="card-emoji-button">
                <span className="material-icons">sentiment_satisfied_alt</span>
              </div>
              <span
                className="card-text-input"
                role="textbox" 
                contentEditable="true"
              ></span>
              <a href="#post" className="card-post-comment">
                Post
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
