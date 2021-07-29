import React from 'react'
import { useSelector } from 'react-redux'

// For table:
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// For table:
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const MyOrdersPage = (props) => {

  const cartItems = useSelector(state => state.orders.cart)

  // For table:
  const classes = useStyles();

    return (

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
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
          {cartItems.map((cartItem) => (
            <TableRow key={cartItem.product_time}>
              <TableCell component="th" scope="row">{cartItem.product_name}</TableCell>
              <TableCell align="right">{cartItem.priceAndSize.size}</TableCell>
              <TableCell align="right">{cartItem.priceAndSize.price / 100} €</TableCell>
              <TableCell align="right">{cartItem.quantity}</TableCell>
              <TableCell align="right">{(cartItem.priceAndSize.price * cartItem.quantity) / 100} €</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    )
  }
  
  export default MyOrdersPage