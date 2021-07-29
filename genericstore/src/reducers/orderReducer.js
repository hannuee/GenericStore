import orderService from '../services/orders'

// customers state is "with details"       
// cart is in the same format as Orders POST interface, but every item has also product name and time.
// time is there just to work as an unique key for react when printing arrays, and also to identify order items to be deleted.
const reducer = (state = {customers: [], cart: [], admins: []}, action) => {
    switch (action.type) {
      case 'INIT_CUSTOMERS_ORDERS':
        return {customers: action.data, cart: state.cart, admins: state.admins}
      case 'ADD_ORDER':  // MIETI!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ei käyttöä toistaiseksti
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
      case 'DELETE_FROM_CART':
console.log({customers: state.customers, cart: state.cart.filter(orderItem => orderItem.product_time !== action.data), admins: state.admins})
        return {customers: state.customers, cart: state.cart.filter(orderItem =>orderItem.product_time !== action.data), admins: state.admins}
      case 'CLEAR_CART':
        return {customers: state.customers, cart: [], admins: state.admins}
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

  export const sendNewOrder = (cartItems) => {
    return async dispatch => {

      for(let item of cartItems) {
        delete item.product_time
        delete item.product_name
      }

      const response = await orderService.post(cartItems)

      // jos onnistuu niin ostoskorin tyhjennys:
      dispatch({
        type: 'CLEAR_CART'
      })

      // Tilaukset haetaan uudestaan koska Orders POST rajapinta ei tällä hetkellä palauta lisättyä tilausta.
      // Kun tilaukset pyydetään Orders GET rajapinnoilta niin ne tulevat varmasti oikein, siten kun ne ovat tietokannassa.
      dispatch(initializeCustomersOrdersWithDetails())
    }
  }

  export const addOrderItemToCart = (productAndDetails) => {
    return async dispatch => {
      dispatch({
        type: 'ADD_TO_CART',
        data: productAndDetails
      })
    }
  }

  export const deleteItemFromCart = (product_time) => {
    return async dispatch => {
      dispatch({
        type: 'DELETE_FROM_CART',
        data: product_time
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