import orderService from '../services/orders'

// customers state is "with details"       
// cart is in the same format as Orders POST interface, but every item has also product name and time.
// time is there just to work as an unique key for react when printing arrays.
const reducer = (state = {customers: [], cart: [], admins: []}, action) => {
    switch (action.type) {
      case 'INIT_CUSTOMERS_ORDERS':
        return {customers: action.data, cart: state.cart, admins: state.admins}
      case 'ADD_ORDER':  // MIETI!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return {customers: state.customers.concat(action.data), cart: state.cart, admins: state.admins}
      case 'INIT_ADMINS_ORDERS':  
        return {customers: state.customers, cart: state.cart, admins: action.data}
      case 'REPLACE_ADMIN':
        const newAdmins = []

        for(let order in state.admins){
          if(order.id === action.data.id) {
            newAdmins.push({...action.data, orderDetails: order.orderDetails})
          } else {
            newAdmins.push(order)
          }
        }

        return {customers: state.customers, cart: state.cart, admins: newAdmins}
      case 'ADD_TO_CART':
console.log({customers: state.customers, cart: state.cart.concat(action.data), admins: state.admins})
        return {customers: state.customers, cart: state.cart.concat(action.data), admins: state.admins}
      default: return state
    }
  }
  
  // Action creators:
  
  export const initializeCustomersOrdersWithDetails = () => {
    return async dispatch => {
      const orders = await orderService.getOfCustomerWithDetails()
      dispatch({
        type: 'INIT_CUSTOMERS_ORDERS',
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

  export const addProductAndDetailsToCart = (productAndDetails) => {
    return async dispatch => {
      dispatch({
        type: 'ADD_TO_CART',
        data: productAndDetails
      })
    }
  }

  export const initializeAdminsUndispatchedOrdersWithDetails = () => {
    return async dispatch => {
      const orders = await orderService.getUndispatchedWithDetails()
      dispatch({
        type: 'INIT_ADMINS_ORDERS',
        data: orders
      })
    }
  }

  export const modifyInternalNotes = (idAndInfoToModify) => {
    return async dispatch => {
      const order = await orderService.putInternalNotes(idAndInfoToModify)
      dispatch({
        type: 'REPLACE_ADMIN',
        data: order
      })
    }
  }
  
  export const markOrderAsDispatced = (id) => {
    return async dispatch => {
      const order = await orderService.putOrderDispatced(id)
      dispatch({
        type: 'REPLACE_ADMIN',
        data: order
      })
    }
  }

export default reducer