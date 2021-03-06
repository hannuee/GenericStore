import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import AddToShoppingCartForm from './AddToShoppingCartForm'
import CategoryUpdateForm from './CategoryUpdateForm'
import AvailabilityUpdateSwitch from './AvailabilityUpdateSwitch'
import PricesAndSizesForm from './PricesAndSizesForm'
import { displayNotificationForSeconds } from '../reducers/notificationReducer'
import productService from '../services/products'

// Material UI:
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import EditIcon from '@material-ui/icons/Edit'
import clsx from 'clsx'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const switchAndCategoryModStyle = {
  alignItems: 'center',
  marginLeft: '30px'
}

// For new card:
const useStylesNewCard = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  horizontalLayout: {
    display: 'flex',
    flexDirection: 'row',
  },
  verticalLayout: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  floatLeft: {
    float: 'left'
  },
  floatRight: {
    float: 'right'
  },
  content: {
    flex: '1 0 auto',
    padding: '7px',
    paddingLeft: '13px',
  },
  nameLine: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '3px'
  },
  button: {
    marginTop: theme.spacing(2),
  },
  cover: {
    width: 151,
    minWidth: 151,
  },
  marginBottom: {
    marginBottom: '3px',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    padding: '3px',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(90deg)',
    padding: '3px',
  },
}))

// Product display -mode: product, undefined, undefined
// Product addition -mode: undefined, parentCategoryIdForNewProduct, handleCloseNewProductForm
const ProductCard = ({ product, parentCategoryIdForNewProduct, handleCloseNewProductForm }) => {   
  const classesNewCard = useStylesNewCard()

  const loggedIn = useSelector(state => state.customers.loggedIn)
  const dispatch = useDispatch()

  const [name, setName] = React.useState('')  // Product addition form.
  const [description, setDescription] = React.useState('')  // Product addition form.
  const [pricesAndSizes, setPricesAndSizes] = React.useState([{ price: 0, size: '' }])  // Product addition form.
  const [disabled, setDisabled] = React.useState(false)  // Disable product addition form when sending data.
  const [expanded, setExpanded] = React.useState(false)  // Admin control panel expansion.

  const handleNameChange = (event) => setName(event.target.value)
  const handleDescriptionChange = (event) => setDescription(event.target.value)
  const handleExpandClick = () => setExpanded(!expanded)

  const handleAddNewProduct = async () => {
    setDisabled(true)

    const newPricesAndSizes = []
    for(let userInput of pricesAndSizes){
      let asNumber = Number(Number(userInput.price.replace(',', '.').replace(/\s+/g, '')).toFixed(2))
      if(isNaN(asNumber)) {
        dispatch(displayNotificationForSeconds('Virheellinen hintatieto', 'error', 5))
        return
      } else if(asNumber < 0) {
        dispatch(displayNotificationForSeconds('Hinta ei voi olla negatiivinen', 'error', 5))
        return
      }
      asNumber = Math.trunc(asNumber*100)
      newPricesAndSizes.push({ price: asNumber, size: userInput.size })
    }

    try {
      const product = await productService.post({
        parentCategoryId: parentCategoryIdForNewProduct,
        name,
        description,
        pricesAndSizes: newPricesAndSizes,
        available: true
      }, loggedIn.token)
      handleCloseNewProductForm()
      setName('')
      setDescription('')
      setPricesAndSizes([{ price: 0, size: '' }])
      dispatch({
        type: 'ADD_NEW_PRODUCT',
        data: product
      })
      dispatch(displayNotificationForSeconds('Tuote lis??tty', 'success', 5))
    }
    catch (error) {
      dispatch(displayNotificationForSeconds('Virhe tuotetta lis??tt??ess??', 'error', 5))
    }
    setDisabled(false)
  }


  // SUBCOMPONENTS:

  const TitleOrFieldForIt = () => {
    if (product != undefined) return (
      <Typography variant="h6" component="h2">
        {product.name}
      </Typography>
    )
    else return (
      <TextField required id="standard-required" label="Tuotteen nimi" value={name} onChange={handleNameChange} />
    )
  }

  const VisibilityInfoOrNothing = () => {
    if (product != undefined && !product.available) return (
      <Typography variant="body2" color="textSecondary" component="p">
        &nbsp;&nbsp;&nbsp; Tuote on piilotettu asiakkailta
      </Typography>
    )

  }

  const EditButtonOrNothing = () => {
    if (product != undefined && loggedIn != null && loggedIn.admin != undefined) return (
      <IconButton
        className={clsx(classesNewCard.expand, {
          [classesNewCard.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <EditIcon />
      </IconButton>
    )
  }

  const DescriptionOrFieldForIt = () => {
    if (product != undefined) return (
      <Typography variant="body2" color="textSecondary" component="p" className={classesNewCard.marginBottom}>
        {product.description}
      </Typography>
    )
    else return (
      <TextField multiline rows={2} id="standard-required" label="Kuvaus" value={description} onChange={handleDescriptionChange} />
    )
  }

  const ToCartOrPricesAndSizesInputAndSend = () => {
    if (product != undefined) return (
      <AddToShoppingCartForm product={product} />
    )
    else return (
      <>
        <PricesAndSizesForm pricesAndSizesParent={pricesAndSizes} setPricesAndSizesParent={setPricesAndSizes} />
        <Button size="small" disabled={disabled} onClick={handleAddNewProduct}>Lis???? tuote</Button>
        <Button size="small" color="primary" disabled={disabled} onClick={handleCloseNewProductForm}>KIINNI</Button>
      </>
    )
  }

  const adminControlsOrNothing = () => {
    if (product != undefined) return (
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          <div className={classesNewCard.horizontalLayout}>
            <div className={classesNewCard.verticalLayout}>
              <PricesAndSizesForm product={product} />            {/* PricesAndSizesForm is used here in Update-mode */}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classesNewCard.verticalLayout}>
              <div className={classesNewCard.horizontalLayout} style={switchAndCategoryModStyle}>
                <AvailabilityUpdateSwitch product={product} />
              </div>
              <div className={classesNewCard.horizontalLayout} style={switchAndCategoryModStyle}>
                <CategoryUpdateForm productId={product.id} />
              </div>
            </div>
          </div>
        </CardContent>
      </Collapse>
    )
  }

  const productPictureOrBlank = () => {
    if (product != undefined && product.picture != null) return (
      <CardMedia
        className={classesNewCard.cover}
        image={'/' + product.picture.URL}
        title={product.picture.desc}
      />
    )
    else return (
      <CardMedia
        className={classesNewCard.cover}
        image="/paleBlue.jpg"
        title="Pale blue picture"
      />
    )
  }


  // MAIN COMPONENT:

  return (
    <Card className={classesNewCard.root}>
      <div className={classesNewCard.horizontalLayout}>
        {productPictureOrBlank()}
        <div className={classesNewCard.verticalLayout}>
          <CardContent className={classesNewCard.content}>
            <div className={classesNewCard.nameLine}>
              {TitleOrFieldForIt()}
              {VisibilityInfoOrNothing()}
              {EditButtonOrNothing()}
            </div>
            {DescriptionOrFieldForIt()}
            {ToCartOrPricesAndSizesInputAndSend()}
          </CardContent>
        </div>
      </div>
      {adminControlsOrNothing()}
    </Card>
  )
}

export default ProductCard