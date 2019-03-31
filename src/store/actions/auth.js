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

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
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
                let date = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', date);
                localStorage.setItem('userId', response.data.localId);
                dispatch(checkAuthTimeout(response.data.expiresIn));
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {
                console.log(err.response.data.error);
                dispatch(authFail(err.response.data.error.message));
            });
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTO_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        console.log('[authCheckState]')
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                console.log('expirationData', expirationDate);
                dispatch(authLogout());
            } else {
                const userId = localStorage.getItem('userId');
                const expirationTime = (expirationDate.getTime() - new Date().getTime()) / 1000;
                console.log('expirationTime', expirationTime);
                dispatch(checkAuthTimeout(expirationTime));
                dispatch(authSuccess(userId));
            }
        }
    }
}