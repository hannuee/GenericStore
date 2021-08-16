import customerService from '../services/customers'

const reducer = (state = { loggedIn: null }, action) => {
  switch (action.type) {
  case 'ADD_LOGGED_IN':
    return { ...state, loggedIn: action.data }
  case 'INIT_CUSTOMERS':
    return { ...state, adminsCustomers: action.data }
  case 'REPLACE_CUSTOMER':
    const customersImmuted = []

    for(let customer of state.adminsCustomers){
      if(customer.id === action.data.id) {
        customersImmuted.push({ ...action.data })
      } else {
        customersImmuted.push(customer)
      }
    }

    return { ...state, adminsCustomers: customersImmuted }
  default: return state
  }
}

// Action creators:

export const initializeCustomers = (adminToken) => {
  return async dispatch => {
    const customers = await customerService.getAll(adminToken)
    dispatch({
      type: 'INIT_CUSTOMERS',
      data: customers
    })
  }
}

export const getDetailsForCustomer = (id, adminToken) => {
  return async dispatch => {
    const customer = await customerService.getOneWithDetails(id, adminToken)
    dispatch({
      type: 'REPLACE_CUSTOMER',
      data: customer
    })
  }
}

export default reducer