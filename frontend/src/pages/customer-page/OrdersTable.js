import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// import { format } from 'date-fns';
import ShowAddDialog from './ShowAddDialog';
import ShowHistoryDialog from './ShowHistoryDialog';
import ShowUpdateDialog from './ShowUpdateDialog';
// material-ui
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip } from '@mui/material';
// third-party
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getOrders } from 'actions/order';
import { getOrdersHistory } from 'actions/order_history';
import { deleteOrder } from 'actions/order';
import { useSelector } from 'react-redux';
import { updateOrder } from 'actions/order';

// project import

const deleteletter = 'Do you really delete this item?';
// const updateletter = 'Do you really update this item?';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order_h, orderBy) {
  return order_h === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order_h = comparator(a[0], b[0]);
    if (order_h !== 0) {
      return order_h;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'orderPO',
    align: 'center',
    disablePadding: false,
    label: 'Order PO#'
  },
  {
    id: 'customer',
    align: 'center',
    disablePadding: true,
    label: 'Customer'
  },
  {
    id: 'factory',
    align: 'center',
    disablePadding: false,
    label: 'Factory'
  },
  {
    id: 'orderCompletionDate',
    align: 'center',
    disablePadding: false,
    label: 'Order completion date'
  },
  {
    id: 'readyDate',
    align: 'center',
    disablePadding: false,
    label: 'Ready Date'
  },
  {
    id: 'operation',
    align: 'center',
    disablePadding: false,
    label: 'Operation'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order_h, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order_h : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order_h: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE ||============================== //
const OrderTable = ({ getOrders, deleteOrder, getOrdersHistory, updateOrder }) => {
  const [open_d, setOpen_d] = React.useState(false);
  const [open_h, setOpen_h] = React.useState(false);
  const [open_u, setOpen_u] = React.useState(false);
  const [updateId, setUpdateId] = React.useState('');

  const [orderID, setOrderID] = React.useState();
  const [orderHistory, setOrderHistory] = React.useState();
  const [orders, setOrders] = React.useState([]);
  const handleClickOpen_d = (orderID) => {
    setOpen_d(true);
    setOrderID(orderID);
    // console.log('aaa________', orderID);
  };
  const handleClickOpen_h = (orderID) => {
    setOpen_h(true);
    // setOrderID(orderID);
    console.log('aaa________', orderID);
  };
  const handleClickOpen_u = (orderID) => {
    setUpdateId(orderID);
    setOpen_u(true);
    // setOrderID(orderID);
    console.log('aaa________', orderID);
  };

  const handleClose_d = () => {
    setOpen_d(false);
  };
  const handleClose_h = () => {
    setOpen_h(false);
  };
  const handleClose_u = () => {
    setOpen_u(false);
  };

  const userID = useSelector((state) => state.auth.user);
  const ordershistory = useSelector((state) => state.ordershistory.orders_history);
  const orders_state = useSelector((state) => state.order.orders);

  const onClickTableRow = async (id) => {
    console.log('------', id);
    await getOrdersHistory(id);
    // setOrderHistory(ordershistory);

    handleClickOpen_h(id);
  };

  useEffect(() => {
    if (ordershistory) {
      // console.log('xxxxxxxxxxxxxxx', orderHistory);
      setOrderHistory(ordershistory);
    }
  }, [ordershistory]);

  useEffect(() => {
    if (orders_state) {
      console.log('xxxxxxxxxxxxxxx', orders_state);
      setOrders(orders_state);
    }
  }, [orders_state, updateOrder]);

  useEffect(() => {
    if (userID && userID.user) {
      getOrders(userID.user._id);
    }
  }, [getOrders, userID, updateOrder]);
  // console.log('aaaaaaaaa', orders);
  const handleOk = () => {
    deleteOrder(orderID);
    handleClose_d();
  };
  /************Table part**************/
  const [order_h] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          height: '700px',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead order_h={order_h} orderBy={orderBy} />
          <TableBody>
            {Array.isArray(orders) &&
              orders.length > 0 &&
              stableSort(orders, getComparator(order_h, orderBy))?.map((order, key) => {
                const isItemSelected = isSelected(order.orderPO);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={key}
                    id={order._id}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" scope="row" align="center">
                      <Link color="secondary" component={RouterLink} to="">
                        {order.orderPO}
                      </Link>
                    </TableCell>
                    <TableCell align="center">{order.factory}</TableCell>
                    <TableCell align="center">{order.customer}</TableCell>
                    <TableCell align="center">{order.completionDate?.split('T')[0]}</TableCell>
                    <TableCell align="center">{order.readyDate?.split('T')[0]}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Order History">
                        <IconButton color="primary" onClick={() => onClickTableRow(order._id)}>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Update Order">
                        <IconButton color="primary" onClick={() => handleClickOpen_u(order._id)}>
                          <BorderColorIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Order">
                        <IconButton color="error" onClick={() => handleClickOpen_d(order._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <ShowAddDialog
        open={open_d}
        handleClickOpen={handleClickOpen_d}
        handleClose={handleClose_d}
        content={deleteletter}
        handleOk={handleOk}
      />
      <ShowHistoryDialog
        open={open_h}
        data={orderHistory}
        handleClickOpen={handleClickOpen_h}
        handleClose={handleClose_h}
        content={deleteletter}
      />
      <ShowUpdateDialog
        open={open_u}
        id={updateId}
        updateOrder={updateOrder}
        handleClickOpen={handleClickOpen_u}
        handleClose={handleClose_u}
        content={deleteletter}
      />
    </Box>
  );
};
OrderTable.propTypes = {
  getOrders: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  getOrdersHistory: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  order: state.order
});
export default connect(mapStateToProps, { getOrders, getOrdersHistory, deleteOrder, updateOrder })(OrderTable);
