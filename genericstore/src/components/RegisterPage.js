import React from 'react';
import { useDispatch } from 'react-redux'
import { addNewCustomer } from '../reducers/customerReducer'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {useHistory} from 'react-router-dom'
import { displayNotificationForSeconds } from '../reducers/notificationReducer'


import customerService from '../services/customers'


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

const RegisterPage = () => {
  const classes = useStyles();

  const dispatch = useDispatch()

  const history = useHistory()

  const [name, setName] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [mobile, setMobile] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  const handleAddressChange = (event) => {
    setAddress(event.target.value)
  }
  const handleMobileChange = (event) => {
    setMobile(event.target.value)
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


  // Buttoniin: disabled={disabled}
  const [disabled, setDisabled] = React.useState(false)
  
  const handleAddNewCustomer = async () => {
    setDisabled(true)

      try{
        await customerService.post({
          name,
          address,
          mobile,
          email,
          password
        })
        history.push('/kirjautuminen')
        dispatch(displayNotificationForSeconds('Rekisteröityminen onnistui', 5))
      }
      catch(error){
        if (error.response.data.error.includes('violates unique constraint')) dispatch(displayNotificationForSeconds('Virheellinen sähköpostiosoite', 5))
        else dispatch(displayNotificationForSeconds('Rekisteröityminen epäonnistui', 5))
        setDisabled(false)
      }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField required id="standard-required" label="Nimi" value={name} onChange={handleNameChange} />
        <TextField required id="standard-required" label="Osoite" value={address} onChange={handleAddressChange} />
        <TextField required id="standard-required" label="Puhelinnumero" value={mobile} onChange={handleMobileChange} />
        <TextField required id="standard-required" label="Sähköposti" value={email} onChange={handleEmailChange} />
        <TextField required id="standard-required" label="Salasana" value={password} onChange={handlePasswordChange} />
        <br />
        <Button size="small" disabled={disabled} onClick={handleAddNewCustomer}>Lähetä</Button>
      </div>
    </form>
  )
}

export default RegisterPage