import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { initializeCustomersOrdersWithDetails } from '../reducers/orderReducer'
import { displayNotificationForSeconds } from '../reducers/notificationReducer'
import { centsToFormattedEuros } from '../utils/Money'
import orderService from '../services/orders'

// Material UI:
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const MyOrdersPage = (props) => {
  const classes = useStyles()

  const cartItems = useSelector(state => state.orders.cart)
  const customer = useSelector(state => state.customers.loggedIn)
  const dispatch = useDispatch()

  const [disabled, setDisabled] = React.useState(false)

  const handleDeleteFromCart = (product_time) => {
    dispatch({
      type: 'DELETE_FROM_CART',
      data: product_time
    })
  }

  const handleOrderSending = async () => {
    setDisabled(true)

    try{
      for(let item of cartItems) {
        delete item.product_time
        delete item.product_name
      }

      const response = await orderService.post(cartItems, customer.token)

      setDisabled(false)
      // jos onnistuu niin ostoskorin tyhjennys:
      dispatch({
        type: 'CLEAR_CART'
      })

      // Tilaukset haetaan uudestaan koska Orders POST rajapinta ei tällä hetkellä palauta lisättyä tilausta.
      // Kun tilaukset pyydetään Orders GET rajapinnoilta niin ne tulevat varmasti oikein, siten kun ne ovat tietokannassa.
      dispatch(initializeCustomersOrdersWithDetails(customer.token))
      dispatch(displayNotificationForSeconds('Tilaus lähetetty', 'success', 5))
    }
    catch(error) {
      setDisabled(false)
      dispatch(displayNotificationForSeconds('Tilauksen lähetys epäonnistui', 'error', 5))
    }
  }

  // Calculate overall shopping cart price:
  let overallPriceInCents = 0
  for(let cartItem of cartItems) overallPriceInCents += cartItem.priceAndSize.price * cartItem.quantity


  // MAIN COMPONENT:

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tuote</TableCell>
              <TableCell align="right">Koko</TableCell>
              <TableCell align="right">Hinta</TableCell>
              <TableCell align="right">Määrä</TableCell>
              <TableCell align="right">Hinta yhteensä</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((cartItem) => (
              <TableRow key={cartItem.product_time}>
                <TableCell component="th" scope="row">{cartItem.product_name}</TableCell>
                <TableCell align="right">{cartItem.priceAndSize.size}</TableCell>
                <TableCell align="right">{centsToFormattedEuros(cartItem.priceAndSize.price)}</TableCell>
                <TableCell align="right">{cartItem.quantity}</TableCell>
                <TableCell align="right">{centsToFormattedEuros(cartItem.priceAndSize.price * cartItem.quantity)}</TableCell>
                <TableCell align="right">
                  <Button size="small" color="primary" onClick={() => handleDeleteFromCart(cartItem.product_time)}>
                  Poista
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell component="th" scope="row">YHTEENSÄ</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">{centsToFormattedEuros(overallPriceInCents)}</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button size="small" color="primary" disabled={disabled} onClick={handleOrderSending}>
      Lähetä tilaus
      </Button>
    </>

  )
}

export default MyOrdersPage