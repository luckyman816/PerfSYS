import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import PropTypes from 'prop-types';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

// import { connect } from 'react-redux';

const ShowUpdateDialog = (props) => {
  const [formData, setFormData] = React.useState({
    factory: '',
    customer: '',
    completionDate: '',
    readyDate: ''
  });
  const { factory, customer, completionDate, readyDate } = formData;
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleChange_C = (newValue) => setFormData({ ...formData, completionDate: newValue });
  const handleChange_R = (newValue) => setFormData({ ...formData, readyDate: newValue });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.updateOrder(props.id, formData);
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Update Oder PO#</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Stack spacing={3}>
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
                  <MenuItem value="China Factory">China Factory</MenuItem>
                  <MenuItem value="Africa Factory">Africa Factory</MenuItem>
                  <MenuItem value="America Factory">America Factory</MenuItem>
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
                  <MenuItem value="Martine">Martine</MenuItem>
                  <MenuItem value="YunPeiShaorun">YunPeiShaorun</MenuItem>
                  <MenuItem value="Masahiro"> Masahiro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container item xs={12} md={12} lg={12} alignItems="center" justifyContent="space-between">
              <Grid item xs={12} md={5} lg={5}>
                <div>Order Operation Date</div>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker onChange={handleChange_C} value={completionDate} />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid container item xs={12} md={12} lg={12} alignItems="center" justifyContent="space-between">
              <Grid item xs={12} md={3} lg={3}>
                <div>Ready Date</div>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker onChange={handleChange_R} value={readyDate} />
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
