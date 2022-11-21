import axios from 'axios'

const baseUrl = 'http://localhost:3001/comments'
const postsBaseUrl = 'http://localhost:3001/posts'
const usersBaseUrl = 'http://localhost:3001/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (postId, userId, newCommentObject, newPostObject, newUserObject) => {
  await axios.put(`${usersBaseUrl}/${userId}`, newUserObject)
  await axios.put(`${postsBaseUrl}/${postId}`, newPostObject)
  const response = await axios.post(baseUrl, newCommentObject)
  return response.data
}

export default {
  getAll,
  create
}