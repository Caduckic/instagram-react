import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { applyUser } from './reducers/authReducer'
import NavigationMain from './components/NavigationMain'
import LoginScreen from './components/LoginScreen'
import SignupScreen from './components/SignupScreen'
import MainScreen from './components/MainScreen'
import './styles.css'
import OverlayPostForm from './components/OverlayPostForm'

const App = () => {
  const [posts, setPosts] = useState([])
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [overlay, setOverlay] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInstaDemoUser')
    if (loggedUserJSON) {
      const decodedJwt = JSON.parse(atob(loggedUserJSON.split('.')[1]))
      if (decodedJwt.exp * 1000 < Date.now()) {
        window.localStorage.removeItem('loggedInstaDemoUser')
        navigate('/login')
      } else {
        const jsonUser = JSON.parse(loggedUserJSON)
        dispatch(applyUser(jsonUser))
        navigate('/main')
      }
    } else {
      navigate('/login')
    }
  }, [dispatch])

  return (
    <> 
      <div className='body-flex'>
        {(auth.user === null || auth.token === null) 
          ? null 
          : <NavigationMain currentUser={auth.user} setOverlay={setOverlay} />}
        <Routes>
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/signup' element={<SignupScreen />} />
          <Route path='/main' element={<MainScreen posts={posts} setPosts={setPosts} />} />
        </Routes>
        {overlay
          ?
          <div className='overlay-container'>
            <div className='overlay-box'>
              {overlay === 'POST' ?
                <OverlayPostForm setOverlay={setOverlay} posts={posts} setPosts={setPosts} /> : null
              }
            </div>
            <div className='overlay-exit'>
              <span className="material-icons" onClick={() => setOverlay('')}>
                close
              </span>
            </div>
          </div>
          : null
        }
      </div>
    </>
  )
}

export default App
