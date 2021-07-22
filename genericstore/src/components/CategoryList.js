import React from 'react'
import { useSelector } from 'react-redux'

const CategoryList = (props) => {
  const categories = useSelector(state => state.categories)
  
    return (
      <>
        {categories.map(category =>
        <div key={category.id}>
          {category.id}, {category.category_id}, {category.name}, {category.description}, {category.picture}
        </div>
        )}
      </>
    )
  }
  
  export default CategoryList