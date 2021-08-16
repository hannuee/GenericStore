import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getIdsAndNamesOnPathToId } from '../utils/CategoryTreeProcessors'

// Material UI:
import { makeStyles } from '@material-ui/core/styles'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

const useStyles = makeStyles((theme) => ({
  crumbs: {
    marginRight: theme.spacing(3),
  },
  links: {
    textDecoration: 'none',
    color: '#6f6f6f'
  },
}))

const BreadcrumbsLinks = ({ categoryId }) => {
  const classes = useStyles()

  const categories = useSelector(state => state.categories)

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className={classes.crumbs}>
      {getIdsAndNamesOnPathToId(categories, categoryId).map(idAndName =>
        <Link to={`/kategoriat/${idAndName.id}`} key={idAndName.id} className={classes.links}>
          {idAndName.name}
        </Link>
      )}
    </Breadcrumbs>
  )
}

export default BreadcrumbsLinks
