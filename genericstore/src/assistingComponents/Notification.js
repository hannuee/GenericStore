import React from 'react'
import { useSelector } from 'react-redux'

// Material UI:
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

const Notification = () => {
  const classes = useStyles()

  const notification = useSelector(state => state.notification)


  // MAIN COMPONENT:

  return (
    <div className={classes.root}>
      <Snackbar anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={notification.text !== ''}>
        <Alert severity={notification.severity}>
          {notification.text}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Notification
