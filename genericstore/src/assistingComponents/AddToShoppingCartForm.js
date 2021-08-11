import React from 'react';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// For size and quantity selection:
const useStylesSizeSelect = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      marginLeft: '0px',
      minWidth: 120,
    },
    formControlQuantity: {
      margin: theme.spacing(1),
      width: 85,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    horizontalUpperLayout: {
      //display: 'flex',
      //flexDirection: 'row',
      //alignItems: 'center',
      width: '100%', // extra
    },
    marginPlease: {
      margin: theme.spacing(1),
    },
    horizontalLayoutLeft: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      //width: '50%',
      float: 'left', // extra
    },
    horizontalLayoutRight: {
      display: 'flex',
      flexDirection: 'row-reverse',
      alignItems: 'center',
      //width: '50%',
      float: 'right', // extra
    },
  }));

  const TypographyStylePrice = {  
    color: 'red',
    margin: '10px',
    fontSize: '20px',
    fontWeight: 450,
  }

const AddToShoppingCartForm = ({product}) => {

  const dispatch = useDispatch()

  const classesSizeSelect = useStylesSizeSelect();

  const loggedIn = useSelector(state => state.customers.loggedIn)  

  const [priceAndSize, setPriceAndSize] = React.useState(product.pricesandsizes[0])
  const [quantity, setQuantity] = React.useState(1);

  const handleChange = (event) => {
    setPriceAndSize(event.target.value)
  }
  const handleQuantityChange = (event) => {
    const quantityInput = Math.round(Number(event.target.value))
    if (quantityInput >= 1) setQuantity(quantityInput)
    else setQuantity(1)
  }


  const handleAddToCart = () => {
    const product_time = new Date().getTime()
    const product_name = product.name 
    const product_id = product.id
    dispatch({
      type: 'ADD_TO_CART',
      data: {product_time, product_name, product_id, priceAndSize, quantity}
    })
    dispatch(displayNotificationForSeconds('Lisätty ostoskoriin', 'success', 5))
  }

  const centsToPrice = new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const quantityInput = () =>
    <FormControl variant="outlined" className={classesSizeSelect.formControlQuantity}>
      <InputLabel htmlFor="component-outlined">Lukumäärä</InputLabel>
      <OutlinedInput id="lukumaara" value={quantity} onChange={handleQuantityChange} label="Lukumäärä" type="number" />
    </FormControl>

  const CustomerToCartButton = () => {
    if (loggedIn != null && loggedIn.name != undefined) {
      return (
        <>
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            className={classesSizeSelect.marginPlease}
            onClick={handleAddToCart}
            startIcon={<ShoppingCartIcon />}
          >
            ostoskoriin
          </Button>
        </>
      )
    } else return (
      <Button
        variant="outlined"
        color="primary"
        size="medium"
        className={classesSizeSelect.marginPlease}
        disabled
        startIcon={<ShoppingCartIcon />}
      >
        ostoskoriin
      </Button>
    )
  }

  return (  
    <div className={classesSizeSelect.horizontalUpperLayout}>
      <div className={classesSizeSelect.horizontalLayoutLeft}>
      <FormControl variant="outlined" className={classesSizeSelect.formControl}>
        <InputLabel id="size-select">Koko</InputLabel>
        <Select
          labelId="size-select-label-id"
          id="size-select-id"
          value={priceAndSize}
          onChange={handleChange}
          label="Koko"
        >
          {product.pricesandsizes.map(priceAndSizeOption => <MenuItem value={priceAndSizeOption}>{priceAndSizeOption.size} - {centsToPrice.format(priceAndSizeOption.price / 100)}</MenuItem> )}
        </Select>
      </FormControl>

      {quantityInput()}
      </div>

      <div className={classesSizeSelect.horizontalLayoutRight}>
      {CustomerToCartButton()}

      <Typography variant="body2" component="p" style={TypographyStylePrice}>{centsToPrice.format((priceAndSize.price*quantity)/100)}</Typography> 
      </div>
      
    </div>
  )
}

export default AddToShoppingCartForm