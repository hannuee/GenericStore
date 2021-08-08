import React from 'react';
import { useDispatch } from 'react-redux'
import { logInWithCredentials } from '../reducers/customerReducer'

import { displayNotificationForSeconds } from '../reducers/notificationReducer'
import { initializeAllProducts } from '../reducers/productReducer'
import customerService from '../services/customers'
import {useHistory} from 'react-router-dom'

import { initializeCustomers } from '../reducers/customerReducer'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom"


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

const LoginPage = () => {
  const classes = useStyles();

  const history = useHistory()

  const dispatch = useDispatch()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const [disabled, setDisabled] = React.useState(false)

  const handleLogIn = async () => {
    setDisabled(true)

    try{
      const tokenAndInfo = await customerService.postLogin({
        email,
        password
      })
      dispatch({
        type: 'ADD_LOGGED_IN',
        data: tokenAndInfo
      })

      if(tokenAndInfo.admin !== undefined) dispatch(initializeAllProducts(tokenAndInfo.token))

      window.localStorage.setItem('genericStoreUser', JSON.stringify(tokenAndInfo)) 

      history.push('/')
      // ANNA NOOTTI ONNISTUMISESTA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    } 
    catch(error) {
      if (error.response.data.error.includes('Incorrect email or password')) dispatch(displayNotificationForSeconds('Virheellinen sähköpostiosoite tai salasana', 5))
      else dispatch(displayNotificationForSeconds('Sisäänkirjautuminen epäonnistui', 5))
      setDisabled(false)
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField required id="standard-required" label="Sähköposti" value={email} onChange={handleEmailChange} />
        <TextField required id="standard-required" label="Salasana" value={password} onChange={handlePasswordChange} />
        <br />
        <Button size="small" disabled={disabled} onClick={handleLogIn}>Kirjaudu sisään</Button>
        <br />
        <br />
        <Link to="/rekisteroityminen">
          <Button size="small">Rekisteröidy</Button>
        </Link>
      </div>
    </form>
  )
}

export default LoginPage