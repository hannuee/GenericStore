import React from 'react';
import { useDispatch } from 'react-redux'
import { displayNotificationForSeconds } from '../reducers/notificationReducer'

// Material UI:
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


// For size and quantity selection:
const useStylesSizeSelect = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const TypographyStylePrice = {  
    color: 'red',
    float: 'right',
    margin: '10px'
  }
  
  const buttonStyle = {  
      float: 'right'
  }

const AddToShoppingCartForm = ({product}) => {

  const dispatch = useDispatch()

  const classesSizeSelect = useStylesSizeSelect();

  const [priceAndSize, setPriceAndSize] = React.useState(product.pricesandsizes[0])
  const [quantity, setQuantity] = React.useState(1);

  const handleChange = (event) => {
    setPriceAndSize(event.target.value)
  }
  const handleQuantityChange = (event) => {
    const quantityInput = Number(event.target.value)
    if (quantityInput >= 0) setQuantity(quantityInput)
    else setQuantity(0)
  }


  const handleAddToCart = () => {
    const product_time = new Date().getTime()
    const product_name = product.name 
    const product_id = product.id
    dispatch({
      type: 'ADD_TO_CART',
      data: {product_time, product_name, product_id, priceAndSize, quantity}
    })
    // JONKINLAINEN PALAUTE TÄHÄN ETTÄ ASIAKAS TIETÄÄ ETTÄ NYT ON TUOTE LISÄTTY OSTOSKORIINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
  }


    const quantityInput = () => {
        if(quantity > 0){
          return (
          <FormControl variant="outlined" className={classesSizeSelect.formControl}>
            <InputLabel htmlFor="component-outlined">Lukumäärä</InputLabel>
            <OutlinedInput id="lukumaara" value={quantity} onChange={handleQuantityChange} label="Lukumäärä" type="number" />
          </FormControl>
          )   
        } else {
          return (
          <FormControl error variant="outlined" className={classesSizeSelect.formControl}>
            <InputLabel htmlFor="component-outlined-error">Lukumäärä</InputLabel>
            <OutlinedInput id="lukumaara-error" value={quantity} onChange={handleQuantityChange} label="Lukumäärä" type="number" />
            <FormHelperText id="lukumaara-error-text">Error!!!!!</FormHelperText>
          </FormControl>
          )
        }
      }

  return (
    <>
      <FormControl variant="outlined" className={classesSizeSelect.formControl}>
        <InputLabel id="size-select">Koko</InputLabel>
        <Select
          labelId="size-select-label-id"
          id="size-select-id"
          value={priceAndSize}
          onChange={handleChange}
          label="Koko"
        >
          {product.pricesandsizes.map(priceAndSizeOption => <MenuItem value={priceAndSizeOption}>{priceAndSizeOption.size} - {priceAndSizeOption.price / 100} €</MenuItem> )}
        </Select>
      </FormControl>

      {quantityInput()}

      <Button size="small" color="primary" style={buttonStyle} onClick={handleAddToCart}>
        Lisää ostoskoriin
      </Button>

      <Typography variant="body2" component="p" style={TypographyStylePrice}>{(priceAndSize.price / 100) * quantity} €</Typography> 
    </>
  )
}

export default AddToShoppingCartForm