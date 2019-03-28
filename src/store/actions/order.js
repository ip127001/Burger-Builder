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

export const burgerPurchaseStart = (orderData) => {
    return dispatch => {
        axios.post( '/orders.json', orderData )
            .then(response => {
                console.log(response.data);
                burgerPurchaseSuccess(response.data, orderData)
            })
            .catch(error => {
                burgerPurchaseFailed(error);
            });
    }
}