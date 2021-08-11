import React from 'react';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
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

// Update-mode (function as an independent form in order to update some product's pricesAndSizes data): product, undefined, undefined
// Set-mode (feed pricesAndSizes data to parent): undefined, pricesAndSizesParent, setPricesAndSizesParent
const PricesAndSizesForm = ({product, pricesAndSizesParent, setPricesAndSizesParent}) => {

    const dispatch = useDispatch()

    const classesNewCard = useStylesNewCard();

    const admin = useSelector(state => state.customers.loggedIn)

    const centsToPrice = new Intl.NumberFormat('fi-FI', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Cents to price:
    const transformedPricesAndSizes = []
    if(product != null){
      for(let pAndS of product.pricesandsizes) {
        transformedPricesAndSizes.push({price: centsToPrice.format(pAndS.price / 100), size: pAndS.size})
      }
    }

    // Mode switching:

    let initState
    if(product == null) initState = pricesAndSizesParent  // Set-mode
    else initState = transformedPricesAndSizes            // Update-mode

    const [pricesAndSizesOwn, setPricesAndSizesOwn] = React.useState(initState) 
    
    let pricesAndSizes
    let setPricesAndSizes
    if(product == null) {  // Set-mode
      pricesAndSizes = pricesAndSizesParent
      setPricesAndSizes = setPricesAndSizesParent
    }
    else {                      // Update-mode
      pricesAndSizes = pricesAndSizesOwn
      setPricesAndSizes = setPricesAndSizesOwn
    }


    const handlePriceAndSizeChange = (indexModified, sizeOrPrice) => (event) => {    // Kuten product admin formissa.
        const newArray = []
        pricesAndSizes.forEach((priceAndSize, index) => {
          if(index === indexModified && sizeOrPrice === 'size') newArray.push({price: priceAndSize.price, size: event.target.value})
          else if(index === indexModified && sizeOrPrice === 'price') newArray.push({price: event.target.value, size: priceAndSize.size})
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
      const newPricesAndSizes = []
      for(let userInput of pricesAndSizes){
        let asNumber = Number(Number(userInput.price.replace(",", ".").replace(/\s+/g, "")).toFixed(2))
        if(isNaN(asNumber)) {
          dispatch(displayNotificationForSeconds('Virheellinen hintatieto', 'error', 5))
          return
        } else if(asNumber < 0) {
          dispatch(displayNotificationForSeconds('Hinta ei voi olla negatiivinen', 'error', 5))
          return
        }
        asNumber = Math.trunc(asNumber*100)
        newPricesAndSizes.push({price: asNumber, size: userInput.size})
      }

        try{
          const modifiedProduct = await productService.putPricesAndSizes({
            id: product.id,
            pricesAndSizes: newPricesAndSizes
          }, admin.token)
          dispatch({
            type: 'REPLACE_PRODUCT',
            data: modifiedProduct
          })
          dispatch(displayNotificationForSeconds('Tuotteen hintatiedot muutettu', 'success', 5))
        } 
        catch(error) {
          dispatch(displayNotificationForSeconds('Tuotteen hintatietojen muunttaminen epäonnistui', 'error', 5))
        }
      }

    const showSendUpdateButtonIfUpdateMode = () => {
      if(product != undefined) return <Button variant="contained" color="primary" onClick={handlePriceAndSizeUpdate} className={classesNewCard.button}> Tallenna hintatiedot </Button>
    }

    return (
    <>
    {pricesAndSizes.map((priceAndSize, index) =>
    
    <div className={classesNewCard.horizontalLayout}>
      <TextField id="standard-required" label="Koko" value={priceAndSize.size} onChange={handlePriceAndSizeChange(index, 'size')} />
      <TextField
        id="standard-number"
        label="Hinta €"
        //type="number"
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
      {showSendUpdateButtonIfUpdateMode()}
      <Button size="small" onClick={handlePriceAndSizeAddField}> Uusi hintatieto</Button>   
      </div> 
    </>
    )
}

export default PricesAndSizesForm