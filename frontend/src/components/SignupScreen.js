import BottomFooter from './BottomFooter'

const SignupScreen = () => {
  return (
    <div className='login-screen-flex'>
      <div className='login-screen'>
        <div className='login-box'>
          <h1 className='login-logo'>Instagram Demo</h1>
          <div className='signup-prompt'>
            Sign up to see posts from other users.
          </div>
          <form className='signup-form'>
            <input placeholder='Name' />
            <input placeholder='Username' />
            <input placeholder='Password' type='password' />
            <select placeholder='User Icon'>
              <option>e</option>
              <option>2</option>
            </select>
            <button className='login-button' type='submit'>Sign up</button>
          </form>
        </div>
        <div className='create-user-box'>
          <div>Have an account? <a href='#create' className='link'>Log in</a></div>
        </div>
      </div>
      <BottomFooter isLogin={true} />
    </div>
  )
}

export default SignupScreen