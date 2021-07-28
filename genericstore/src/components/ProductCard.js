// Foundations for this component from: https://material-ui.com/components/cards/
// Foundations for size selection from: https://material-ui.com/components/selects/

import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// For size selection button:
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// For new card exclusive:
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';




const useStyles = makeStyles({
  root: {
  },
  media: {
    height: 130,
    width: 150
  }
});

const MediaStyle = {  // MODDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
    float: 'left',
    marginRight: '10px'
}

const CardContentStyle = {  // MODDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
    padding: '10px'
}

const TypographyStyle = {  // MODDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
    
}

const buttonStyle = {  // MODDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
    float: 'right'
}


// For size selection button:
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
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
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
  playIcon: {
    height: 38,
    width: 38,
  },
}));


const ProductCard = ({ product }) => {
  const classes = useStyles();


  // For size selection button:
  const classesSizeSelect = useStylesSizeSelect();
  const [size, setSize] = React.useState('');

  const handleChange = (event) => {
    setSize(event.target.value);
  };


  // For new card:
  const classesNewCard = useStylesNewCard();
  const themeNewCard = useTheme();


// {product.id}
// {product.category_id}
// {product.pricesAndSizes}
// {product.available} JOS ADMIN
// {product.added} JOS ADMIN
  return (
    <>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media} style={MediaStyle}
          image="/reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent style={CardContentStyle}>
          <Typography gutterBottom variant="h6" component="h2" style={TypographyStyle}>
            {product.name}

            <Button size="small" color="primary" style={buttonStyle}>
              Share
            </Button>
            <Button size="small" color="primary" style={buttonStyle}>
              Learn More
            </Button>
         </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description} Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller 
            Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller 
            
      <br />
      <FormControl variant="outlined" className={classesSizeSelect.formControl}>
        <InputLabel id="size-select">Koko</InputLabel>
        <Select
          labelId="size-select-label-id"
          id="size-select-id"
          value={size}
          onChange={handleChange}
          label="Koko"
        >
          {product.pricesandsizes.map(priceAndSize => <MenuItem value={10}>{priceAndSize.size}, {priceAndSize.price}</MenuItem> )}
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>


          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    <br /><br />


    <Card className={classesNewCard.root}>
    <CardMedia
        className={classesNewCard.cover}
        image="/reptile.jpg"
        title="Live from space album cover"
      />
      <div className={classesNewCard.details}>
        <CardContent className={classesNewCard.content}>
          <Typography component="h5" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller 
            Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller 
            Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller Mac Miller 
          </Typography>
        </CardContent>
        <div className={classesNewCard.controls}>
          <IconButton aria-label="previous">
            {themeNewCard.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon className={classesNewCard.playIcon} />
          </IconButton>
          <IconButton aria-label="next">
            {themeNewCard.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </div>
      </div>
    </Card>


    </>
  )
}

export default ProductCard