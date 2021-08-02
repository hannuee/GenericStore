import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import ProductAdditionForm from './ProductAdditionForm'
import CategoryAdditionForm from './CategoryAdditionForm'
import ProductCard from './ProductCard'
import { deleteCategory } from '../reducers/categoryReducer'
import { modifyParentCategory } from '../reducers/categoryReducer'

import categoryService from '../services/categories'
import {useHistory} from 'react-router-dom'
import { displayNotificationForSeconds } from '../reducers/notificationReducer'

import { Link } from "react-router-dom"
import Button from '@material-ui/core/Button';

// Kategorian muuttamiseen:
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
const useStylesSizeSelect = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CategoryPage = (props) => {

  const dispatch = useDispatch()

  const history = useHistory()

  const categoryDisplayed = useSelector(state => state.categories.find(category => category.id === props.id))
  const subCategories = useSelector(state => state.categories.filter(category => category.category_id === props.id))
  const products = useSelector(state => state.products.filter(product => product.category_id === props.id))

  const handleDeleteCategory = async () => {
    try{
      const category = await categoryService.deleteCategory(categoryDisplayed.id)
      history.push('/')
      dispatch({
        type: 'DELETE_CATEGORY',
        data: categoryDisplayed.id
      })
      dispatch(displayNotificationForSeconds('Kategoria poistettu', 5))
    }
    catch(error) {
      dispatch(displayNotificationForSeconds('Kategorian poisto epäonnistui', 5))
    }
  }


  // Kategorian muuttamiseen, harkitse refaktorointi Product Card vastaavien kanssaaaaaaaaaaaaaaaaa:

  const classesSizeSelect = useStylesSizeSelect();

  const categories = useSelector(state => state.categories) 

  const [categorySelected, setCategorySelected] = React.useState(categoryDisplayed.id)

  const handleCategoryChange = (event) => {
    setCategorySelected(event.target.value)
  }

  const handleCategoryUpdate = async () => {
    try{
      const category = await categoryService.putNewCategory({
        id: categoryDisplayed.id,
        parentCategoryId: categorySelected
      })
      dispatch({
        type: 'REPLACE_CATEGORY',
        data: category
      })
      dispatch(displayNotificationForSeconds('Kategoria muutettu', 5))
    } 
    catch(error) {
      dispatch(displayNotificationForSeconds('Kategorian muutto epäonnistui', 5))
    }
  }


  const categoryDeleteButton = () => {
    if(subCategories.length === 0 && products.length === 0) return (
      <Button size="small" onClick={handleDeleteCategory}>Poista kategoria</Button>
      )   
    // NÄYTÄ TÄÄLLÄ OHJE ETTÄ KATEGORIAN TULEE OLLA TYHJÄ JOTTA VOI POISTAA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }
 


  const newCategorySelector = () => 
    <FormControl variant="outlined" className={classesSizeSelect.formControl}>
        <InputLabel id="size-select">Tuotteen uusi kategoria</InputLabel>
        <Select
          labelId="size-select-label-id"
          id="size-select-id"
          value={categorySelected}
          onChange={handleCategoryChange}
          label="Tuotteen uusi kategoria"
        >
          {categories.map(category => <MenuItem value={category.id}>{category.name}</MenuItem> )}
        </Select>
      </FormControl>





    return (
      <>
        <br />
        <br />

        {categoryDisplayed.id}, {categoryDisplayed.category_id}, {categoryDisplayed.name}, {categoryDisplayed.description} 
        {categoryDeleteButton()}

        {newCategorySelector()} <Button size="small" onClick={handleCategoryUpdate}>Päivitä kategoria</Button>
        
        <br />
        <ProductAdditionForm parentCategoryIdForNewProduct={categoryDisplayed.id} />
        <br />
        <CategoryAdditionForm parentCategoryIdForNewCategory={categoryDisplayed.id} />
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