import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

import { getIdsAndNamesOnPathToId } from '../utils/CategoryTreeProcessors'

const useStyles = makeStyles((theme) => ({
  crumbs: {
    marginRight: theme.spacing(3),
  },
  links: {
    textDecoration: 'none',
    color: '#6f6f6f'
  },
}));

const BreadcrumbsLinks = ({categoryId}) => {

  const categories = useSelector(state => state.categories) 
  
  const classes = useStyles();

  return (
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className={classes.crumbs}>
              {getIdsAndNamesOnPathToId(categories, categoryId).map(idAndName =>
                  <Link to={`/kategoriat/${idAndName.id}`} key={idAndName.id} className={classes.links}>
                      {idAndName.name}
                  </Link>
              )}
          </Breadcrumbs>
  );
}

export default BreadcrumbsLinks
