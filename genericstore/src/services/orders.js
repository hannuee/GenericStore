import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/orders'

const getOfCustomerWithDetails = async () => {
  const response = await axios.get(baseUrl + '/ofCustomerWithDetails/1')
  return response.data
}

const post = async (order) => {
  const response = await axios.post(baseUrl, order)
  return response.data
}

const getUndispatchedWithDetails = async () => {
  const response = await axios.get(baseUrl + '/undispatchedWithDetails')
  return response.data
}

const putInternalNotes = async (idAndInfoToModify) => {
  const response = await axios.put(baseUrl + '/internalNotes', idAndInfoToModify)
  return response.data
}

const putOrderDispatced = async (id) => {
  const response = await axios.put(baseUrl + '/orderDispatced', id)
  return response.data
}

export default { getOfCustomerWithDetails, post, getUndispatchedWithDetails, putInternalNotes, putOrderDispatced }