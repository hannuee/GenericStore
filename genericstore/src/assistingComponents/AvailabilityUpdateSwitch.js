import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { displayNotificationForSeconds } from '../reducers/notificationReducer'
import productService from '../services/products'

// Material UI:
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'


const AvailabilityUpdateSwitch = ({ product }) => {

  const admin = useSelector(state => state.customers.loggedIn)
  const dispatch = useDispatch()

  const [available, setAvailable] = React.useState(product.available)

  const handleAvailabilityChangeAndUpdate = async () => {
    try{
      const addedProduct = await productService.putAvailable({
        id: product.id,
        available: !available,
      }, admin.token)
      setAvailable(!available)
      dispatch({
        type: 'REPLACE_PRODUCT',
        data: addedProduct
      })
      dispatch(displayNotificationForSeconds('Tuotteen saatavuus muutettu', 'success', 5))
    }
    catch(error) {
      dispatch(displayNotificationForSeconds('Tuotteen saatavuuden muuttaminen epäonnistui', 'error', 5))
    }
  }


  // MAIN COMPONENT:

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