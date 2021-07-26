import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/categories'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const post = async (newCategory) => {
  const response = await axios.post(baseUrl, newCategory)
  return response.data
}

const deleteCategory = async (id) => {
  const response = await axios.delete(baseUrl + '/' + id)
  return response.data
}

const putNewCategory = async (idAndInfoToModify) => {
  const response = await axios.put(baseUrl + '/newCategory', idAndInfoToModify)
  return response.data
}

export default { getAll, post, deleteCategory, putNewCategory }