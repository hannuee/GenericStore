import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import OrderElement from '../assistingComponents/OrderElement'
import { initializeCustomersOrdersWithDetails } from '../reducers/orderReducer'

// Material UI:
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}))

const MyOrdersPage = (props) => {
  const classes = useStyles()

  const customer = useSelector(state => state.customers.loggedIn)
  const orders = useSelector(state => state.orders.customers)
  const dispatch = useDispatch()

  useEffect(() => {
    if(customer !== null) {  // This check is due to the problem of delayed initialization when non-root ULR is reloaded.
      dispatch(initializeCustomersOrdersWithDetails(customer.token))
    }
  }, [dispatch, customer])


  // MAIN COMPONENT:

  return (
    <div className={classes.root}>

      {orders.map(order =>
        <OrderElement order={order} key={order.id} />
      )}

    </div>
  )

}

export default MyOrdersPage