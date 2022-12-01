import imageService from '../utils/images'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, useNavigate } from 'react-router-dom'
import BottomFooter from './BottomFooter'
import { useState } from 'react'
import userService from '../services/users'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/authReducer'

const SignupScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userIconId, setUserIconId] = useState(null)
  const [isError, setIsError] = useState('')

  const handleCreateUser = async (event) => {
    event.preventDefault()

    try {
      const newUser = await userService.create({ name, username, password, icon: userIconId })
      await dispatch(loginUser({ username, password }))
      setName('')
      setUsername('')
      setPassword('')
      setIsError('')
      navigate('/main')
    }
    catch (exception) {
      setIsError(exception.response.data.error)
    }
  }
  return (
    <div className='login-screen-flex'>
      <div className='login-screen'>
        <div className='login-box'>
          <h1 className='login-logo'>Instagram Demo</h1>
          <div className='signup-prompt'>
            Sign up to see posts from other users.
          </div>
          <form className='signup-form' onSubmit={handleCreateUser}>
            <input placeholder='Name' value={name} onChange={({ target }) => {
              setName(target.value)
            }}/>
            <input placeholder='Username' value={username} onChange={({ target }) => {
              setUsername(target.value)
            }}/>
            <input placeholder='Password' type='password' value={password} onChange={({ target }) => {
              setPassword(target.value)
            }}/>
            <div className='create-user-icon-dropdown'>
              <div className='create-user-icon-dropbtn'>
                <div className='dropdown-text'>Icon</div>
                <span className="material-icons">
                  arrow_drop_down
                </span>
              </div>
              <div className='create-user-icon-dropdown-content'>
                {imageService.getUserImages().map(image => {
                  return (
                    <div
                      className='dropdown-image-container'
                      key={image.id}
                      onClick={(e) => {
                        setUserIconId(image.id)
                      }}
                    >
                      <LazyLoadImage src={image.image}/>
                      <div className='dropdown-image-cover'></div>
                    </div>
                  )
                })}
              </div>
            </div>
            {userIconId
              ?
              <div className='create-user-icon' style={ { display: 'flex' } }>
                <div className="story-card-user-icon-container">
                  <LazyLoadImage src={imageService.getUserImageById(userIconId)} />
                </div>
              </div>
              : null
            }
            <button className='login-button' type='submit'>Sign up</button>
          </form>
          <div className='login-error' style={{display: isError !== '' ? 'block' : 'none'}}>
            <p>
              {isError}
            </p>
          </div>
        </div>
        <div className='create-user-box'>
          <div>Have an account? <Link to='/login' className='link'>Log in</Link></div>
        </div>
      </div>
      <BottomFooter isLogin={true} />
    </div>
  )
}

export default SignupScreen