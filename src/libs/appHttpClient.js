import axios from 'axios'

const appHttpClient = axios.create({
  baseURL: process.env.API_BASE_URL
})
appHttpClient.defaults.timeout = 20000

export default appHttpClient
