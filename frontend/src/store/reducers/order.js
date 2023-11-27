import { GET_ORDERS, ORDER_ERROR, UPDATE_ORDER, DELETE_ORDER, ADD_ORDER, GET_ORDER } from '../../actions/types';

const initialState = {
  orders: [''],
  order: null,
  loading: true,
  error: {}
};

function orderReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: payload,
        loading: false
      };
    case GET_ORDER:
      return {
        ...state,
        order: payload,
        loading: false
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: [payload, ...state.orders],
        loading: false
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order._id !== payload),
        loading: false
      };
    case ORDER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_ORDER:
      return {
        ...state,
       orders: state.orders.map((order) => (order._id == payload._id ? payload : order)),
        // orders: payload,
        loading: false
      };
    default:
      return state;
  }
}

export default orderReducer;
