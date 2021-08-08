import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { modifyAdminsDispatchedInternalNotes } from '../reducers/orderReducer'
import { modifyAdminsUndispatchedInternalNotes } from '../reducers/orderReducer'

import { displayNotificationForSeconds } from '../reducers/notificationReducer'
import orderService from '../services/orders'

// For the accordion:
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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


const OrderDetails = ({order}) => {

  // For the accordion:
  const classes = useStyles();

  // For table:
  const classesTable = useStylesTable();

  const admin = useSelector(state => state.customers.loggedIn)


  const [internalNoteField, setinternalNoteField] = React.useState(order.internalnotes);

  const handleInternalNotesChange = (event) => {
    setinternalNoteField(event.target.value)
  }

  
  const dispatch = useDispatch()  

  const handleInternalNotesSubmission = async () => {
      if (order.orderdispatched === null) {
        try{
          const modifiedOrder = await orderService.putInternalNotes({id: order.id, internalNotes: internalNoteField}, admin.token)
          dispatch({
            type: 'REPLACE_ADMINS_UNDISPATCHED_KEEP_DETAILS',
            data: modifiedOrder
          })
          dispatch(displayNotificationForSeconds('Tilauksen huomio muutettu', 'success', 5))   // VISUAALINE FEEDBACK??????????????????????????
        } 
        catch(error) {
          dispatch(displayNotificationForSeconds('Tilauksen huomion muuttaminen epäonnistui', 'error', 5))
        }
      }
      else {
        try{
          const modifiedOrder = await orderService.putInternalNotes({id: order.id, internalNotes: internalNoteField}, admin.token)
          dispatch({
            type: 'REPLACE_ADMINS_DISPATCHED_KEEP_DETAILS',
            data: modifiedOrder
          })
          dispatch(displayNotificationForSeconds('Tilauksen huomio muutettu', 'success', 5))   // VISUAALINE FEEDBACK??????????????????????????
        } 
        catch(error) {
          dispatch(displayNotificationForSeconds('Tilauksen huomion muuttaminen epäonnistui', 'error', 5))
        }
      }
  }


  return (
    <>
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
    
        <br /> <br /> 
        <TextField id="uniikki_id_tanne" label="Huomioiden muokkaus" value={internalNoteField} variant="outlined" onChange={handleInternalNotesChange} />
        <Button size="small" onClick={handleInternalNotesSubmission}>Tallenna muutos</Button>
      </div>
    
    
    
    
      <div className={clsx(classes.column, classes.helper)}>
        <Typography variant="caption">
        Tilaustunnus: {order.id} <br /> 
        Tilaus vastaanotettu: {order.orderreceived} <br />
        Tuotteet lähetetty: {order.orderdispatched} <br /> 
        Hinta: {order.purchaseprice} <br />
        Lisätiedot: {order.customerinstructions}
        <br /> <br /> 
        Admin: <br /> 
        Huomiot: {order.internalnotes} <br />
        Asiakas ID: {order.customer_id} <br />
        Nimi: {order.name} <br />
        Osoite: {order.address} <br />
        Puhelin: {order.mobile} <br />
        Email: {order.email} <br />
        </Typography>
      </div>
    </>    
      )

  }
  
  export default OrderDetails