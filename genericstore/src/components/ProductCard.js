import React from 'react';
import { useSelector } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import productService from '../services/products'
import { displayNotificationForSeconds } from '../reducers/notificationReducer'

// For size selection and quantity selection:
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';

// For new card exclusive:
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

// In order to add product to cart:
import { useDispatch } from 'react-redux'
import { addOrderItemToCart } from '../reducers/orderReducer'

import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { modifyAvailability } from '../reducers/productReducer'
import { modifyCategory } from '../reducers/productReducer'
import { modifyPricesAndSizes } from '../reducers/productReducer'

import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';


const useStyles = makeStyles({
  root: {
  },
  media: {
    height: 130,
    width: 150
  }
});

const MediaStyle = {  // Lisää tarvittaessa CardMediaan: style={MediaStyle}
    float: 'left',
    marginRight: '10px'
}

const CardContentStyle = {  // Tarvittaessa:  <CardContent style={CardContentStyle}>
    padding: '10px'
}

const TypographyStyle = {  // MODDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
    
}

const TypographyStylePrice = {  // MODDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
  color: 'red',
  float: 'right',
  margin: '10px'
}

const buttonStyle = {  // MODDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
    float: 'right'
}


// For size and quantity selection:
const useStylesSizeSelect = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


// For new card:
const useStylesNewCard = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column' 
  },
  detailsWithMedia: {
    display: 'flex',
    flexDirection: 'row',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  nameLine: {
    display: 'flex',
    flexDirection: 'row'
  },
  expandButton: {
    float: 'right'
  },
  cover: {
    width: 151,
    minWidth: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  // For new expansion functionality:
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));


const ProductCard = ({ product }) => {
  const classes = useStyles();


 // For size and quantity selection:

  const classesSizeSelect = useStylesSizeSelect();

  const [priceAndSize, setPriceAndSize] = React.useState(product.pricesandsizes[0])
  const [quantity, setQuantity] = React.useState(1);

  const handleChange = (event) => {
    console.log(event.target.value)
    setPriceAndSize(event.target.value)
  }
  const handleQuantityChange = (event) => {
    const quantityInput = Number(event.target.value)
    if (quantityInput >= 0) setQuantity(quantityInput)
    else setQuantity(0)
  }

  const dispatch = useDispatch()

  const handleAddToCart = () => {
    const product_time = new Date().getTime()
    const product_name = product.name 
    const product_id = product.id
    dispatch({
      type: 'ADD_TO_CART',
      data: {product_time, product_name, product_id, priceAndSize, quantity}
    })
    // JONKINLAINEN PALAUTE TÄHÄN ETTÄ ASIAKAS TIETÄÄ ETTÄ NYT ON TUOTE LISÄTTY OSTOSKORIINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
  }

  const quantityInput = () => {
    if(quantity > 0){
      return (
      <FormControl variant="outlined" className={classesSizeSelect.formControl}>
        <InputLabel htmlFor="component-outlined">Lukumäärä</InputLabel>
        <OutlinedInput id="lukumaara" value={quantity} onChange={handleQuantityChange} label="Lukumäärä" type="number" />
      </FormControl>
      )   
    } else {
      return (
      <FormControl error variant="outlined" className={classesSizeSelect.formControl}>
        <InputLabel htmlFor="component-outlined-error">Lukumäärä</InputLabel>
        <OutlinedInput id="lukumaara-error" value={quantity} onChange={handleQuantityChange} label="Lukumäärä" type="number" />
        <FormHelperText id="lukumaara-error-text">Error!!!!!</FormHelperText>
      </FormControl>
      )
    }
  }



  // For admin modification:

  const categories = useSelector(state => state.categories) 

  const [modifying, setModifying] = React.useState(false)

  const [available, setAvailable] = React.useState(product.available)
  const [pricesAndSizes, setPricesAndSizes] = React.useState(product.pricesandsizes)  // Kuten product admin formissa, paitsi init.
  const [categorySelected, setCategorySelected] = React.useState(product.category_id)

  const handleModificationStart = () => {
    setModifying(true)
  }

  const handleModificationEnd = () => {
    setModifying(false)
  }

  const handleAvailabilityChangeAndUpdate = async () => {
    try{
      const addedProduct = await productService.putAvailable({
        id: product.id,
        available: !available, 
      })
      setAvailable(!available)
      dispatch({
        type: 'REPLACE_PRODUCT',
        data: addedProduct
      })
      dispatch(displayNotificationForSeconds('Tuotteen saatavuus muutettu', 5))
    } 
    catch(error) {
      dispatch(displayNotificationForSeconds('Tuotteen saatavuuden muuttaminen epäonnistui', 5))
    }
  }

  const handlePriceAndSizeChange = (indexModified, sizeOrPrice) => (event) => {    // Kuten product admin formissa.
    const newArray = []
    pricesAndSizes.forEach((priceAndSize, index) => {
      if(index === indexModified && sizeOrPrice === 'size') newArray.push({price: priceAndSize.price, size: event.target.value})
      else if(index === indexModified && sizeOrPrice === 'price') newArray.push({price: Number(event.target.value), size: priceAndSize.size})
      else newArray.push(priceAndSize)
    })
    setPricesAndSizes(newArray)
  }

  const handlePriceAndSizeDeleteField = (indexDeleted) => () => {    // Kuten product admin formissa.
    const newArray = []
    pricesAndSizes.forEach((priceAndSize, index) => {
      if(index != indexDeleted) newArray.push(priceAndSize)
    })
    setPricesAndSizes(newArray)
  }

  const handlePriceAndSizeAddField = () => {       // Kuten product admin formissa.
    setPricesAndSizes(pricesAndSizes.concat({price: 0, size: ''}))
  }

  const handlePriceAndSizeUpdate = async () => {
    try{
      const modifiedProduct = await productService.putPricesAndSizes({
        id: product.id,
        pricesAndSizes
      })
      dispatch({
        type: 'REPLACE_PRODUCT',
        data: modifiedProduct
      })
      dispatch(displayNotificationForSeconds('Tuotteen hintatiedot muutettu', 5))
    } 
    catch(error) {
      dispatch(displayNotificationForSeconds('Tuotteen hintatietojen muunttaminen epäonnistui', 5))
    }
  }

  const handleCategoryChange = (event) => {
    setCategorySelected(event.target.value)
  }

  const handleCategoryUpdate = async () => {
    try{
      const productModified = await productService.putNewCategory({
        id: product.id,
        parentCategoryId: categorySelected
      })
      dispatch({
        type: 'REPLACE_PRODUCT',
        data: productModified
      })
      dispatch(displayNotificationForSeconds('Tuotteen kategoria muutettu', 5))
    } 
    catch(error) {
      dispatch(displayNotificationForSeconds('Tuotteen kategorian muuttaminen epäonnistui', 5))
    }
  }

  const modificationControls = () =>{
    if(modifying) return (
    <>
    <br />
      <Switch
        checked={available}
        onChange={handleAvailabilityChangeAndUpdate}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <br />
      {priceAndSizeInputFields()}
      <Button size="small" onClick={handlePriceAndSizeAddField}>Uusi hintatieto</Button>
      <Button size="small" onClick={handlePriceAndSizeUpdate}>Päivitä hintatiedot</Button>
      <br />
      {newCategorySelector()} <Button size="small" onClick={handleCategoryUpdate}>Päivitä kategoria</Button>
      <br />
      <Button size="small" onClick={handleModificationEnd}>Lopeta muokkaus</Button>
    </>)
    else return (
      <Button size="small" onClick={handleModificationStart}>Muokkaa</Button>
    )
  }

  const priceAndSizeInputFields = () => {         // Kuten product admin formissa.
    return pricesAndSizes.map((priceAndSize, index) =>
      <>
        <TextField id="standard-required" label="Koko" value={priceAndSize.size} onChange={handlePriceAndSizeChange(index, 'size')} />
        <TextField
          id="standard-number"
          label="Hinta"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={priceAndSize.price}
          onChange={handlePriceAndSizeChange(index, 'price')}
        />
        <Button size="small" onClick={handlePriceAndSizeDeleteField(index)}>poista</Button>
        <br />
      </>
    )
  }

  const newCategorySelector = () => 
    <FormControl variant="outlined" className={classesSizeSelect.formControl}>
        <InputLabel id="size-select">Tuotteen uusi kategoria</InputLabel>
        <Select
          labelId="size-select-label-id"
          id="size-select-id"
          value={categorySelected}
          onChange={handleCategoryChange}
          label="Tuotteen uusi kategoria"
        >
          {categories.map(category => <MenuItem value={category.id}>{category.name}</MenuItem> )}
        </Select>
      </FormControl>



  // New Expansion button:
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };




  // For new card:
  const classesNewCard = useStylesNewCard();
  const themeNewCard = useTheme();


