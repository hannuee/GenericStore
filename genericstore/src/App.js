import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
//import CategoryList from './components/CategoryList'
import ResponsiveDrawer from './components/ResponsiveDrawer'
import { initializeCategories } from './reducers/categoryReducer'
import { initializeAvailableProducts } from './reducers/productReducer'
import { initializeCustomersOrdersWithDetails } from './reducers/orderReducer'
//import Container from '@material-ui/core/Container'

import { BrowserRouter as Router } from "react-router-dom"


const App = () => {  
  const dispatch = useDispatch()
console.log('PITÄIS ALUSTAAAAAAAAAAAAA')
  useEffect(() => {console.log('ALUSTUSSSSSSSSSSSSSSSS'); dispatch(initializeCategories())}, [dispatch])
  useEffect(() => dispatch(initializeAvailableProducts()), [dispatch])

  // SIIRRÄ ONNISTUNEEN KIRJAUTUMISEN JÄLKEISEEN HETKEEN, KUNHAN SE OSIO ON TEHTY, JA ONNISTUNEEN TILAUKSEN TEKO HETKEEN.
  useEffect(() => dispatch(initializeCustomersOrdersWithDetails()), [dispatch])

  return (
    <div>
      <Router>
        <ResponsiveDrawer />
      </Router>
    </div>
  )
}

export default App