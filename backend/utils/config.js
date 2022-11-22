require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const HASH_SECRET = process.env.HASH_SECRET

module.exports = {
  PORT,
  MONGODB_URI,
  HASH_SECRET
}