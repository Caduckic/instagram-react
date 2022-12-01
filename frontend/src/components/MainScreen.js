import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import userService from '../services/users'
import postService from '../services/posts'
import MainCardColumn from './MainCardColumn'
import MainEndColumn from './MainEndColumn'
import BottomFooter from './BottomFooter'
import TopNavigation from './TopNavigation'

const MainScreen = ({ posts, setPosts }) => {
  const [users, setUsers] = useState([])

  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    userService
      .getAll()
      .then(initialUsers => {
        setUsers(initialUsers)
      })
    postService
      .getAll()
      .then(initialPosts => {
        setPosts(initialPosts)
      })
  }, [])

  return (
    <div className='main-container'>
      <div className='main-flex'>
        <div className='main-block'>
          <div className='main-inner-flex'>
            <MainCardColumn
              users={users}
              currentUser={user}
              posts={posts}
              setPosts={setPosts}
              setUsers={setUsers}
            />
            <MainEndColumn users={users} currentUser={user} />
          </div>
        </div>
        <BottomFooter />
      </div>
      <TopNavigation />
    </div>
  )
}

export default MainScreen
