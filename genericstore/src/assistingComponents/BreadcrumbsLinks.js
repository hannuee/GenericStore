import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

import { getIdsAndNamesOnPathToId } from '../utils/CategoryTreeProcessors'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const BreadcrumbsLinks = ({categoryId}) => {

  const categories = useSelector(state => state.categories) 
  
  const classes = useStyles();

  return (
      <div className={classes.root}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              {getIdsAndNamesOnPathToId(categories, categoryId).map(idAndName =>
                  <Link to={`/kategoriat/${idAndName.id}`} key={idAndName.id}>
                      {idAndName.name}
                  </Link>
              )}
          </Breadcrumbs>
      </div>
  );
}

export default BreadcrumbsLinks
