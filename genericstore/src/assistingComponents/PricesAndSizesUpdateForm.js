import React from 'react';
import { useDispatch } from 'react-redux'
import productService from '../services/products'
import { displayNotificationForSeconds } from '../reducers/notificationReducer'

// Material UI:
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';

// For new card:
const useStylesNewCard = makeStyles((theme) => ({
  horizontalLayout: {
    display: 'flex',
    flexDirection: 'row',
  },
  verticalLayout: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    marginTop: theme.spacing(2),
  }
}));


const PricesAndSizesUpdateForm = ({product}) => {

    const dispatch = useDispatch()

    const classesNewCard = useStylesNewCard();

    const [pricesAndSizes, setPricesAndSizes] = React.useState(product.pricesandsizes) 

    const handlePriceAndSizeChange = (indexModified, sizeOrPrice) => (event) => {    // Kuten product admin formissa.
        const newArray = []
        pricesAndSizes.forEach((priceAndSize, index) => {
          if(index === indexModified && sizeOrPrice === 'size') newArray.push({price: priceAndSize.price, size: event.target.value})
          else if(index === indexModified && sizeOrPrice === 'price') newArray.push({price: Number(event.target.value), size: priceAndSize.size})
          else newArray.push(priceAndSize)
        })
        setPricesAndSizes(newArray)
    }

    const handlePriceAndSizeAddField = () => {       // Kuten product admin formissa.
        setPricesAndSizes(pricesAndSizes.concat({price: 0, size: ''}))
    }

    const handlePriceAndSizeDeleteField = (indexDeleted) => () => {    // Kuten product admin formissa.
        const newArray = []
        pricesAndSizes.forEach((priceAndSize, index) => {
          if(index != indexDeleted) newArray.push(priceAndSize)
        })
        setPricesAndSizes(newArray)
      }

    const handlePriceAndSizeUpdate = async () => {
        try{
          const modifiedProduct = await productService.putPricesAndSizes({
            id: product.id,
            pricesAndSizes
          })
          dispatch({
            type: 'REPLACE_PRODUCT',
            data: modifiedProduct
          })
          dispatch(displayNotificationForSeconds('Tuotteen hintatiedot muutettu', 5))
        } 
        catch(error) {
          dispatch(displayNotificationForSeconds('Tuotteen hintatietojen muunttaminen epäonnistui', 5))
        }
      }


    return (
    <>
    {pricesAndSizes.map((priceAndSize, index) =>
    
    <div className={classesNewCard.horizontalLayout}>
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

      <IconButton onClick={handlePriceAndSizeDeleteField(index)}>
          <HighlightOffIcon />  
      </IconButton>
    </div>
    )}
    <br />
      <div className={classesNewCard.horizontalLayout}>
      <Button variant="contained" color="primary" onClick={handlePriceAndSizeUpdate} className={classesNewCard.button}> Tallenna hintatiedot </Button>
      <Button size="small" onClick={handlePriceAndSizeAddField}> Uusi hintatieto</Button>   
      </div> 
    </>
    )
}

export default PricesAndSizesUpdateForm