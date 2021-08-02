import customerService from '../services/customers'

const reducer = (state = {}, action) => {
    switch (action.type) {
      case 'ADD_LOGGED_IN':
        return {...state, loggedIn: action.data}
      case 'INIT_CUSTOMERS':
        return {...state, adminsCustomers: action.data}  
      case 'REPLACE_CUSTOMER':
          const customersImmuted = []
  
          for(let customer of state.adminsCustomers){
            if(customer.id === action.data.id) {
              customersImmuted.push({...action.data})
            } else {
              customersImmuted.push(customer)
            }
          }
  
        return {...state, adminsCustomers: customersImmuted}
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

  export const addNewCustomer = (customer, setDisabled, redirect) => {
    return async dispatch => {
      setDisabled(true)

      try{
        await customerService.post(customer)
        redirect()
      }
      catch(error){
        if (error.response.data.error.includes('violates unique constraint')) console.log('Email varattu')
        else console.log('Joku muu error')
        setDisabled(false)
      }
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

  export const getDetailsForCustomer = (id) => {
    return async dispatch => {
      const customer = await customerService.getOneWithDetails(id)
      dispatch({
        type: 'REPLACE_CUSTOMER',
        data: customer
      })
    }
  }

export default reducer