import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
// import CommentIcon from '@mui/icons-material/Comment';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import { Grid, Button,  TextField } from '@mui/material';
export default function CustomerTable() {
  const [checked, setChecked] = React.useState([0]);

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

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item xs={12} md={12} lg={12}>
        <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: '160px', overflow: 'auto'  }}>
          {[0, 1, 2, 3,4,5 ].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                  <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={12} md={8} lg={8}>
        <TextField id="standard-basic" label="Add Customer" variant="standard" sx={{ margin: '0 5vw 10px 50px' }} />
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Button variant="contained" color="success" startIcon={<PlaylistAddCircleIcon />}>
          Add New
        </Button>
      </Grid>
    </Grid>
  );
}
