import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
//import CategoryList from './components/CategoryList'
import ResponsiveDrawer from './components/ResponsiveDrawer'
import { initializeCategories } from './reducers/categoryReducer'
import { initializeAvailableProducts } from './reducers/productReducer'

//import Container from '@material-ui/core/Container'

import { BrowserRouter as Router } from "react-router-dom"


const App = () => {  
  const dispatch = useDispatch()
console.log('PITÄIS ALUSTAAAAAAAAAAAAA')
  useEffect(() => {console.log('ALUSTUSSSSSSSSSSSSSSSS'); dispatch(initializeCategories())}, [dispatch])
  useEffect(() => dispatch(initializeAvailableProducts()), [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('genericStoreUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'ADD_LOGGED_IN',
        data: user
      })
    }
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