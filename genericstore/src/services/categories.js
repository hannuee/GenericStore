import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/categories'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const post = async (newCategory, adminToken) => {
  const response = await axios.post(baseUrl, newCategory, { headers: { authorization: 'bearer ' + adminToken } })
  return response.data
}

const deleteCategory = async (id, adminToken) => {
  const response = await axios.delete(baseUrl + '/' + id, { headers: { authorization: 'bearer ' + adminToken } })
  return response.data
}

const putNewCategory = async (idAndInfoToModify, adminToken) => {
  const response = await axios.put(baseUrl + '/newCategory', idAndInfoToModify, { headers: { authorization: 'bearer ' + adminToken } })
  return response.data
}

export default { getAll, post, deleteCategory, putNewCategory }