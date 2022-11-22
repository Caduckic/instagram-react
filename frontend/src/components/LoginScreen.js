import BottomFooter from './BottomFooter'

const LoginScreen = () => {
  return (
    <div className='login-screen-flex'>
      <div className='login-screen'>
        <div className='login-box'>
          <h1 className='login-logo'>Instagram Demo</h1>
          <form className='login-form'>
            <input placeholder='Username' />
            <input placeholder='Password' type='password' />
            <button className='login-button' type='submit'>Log in</button>
          </form>
        </div>
        <div className='create-user-box'>
          <div>Don&apos;t have an account? <a href='#create' className='link'>Sign up</a></div>
        </div>
      </div>
      <BottomFooter isLogin={true} />
    </div>
  )
}

export default LoginScreen