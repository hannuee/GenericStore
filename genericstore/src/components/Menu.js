import React from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { displayNotificationForSeconds } from '../reducers/notificationReducer'

// Material UI:
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import StorefrontIcon from '@material-ui/icons/Storefront';

const noDeco = {  // Linkeille
    textDecoration: 'none',
    color: '#6f6f6f'
  }

const useStyles = makeStyles((theme) => ({    
    listItem: {
      paddingTop: '3px',
      paddingBottom: '3px',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  }));

const Menu = () => {

    const categories = useSelector(state => state.categories)
    const loggedIn = useSelector(state => state.customers.loggedIn) 

    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        window.localStorage.removeItem('genericStoreUser')
        dispatch({
          type: 'ADD_LOGGED_IN',
          data: null
        })
        history.push('/')
        dispatch(displayNotificationForSeconds('Kirjauduttu ulos', 'success', 5))
      }

    const AdminAddCategoryButton = () => {
        if (loggedIn != null && loggedIn.admin != undefined) {
          return (
            <Link to="/uusikategoria" style={noDeco}>
                <ListItem button className={classes.listItem}>
                  <ListItemIcon> <AddIcon /> </ListItemIcon>
                  <ListItemText primary="Lisää pääkategoria" />
                </ListItem>
            </Link>
          )
        }
      }
    
      const CustomerButtons = () => {
        if (loggedIn != null && loggedIn.name != undefined) {
          return (
            <>
              <Link to="/omattilaukset" style={noDeco}>
                <ListItem button className={classes.listItem}>
                  <ListItemIcon> <InboxIcon /> </ListItemIcon>
                  <ListItemText primary="Omat tilaukset" />
                </ListItem>
              </Link>
              <Link to="/ostoskori" style={noDeco}>
                <ListItem button className={classes.listItem}>
                  <ListItemIcon> <ShoppingCartIcon /> </ListItemIcon>
                  <ListItemText primary="Ostoskori" />
                </ListItem>
              </Link>
            </>
          )
        }
      }
    
      const AdminButtons = () => {
        if (loggedIn != null && loggedIn.admin != undefined) {
          return (
            <>
              <Link to="/tilaukset" style={noDeco}>
                <ListItem button className={classes.listItem}>
                  <ListItemIcon> <InboxIcon /> </ListItemIcon>
                  <ListItemText primary="Tilaukset" />
                </ListItem>
              </Link>
              <Link to="/asiakkaat" style={noDeco}>
                <ListItem button className={classes.listItem}>
                  <ListItemIcon> <GroupIcon /> </ListItemIcon>
                  <ListItemText primary="Asiakkaat" />
                </ListItem>
              </Link>
            </>
          )
        }
      }
    
      const LogInOrLogOutButton = () => {
        if (loggedIn == null) {
          return (
            <Link to="/kirjautuminen" style={noDeco}>
              <ListItem button className={classes.listItem}>
                <ListItemIcon> <AccountBoxIcon /> </ListItemIcon>
                <ListItemText primary="Kirjaudu" />
              </ListItem>
            </Link>
          )
        } else {
          return (
              <ListItem button className={classes.listItem} onClick={handleLogout} style={noDeco}>
                <ListItemIcon> <ExitToAppIcon /> </ListItemIcon>
                <ListItemText primary="Kirjaudu ulos" />
              </ListItem>
          )
        }
      }


  return (
<div>
      <div className={classes.toolbar} />
      
      <List>
      {categories.filter(category => category.category_id === null).map(category =>
        <Link to={`/kategoriat/${category.id}`} style={noDeco} key={category.id}>
          <ListItem button className={classes.listItem}>   
            <ListItemIcon> <StorefrontIcon /> </ListItemIcon>
            <ListItemText primary={category.name} />
          </ListItem>
        </Link>
      )}
      {AdminAddCategoryButton()}
      </List>

      <Divider />

      <List>
        {CustomerButtons()}
        {AdminButtons()}
        {LogInOrLogOutButton()}
      </List>
    </div>
  )
}

export default Menu
