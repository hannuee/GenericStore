import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { initializeCustomersOrdersWithDetails } from '../reducers/orderReducer'

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

const MyOrdersPage = (props) => {

  const dispatch = useDispatch()

  // SIIRRÄ ONNISTUNEEN KIRJAUTUMISEN JÄLKEISEEN HETKEEN, KUNHAN SE OSIO ON TEHTY, JA ONNISTUNEEN TILAUKSEN TEKO HETKEEN.
  useEffect(() => dispatch(initializeCustomersOrdersWithDetails()), [dispatch])

  // For the accordion:
  const classes = useStyles();

  // For table:
  const classesTable = useStylesTable();

  const orders = useSelector(state => state.orders.customers)

    return (
    <div className={classes.root}>



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
  
  
  

  <div className={classesTable.column}>
    <TableContainer component={Paper}>
      <Table className={classesTable.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Tuote</TableCell>
            <TableCell align="right">Koko</TableCell>
            <TableCell align="right">Hinta</TableCell>
            <TableCell align="right">Määrä</TableCell>
            <TableCell align="right">Hinta yhteensä</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {order.orderDetails.map(orderDetail => 

            <TableRow key={orderDetail.name}>
              <TableCell component="th" scope="row">{orderDetail.name}</TableCell>
              <TableCell align="right">{orderDetail.priceandsize.size}</TableCell>
              <TableCell align="right">{orderDetail.priceandsize.price / 100} €</TableCell>
              <TableCell align="right">{orderDetail.quantity}</TableCell>
              <TableCell align="right">{(orderDetail.priceandsize.price * orderDetail.quantity) / 100} €</TableCell>
            </TableRow>

          )}

        </TableBody>
      </Table>
    </TableContainer>
  </div>




  <div className={clsx(classes.column, classes.helper)}>
    <Typography variant="caption">
    Tilaustunnus: {order.id} <br /> 
    Tilaus vastaanotettu: {order.orderreceived} <br />
    Tuotteet lähetetty: {order.orderdispatched} <br /> 
    Hinta: {order.purchaseprice} <br />
    Lisätiedot: {order.customerinstructions}
    </Typography>
  </div>

</AccordionDetails>
<Divider />
</Accordion>

        )}

    </div>
    )

  }
  
  export default MyOrdersPage