import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
} from '@mui/material';
import { connect } from 'react-redux';
import { logout } from 'actions/auth';
// assets
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const Profile = ({auth: { isAuthenticated }, logout }) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const iconBackColorOpen = 'grey.300';
  if(!isAuthenticated){
    return <Navigate to="/login" />;
  }
  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' },
          width: '100px',
          minHeight: '30px'
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={logout}
      >
        <LogoutOutlined/>
        &nbsp;&nbsp;&nbsp;&nbsp;LOGOUT
      </ButtonBase>
    </Box>
  );
};
Profile.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout })(Profile);
