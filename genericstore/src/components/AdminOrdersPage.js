import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { initializeAdminsDispatchedOrders } from '../reducers/orderReducer'
import { getDetailsForAdminsDispatchedOrder } from '../reducers/orderReducer'
import { markOrderAsDispatched } from '../reducers/orderReducer'
import { initializeAdminsUndispatchedOrdersWithDetails } from '../reducers/orderReducer'

import OrderDetails from './OrderDetails'

import { displayNotificationForSeconds } from '../reducers/notificationReducer'

import orderService from '../services/orders'

// For the accordion:
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

// For table:
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';

// For the accordion:
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
}));

// For table:
const useStylesTable = makeStyles({
  table: {
    minWidth: 650,
  }, 
});  

// {order.id}, {order.customer_id}, {order.orderreceived}, {order.orderdispatched}, {order.purchaseprice}, {order.customerinstructions}

const AdminOrdersPage = (props) => {

  // For the accordion:
  const classes = useStyles();

  const dispatch = useDispatch()
  const admin = useSelector(state => state.customers.loggedIn)
  useEffect(() => dispatch(initializeAdminsUndispatchedOrdersWithDetails(admin.token)), [dispatch])

  // For table:
  const classesTable = useStylesTable();


  const orders = useSelector(state => state.orders.adminsUndispatched)  


  const ordersDispatched = useSelector(state => state.orders.adminsDispatched)
  const [showDispatched, setShowDispatched] = React.useState(false);
    
  const handleShowDispatchedOrders = () => {
    dispatch(initializeAdminsDispatchedOrders(admin.token))
    setShowDispatched(true)
  }

  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = (id) => (event, isExpanded) => {
    if(expanded === id) { // expansion close
      setExpanded(false)
      return
    }

    const orderClicked = ordersDispatched.find(order => order.id == id)
    if(orderClicked.orderDetails === undefined) dispatch(getDetailsForAdminsDispatchedOrder(id, admin.token))  // fetch details if needed.
    setExpanded(id)
  }

  const handleMarkAsDispatched = (id) => async () => {
    try{
      const modifiedOrder = await orderService.putOrderDispatched({id}, admin.token)
      dispatch({
        type: 'MODIFY_ADMINS_UNDISPATCHED_TRANSFER_TO_DISPATCHED_KEEP_DETAILS',
        data: modifiedOrder
      })
    } 
    catch(error) {
      dispatch(displayNotificationForSeconds('Tilauksen merkitseminen toimitetuksi epäonnistui', 5))
    }
  }

  const orderDetailsDisplay = (order) => {
if(order.orderDetails !== undefined){
  return (
  
     <OrderDetails order={order} />
  
  )
}
  }


  const dispatchedOrdersDisplay = () => {              
    if (showDispatched) {
      return (
      <div className={classes.root}>
        {ordersDispatched.map(order => 
          
<Accordion key={order.id} expanded={expanded === order.id} onChange={handleExpansion(order.id)}>
<AccordionSummary
  expandIcon={<ExpandMoreIcon />}
  aria-controls="panel1c-content"
  id="panel1c-header"
>
  <div className={classes.column}>
    <Typography className={classes.heading}>Tilaus {order.orderreceived}</Typography>
  </div>
  <div className={classes.column}>
    <Typography className={classes.secondaryHeading}>{order.purchaseprice / 100} €</Typography>
  </div>
</AccordionSummary>
<AccordionDetails className={classes.details}>
  {orderDetailsDisplay(order)}
</AccordionDetails>
<Divider />
  <AccordionActions>  
    <Button size="small">Cancel</Button>
    <Button size="small" color="primary">Save</Button>
  </AccordionActions>
</Accordion>

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


<Accordion key={order.id}>
<AccordionSummary
  expandIcon={<ExpandMoreIcon />}
  aria-controls="panel1c-content"
  id="panel1c-header"
>
  <div className={classes.column}>
    <Typography className={classes.heading}>Tilaus {order.orderreceived}</Typography>
  </div>
  <div className={classes.column}>
    <Typography className={classes.secondaryHeading}>{order.purchaseprice / 100} €</Typography>
  </div>
</AccordionSummary>
<AccordionDetails className={classes.details}>
  {orderDetailsDisplay(order)}
</AccordionDetails>
<Divider />
  <AccordionActions>
    <Button size="small" color="primary" onClick={handleMarkAsDispatched(order.id)}>Merkitse lähetetyksi</Button>
  </AccordionActions>
</Accordion>

        )}

<br /> 
<Button size="small" color="primary" onClick={handleShowDispatchedOrders}>Näytä lähetetyt tilaukset</Button>
<br /> 

{dispatchedOrdersDisplay()}

    </div>
    )

  }
  
  export default AdminOrdersPage