// Mainly copy-pasted this component from material-ui.com/components/drawers/, slightly modified and all visible text replaced with own text.

import React from 'react';
import { useDispatch } from 'react-redux'
import {useHistory, Redirect} from 'react-router-dom'
import { displayNotificationForSeconds } from '../reducers/notificationReducer'
// import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import StorefrontIcon from '@material-ui/icons/Storefront';

import {
  Switch, Route, Link, useRouteMatch
} from "react-router-dom"

import { useSelector } from 'react-redux'
import CategoryPage from './CategoryPage'
import MyOrdersPage from './MyOrdersPage'
import MyCartPage from './MyCartPage'
import AdminOrdersPage from './AdminOrdersPage'
import CategoryAdditionForm from './CategoryAdditionForm'
import CustomersPage from './CustomersPage'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'

import Notification from '../assistingComponents/Notification'


const drawerWidth = 240;

const customStyleColor = {  
    background: '#a6e2ff',  // Yläpalkin taustaväri
    height: 47,
    boxShadow: '0px 0px'  // Tää päälle niin yläpalkista poistuu 3D efekti.
}

const noDeco = {  // Linkeille
  textDecoration: 'none',
  color: '#6f6f6f'
}

const useStyles = makeStyles((theme) => ({    
  root: {
    display: 'flex',
    //background: '#fff7e2 ',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,  // Tää pois ja alta päälle niin menu siirtyy takas yläpalkin päälle.
//    [theme.breakpoints.up('sm')]: {
//      width: `calc(100% - ${drawerWidth}px)`,
//      marginLeft: drawerWidth,
//    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  listItem: {
    paddingTop: '3px',
    paddingBottom: '3px',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#fafafa',  // Menun taustaväri.
    border: '0px'
  },
  content: {
    flexGrow: 1,  
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const windowForMUI = props.window;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const categories = useSelector(state => state.categories)
  const loggedIn = useSelector(state => state.customers.loggedIn)  
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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

  const drawer = (
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
  );

  const container = windowForMUI !== undefined ? () => windowForMUI().document.body : undefined;


  // MODDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD:
  const idInMatchObject = useRouteMatch('/kategoriat/:id')
  const idExtracted = idInMatchObject ? Number(idInMatchObject.params.id) : null
  
  // First main category:
  let firstMainCategory = categories.find(category => category.category_id == null)
  if(firstMainCategory == null) firstMainCategory = {id: ''}  // because of the initialization delay.
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} style={customStyleColor}>
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Geneerinen kauppa
          </Typography> 
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />


    <Switch>
      <Route path="/kategoriat/:id">
          <CategoryPage id={idExtracted} />
      </Route>
      <Route path="/omattilaukset">
          <MyOrdersPage />
      </Route>
      <Route path="/ostoskori">
           <MyCartPage />
      </Route>
      <Route path="/tilaukset">
          <AdminOrdersPage />
      </Route>
      <Route path="/uusikategoria">
          <CategoryAdditionForm parentCategoryIdForNewCategory={null} />
      </Route>
      <Route path="/asiakkaat">
          <CustomersPage />
      </Route>
      <Route path="/kirjautuminen">
          <LoginPage />
      </Route>
      <Route path="/rekisteroityminen">
          <RegisterPage />
      </Route>
      <Route path="/">  
          <Redirect to={'/kategoriat/' + firstMainCategory.id} />
      </Route>
    </Switch>

    <Notification />
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
