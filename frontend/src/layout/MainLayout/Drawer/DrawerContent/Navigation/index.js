// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useSelector } from 'react-redux';
// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const role_state = useSelector((state) => state.auth.user);
  const navGroups = menuItem.items.map((item) => {
    switch (item.type) {
      case 'admin':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">

          </Typography>
        );
    }
  });
  const navGroups1 = menuItem.items.map((item) => {
    switch (item.type) {
      case 'customer':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{role_state.role == 'admin' ? navGroups : navGroups1}</Box>;
};

export default Navigation;
