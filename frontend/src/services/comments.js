import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/comments'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (newObject, postId, userId ) => {
  const response = await axios.post(baseUrl, { content: newObject, post: postId, user: userId })
  return response.data
}

export default {
  getAll,
  getById,
  create
}