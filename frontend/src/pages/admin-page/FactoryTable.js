import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import { Grid, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { getFactories } from 'actions/factory';
import { addFactory } from 'actions/factory';
import { deleteFactory } from 'actions/factory';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
const FactoryTable = ({getFactories, addFactory, deleteFactory}) => {
  const factories_state = useSelector(state => state.factory.factories);
  const [factories, setFactories] = React.useState(['']);
  const [checked, setChecked] = React.useState([0]);
  const [factoryData, setFactoryData] = React.useState({
    factory: '',
    location:'',
    employee: ''
  });
  const {factory, location, employee} = factoryData;
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const handleChange = (e) => setFactoryData({...factoryData, [e.target.name]: e.target.value });
  
  const handleClick = () => {
    console.log("111111111111111111",factoryData)
    addFactory(factoryData);
  }
  const handleDelete = (id) => {
    deleteFactory(id);
  }
  React.useEffect (()=> {
    getFactories();
  }, [getFactories])
  React.useEffect (()=> {
    setFactories(factories_state);
  }, [factories_state])
  
  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item xs={12} md={12} lg={12}>
        <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: '160px', overflow: 'auto' }}>
          {factories.map((factory_item) => {
            const labelId = `checkbox-list-label-${factory_item._id}`;
            return (
              <ListItem
                key={factory_item}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments" onClick = {(e) => handleDelete(factory_item._id)}>
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(factory_item)} dense>
                  <ListItemText id={labelId} primary={factory_item.factory} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={12} md={8} lg={8}>
        <TextField id="standard-basic" label="Add Factory" type="search"  variant="standard" sx={{ margin: '0 5vw 10px 50px' }} name = 'factory' value = {factory} onChange = {handleChange} />
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Button variant="contained" color="success" onClick={handleClick} startIcon={<PlaylistAddCircleIcon />}>
          Add New
        </Button>
      </Grid>
    </Grid>
  );
}
FactoryTable.propTypes = {
  getFactories: PropTypes.func.isRequired,
  addFactory: PropTypes.func.isRequired,
  deleteFactory: PropTypes.func.isRequired
}
export default connect(null, {getFactories, addFactory, deleteFactory})(FactoryTable);