import orderService from '../services/orders'

// customers state is "with details"
// cart is in the same format as Orders POST interface, but every item has also product name and time.
// time is there just to work as an unique key for react when printing arrays, and also to identify order items to be deleted.

// ALL adminsUndispatched have besides "details", also customer details.

//  adminsDispatched has "details" and customer details in those, that admin has clicked for more info.

const reducer = (state = { customers: [], cart: [], adminsUndispatched: [], adminsDispatched: [] }, action) => {
  switch (action.type) {
  case 'INIT_CUSTOMERS_ORDERS':
    return { customers: action.data, cart: state.cart, adminsUndispatched: state.adminsUndispatched, adminsDispatched: state.adminsDispatched }
  case 'INIT_ADMINS_UNDISPATCHED_ORDERS':
    return { customers: state.customers, cart: state.cart, adminsUndispatched: action.data, adminsDispatched: state.adminsDispatched }
  case 'INIT_ADMINS_DISPATCHED_ORDERS':
    return { customers: state.customers, cart: state.cart, adminsUndispatched: state.adminsUndispatched, adminsDispatched: action.data }
  case 'REPLACE_ADMINS_UNDISPATCHED_KEEP_DETAILS':
    const newAdmins = []

    for(let order of state.adminsUndispatched){
      if(order.id === action.data.id) {
        newAdmins.push({ ...action.data, orderDetails: order.orderDetails, name: order.name, address: order.address, mobile: order.mobile, email: order.email })
      } else {
        newAdmins.push(order)
      }
    }

    return { customers: state.customers, cart: state.cart, adminsUndispatched: newAdmins, adminsDispatched: state.adminsDispatched }
  case 'MODIFY_ADMINS_UNDISPATCHED_TRANSFER_TO_DISPATCHED_KEEP_DETAILS':
    const newUndispatched = []
    let newDispatched = state.adminsDispatched

    for(let order of state.adminsUndispatched){
      if(order.id === action.data.id) {
        newDispatched = state.adminsDispatched.concat({ ...action.data, orderDetails: order.orderDetails, name: order.name, address: order.address, mobile: order.mobile, email: order.email })
      } else {
        newUndispatched.push(order)
      }
    }

    return { customers: state.customers, cart: state.cart, adminsUndispatched: newUndispatched, adminsDispatched: newDispatched }
  case 'REPLACE_ADMINS_DISPATCHED_COMPLETELY':
    const ordersImmuted = []

    for(let order of state.adminsDispatched){
      if(order.id === action.data.id) {
        ordersImmuted.push({ ...action.data })
      } else {
        ordersImmuted.push(order)
      }
    }

    return { customers: state.customers, cart: state.cart, adminsUndispatched: state.adminsUndispatched, adminsDispatched: ordersImmuted }
  case 'REPLACE_ADMINS_DISPATCHED_KEEP_DETAILS':
    const ordersImmuted2 = []

    for(let order of state.adminsDispatched){
      if(order.id === action.data.id) {
        ordersImmuted2.push({ ...action.data, orderDetails: order.orderDetails, name: order.name, address: order.address, mobile: order.mobile, email: order.email })
      } else {
        ordersImmuted2.push(order)
      }
    }

    return { customers: state.customers, cart: state.cart, adminsUndispatched: state.adminsUndispatched, adminsDispatched: ordersImmuted2 }
  case 'ADD_TO_CART':
    const newCart = state.cart.concat(action.data)
    window.localStorage.setItem('cart', JSON.stringify(newCart))
    return { customers: state.customers, cart: newCart, adminsUndispatched: state.adminsUndispatched, adminsDispatched: state.adminsDispatched }
  case 'DELETE_FROM_CART':
    return { customers: state.customers, cart: state.cart.filter(orderItem => orderItem.product_time !== action.data), adminsUndispatched: state.adminsUndispatched, adminsDispatched: state.adminsDispatched }
  case 'CLEAR_CART':
    return { customers: state.customers, cart: [], adminsUndispatched: state.adminsUndispatched, adminsDispatched: state.adminsDispatched }
  default: return state
  }
}

// Action creators:

export const initializeCustomersOrdersWithDetails = (customerToken) => {
  return async dispatch => {
    const orders = await orderService.getOfCustomerWithDetails(customerToken)
    dispatch({
      type: 'INIT_CUSTOMERS_ORDERS',
      data: orders
    })
  }
}

export const initializeAdminsUndispatchedOrdersWithDetails = (adminToken) => {
  return async dispatch => {
    const orders = await orderService.getUndispatchedWithDetails(adminToken)
    dispatch({
      type: 'INIT_ADMINS_UNDISPATCHED_ORDERS',
      data: orders
    })
  }
}

export const getDetailsForAdminsDispatchedOrder = (id, adminToken) => {
  return async dispatch => {
    const order = await orderService.getOneWithDetails(id, adminToken)
    dispatch({
      type: 'REPLACE_ADMINS_DISPATCHED_COMPLETELY',
      data: order
    })
  }
}

export const initializeAdminsDispatchedOrders = (adminToken) => {
  return async dispatch => {
    const orders = await orderService.getDispatched(adminToken)
    dispatch({
      type: 'INIT_ADMINS_DISPATCHED_ORDERS',
      data: orders
    })
  }
}

export default reducer