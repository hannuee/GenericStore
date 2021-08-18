import axios from 'axios'

const baseUrl = '/api/products'

const getAvailable = async () => {
  const response = await axios.get(baseUrl + '/available')
  return response.data
}

// For admin:

const getAll = async (adminToken) => {
  const response = await axios.get(baseUrl, { headers: { authorization: 'bearer ' + adminToken } })
  return response.data
}

const post = async (newProduct, adminToken) => {
  const response = await axios.post(baseUrl, newProduct, { headers: { authorization: 'bearer ' + adminToken } })
  return response.data
}

const putAvailable = async (idAndInfoToModify, adminToken) => {
  const response = await axios.put(baseUrl + '/available', idAndInfoToModify, { headers: { authorization: 'bearer ' + adminToken } })
  return response.data
}

const putNewCategory = async (idAndInfoToModify, adminToken) => {
  const response = await axios.put(baseUrl + '/newCategory', idAndInfoToModify, { headers: { authorization: 'bearer ' + adminToken } })
  return response.data
}

const putPricesAndSizes = async (idAndInfoToModify, adminToken) => {
  const response = await axios.put(baseUrl + '/pricesAndSizes', idAndInfoToModify, { headers: { authorization: 'bearer ' + adminToken } })
  return response.data
}

export default { getAll, getAvailable, post, putAvailable, putNewCategory, putPricesAndSizes }