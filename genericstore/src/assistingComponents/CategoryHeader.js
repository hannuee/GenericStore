import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import BreadcrumbsLinks from './BreadcrumbsLinks'
import CategoryUpdateForm from './CategoryUpdateForm'
import CategoryAdditionForm from '../components/CategoryAdditionForm'
import ProductCard from './ProductCard'
import { displayNotificationForSeconds } from '../reducers/notificationReducer'
import categoryService from '../services/categories'

// Material UI:
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import Paper from '@material-ui/core/Paper'

const useStylesSizeSelect = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  horizontalUpperLayout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalLayoutLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  horizontalLayoutRight: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    width: '50%',
  },
  marginPlease: {
    margin: theme.spacing(1),
  },
  marginRight: {
    margin: theme.spacing(1),
    marginRight: '20px',
  },
  select: {
    margin: theme.spacing(1),
    minWidth: 250
  },
}))

const useStylesNewCard = makeStyles((theme) => ({
  expand: {
    float: 'left',
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    float: 'left',
    transform: 'rotate(90deg)',
  },
}))

const CategoryHeader = (props) => {
  const classesSizeSelect = useStylesSizeSelect()
  const classesNewCard = useStylesNewCard()

  const categoryDisplayed = useSelector(state => state.categories.find(category => category.id === props.id))
  const subCategories = useSelector(state => state.categories.filter(category => category.category_id === props.id))
  const products = useSelector(state => state.products.filter(product => product.category_id === props.id))
  const loggedIn = useSelector(state => state.customers.loggedIn)
  const dispatch = useDispatch()
  const history = useHistory()

  const [showNewProductForm, setShowNewProductForm] = React.useState(false)
  const [showNewCategoryForm, setShowNewCategoryForm] = React.useState(false)
  const [expandedCategoryModificationControls, setExpandedCategoryModificationControls] = React.useState(false)

  const handleShowNewProductForm = () => {
    setShowNewProductForm(true)
  }
  const handleShowNewCategoryForm = () => {
    setShowNewCategoryForm(true)
  }
  const handleCloseNewProductForm = () => {
    setShowNewProductForm(false)
  }
  const handleCloseNewCategoryForm = () => {
    setShowNewCategoryForm(false)
  }
  const handleExpandCategoryModificationControls = () => {
    setExpandedCategoryModificationControls(!expandedCategoryModificationControls)
  }

  const handleDeleteCategory = async () => {
    try{
      await categoryService.deleteCategory(categoryDisplayed.id, loggedIn.token)
      history.push('/')
      dispatch({
        type: 'DELETE_CATEGORY',
        data: categoryDisplayed.id
      })
      dispatch(displayNotificationForSeconds('Kategoria poistettu', 'success', 5))
    }
    catch(error) {
      dispatch(displayNotificationForSeconds('Kategorian poisto ep??onnistui', 'error', 5))
    }
  }


  // SUBCOMPONENTS:

  const categoryDeleteButtonOrInstructions = () => {
    if(subCategories.length === 0 && products.length === 0) return (
      <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        className={classesSizeSelect.marginRight}
        onClick={handleDeleteCategory}
      >
        Poista kategoria
      </Button>

    )
    else return (
      <Typography variant="body2" color="textSecondary" component="p" className={classesSizeSelect.marginRight}>
        Kategorian on oltava tyhj?? jotta sen voi poistaa
      </Typography>
    )
  }

  const newProductForm = () =>
    <div>
      <Collapse in={showNewProductForm} timeout="auto" unmountOnExit>
        <ProductCard parentCategoryIdForNewProduct={categoryDisplayed.id} handleCloseNewProductForm={handleCloseNewProductForm} />
      </Collapse>
    </div>

  const newCategoryForm = () =>
    <div>
      <Collapse in={showNewCategoryForm} timeout="auto" unmountOnExit>
        <CategoryAdditionForm parentCategoryIdForNewCategory={categoryDisplayed.id} handleCloseNewCategoryForm={handleCloseNewCategoryForm} />
      </Collapse>
    </div>

  const categoryModificationControls = () =>
    <div>
      <Collapse in={expandedCategoryModificationControls} timeout="auto" unmountOnExit>
        <Paper className={classesSizeSelect.horizontalUpperLayout}>
          <div className={classesSizeSelect.horizontalLayoutLeft}>
            <CategoryUpdateForm categoryId={categoryDisplayed.id} />
          </div>
          <Divider orientation="vertical" flexItem />
          <div className={classesSizeSelect.horizontalLayoutRight}>
            {categoryDeleteButtonOrInstructions()}
          </div>
        </Paper>
      </Collapse>
    </div>

  const AdminExpandCategoryModificationControlsButton = () => {
    if (loggedIn != null && loggedIn.admin != undefined) {
      return (
        <IconButton 
          className={clsx(classesNewCard.expand, {
            [classesNewCard.expandOpen]: expandedCategoryModificationControls,
          })}
          onClick={handleExpandCategoryModificationControls}
          aria-expanded={expandedCategoryModificationControls}
          aria-label="show more"
        >
          <EditIcon />
        </IconButton>
      )
    }
  }

  const AdminNewProductAndCategoryButtons = () => {
    if (loggedIn != null && loggedIn.admin != undefined) {
      return (
        <>
          <Button variant="contained" color="primary" onClick={handleShowNewProductForm} className={classesSizeSelect.marginPlease}>uusi tuote</Button>
          <Button variant="contained" color="primary" onClick={handleShowNewCategoryForm} className={classesSizeSelect.marginPlease}>uusi alakategoria</Button>
        </>
      )
    }
  }


  // MAIN COMPONENT:

  if(categoryDisplayed !== undefined) {  // This check is due to the problem of delayed initialization when non-root ULR is reloaded.
    return (
      <>
        <div className={classesSizeSelect.horizontalUpperLayout}>
          <div className={classesSizeSelect.horizontalLayoutLeft}>
            <BreadcrumbsLinks categoryId={categoryDisplayed.id} />
        | &nbsp;&nbsp;&nbsp; {categoryDisplayed.description}
            <div>
              {AdminExpandCategoryModificationControlsButton()}
            </div>
          </div>

          <div className={classesSizeSelect.horizontalLayoutRight}>
            {AdminNewProductAndCategoryButtons()}
          </div>

        </div>

        {newProductForm()}
        {newCategoryForm()}
        {categoryModificationControls()}
      </>
    )
  } else {
    return <> </>
  }


}

export default CategoryHeader