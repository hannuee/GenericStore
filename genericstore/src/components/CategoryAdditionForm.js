import React from 'react';
import { useDispatch } from 'react-redux'
import { addNewCategory } from '../reducers/categoryReducer'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

const CategoryAdditionForm = ({ parentCategoryIdForNewCategory }) => {
  const classes = useStyles();

  const dispatch = useDispatch()

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleAddNewCategory = () => {
    dispatch(addNewCategory(
      {
        parentCategoryId: parentCategoryIdForNewCategory,
        name,
        description
      }
    ))
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField required id="standard-required" label="Kategorian nimi" value={name} onChange={handleNameChange} />
        <TextField multiline rows={2} id="standard-required" label="Kuvaus" value={description} onChange={handleDescriptionChange} />
        <br />
        <Button size="small" onClick={handleAddNewCategory}>Lisää kategoria</Button>
      </div>
    </form>
  )
}

export default CategoryAdditionForm