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
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const ShowCompletionDialog = (props) => {
  const [formData, setFormData] = React.useState({
    qScore: '',
    cScore: '',
    pScore: ''
  });
  const { qScore, cScore, pScore } = formData;
  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.updateScore(props.id, props.userId, formData);
    
    props.handleClose();
  };
  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Complete Order</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Stack spacing={5}>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">QC Score</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="qScore"
                  value={qScore}
                  label="QC score"
                  onChange={handleChange}
                >
                  <MenuItem value={'1Q'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: 'red' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;1Q &#40; Not Ok - remake and delay more than 5 days &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'2Q'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: '#eb8934' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;2Q &#40; Not ok, need 3-5 days &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'3Q'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: '#ebdc34' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;3Q &#40; Acceptable but need 72h &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'4Q'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: '#cdeb34' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;4Q &#40; Small defects fixed within 24h &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'5Q'} style={{ borderTop: 'solid 1px', borderBottom: 'solid 1px', padding: 0 }}>
                    <div style={{ width: '300px', height: '30px', borderLeft: 'solid 5px', borderColor: '#83eb34' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;5Q &#40; All Perfect &#41;
                    </div>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Claims</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="cScore"
                  value={cScore}
                  label="Claim"
                  onChange={handleChange}
                >
                  <MenuItem value={'1C'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: 'red' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;1C &#40; more 10% &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'2C'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: '#eb8934' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;2C &#40; less 10% &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'3C'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: '#ebdc34' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;3C &#40; 5% &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'4C'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: '#cdeb34' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;4C &#40; 3% &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'5C'} style={{ borderTop: 'solid 1px', borderBottom: 'solid 1px', padding: 0 }}>
                    <div style={{ width: '300px', height: '30px', borderLeft: 'solid 5px', borderColor: '#83eb34' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;5C &#40; 0% &#41;
                    </div>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Process Score</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="pScore"
                  value={pScore}
                  label="Process Score"
                  onChange={handleChange}
                >
                  <MenuItem value={'1P'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: 'red' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;1P &#40; Not following instructions or deadlines &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'2P'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: '#eb8934' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;2P &#40; Only with 100% presence deadlines and instructions can be met &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'3P'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: '#ebdc34' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;3P &#40; Need observation but can follow most deadlines and instructions &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'4P'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: '#cdeb34' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;4P &#40; Need help but follow most instructions and deadlines&#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'5P'} style={{ borderTop: 'solid 1px', borderBottom: 'solid 1px', padding: 0 }}>
                    <div style={{ width: '300px', height: '30px', borderLeft: 'solid 5px', borderColor: '#83eb34' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;5P &#40; Following 100% instructions and deadlinesStatistics &#41;
                    </div>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container item xs={12} md={12} lg={12} justifyContent="flex-end">
              <Button variant="contained" color="primary" startIcon={<ShoppingBasketIcon />} onClick={handleSubmit}>
                Complete
              </Button>
              <Button onClick={props.handleClose} sx={{ ml: 2 }}>
                Cancel
              </Button>
            </Grid>
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};
// ShowUpdateDialog.propTypes = {
//   updateOrder: PropTypes.func.isRequired
// };
export default ShowCompletionDialog;
