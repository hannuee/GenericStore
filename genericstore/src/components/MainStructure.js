import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import Menu from './Menu'
import CategoryPage from './CategoryPage'
import MyOrdersPage from './MyOrdersPage'
import MyCartPage from './MyCartPage'
import AdminOrdersPage from './AdminOrdersPage'
import CustomersPage from './CustomersPage'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import CategoryAdditionForm from './CategoryAdditionForm'
import Notification from '../assistingComponents/Notification'

// Material UI:
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const drawerWidth = 240

const customStyleColor = {
  background: 'linear-gradient(90deg, #a6e2ff 30%, #ccefff 90%)',
  height: 47,
  boxShadow: '0px 0px'  // Removes App bar 3D effect
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
    zIndex: theme.zIndex.drawer + 1,  // Keeps menu below App bar.
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
    backgroundColor: '#fafafa',  // Menu color
    border: '0px'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

function MainStructure(props) {
  // Material UI:
  const windowForMUI = props.window
  const container = windowForMUI !== undefined ? () => windowForMUI().document.body : undefined
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const categories = useSelector(state => state.categories)

  // For routing:
  const idInMatchObject = useRouteMatch('/kategoriat/:id')
  const idExtracted = idInMatchObject ? Number(idInMatchObject.params.id) : null

  // First main category:
  let firstMainCategory = categories.find(category => category.category_id == null)
  if(firstMainCategory == null) firstMainCategory = { id: '' }  // because of the initialization delay.


  // MAIN COMPONENT:

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
            Linnakauppa
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
            <Menu />
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
            <Menu />
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
  )
}

export default MainStructure
