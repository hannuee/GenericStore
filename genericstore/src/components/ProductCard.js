import React from 'react';
import AddToShoppingCartForm from '../assistingComponents/AddToShoppingCartForm'
import ParentCategoryUpdateForm from '../assistingComponents/ParentCategoryUpdateForm'  
import AvailabilityUpdateSwitch from '../assistingComponents/AvailabilityUpdateSwitch' 
import PricesAndSizesUpdateForm from '../assistingComponents/PricesAndSizesUpdateForm'  

// Material UI:
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';

const switchAndCategoryModStyle = {  
  alignItems: 'center',
  marginLeft: '30px'
}

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
    transform: 'rotate(90deg)',
  },
}));


const ProductCard = ({ product }) => {

  const classesNewCard = useStylesNewCard();

  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => setExpanded(!expanded)

  const modificationControls = () =>
    <div className={classesNewCard.horizontalLayout}>
      <div className={classesNewCard.verticalLayout}>
        <PricesAndSizesUpdateForm product={product} />
      </div>
      <Divider orientation="vertical" flexItem />
      <div className={classesNewCard.verticalLayout}>
        <div className={classesNewCard.horizontalLayout} style={switchAndCategoryModStyle}>
          <AvailabilityUpdateSwitch product={product} />
        </div>
        <div className={classesNewCard.horizontalLayout} style={switchAndCategoryModStyle}>
          <ParentCategoryUpdateForm product={product} />
        </div>
      </div>
    </div>


// {product.id}
// {product.category_id}
// {product.available} JOS ADMIN
// {product.added} JOS ADMIN
  return (
    <>
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

              <AddToShoppingCartForm product={product} />

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