import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux' 
import { initializeCustomers, getDetailsForCustomer } from '../reducers/customerReducer'

// Material UI:
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


// For the accordion:
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
}));

// For table:
const useStylesTable = makeStyles({
  table: {
    minWidth: 650,
  }, 
});  


const CustomersPage = (props) => {


  const dispatch = useDispatch()
  const admin = useSelector(state => state.customers.loggedIn)

  useEffect(() => {
    if(admin !== null) {  // This check is due to the problem of delayed initialization when non-root ULR is reloaded.
      dispatch(initializeCustomers(admin.token))
    }
  }, [dispatch, admin])

  // For the accordion:
  const classes = useStyles();
  
  let customers = useSelector(state => state.customers.adminsCustomers)
  if(customers == null) customers = []  // because of the initialization delay.

  

  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = (id) => (event, isExpanded) => {
    if(expanded === id) { // expansion close
      setExpanded(false)
      return
    }

    const customerClicked = customers.find(customer => customer.id == id)
    if(customerClicked.address === undefined) dispatch(getDetailsForCustomer(id, admin.token))  // fetch details if needed.
    setExpanded(id)
  }



  const customerDetailsDisplay = (customer) => {
    if(customer.address !== undefined){
      return (
        <Typography variant="caption">
        Asiakas ID: {customer.id} <br />
        Nimi: {customer.name} <br />
        Osoite: {customer.address} <br />
        Puhelin: {customer.mobile} <br />
        Email: {customer.email} <br />
        </Typography>
      )
    }
      }



    return (               // TÄN VOIS EHKÄ REFAKATA VASTAAVAN KANSSA ADMIN ORDERS:ssa!!!!!!!!!!!!!!!!!!!!
      
<div className={classes.root}> 
        {customers.map(customer => 
          
<Accordion key={customer.id} expanded={expanded === customer.id} onChange={handleExpansion(customer.id)}>
<AccordionSummary
  expandIcon={<ExpandMoreIcon />}
  aria-controls="panel1c-content"
  id="panel1c-header"
>
  <div className={classes.column}>
    <Typography className={classes.heading}>Asiakas: {customer.name}</Typography>
  </div>
</AccordionSummary>
<AccordionDetails className={classes.details}>
  {customerDetailsDisplay(customer)}
</AccordionDetails>
<Divider />
  <AccordionActions>  
    <Button size="small">Cancel</Button>
    <Button size="small" color="primary">Save</Button>
  </AccordionActions>
</Accordion>

        )}
      </div>

    )
  }
  
  export default CustomersPage