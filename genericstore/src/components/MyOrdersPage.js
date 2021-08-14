import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import OrderElement from '../assistingComponents/OrderElement'
import { initializeCustomersOrdersWithDetails } from '../reducers/orderReducer'

// Material UI:
import { makeStyles } from '@material-ui/core/styles'

// For the accordion:
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}));

// {order.id}, {order.customer_id}, {order.orderreceived}, {order.orderdispatched}, {order.purchaseprice}, {order.customerinstructions}

const MyOrdersPage = (props) => {

  const dispatch = useDispatch()

  const customer = useSelector(state => state.customers.loggedIn)

  // SIIRRÄ ONNISTUNEEN KIRJAUTUMISEN JÄLKEISEEN HETKEEN, KUNHAN SE OSIO ON TEHTY, JA ONNISTUNEEN TILAUKSEN TEKO HETKEEN.
  useEffect(() => dispatch(initializeCustomersOrdersWithDetails(customer.token)), [dispatch])

  // For the accordion:
  const classes = useStyles();

  const orders = useSelector(state => state.orders.customers)

    return (
    <div className={classes.root}>

      {orders.map(order =>
        <OrderElement order={order} key={order.id} />
      )}

    </div>
    )

  }
  
  export default MyOrdersPage