import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import postService from '../services/posts'
import commentService from '../services/comments'
import loginService from '../services/login'

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { username, name, icon, id, token } = action.payload
      state.user = {
        username,
        name,
        icon,
        id
      }
      state.token = token
    },
    logOut: (state, action) => {
      state.user = null
      state.token = null
    }
  }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const applyUser = user => {
  return dispatch => {
    userService.setToken(user.token)
    postService.setToken(user.token)
    commentService.setToken(user.token)
    dispatch(setCredentials(user))
  }
}

export const loginUser = user => {
  return async dispatch => {
    const loggedUser = await loginService.login(user)
    window.localStorage.setItem('loggedInstaDemoUser', JSON.stringify(loggedUser))
    userService.setToken(loggedUser.token)
    postService.setToken(loggedUser.token)
    commentService.setToken(loggedUser.token)
    dispatch(setCredentials(loggedUser))
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedInstaDemoUser')
    userService.setToken(null)
    postService.setToken(null)
    commentService.setToken(null)
    dispatch(logOut())
  }
}

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token