import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import categoryReducer from './reducers/categoryReducer'
import productReducer from './reducers/productReducer'
import orderReducer from './reducers/orderReducer'
import customerReducer from './reducers/customerReducer'

const reducer = combineReducers({ categories: categoryReducer, products: productReducer, orders: orderReducer, customers: customerReducer })

const store = createStore(reducer, applyMiddleware(thunk))

export default store