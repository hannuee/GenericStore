import React from 'react';
import { useDispatch } from 'react-redux'
import productService from '../services/products'
import { displayNotificationForSeconds } from '../reducers/notificationReducer'

// Material UI:
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';


const AvailabilityUpdateSwitch = ({product}) => {

    const dispatch = useDispatch()

    const [available, setAvailable] = React.useState(product.available)
    
    const handleAvailabilityChangeAndUpdate = async () => {
        try{
          const addedProduct = await productService.putAvailable({
            id: product.id,
            available: !available, 
          })
          setAvailable(!available)
          dispatch({
            type: 'REPLACE_PRODUCT',
            data: addedProduct
          })
          dispatch(displayNotificationForSeconds('Tuotteen saatavuus muutettu', 5))
        } 
        catch(error) {
          dispatch(displayNotificationForSeconds('Tuotteen saatavuuden muuttaminen epäonnistui', 5))
        }
      }

  return (
    <>
      <Typography variant="body2" color="textSecondary" component="p">Piilotettu asiakkailta</Typography>
      <Switch
        checked={available}
        onChange={handleAvailabilityChangeAndUpdate}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <Typography variant="body2" color="textSecondary" component="p">Tuote näkyvillä</Typography>    
    </>
  )
}

export default AvailabilityUpdateSwitch