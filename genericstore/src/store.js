import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import categoryReducer from './reducers/categoryReducer'

const reducer = combineReducers({ categories: categoryReducer })

const store = createStore(reducer, applyMiddleware(thunk))

export default store