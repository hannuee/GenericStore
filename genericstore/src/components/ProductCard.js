import React from 'react';
import { useDispatch } from 'react-redux'
import ParentCategoryUpdateForm from '../assistingComponents/ParentCategoryUpdateForm'  
import AvailabilityUpdateSwitch from '../assistingComponents/AvailabilityUpdateSwitch' 
import PricesAndSizesUpdateForm from '../assistingComponents/PricesAndSizesUpdateForm' 

// Material UI:
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';

const TypographyStylePrice = {  
  color: 'red',
  float: 'right',
  margin: '10px'
}

const buttonStyle = {  
    float: 'right'
}

const switchAndCategoryModStyle = {  
  alignItems: 'center',
  marginLeft: '30px'
}

const floatRight = {
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
  horizontalLayout: {
    display: 'flex',
    flexDirection: 'row',
  },
  verticalLayout: {
    display: 'flex',
    flexDirection: 'column',
  },
  floatLeft: {
    float: 'left'
  },
  floatRight: {
    float: 'right'
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
  button: {
    marginTop: theme.spacing(2),
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

  const dispatch = useDispatch()
  const classesSizeSelect = useStylesSizeSelect();
  const classesNewCard = useStylesNewCard();

 // For size and quantity selection:

  const [priceAndSize, setPriceAndSize] = React.useState(product.pricesandsizes[0])
  const [quantity, setQuantity] = React.useState(1);

  const handleChange = (event) => {
    setPriceAndSize(event.target.value)
  }
  const handleQuantityChange = (event) => {
    const quantityInput = Number(event.target.value)
    if (quantityInput >= 0) setQuantity(quantityInput)
    else setQuantity(0)
  }


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

  const modificationControls = () =>
    <>
    <div className={classesNewCard.horizontalLayout}>
    
    <div className={classesNewCard.verticalLayout}>  
      <PricesAndSizesUpdateForm product={product}/>
    </div>
    <Divider orientation="vertical" flexItem />
    <div className={classesNewCard.verticalLayout}>    
      <div className={classesNewCard.horizontalLayout} style={switchAndCategoryModStyle}>
        <AvailabilityUpdateSwitch product={product}/>
      </div>
      <div className={classesNewCard.horizontalLayout} style={switchAndCategoryModStyle}>
        <ParentCategoryUpdateForm product={product}/>
      </div>
    </div>

    </div>
    </>


  // New Expansion button:
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


// {product.id}
// {product.category_id}
// {product.available} JOS ADMIN
// {product.added} JOS ADMIN
  return (
    <>
    <br /><br />

    <Card className={classesNewCard.root}>
  
      <div className={classesNewCard.horizontalLayout}>

      <CardMedia
        className={classesNewCard.cover}
        image="/reptile.jpg"
        title="Live from space album cover"
      />
       <div className={classesNewCard.verticalLayout}>

        <CardContent className={classesNewCard.content}>

        <div className={classesNewCard.nameLine}>
          <Typography variant="h6" component="h2">
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

      <Typography variant="body2" component="p" style={TypographyStylePrice}>{(priceAndSize.price / 100) * quantity} €</Typography>

        </CardContent>
        </div>
      </div>

      <Collapse in={expanded} timeout="auto" unmountOnExit> 
      <Divider />
        <CardContent>
          {modificationControls()}
        </CardContent>
      </Collapse>

    </Card>


    </>
  )
}

export default ProductCard