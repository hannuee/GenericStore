import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import OrderElement from '../assistingComponents/OrderElement'
import { initializeAdminsDispatchedOrders } from '../reducers/orderReducer'
import { initializeAdminsUndispatchedOrdersWithDetails } from '../reducers/orderReducer'

// Material UI:
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}));


// {order.id}, {order.customer_id}, {order.orderreceived}, {order.orderdispatched}, {order.purchaseprice}, {order.customerinstructions}

const AdminOrdersPage = (props) => {

  // For the accordion:
  const classes = useStyles();

  const dispatch = useDispatch()
  const admin = useSelector(state => state.customers.loggedIn)
  useEffect(() => dispatch(initializeAdminsUndispatchedOrdersWithDetails(admin.token)), [dispatch])

  const orders = useSelector(state => state.orders.adminsUndispatched)  


  const ordersDispatched = useSelector(state => state.orders.adminsDispatched)
  const [showDispatched, setShowDispatched] = React.useState(false);
    
  const handleShowDispatchedOrders = () => {
    dispatch(initializeAdminsDispatchedOrders(admin.token))
    setShowDispatched(true)
  }

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
  
    return (
      <div className={classes.root}>
        <Typography gutterBottom variant="h5" component="h2">
          Lähettämättömät tilaukset
        </Typography>


        {orders.map(order =>
          <OrderElement order={order} key={order.id} />
        )}

        <br />
        <Button size="small" color="primary" onClick={handleShowDispatchedOrders}>Näytä lähetetyt tilaukset</Button>
        <br />

        {dispatchedOrdersDisplay()}

      </div>
    )

  }
  
  export default AdminOrdersPage