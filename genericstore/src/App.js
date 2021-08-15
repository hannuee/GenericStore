import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'  // TESTTTTTTTTTTTTTTT
import { useDispatch } from 'react-redux'
import ResponsiveDrawer from './components/ResponsiveDrawer'
import { initializeCategories } from './reducers/categoryReducer'
import { initializeAvailableProducts } from './reducers/productReducer'
import { initializeAllProducts } from './reducers/productReducer'
import { BrowserRouter as Router } from "react-router-dom"


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => dispatch(initializeCategories()), [dispatch])

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

    dispatch(initializeCategories())
    if (user != null && user.admin != null) dispatch(initializeAllProducts(user.token))
    else dispatch(initializeAvailableProducts())
  }, [dispatch])

  
  return (
    <div>
      <Router>
        <ResponsiveDrawer />
      </Router>
    </div>
  )
}

export default App