import React from 'react';
import { useDispatch } from 'react-redux'
import { logInWithCredentials } from '../reducers/customerReducer'

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

  const dispatch = useDispatch()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogIn = () => {
    dispatch(logInWithCredentials(
      {
        email,
        password
      }
    ))
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField required id="standard-required" label="Sähköposti" value={email} onChange={handleEmailChange} />
        <TextField required id="standard-required" label="Salasana" value={password} onChange={handlePasswordChange} />
        <br />
        <Button size="small" onClick={handleLogIn}>Kirjaudu sisään</Button>
        <br />
        <br />
        <Link to="/rekisteröityminen">
          <Button size="small">Rekisteröidy</Button>
        </Link>
      </div>
    </form>
  )
}

export default LoginPage