import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const burgerPurchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const burgerPurchaseFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const burgerPurchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const burgerPurchase = (orderData) => {
    return dispatch => {
        dispatch(burgerPurchaseStart());
        axios.post( '/orders.json', orderData )
            .then(response => {
                console.log(response);
                dispatch(burgerPurchaseSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(burgerPurchaseFailed(error));
            });
    }
}   

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFailed(err));
            });
    }
}