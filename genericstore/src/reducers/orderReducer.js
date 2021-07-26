import orderService from '../services/orders'

const reducer = (state = {customer: [], admin: []}, action) => {
    switch (action.type) {
      case 'INIT_ORDERS':
        return action.data
      case 'ADD_ORDER':
        return state.concat(action.data)
      default: return state
    }
  }
  
  // Action creators:
  
  export const initializeSentOrdersWithDetailsForCustomer = () => {
    return async dispatch => {
      const orders = await orderService.getOfCustomerWithDetails()
      dispatch({
        type: 'INIT_ORDERS',
        data: orders
      })
    }
  }

  export const sendNewOrder = (order) => {
    return async dispatch => {
      const response = await orderService.post(order)
      dispatch({
        type: 'ADD_ORDER',
        data: order
      })
    }
  }

export default reducer