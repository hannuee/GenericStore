import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
//import CategoryList from './components/CategoryList'
import ResponsiveDrawer from './components/ResponsiveDrawer'
import { initializeCategories } from './reducers/categoryReducer'
import { initializeAvailableProducts } from './reducers/productReducer'
import { initializeAllProducts } from './reducers/productReducer'

//import Container from '@material-ui/core/Container'

import { BrowserRouter as Router } from "react-router-dom"


const App = () => {  
  const dispatch = useDispatch()
console.log('PITÄIS ALUSTAAAAAAAAAAAAA')
  const loggedIn = useSelector(state => state.customers.loggedIn)
  useEffect(() => {console.log('ALUSTUSSSSSSSSSSSSSSSS'); dispatch(initializeCategories())}, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('genericStoreUser')

    let user
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)

      dispatch({
        type: 'ADD_LOGGED_IN',
        data: user
      })
    }

    if (user != null && user.admin != null) dispatch(initializeAllProducts(user.token))
    else dispatch(initializeAvailableProducts())
  }, [dispatch])

  //useEffect(() => {
  //  dispatch(initializeAvailableProducts())
  //}, [dispatch])


  return (
    <div>
      <Router>
        <ResponsiveDrawer />
      </Router>
    </div>
  )
}

export default App