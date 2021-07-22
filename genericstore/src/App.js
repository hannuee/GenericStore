//import React, {useEffect} from 'react'
import React from 'react'
//import { useDispatch } from 'react-redux'
//import CategoryList from './components/CategoryList'
import ResponsiveDrawer from './components/ResponsiveDrawer'
//import { initializeCategories } from './reducers/categoryReducer'
//import Container from '@material-ui/core/Container'

const App = () => {  
  // const dispatch = useDispatch()

  // useEffect(() => dispatch(initializeCategories()), [dispatch])

  return (
    <div>
      <ResponsiveDrawer />
    </div>
  )
}

export default App