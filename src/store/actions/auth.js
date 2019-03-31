import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: idToken,
        userId: localId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authObj = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url;
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBrAc0h2DSMDDPUj6UFQb-KzzOzl-Etbb8';

        if (isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBrAc0h2DSMDDPUj6UFQb-KzzOzl-Etbb8';
        }

        axios.post(url, authObj)
            .then(response => {
                console.log(response);
                dispatch(checkAuthTimeout(response.data.expiresIn));
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {
                console.log(err.response.data.error);
                dispatch(authFail(err.response.data.error.message));
            });
    }
}