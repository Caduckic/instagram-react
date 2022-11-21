import axios from 'axios'

const baseUrl = 'http://localhost:3001/posts'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const like = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default {
  getAll,
  like
}