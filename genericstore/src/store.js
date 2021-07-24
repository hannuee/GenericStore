import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import categoryReducer from './reducers/categoryReducer'
import productReducer from './reducers/productReducer'

const reducer = combineReducers({ categories: categoryReducer, products: productReducer })

const store = createStore(reducer, applyMiddleware(thunk))

export default store