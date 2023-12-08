import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import moment from 'moment-timezone';

const ShowUpdateDialog = (props) => {
  const [formData, setFormData] = React.useState({
    orderPO: props.order.orderPO,
    factory: props.order.factory,
    customer: props.order.customer,
    owner: props.order.owner,
    completionDate: moment(props.order.completionDate),
    readyDate: moment(props.order.readyDate)
  });
  console.log('-------showUpdateDialog---------', props.order.completionDate);
  const { orderPO, factory, customer, owner, completionDate, readyDate } = formData;
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleChange_C = (newValue) => setFormData({ ...formData, completionDate: newValue });
  const handleChange_R = (newValue) => setFormData({ ...formData, readyDate: newValue });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.updateOrder(props.id, formData);
    await props.addOrderHistory(props.id, formData);
    props.handleClose();
  };

  React.useEffect(() => {
    setFormData({
      orderPO: props.order.orderPO,
      factory: props.order.factory,
      customer: props.order.customer,
      owner: props.order.owner,
      completionDate: moment(props.order.completionDate),
      readyDate: moment(props.order.readyDate)
    });
  },[props.order]);

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Update Oder PO#</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Stack spacing={5}>
            <Grid item xs={12} md={12} lg={12}>
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
                  {props.factories.map((factory_it) => {
                    return (
                      <MenuItem id={factory_it._id} value={factory_it.factory}>
                        {factory_it.factory}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
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
                  {props.customers.map((customer_it) => {
                    return (
                      <MenuItem id={customer_it._id} value={customer_it.customer}>
                        {customer_it.customer}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Owner</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="owner"
                  value={owner}
                  label="Select owner"
                  onChange={handleChange}
                >
                  {props.owners.map((owner_it) => {
                    return (
                      <MenuItem id={owner_it._id} value={owner_it.owner}>
                        {owner_it.owner}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid container item xs={12} md={12} lg={12} alignItems="center" justifyContent="space-between">
              <Grid item xs={12} md={12} lg={4}>
                <div>Ready Date</div>
              </Grid>
              <Grid item xs={12} md={12} lg={8}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField label="ready date" value={completionDate} onChange={handleChange_C} />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid container item xs={12} md={12} lg={12} alignItems="center" justifyContent="space-between">
              <Grid item xs={12} md={12} lg={4}>
                <div>Ready Date</div>
              </Grid>
              <Grid item xs={12} md={12} lg={8}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField label="ready date" value={readyDate} onChange={handleChange_R} />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid container item xs={12} md={12} lg={12} justifyContent="flex-end">
              <Button variant="contained" color="primary" startIcon={<ShoppingBasketIcon />} onClick={handleSubmit}>
                Update
              </Button>
              <Button onClick={props.handleClose} sx={{ ml: 2 }}>
                Cancel
              </Button>
            </Grid>
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={props.handleOk} autoFocus>
          OK
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};
// ShowUpdateDialog.propTypes = {
//   updateOrder: PropTypes.func.isRequired
// };
export default ShowUpdateDialog;
