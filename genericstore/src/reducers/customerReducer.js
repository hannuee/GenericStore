import customerService from '../services/customers'

const reducer = (state = {}, action) => {
    switch (action.type) {
      case 'ADD_LOGGED_IN':
        return {...state, loggedIn: action.data}
      case 'INIT_CUSTOMERS':
        return {...state, customers: action.data}  
      case 'SET_CUSTOMER_W_DETAILS':
        return {...state, customerWithDetails: action.data}
      default: return state
    }
  }
  
  // Action creators:
  
  export const logInWithCredentials = (credentials) => {
    return async dispatch => {
      const customerNameAndToken = await customerService.postLogin(credentials)
      dispatch({
        type: 'ADD_LOGGED_IN',
        data: customerNameAndToken
      })
    }
  }

  export const addNewCustomer = (customer) => {
    return async dispatch => {
      const response = await customerService.post(customer)
      // Vastaus onnistumisesta notifikaation dispatchilla, sitten redirect kirjautumissivulle.
    }
  }


  export const initializeCustomers = () => {
    return async dispatch => {
      const customers = await customerService.getAll()
      dispatch({
        type: 'INIT_CUSTOMERS',
        data: customers
      })
    }
  }

  export const showCustomerWithDetails = (id) => {
    return async dispatch => {
      const customer = await customerService.getOneWithDetails(id)
      dispatch({
        type: 'SET_CUSTOMER_W_DETAILS',
        data: customer
      })
    }
  }

export default reducer