// Foundations for this component from: https://material-ui.com/components/cards/
// Foundations for size selection from: https://material-ui.com/components/selects/

import React from 'react';
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

const ProductAdditionForm = ({ categoryId }) => {
  const classes = useStyles();

  const dispatch = useDispatch()


  const [pricesAndSizes, setPricesAndSizes] = React.useState(0)

  const handleChange = (event) => {
    console.log(event.target.value)
  }


  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField required id="standard-required" label="Tuotteen nimi" />
        <TextField id="standard-required" label="Kuvaus" />
        <br />
        <TextField id="standard-required" label="Koko" />
        <TextField
          id="standard-number"
          label="Hinta"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button size="small">poista</Button>
        <br />
        <Button size="small">lisää</Button>

      </div>
    </form>
  )
}

export default ProductAdditionForm