import api from '../utils/api';
import { setAlert } from './alert';
import { GET_ORDERS, ORDER_ERROR, UPDATE_ORDER, DELETE_ORDER, ADD_ORDER, GET_ORDER } from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get posts
export const getOrders = (id) => async (dispatch) => {
  try {
    const res = await api.get(`order/${id}`);
    console.log('----------------response get', res.data);
    dispatch({
      type: GET_ORDERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const updateOrder = (id, formData) => async (dispatch) => {
  try {

    const res = await api.put(`/order/${id}`, formData);
    console.log('--------------------------response update', res.data);
    dispatch({
      type: UPDATE_ORDER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete post
export const deleteOrder = (id) => async (dispatch) => {
  try {
    await api.delete(`/order/${id}`);

    dispatch({
      type: DELETE_ORDER,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addOrder = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/order/create', formData);
    dispatch({
      type: ADD_ORDER,
      payload: res.data
    });

    dispatch(setAlert('Order Created', 'success'));
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post
export const getOrder = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/order/${id}`);

    dispatch({
      type: GET_ORDER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
