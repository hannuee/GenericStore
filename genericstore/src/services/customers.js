import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/customers'

const post = async (customerInfo) => {
  const response = await axios.get(baseUrl, customerInfo)
  return response.data
}

const postLogin = async (credentials) => {
  const response = await axios.get(baseUrl + '/login', credentials)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOneWithDetails = async (id) => {
  const response = await axios.get(baseUrl + '/' + id)
  return response.data
}

export default { post, postLogin, getAll, getOneWithDetails }