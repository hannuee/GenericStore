import React from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addNewCategory } from '../reducers/categoryReducer'
import { displayNotificationForSeconds } from '../reducers/notificationReducer'

import categoryService from '../services/categories'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

// handleCloseNewCategoryForm is optional, and giving it causes a close form -button to be shown on the form.
const CategoryAdditionForm = ({ parentCategoryIdForNewCategory, handleCloseNewCategoryForm }) => {
  const classes = useStyles();

  const adminToken = useSelector(state => state.customers.loggedIn.token)

  const dispatch = useDispatch()

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const [disabled, setDisabled] = React.useState(false)
  
  const handleAddNewCategory = async () => {
    setDisabled(true)

    try{
      const category = await categoryService.post({
        parentCategoryId: parentCategoryIdForNewCategory,
        name,
        description
      }, adminToken)
      if(handleCloseNewCategoryForm !== undefined) handleCloseNewCategoryForm()
      setName('')
      setDescription('')
      setDisabled(false)
      dispatch({
        type: 'ADD_NEW_CATEGORY',
        data: category
      })
      dispatch(displayNotificationForSeconds('Kategoria lisätty', 'success', 5))
    } 
    catch(error) {
      setDisabled(false)
      dispatch(displayNotificationForSeconds('Kategorian lisäys epäonnistui', 'error', 5))
    }
  }

  const closeFormButtonOrNothing = () => {
    if(handleCloseNewCategoryForm !== undefined) {
      return <Button size="small" color="primary" disabled={disabled} onClick={handleCloseNewCategoryForm}>KIINNI</Button>
    }
  }


  return (
    <Paper>
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField required id="standard-required" label="Kategorian nimi" value={name} onChange={handleNameChange} />
        <TextField id="standard-required" label="Kuvaus" value={description} onChange={handleDescriptionChange} />
        <Button size="small" disabled={disabled} onClick={handleAddNewCategory}>Lisää kategoria</Button>
        {closeFormButtonOrNothing()}
      </div>
    </form>
    </Paper>
  )
}

export default CategoryAdditionForm