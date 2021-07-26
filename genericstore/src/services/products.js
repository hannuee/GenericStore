import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/products'

const getAvailable = async () => {
  const response = await axios.get(baseUrl + '/available')
  return response.data
}

// For admin:

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const post = async (newProduct) => {
  const response = await axios.post(baseUrl, newProduct)
  return response.data
}

const putAvailable = async (idAndInfoToModify) => {
  const response = await axios.put(baseUrl + '/available', idAndInfoToModify)
  return response.data
}

const putNewCategory = async (idAndInfoToModify) => {
  const response = await axios.put(baseUrl + '/newCategory', idAndInfoToModify)
  return response.data
}

const putPricesAndSizes = async (idAndInfoToModify) => {
  const response = await axios.put(baseUrl + '/pricesAndSizes', idAndInfoToModify)
  return response.data
}

export default { getAll, getAvailable, post, putAvailable, putNewCategory, putPricesAndSizes }