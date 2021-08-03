import React from 'react';
import { useDispatch } from 'react-redux'
import PricesAndSizesForm from '../assistingComponents/PricesAndSizesForm'

import productService from '../services/products'
import { displayNotificationForSeconds } from '../reducers/notificationReducer'

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

const ProductAdditionForm = ({ parentCategoryIdForNewProduct }) => {
  const classes = useStyles();

  const dispatch = useDispatch()


  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [pricesAndSizes, setPricesAndSizes] = React.useState([{price: 0, size: ''}])

  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const [disabled, setDisabled] = React.useState(false)

  const handleAddNewProduct = async () => {
    setDisabled(true)

    try{
      const product = await productService.post({
        parentCategoryId: parentCategoryIdForNewProduct,
        name,
        description,
        pricesAndSizes,
        available: true
      })
      setName('')
      setDescription('')
      setPricesAndSizes([{price: 0, size: ''}])
      setDisabled(false)
      dispatch({
        type: 'ADD_NEW_PRODUCT',
        data: product
      })
    } 
    catch(error) {
      setDisabled(false)
    }

  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField required id="standard-required" label="Tuotteen nimi" value={name} onChange={handleNameChange} />
        <TextField multiline rows={2} id="standard-required" label="Kuvaus" value={description} onChange={handleDescriptionChange} />
        <br />
        <PricesAndSizesForm pricesAndSizesParent={pricesAndSizes} setPricesAndSizesParent={setPricesAndSizes} />
        <br />
        <Button size="small" disabled={disabled} onClick={handleAddNewProduct}>Lisää tuote</Button>
      </div>
    </form>
  )
}

export default ProductAdditionForm