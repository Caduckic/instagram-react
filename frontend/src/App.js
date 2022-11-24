import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { applyUser } from './reducers/authReducer'
import NavigationMain from './components/NavigationMain'
import LoginScreen from './components/LoginScreen'
import SignupScreen from './components/SignupScreen'
import MainScreen from './components/MainScreen'
import './styles.css'

const App = () => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInstaDemoUser')
    if (loggedUserJSON) {
      const jsonUser = JSON.parse(loggedUserJSON)
      dispatch(applyUser(jsonUser))
      navigate('/main')
    } else {
      navigate('/login')
    }
  }, [dispatch])

  return (
    <> 
      <div className='body-flex'>
        {(auth.user === null || auth.token === null) ? null : <NavigationMain currentUser={auth.user} />}
        <Routes>
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/signup' element={<SignupScreen />} />
          <Route path='/main' element={<MainScreen />} />
        </Routes>
      </div>
    </>
  )
}

export default App
