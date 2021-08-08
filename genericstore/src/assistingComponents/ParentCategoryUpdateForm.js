import React from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import productService from '../services/products'
import { displayNotificationForSeconds } from '../reducers/notificationReducer'
import { getAsListOfIdsAndPaths } from '../utils/CategoryTreeProcessors'

// Material UI:
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

const useStylesSizeSelect = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ParentCategoryUpdateForm = ({product}) => {

    const categories = useSelector(state => state.categories) // For admin modification.
    const admin = useSelector(state => state.customers.loggedIn)
    const dispatch = useDispatch()

    const classesSizeSelect = useStylesSizeSelect();

    const [categorySelected, setCategorySelected] = React.useState(product.category_id)
    const handleCategoryChange = (event) => {
        setCategorySelected(event.target.value)
    }

    const handleCategoryUpdate = async () => {
        try{
          const productModified = await productService.putNewCategory({
            id: product.id,
            parentCategoryId: categorySelected
          }, admin.token)
          dispatch({
            type: 'REPLACE_PRODUCT',
            data: productModified
          })
          dispatch(displayNotificationForSeconds('Tuotteen kategoria muutettu', 5))
        } 
        catch(error) {
          dispatch(displayNotificationForSeconds('Tuotteen kategorian muuttaminen epäonnistui', 5))
        }
      }
  

  return (
    <>
    <FormControl variant="outlined" className={classesSizeSelect.formControl}>
        <InputLabel id="size-select">Tuotteen uusi kategoria</InputLabel>
        <Select
          labelId="size-select-label-id"
          id="size-select-id"
          value={categorySelected}
          onChange={handleCategoryChange}
          label="Tuotteen uusi kategoria"
        >
          {getAsListOfIdsAndPaths(categories).map(item => <MenuItem value={item.id}>{item.path}</MenuItem> )}
        </Select>
      </FormControl>

    <Button size="small" onClick={handleCategoryUpdate}>Päivitä kategoria</Button>
    </>
  )
}

export default ParentCategoryUpdateForm