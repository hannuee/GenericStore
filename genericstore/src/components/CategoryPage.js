import React from 'react'
import { useSelector } from 'react-redux'

const CategoryPage = (props) => {

  const kokoTila = useSelector(state => state)
  console.log(kokoTila)

  const categoryDisplayed = useSelector(state => state.categories.find(category => category.id === props.id))
  const subCategories = useSelector(state => state.categories.filter(category => category.category_id === props.id))
  const products = useSelector(state => state.products.filter(product => product.category_id === props.id))

    return (
      <>
        {categoryDisplayed.id}, {categoryDisplayed.category_id}, {categoryDisplayed.name}, {categoryDisplayed.description}
        
        <br />
        <br />
        
        {subCategories.map(category =>
        <div key={category.id}>
          {category.id}, {category.category_id}, {category.name}, {category.description} <br />
        </div>
        )}

        <br />
        <br />

        {products.map(product =>
        <div key={product.id}>
          {product.id}, {product.category_id}, {product.name}, {product.description}, {product.pricesAndSizes}, {product.available}, {product.added} <br />
        </div>
        )}
      </>
    )
  }
  
  export default CategoryPage