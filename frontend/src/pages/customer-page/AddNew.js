import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addOrder } from 'actions/order';
import { getFactories } from 'actions/factory';
import { getCustomers } from 'actions/customer';
import { getOwners } from 'actions/owner';
import { Grid, Button,  } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ShowAddDialog from './ShowAddDialog';
import { useSelector } from 'react-redux';

const addletter = 'Do you really add this items?';
const AddNew = ({ addOrder, getFactories, getCustomers, getOwners }) => {
  const customers_state = useSelector(state => state.customer.customers); // eslint-disable-line
  const factories_state = useSelector(state => state.factory.factories); // eslint-disable-line
  const owners_state = useSelector(state => state.owner.owners); // es
  const [customers, setCustomers] = React.useState(['']); // eslint-disable-line
  const [factories, setFactories] = React.useState(['']); // eslint-disable-line
  const [owners, setOwners] = React.useState(['']); // esl
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    orderPO: '',
    factory: '',
    customer: '',
    completionDate: '',
    readyDate: ''
  });
  const { orderPO, factory, customer, completionDate, readyDate } = formData;
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleChange_C = (newValue) => setFormData({ ...formData, completionDate: newValue });
  const handleChange_R = (newValue) => setFormData({ ...formData, readyDate: newValue });
  const handleOk = (e) => {
    e.preventDefault();
    addOrder(formData);
    handleClose();
  }
  React.useEffect (()=> {
    getCustomers();
  }, [getCustomers])
  React.useEffect (()=> {
    setCustomers(customers_state);
  }, [customers_state])
  React.useEffect (()=> {
    getFactories();
  }, [getFactories])
  React.useEffect (()=> { 
    setFactories(factories_state);
  }, [factories_state])
  React.useEffect (()=> {
    getOwners(); 
  }, [getOwners])
  React.useEffect (()=> {
    setOwners(owners_state);
  }, [owners_state])
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} marginTop="5px">
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between" rowSpacing={4.5}>
          <Grid item xs={12} md={2} lg={2}>
            <Button variant="contained" color="success" startIcon={<ShoppingBasketIcon />} onClick={handleClickOpen}>
              Add New
            </Button>
            <ShowAddDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} content={addletter} handleOk={handleOk} />
          </Grid>
          <Grid item xs={12} md={10} lg={10}>
            <Paper component="form" sx={{ p: '1px 2px', display: 'flex', alignItems: 'center', width: '30vw' }}>
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Orders" inputProps={{ 'aria-label': 'search Orders' }} />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={12} md={1} lg={1}>
            <TextField id="outlined-search" label="Enter orderPO" type="search" name="orderPO" value={orderPO} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} md={2} lg={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Factory</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="factory"
                value={factory}
                label="Select Factory"
                onChange={handleChange}
              >
                {factories.map((factory_it) => {
                  return(
                    <MenuItem id={factory_it._id} value={factory_it.factory}>{factory_it.factory}</MenuItem>
                  )
                })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2} lg={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Customer</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="customer"
                value={customer}
                label="Select Customer"
                onChange={handleChange}
              >
                {customers.map((customer_it) => {
                  return(
                    <MenuItem id={customer_it._id} value={customer_it.customer}>{customer_it.customer}</MenuItem>
                  )
                })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid container item xs={12} md={3} lg={3} alignItems="center" justifyContent="Left">
            <Grid item xs={12} md={5} lg={5}>
              <div>Order Operation Date</div>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker onChange={handleChange_C} value={completionDate}/>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={3} lg={3} alignItems="center" justifyContent="Left">
            <Grid item xs={12} md={3} lg={3}>
              <div>Ready Date</div>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker onChange={handleChange_R} value={readyDate}/>
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
AddNew.propTypes = {
  addOrder: PropTypes.func.isRequired,
  getFactories: PropTypes.func.isRequired,
  getCustomers: PropTypes.func.isRequired,
  getOwners: PropTypes.func.isRequired
}
export default connect(null, { addOrder, getFactories, getCustomers, getOwners })(AddNew);