import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import CategoryList from './components/CategoryList'
import { initializeCategories } from './reducers/categoryReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => dispatch(initializeCategories()), [dispatch])

  return (
    <div>
      <h1>Hello!</h1>
      <CategoryList />
    </div>
  )
}

export default App