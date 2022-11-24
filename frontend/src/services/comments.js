import axios from 'axios'

const baseUrl = '/api/comments'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (newObject, postId ) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, { content: newObject, post: postId }, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default {
  getAll,
  getById,
  create,
  remove,
  setToken
}