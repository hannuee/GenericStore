import customerService from '../services/customers'

const reducer = (state = {}, action) => {
    switch (action.type) {
      case 'ADD_LOGGED_IN':
        return {...state, loggedIn: action.data}
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

  export const sendNewCustomer = (customer) => {
    return async dispatch => {
      const response = await customerService.post(customer)
      // Vastaus onnistumisesta notifikaation dispatchilla
    }
  }

export default reducer