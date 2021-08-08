import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/customers'

const post = async (customerInfo) => {
  const response = await axios.post(baseUrl, customerInfo)
  return response.data
}

const postLogin = async (credentials) => {
  const response = await axios.post(baseUrl + '/login', credentials)
  return response.data
}

// For admin:

const getAll = async (adminToken) => {
  const response = await axios.get(baseUrl, { headers: { authorization: 'bearer ' + adminToken } })
  return response.data
}

const getOneWithDetails = async (id, adminToken) => {
  const response = await axios.get(baseUrl + '/' + id, { headers: { authorization: 'bearer ' + adminToken } })
  return response.data
}

export default { post, postLogin, getAll, getOneWithDetails }