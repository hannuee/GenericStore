import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getDetailsForAdminsDispatchedOrder } from '../reducers/orderReducer'
import { displayNotificationForSeconds } from '../reducers/notificationReducer'
import { centsToFormattedEuros } from '../utils/Money'
import orderService from '../services/orders'

// Material UI:
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TextField from '@material-ui/core/TextField'

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
    background: '#e6f7ff',  // AccordionDetails
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    padding: theme.spacing(1, 2),
  },
}))

const useStylesTable = makeStyles({
  table: {
    minWidth: 650,
  },
})

// Displays order and its details for admin and for customer.
// For admin: Displays extra details about the order.
// For admin: Fetches the details of dispatched order on demand.
// For admin: Displays some controls.
const OrderElement = ({ order }) => {
  const classes = useStyles()
  const classesTable = useStylesTable()

  const user = useSelector(state => state.customers.loggedIn)
  const dispatch = useDispatch()

  let internalNoteFieldInit = ''
  if(order.internalnotes !== null) internalNoteFieldInit = order.internalnotes
  const [internalNoteField, setInternalNoteField] = React.useState(internalNoteFieldInit)

  const handleInternalNotesChange = (event) => {
    setInternalNoteField(event.target.value)
  }

  const handleInternalNotesSubmission = async () => {
    if (order.orderdispatched === null) {
      try{
        const modifiedOrder = await orderService.putInternalNotes({ id: order.id, internalNotes: internalNoteField }, user.token)
        dispatch({
          type: 'REPLACE_ADMINS_UNDISPATCHED_KEEP_DETAILS',
          data: modifiedOrder
        })
        dispatch(displayNotificationForSeconds('Tilauksen huomio muutettu', 'success', 5))
      }
      catch(error) {
        dispatch(displayNotificationForSeconds('Tilauksen huomion muuttaminen epäonnistui', 'error', 5))
      }
    }
    else {
      try{
        const modifiedOrder = await orderService.putInternalNotes({ id: order.id, internalNotes: internalNoteField }, user.token)
        dispatch({
          type: 'REPLACE_ADMINS_DISPATCHED_KEEP_DETAILS',
          data: modifiedOrder
        })
        dispatch(displayNotificationForSeconds('Tilauksen huomio muutettu', 'success', 5))
      }
      catch(error) {
        dispatch(displayNotificationForSeconds('Tilauksen huomion muuttaminen epäonnistui', 'error', 5))
      }
    }
  }

  const handleMarkAsDispatched = async () => {
    try{
      const modifiedOrder = await orderService.putOrderDispatched({ id: order.id }, user.token)
      dispatch({
        type: 'MODIFY_ADMINS_UNDISPATCHED_TRANSFER_TO_DISPATCHED_KEEP_DETAILS',
        data: modifiedOrder
      })
      dispatch(displayNotificationForSeconds('Tilaus merkitty lähetetyksi', 'success', 5))
    }
    catch(error) {
      dispatch(displayNotificationForSeconds('Tilauksen merkitseminen toimitetuksi epäonnistui', 'error', 5))
    }
  }

  const handleExpansion = () => {
    if(user.admin !==  undefined && order.orderDetails === undefined) dispatch(getDetailsForAdminsDispatchedOrder(order.id, user.token))  // fetch details if needed.
  }


  // SUBCOMPONENTS:

  const orderDetailsDisplay = () => {
    if(order.orderDetails !== undefined){
      return (
        order.orderDetails.map((orderDetail, index) =>   // index should be fine as key, because the data in the table is not modified.

          <TableRow key={index}>
            <TableCell component="th" scope="row">{orderDetail.name}</TableCell>
            <TableCell align="right">{orderDetail.priceandsize.size}</TableCell>
            <TableCell align="right">{centsToFormattedEuros(orderDetail.priceandsize.price)}</TableCell>
            <TableCell align="right">{orderDetail.quantity}</TableCell>
            <TableCell align="right">{centsToFormattedEuros(orderDetail.priceandsize.price * orderDetail.quantity)}</TableCell>
          </TableRow>

        )

      )
    }
  }

  const adminDetails = () => {
    if(user.admin !== undefined) return (
      <Typography variant="caption">
      Huomiot: {order.internalnotes} <br />
      Asiakas ID: {order.customer_id} <br />
      Nimi: {order.name} <br />
      Osoite: {order.address} <br />
      Puhelin: {order.mobile} <br />
      Email: {order.email} <br />
      </Typography>
    )
  }

  const adminControls = () => {
    if(user.admin !== undefined) return (
      <>
        <TextField id="uniikki_id_tanne" label="Huomioiden muokkaus" value={internalNoteField} variant="outlined" onChange={handleInternalNotesChange} />
        <Button size="small" onClick={handleInternalNotesSubmission}>Tallenna muutos</Button>
      </>
    )
  }

  const adminMarkAsDispatched = () => {
    if(user.admin != undefined && order.orderdispatched == null) return (
      <Button size="small" color="primary" onClick={handleMarkAsDispatched}>Merkitse lähetetyksi</Button>
    )
  }


  // MAIN COMPONENT:

  return (
    <Accordion onChange={handleExpansion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1c-content"
        id="panel1c-header"
      >
        <div className={classes.column}>
          <Typography className={classes.heading}>Tilaus {new Date(order.orderreceived).toLocaleDateString('fi-FI')}</Typography>
        </div>
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>{centsToFormattedEuros(order.purchaseprice)}</Typography>
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

                {orderDetailsDisplay()}

              </TableBody>
            </Table>
          </TableContainer>

          <br />
          {adminControls()}
          <br /><br />
          {adminMarkAsDispatched()}
        </div>

        <div className={clsx(classes.column, classes.helper)}>
          <Typography variant="caption">
        Tilaustunnus: {order.id} <br />
        Tilaus vastaanotettu: {order.orderreceived} <br />
        Tuotteet lähetetty: {order.orderdispatched} <br />
        Hinta: {centsToFormattedEuros(order.purchaseprice)} <br />
        Lisätiedot: {order.customerinstructions}
          </Typography>
          <br />
          <br />
          {adminDetails()}
        </div>

      </AccordionDetails>
    </Accordion>
  )

}

export default OrderElement