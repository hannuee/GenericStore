import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import CategoryHeader from '../assistingComponents/CategoryHeader'
import ProductCard from '../assistingComponents/ProductCard'

// Material UI:
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';


const useStylesSizeSelect = makeStyles((theme) => ({
  chipStyle: {
    margin: theme.spacing(0.5),
  },
}));

const CategoryPage = (props) => {

  const subCategories = useSelector(state => state.categories.filter(category => category.category_id === props.id))
  const products = useSelector(state => state.products.filter(product => product.category_id === props.id))

  const classesSizeSelect = useStylesSizeSelect();
  
    return (
      <> 
        <CategoryHeader id={props.id} />
        <br />
        
        {subCategories.map(category =>
          <Link to={`/kategoriat/${category.id}`} key={category.id}>
            <Chip label={category.name} clickable color="primary" className={classesSizeSelect.chipStyle} />
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