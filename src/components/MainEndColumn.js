import SideCurrentUser from "./SideCurrentUser"
import SideFooter from "./SideFooter"
import SuggestedUsers from "./SuggestedUsers"

const MainEndColumn = () => {
  return (
    <div className='main-end-column'>
      <SideCurrentUser />
      <SuggestedUsers />
      <SideFooter />
    </div>
  )
}

export default MainEndColumn