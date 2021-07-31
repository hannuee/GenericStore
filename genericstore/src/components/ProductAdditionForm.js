import React from 'react';
import { useDispatch } from 'react-redux'
import { addNewProduct } from '../reducers/productReducer'

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

  const handlePriceAndSizeChange = (indexModified, sizeOrPrice) => (event) => {
    const newArray = []
    pricesAndSizes.forEach((priceAndSize, index) => {
      if(index === indexModified && sizeOrPrice === 'size') newArray.push({price: priceAndSize.price, size: event.target.value})
      else if(index === indexModified && sizeOrPrice === 'price') newArray.push({price: Number(event.target.value), size: priceAndSize.size})
      else newArray.push(priceAndSize)
    })
    setPricesAndSizes(newArray)
  }

  const handlePriceAndSizeDeleteField = (indexDeleted) => () => {
    const newArray = []
    pricesAndSizes.forEach((priceAndSize, index) => {
      if(index != indexDeleted) newArray.push(priceAndSize)
    })
    setPricesAndSizes(newArray)
  }

  const handlePriceAndSizeAddField = () => {
    setPricesAndSizes(pricesAndSizes.concat({price: 0, size: ''}))
  }

  const handleAddNewProduct = () => {
    dispatch(addNewProduct(
      {
        parentCategoryId: parentCategoryIdForNewProduct,
        name,
        description,
        pricesAndSizes,
        available: true
      }
    ))

  }

  const priceAndSizeInputFields = () => {
    return pricesAndSizes.map((priceAndSize, index) =>
      <>
        <TextField id="standard-required" label="Koko" value={priceAndSize.size} onChange={handlePriceAndSizeChange(index, 'size')} />
        <TextField
          id="standard-number"
          label="Hinta"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={priceAndSize.price}
          onChange={handlePriceAndSizeChange(index, 'price')}
        />
        <Button size="small" onClick={handlePriceAndSizeDeleteField(index)}>poista</Button>
        <br />
      </>
    )
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField required id="standard-required" label="Tuotteen nimi" value={name} onChange={handleNameChange} />
        <TextField multiline rows={2} id="standard-required" label="Kuvaus" value={description} onChange={handleDescriptionChange} />
        <br />
        {priceAndSizeInputFields()}
        <br />
        <br />
        <Button size="small" onClick={handlePriceAndSizeAddField}>Uusi hintatieto</Button>
        <br />
        <Button size="small" onClick={handleAddNewProduct}>Lisää tuote</Button>

      </div>
    </form>
  )
}

export default ProductAdditionForm