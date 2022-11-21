import SideCurrentUser from './SideCurrentUser'
import SideFooter from './SideFooter'
import SuggestedUsers from './SuggestedUsers'

const MainEndColumn = ({ currentUser, users }) => {
  return (
    <div className='main-end-column'>
      <SideCurrentUser user={currentUser}/>
      <SuggestedUsers users={users.filter(user => user.id !== currentUser.id)}/>
      <SideFooter />
    </div>
  )
}

export default MainEndColumn