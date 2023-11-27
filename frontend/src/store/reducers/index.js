// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import alert from './alert';
import auth from './auth';
import order from './order';
import ordershistory from './order_history'

// ==============================|| COMBINE REDUCERS ||============================== //

export default combineReducers({ 
    menu,
    alert,
    auth,
    order,
    ordershistory
});

