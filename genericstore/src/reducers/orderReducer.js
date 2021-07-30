import orderService from '../services/orders'

// customers state is "with details"       
// cart is in the same format as Orders POST interface, but every item has also product name and time.
// time is there just to work as an unique key for react when printing arrays, and also to identify order items to be deleted.

// ALL adminsUndispatched have besides "details", also customer details.

//  adminsDispatched has "details" and customer details in those, that admin has clicked for more info.

const reducer = (state = {customers: [], cart: [], adminsUndispatched: [], adminsDispatched: []}, action) => {
    switch (action.type) {
      case 'INIT_CUSTOMERS_ORDERS':
        return {customers: action.data, cart: state.cart, adminsUndispatched: state.adminsUndispatched, adminsDispatched: state.adminsDispatched}
      case 'ADD_ORDER':  // MIETI!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ei käyttöä toistaiseksti
        return {customers: state.customers.concat(action.data), cart: state.cart, adminsUndispatched: state.adminsUndispatched, adminsDispatched: state.adminsDispatched}
      case 'INIT_ADMINS_UNDISPATCHED_ORDERS':  
        return {customers: state.customers, cart: state.cart, adminsUndispatched: action.data, adminsDispatched: state.adminsDispatched}
      case 'INIT_ADMINS_DISPATCHED_ORDERS':  
        return {customers: state.customers, cart: state.cart, adminsUndispatched: state.adminsUndispatched, adminsDispatched: action.data}
      case 'REPLACE_ADMINS_UNDISPATCHED':  // vaihda nimeä ja korjaa ongelma että ylikirjottaa asiakastiedot.
        const newAdmins = []

        for(let order of state.adminsUndispatched){
          if(order.id === action.data.id) {
            newAdmins.push({...action.data, orderDetails: order.orderDetails})
          } else {
            newAdmins.push(order)
          }
        }

        return {customers: state.customers, cart: state.cart, adminsUndispatched: newAdmins, adminsDispatched: state.adminsDispatched}
      case 'REPLACE_ADMINS_DISPATCHED':
          const ordersImmuted = []
  
          for(let order of state.adminsDispatched){
            if(order.id === action.data.id) {
              ordersImmuted.push({...action.data})
            } else {
              ordersImmuted.push(order)
            }
          }
  
        return {customers: state.customers, cart: state.cart, adminsUndispatched: state.adminsUndispatched, adminsDispatched: ordersImmuted}
      case 'ADD_TO_CART':
        return {customers: state.customers, cart: state.cart.concat(action.data), adminsUndispatched: state.adminsUndispatched, adminsDispatched: state.adminsDispatched}
      case 'DELETE_FROM_CART':
        return {customers: state.customers, cart: state.cart.filter(orderItem =>orderItem.product_time !== action.data), adminsUndispatched: state.adminsUndispatched, adminsDispatched: state.adminsDispatched}
      case 'CLEAR_CART':
        return {customers: state.customers, cart: [], adminsUndispatched: state.adminsUndispatched, adminsDispatched: state.adminsDispatched}
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
        type: 'INIT_ADMINS_UNDISPATCHED_ORDERS',
        data: orders
      })
    }
  } 

  export const getDetailsForAdminsDispatchedOrder = (id) => { 
    return async dispatch => {
      const order = await orderService.getOneWithDetails(id)
      dispatch({
        type: 'REPLACE_ADMINS_DISPATCHED',
        data: order
      })
    }
  }

  export const initializeAdminsDispatchedOrders = () => { 
    return async dispatch => {
      const orders = await orderService.getDispatched()
      dispatch({
        type: 'INIT_ADMINS_DISPATCHED_ORDERS',
        data: orders
      })
    }
  }

  export const modifyInternalNotes = (idAndInfoToModify) => {  // YLIKIRJOITTAA TÄLLÄ HETKELLÄ TILAUKSEN ASIAKATIEDOT!
    return async dispatch => {
      const order = await orderService.putInternalNotes(idAndInfoToModify)
      dispatch({
        type: 'REPLACE_ADMINS_UNDISPATCHED',
        data: order
      })
    }
  }
  
  export const markOrderAsDispatced = (id) => {          // YLIKIRJOITTAA TÄLLÄ HETKELLÄ TILAUKSEN ASIAKATIEDOT!
    return async dispatch => {
      const order = await orderService.putOrderDispatced(id)
      dispatch({
        type: 'REPLACE_ADMINS_UNDISPATCHED',
        data: order
      })
    }
  }

export default reducer