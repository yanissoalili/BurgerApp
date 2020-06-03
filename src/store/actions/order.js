import * as actionTypes from './actionTypes'
import axios from '../../Axios-Order'
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData

  }
}
export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}
export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseInit())
    dispatch(purchaseBurgerStart())
    axios.post('/orders.json?auth=' + token, orderData)
      .then(res => {
        dispatch(purchaseBurgerSuccess(res.data.name, orderData))
      })
      .catch(err => {
        dispatch(purchaseBurgerFail(err))
      })
  }
}
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}
export const fetchOrdersSuccess = (fetchedOrders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: fetchedOrders
  }
}
export const fetchOrderFailed = (err) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: err
  }
}
export const fetchOrderInit = () => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT
  }
}

export const fetchOrders = (token) => {
  return dispatch => {
    dispatch(fetchOrderInit())
    axios.get('/orders.json?auth=' + token)
      .then(res => {
        const fetchedOrders = []
        for (const key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          })
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch((err) => {
        dispatch(fetchOrderFailed(err))
      })
  }
}
