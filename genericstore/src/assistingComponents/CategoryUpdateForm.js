import React from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { displayNotificationForSeconds } from '../reducers/notificationReducer'
import { getAsListOfIdsAndPaths } from '../utils/CategoryTreeProcessors'
import categoryService from '../services/categories'

// Material UI:
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
  }));

const CategoryUpdateForm = ({id}) => {

    const dispatch = useDispatch()

    const classesSizeSelect = useStylesSizeSelect();

    const categories = useSelector(state => state.categories)
    const loggedIn = useSelector(state => state.customers.loggedIn)

    const [categorySelected, setCategorySelected] = React.useState(id)

    const handleCategoryChange = (event) => {
      setCategorySelected(event.target.value)
    }

    const handleCategoryUpdate = async () => {
        try{
          const category = await categoryService.putNewCategory({
            id,
            parentCategoryId: categorySelected
          }, loggedIn.token)
          dispatch({
            type: 'REPLACE_CATEGORY',
            data: category
          })
          dispatch(displayNotificationForSeconds('Kategoria muutettu', 'success', 5))
        } 
        catch(error) {
          dispatch(displayNotificationForSeconds('Kategorian muutto epäonnistui', 'error', 5))
        }
      }    

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

    return (
        <div className={classesSizeSelect.horizontalLayoutLeft}>
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
        </div>
    )
}

export default CategoryUpdateForm
