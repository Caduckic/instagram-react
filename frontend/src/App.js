import { useEffect, useState } from 'react'
import BottomFooter from './components/BottomFooter'
import MainCardColumn from './components/MainCardColumn'
import NavigationMain from './components/NavigationMain'
import MainEndColumn from './components/MainEndColumn'
import TopNavigation from './components/TopNavigation'
import userService from './services/users'
import postService from './services/posts'
import './styles.css'

const App = () => {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    userService
      .getAll()
      .then(initialUsers => {
        setUsers(initialUsers)
        setCurrentUser(initialUsers[0])
      })
    postService
      .getAll()
      .then(initialPosts => {
        setPosts(initialPosts)
      })
  }, [])

  return (
    <div className='body-flex'>
      <NavigationMain currentUser={currentUser}/>
      <div className='main-container'>
        <div className='main-flex'>
          <div className='main-block'>
            <div className='main-inner-flex'>
              <MainCardColumn
                users={users}
                currentUser={currentUser}
                posts={posts}
                setPosts={setPosts}
                setUsers={setUsers}
                setCurrentUser={setCurrentUser}
              />
              <MainEndColumn currentUser={currentUser} users={users} />
            </div>
          </div>
          <BottomFooter />
        </div>
        <TopNavigation />
      </div>
    </div>
  )
}

export default App
