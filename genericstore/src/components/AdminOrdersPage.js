import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import OrderElement from '../assistingComponents/OrderElement'
import { initializeAdminsDispatchedOrders } from '../reducers/orderReducer'
import { initializeAdminsUndispatchedOrdersWithDetails } from '../reducers/orderReducer'

// Material UI:
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}))

const AdminOrdersPage = (props) => {
  const classes = useStyles()

  const admin = useSelector(state => state.customers.loggedIn)
  const orders = useSelector(state => state.orders.adminsUndispatched)
  const ordersDispatched = useSelector(state => state.orders.adminsDispatched)
  const dispatch = useDispatch()

  useEffect(() => {
    if(admin !== null) {  // This check is due to the problem of delayed initialization when non-root ULR is reloaded.
      dispatch(initializeAdminsUndispatchedOrdersWithDetails(admin.token))
    }
  }, [dispatch, admin])

  const [showDispatched, setShowDispatched] = React.useState(false)

  const handleShowDispatchedOrders = () => {
    dispatch(initializeAdminsDispatchedOrders(admin.token))
    setShowDispatched(true)
  }


  // SUBCOMPONENTS:

  const dispatchedOrdersDisplay = () => {
    if (showDispatched) {
      return (
        <div className={classes.root}>
          {ordersDispatched.map(order =>
            <OrderElement order={order} key={order.id} />
          )}
        </div>
      )}
  }


  // MAIN COMPONENT:

  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="h5" component="h2">
          Lähettämättömät tilaukset
      </Typography>

      <div className={classes.root}>
        {orders.map(order =>
          <OrderElement order={order} key={order.id} />
        )}
      </div>

      <br />
      <Button size="small" color="primary" onClick={handleShowDispatchedOrders}>Näytä lähetetyt tilaukset</Button>
      <br />

      {dispatchedOrdersDisplay()}

    </div>
  )

}

export default AdminOrdersPage