// {product.id}
// {product.category_id}
// {product.available} JOS ADMIN
// {product.added} JOS ADMIN
  return (
    <>
    <br /><br />

    <Card className={classesNewCard.root}>
  
      <div className={classesNewCard.detailsWithMedia}>

      <CardMedia
        className={classesNewCard.cover}
        image="/reptile.jpg"
        title="Live from space album cover"
      />
       <div className={classesNewCard.details}>

        <CardContent className={classesNewCard.content}>

        <div className={classesNewCard.nameLine}>
          <Typography variant="h6" component="h2" style={TypographyStyle}>
              {product.name}
           </Typography>

           <IconButton className={classesNewCard.expandButton}
          className={clsx(classesNewCard.expand, {
            [classesNewCard.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
            <EditIcon />
          </IconButton>
        </div>

           <Typography variant="body2" color="textSecondary" component="p">
            {product.description} Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller 
            Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller 
          </Typography>

      <FormControl variant="outlined" className={classesSizeSelect.formControl}>
        <InputLabel id="size-select">Koko</InputLabel>
        <Select
          labelId="size-select-label-id"
          id="size-select-id"
          value={priceAndSize}
          onChange={handleChange}
          label="Koko"
        >
          {product.pricesandsizes.map(priceAndSizeOption => <MenuItem value={priceAndSizeOption}>{priceAndSizeOption.size} - {priceAndSizeOption.price / 100} €</MenuItem> )}
        </Select>
      </FormControl>

      {quantityInput()}

      <Button size="small" color="primary" style={buttonStyle} onClick={handleAddToCart}>
        Lisää ostoskoriin
      </Button>

      {modificationControls()}

      <Typography variant="body2" component="p" style={TypographyStylePrice}>{(priceAndSize.price / 100) * quantity} €</Typography>

        </CardContent>
        </div>
      </div>

      <Collapse in={expanded} timeout="auto" unmountOnExit> 
        <CardContent>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>

    </Card>


    </>
  )
}

export default ProductCard