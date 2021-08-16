import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { displayNotificationForSeconds } from '../reducers/notificationReducer'
import { getAsListOfIdsAndPaths } from '../utils/CategoryTreeProcessors'
import categoryService from '../services/categories'
import productService from '../services/products'

// Material UI:
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

const useStylesSizeSelect = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  horizontalLayoutLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  marginPlease: {
    margin: theme.spacing(1),
  },
  select: {
    margin: theme.spacing(1),
    minWidth: 250
  },
}))

// Give categoryId to update the parent category id of a category,
// Give productId to update the parent category id of a product.
const CategoryUpdateForm = ({ categoryId, productId }) => {
  const classesSizeSelect = useStylesSizeSelect()

  const categories = useSelector(state => state.categories)
  const loggedIn = useSelector(state => state.customers.loggedIn)
  const dispatch = useDispatch()

  const [categorySelected, setCategorySelected] = React.useState('')

  const handleCategoryChange = (event) => {
    setCategorySelected(event.target.value)
  }

  const handleCategoryUpdate = async () => {
    try{
      if(categoryId !== undefined){
        const category = await categoryService.putNewCategory({
          id: categoryId,
          parentCategoryId: categorySelected
        }, loggedIn.token)
        dispatch({
          type: 'REPLACE_CATEGORY',
          data: category
        })
        dispatch(displayNotificationForSeconds('Kategoria muutettu', 'success', 5))
      } else if(productId !== undefined) {
        const productModified = await productService.putNewCategory({
          id: productId,
          parentCategoryId: categorySelected
        }, loggedIn.token)
        dispatch({
          type: 'REPLACE_PRODUCT',
          data: productModified
        })
        dispatch(displayNotificationForSeconds('Kategoria muutettu', 'success', 5))
      }
    }
    catch(error) {
      dispatch(displayNotificationForSeconds('Kategorian muutto epäonnistui', 'error', 5))
    }
  }


  // SUBCOMPONENTS:

  const newCategorySelector = () =>
    <FormControl variant="outlined" className={classesSizeSelect.formControl}>
      <InputLabel id="size-select" className={classesSizeSelect.marginPlease}>Kategorian uusi isäntä</InputLabel>
      <Select
        labelId="size-select-label-id"
        id="size-select-id"
        value={categorySelected}
        onChange={handleCategoryChange}
        label="Tuotteen uusi kategoria"
        className={classesSizeSelect.select}
      >
        {getAsListOfIdsAndPaths(categories).map(item => <MenuItem key={item.id} value={item.id}>{item.path}</MenuItem>)}
      </Select>
    </FormControl>


  // MAIN COMPONENT:

  return (
    <>
      {newCategorySelector()}
      <Button
        variant="contained"
        color="primary"
        className={classesSizeSelect.marginPlease}
        onClick={handleCategoryUpdate}
        startIcon={<SaveIcon />}
      >
                tallenna
      </Button>
    </>
  )
}

export default CategoryUpdateForm
