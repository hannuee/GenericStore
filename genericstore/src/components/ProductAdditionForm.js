// Foundations for this component from: https://material-ui.com/components/cards/
// Foundations for size selection from: https://material-ui.com/components/selects/

import React from 'react';
import { useDispatch } from 'react-redux'

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

const ProductAdditionForm = ({ categoryId }) => {
  const classes = useStyles();

  const dispatch = useDispatch()


  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [pricesAndSizes, setPricesAndSizes] = React.useState([{price: 5, size: ''}])



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
      else if(index === indexModified && sizeOrPrice === 'price') newArray.push({price: event.target.value, size: priceAndSize.size})
      else newArray.push(priceAndSize)
    })
    setPricesAndSizes(newArray)
  }

  const priceAndSizeInputsPrinter = () => {
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
      </>
    )
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField required id="standard-required" label="Tuotteen nimi" value={name} onChange={handleNameChange} />
        <TextField multiline rows={2} id="standard-required" label="Kuvaus" value={description} onChange={handleDescriptionChange} />
        <br />
        {priceAndSizeInputsPrinter()}
        <br />
        <Button size="small">poista</Button>
        <br />
        <Button size="small">lisää</Button>

      </div>
    </form>
  )
}

export default ProductAdditionForm