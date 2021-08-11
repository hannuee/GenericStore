import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import CategoryAdditionForm from './CategoryAdditionForm'
import ProductCard from './ProductCard'  
import BreadcrumbsLinks from '../assistingComponents/BreadcrumbsLinks'
import { deleteCategory } from '../reducers/categoryReducer'
import { modifyParentCategory } from '../reducers/categoryReducer'

import categoryService from '../services/categories'
import {useHistory} from 'react-router-dom'
import { displayNotificationForSeconds } from '../reducers/notificationReducer'

import { Link } from "react-router-dom"
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import SaveIcon from '@material-ui/icons/Save';

import { getAsListOfIdsAndPaths } from '../utils/CategoryTreeProcessors'

// Kategorian muuttamiseen:
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStylesSizeSelect = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  chipStyle: {
    margin: theme.spacing(0.5),
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
}));

const useStylesNewCard = makeStyles((theme) => ({
  expandButton: {
    float: 'left'  
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(90deg)',
  },
}));

const CategoryPage = (props) => {

  const dispatch = useDispatch()

  const history = useHistory()

  const categoryDisplayed = useSelector(state => state.categories.find(category => category.id === props.id))
  const subCategories = useSelector(state => state.categories.filter(category => category.category_id === props.id))
  const products = useSelector(state => state.products.filter(product => product.category_id === props.id))

  const admin = useSelector(state => state.customers.loggedIn)

  const handleDeleteCategory = async () => {
    try{
      const category = await categoryService.deleteCategory(categoryDisplayed.id, admin.token)
      history.push('/')
      dispatch({
        type: 'DELETE_CATEGORY',
        data: categoryDisplayed.id
      })
      dispatch(displayNotificationForSeconds('Kategoria poistettu', 'success', 5))
    }
    catch(error) {
      dispatch(displayNotificationForSeconds('Kategorian poisto epäonnistui', 'error', 5))
    }
  }


  // Kategorian muuttamiseen, harkitse refaktorointi Product Card vastaavien kanssaaaaaaaaaaaaaaaaa:

  const classesSizeSelect = useStylesSizeSelect();
  const classesNewCard = useStylesNewCard(); 

  const categories = useSelector(state => state.categories)

  const [categorySelected, setCategorySelected] = React.useState(categoryDisplayed.id)

  const handleCategoryChange = (event) => {
    setCategorySelected(event.target.value)
  }

  const handleCategoryUpdate = async () => {
    try{
      const category = await categoryService.putNewCategory({
        id: categoryDisplayed.id,
        parentCategoryId: categorySelected
      }, admin.token)
      dispatch({
        type: 'REPLACE_CATEGORY',
        data: category
      })
      dispatch(displayNotificationForSeconds('Kategoria muutettu', 'success', 5))
    } 
    catch(error) {
      dispatch(displayNotificationForSeconds('Kategorian muutto epäonnistui', 'error', 5))
    }
  }


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
        Kategorian on oltava tyhjä jotta sen voi poistaa
      </Typography>
    )
    // NÄYTÄ TÄÄLLÄ OHJE ETTÄ KATEGORIAN TULEE OLLA TYHJÄ JOTTA VOI POISTAA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }



  const [showNewProductForm, setShowNewProductForm] = React.useState(false);
  const [showNewCategoryForm, setShowNewCategoryForm] = React.useState(false);
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
        {newCategorySelector()} 
        <Button
        variant="contained"
        color="primary"
        className={classesSizeSelect.marginPlease}
        onClick={handleCategoryUpdate}
        startIcon={<SaveIcon />}
      >
        tallenna
      </Button>
        </div>
        <Divider orientation="vertical" flexItem />
        <div className={classesSizeSelect.horizontalLayoutRight}>
        {categoryDeleteButtonOrInstructions()}
        </div>
      </Paper>
      </Collapse>
    </div>

  const newCategorySelector = () => 
    <FormControl variant="outlined" className={classesSizeSelect.formControl}>
        <InputLabel id="size-select" className={classesSizeSelect.marginPlease}>Kategorian uusi isäntä</InputLabel>
        <Select
          labelId="size-select-label-id"
          id="size-select-id"
          value={categorySelected}
          onChange={handleCategoryChange}
          label="Tuotteen uusi kategoria"
          className={classesSizeSelect.select}
        >
          {getAsListOfIdsAndPaths(categories).map(item => <MenuItem value={item.id}>{item.path}</MenuItem> )}
        </Select>
      </FormControl>



    return (
      <> 
      <div className={classesSizeSelect.horizontalUpperLayout}>  
        <div className={classesSizeSelect.horizontalLayoutLeft}>
          <BreadcrumbsLinks categoryId={categoryDisplayed.id} />
          {categoryDisplayed.description}
          <div>
          <IconButton className={classesNewCard.expandButton}
            className={clsx(classesNewCard.expand, {
              [classesNewCard.expandOpen]: expandedCategoryModificationControls,
            })}
            onClick={handleExpandCategoryModificationControls}
            aria-expanded={expandedCategoryModificationControls}
            aria-label="show more"
          >
            <EditIcon />
          </IconButton>
          </div>
          </div>

          <div className={classesSizeSelect.horizontalLayoutRight}> 
            <Button variant="contained" color="primary" onClick={handleShowNewProductForm} className={classesSizeSelect.marginPlease}>uusi tuote</Button>
            <Button variant="contained" color="primary" onClick={handleShowNewCategoryForm} className={classesSizeSelect.marginPlease}>uusi alakategoria</Button>
          </div>
        
      </div>
        

        
        {newProductForm()}
        {newCategoryForm()}
        {categoryModificationControls()}
        <br />
        
        {subCategories.map(category =>
          <Link to={`/kategoriat/${category.id}`} key={category.id}>
            <Chip label={category.name} clickable color="primary" className={classesSizeSelect.chipStyle} />
          </Link>
        )}

        <br />
        <br />

        {products.map(product =>
        <div key={product.id}>
          <ProductCard product={product} />
          <br />
        </div>
        )}
      </>
    )
  }
  
  export default CategoryPage