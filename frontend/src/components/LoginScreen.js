import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/authReducer'
import { Link, useNavigate } from 'react-router-dom'
import BottomFooter from './BottomFooter'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
      setIsError(false)
      navigate('/main')
    }
    catch (exception) {
      setIsError(true)
    }
  }

  return (
    <div className='login-screen-flex'>
      <div className='login-screen'>
        <div className='login-box'>
          <h1 className='login-logo'>Instagram Demo</h1>
          <form className='login-form' onSubmit={handleLogin}>
            <input placeholder='Username' value={username} onChange={({ target }) => {
              setUsername(target.value)
            }} />
            <input placeholder='Password' type='password' value={password} onChange={({ target }) => {
              setPassword(target.value)
            }} />
            <button className='login-button' type='submit'>Log in</button>
          </form>
          <div className='login-error' style={{display: isError ? 'block' : 'none'}}>
            <p>
              Sorry, your password or username was incorrect. Please double-check your password and username.
            </p>
          </div>
        </div>
        <div className='create-user-box'>
          <div>Don&apos;t have an account? <Link to='/signup' className='link'>Sign up</Link></div>
        </div>
      </div>
      <BottomFooter isLogin={true} />
    </div>
  )
}

export default LoginScreen