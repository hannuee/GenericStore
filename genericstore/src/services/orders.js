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

// For admin:

const getOneWithDetails = async (id, adminToken) => {
  const response = await axios.get(baseUrl + '/details/' + id, { headers: { authorization: 'bearer ' + adminToken } })
  return response.data
}

const getUndispatchedWithDetails = async (adminToken) => {
  const response = await axios.get(baseUrl + '/undispatchedWithDetails', { headers: { authorization: 'bearer ' + adminToken } })
  return response.data
}

const getDispatched = async (adminToken) => {
  const response = await axios.get(baseUrl + '/dispatched', { headers: { authorization: 'bearer ' + adminToken } })
  return response.data
}

const putInternalNotes = async (idAndInfoToModify, adminToken) => {
  const response = await axios.put(baseUrl + '/internalNotes', idAndInfoToModify, { headers: { authorization: 'bearer ' + adminToken } })
  return response.data
}

const putOrderDispatched = async (id, adminToken) => {
  const response = await axios.put(baseUrl + '/orderDispatced', id, { headers: { authorization: 'bearer ' + adminToken } })
  return response.data
}

export default { getOfCustomerWithDetails, post, getUndispatchedWithDetails, putInternalNotes, putOrderDispatched, getDispatched, getOneWithDetails }