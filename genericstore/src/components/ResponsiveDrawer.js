// Mainly copy-pasted this component from material-ui.com/components/drawers/, slightly modified and all visible text replaced with own text.

import React from 'react';
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

import {
  Switch, Route, Link, useRouteMatch
} from "react-router-dom"

import { useSelector } from 'react-redux'
import CategoryPage from './CategoryPage'
import MyOrdersPage from './MyOrdersPage'
import MyCartPage from './MyCartPage'
import AdminOrdersPage from './AdminOrdersPage'
import CategoryAdditionForm from './CategoryAdditionForm'


const drawerWidth = 240;

const customStyleColor = {  // AppBar MODDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
    background: '#ff99ff',
    boxShadow: '0px 0px'
}

const noDeco = {  // Link MODDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
  textDecoration: 'none'
}

const useStyles = makeStyles((theme) => ({    
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const categories = useSelector(state => state.categories)  // Kat haku tilasta MODDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      
      
      
      <List>
      {categories.filter(category => category.category_id === null).map(category =>
        <Link to={`/kategoriat/${category.id}`} style={noDeco} key={category.id}>
          <ListItem button>   
            <ListItemIcon> <InboxIcon /> </ListItemIcon>
            <ListItemText primary={category.name} />
          </ListItem>
        </Link>
      )}
      </List>

      <Divider />

      <Link to="/uusikategoria" style={noDeco}>
        <Button size="small">Lisää pääkategoria</Button>
      </Link>

      <Divider />

      <List>
        <Link to="/omattilaukset" style={noDeco}>
          <ListItem button>   
            <ListItemIcon> <InboxIcon /> </ListItemIcon>
            <ListItemText primary="Omat tilaukset" />
          </ListItem>
        </Link>
        <Link to="/tiedot" style={noDeco}>
          <ListItem button>   
            <ListItemIcon> <MailIcon /> </ListItemIcon>
            <ListItemText primary="Omat tiedot" />
          </ListItem>
        </Link>
        <Link to="/ostoskori" style={noDeco}>
          <ListItem button>   
            <ListItemIcon> <MailIcon /> </ListItemIcon>
            <ListItemText primary="Ostoskori" />
          </ListItem>
        </Link>
      </List>

      <Divider />

      <List>
        <Link to="/tilaukset" style={noDeco}>
          <ListItem button>   
            <ListItemIcon> <InboxIcon /> </ListItemIcon>
            <ListItemText primary="Tilaukset" />
          </ListItem>
        </Link>
      </List>

    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;


  // MODDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD:
  const idInMatchObject = useRouteMatch('/kategoriat/:id')
  const idExtracted = idInMatchObject ? Number(idInMatchObject.params.id) : null
  
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} style={customStyleColor}>
        <Toolbar>
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
            Responsive drawer
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
      <Route path="/tiedot">
          <Typography paragraph>
            Omat tiedot täällä.
          </Typography>      
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
    </Switch>

      </main>
    </div>
  );
}

export default ResponsiveDrawer;
