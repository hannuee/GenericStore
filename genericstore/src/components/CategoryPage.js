import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from './ProductCard'

import { Link } from "react-router-dom"
import Button from '@material-ui/core/Button';

const CategoryPage = (props) => {

  const kokoTila = useSelector(state => state)

  const categoryDisplayed = useSelector(state => state.categories.find(category => category.id === props.id))
  const subCategories = useSelector(state => state.categories.filter(category => category.category_id === props.id))
  const products = useSelector(state => state.products.filter(product => product.category_id === props.id))

    return (
      <>
        <br />
        <br />

        {categoryDisplayed.id}, {categoryDisplayed.category_id}, {categoryDisplayed.name}, {categoryDisplayed.description}
        
        <br />
        <br />
        
        {subCategories.map(category =>

          <Link to={`/kategoriat/${category.id}`} key={category.id}>
            <Button size="small" color="primary" >
              {category.name}, {category.description}
            </Button>
          </Link>

        )}

        <br />
        <br />

        {products.map(product =>
        <div key={product.id}>
          <ProductCard product={product} />
          <br />
        </div>
        )}
      </>
    )
  }
  
  export default CategoryPage