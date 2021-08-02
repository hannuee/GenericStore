import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import categoryReducer from './reducers/categoryReducer'
import productReducer from './reducers/productReducer'
import orderReducer from './reducers/orderReducer'
import customerReducer from './reducers/customerReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({ categories: categoryReducer, products: productReducer, orders: orderReducer, customers: customerReducer, notification: notificationReducer })

const store = createStore(reducer, applyMiddleware(thunk))

export default store