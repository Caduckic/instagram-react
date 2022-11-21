import SuggestedUser from './SuggestedUser'

const SuggestedUsers = ({ users }) => {
  let reducedUsers = []
  
  for (let i = 0; i < users.length && i < 5; i++) {
    reducedUsers[i] = users[i]
  }

  return (
    <div className='end-suggested-users'>
      <div className="suggestions-header">
        <div className="suggestions-text">Suggestions For You</div>
        <div className="suggestions-button">See All</div>
      </div>
      <div className='end-suggested-users-container'>
        {reducedUsers.map(user => {
          return <SuggestedUser key={user.id} user={user} />
        })}
      </div>
    </div>
  )
}

export default SuggestedUsers