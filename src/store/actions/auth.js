import axios from 'axios';

import * as actionTypes from './actionTypes';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};
export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000) // firebase set the time very short e.g., 3600ms, so we extended time multiplying 1000, now it should be 1hr
    };
}; // this ensure user is logged out when the given session is expired

export const auth = ( email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDiKKGFtNQ_1zxM9uwoA0az8eQwAjRwZ04';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDiKKGFtNQ_1zxM9uwoA0az8eQwAjRwZ04';
        }
        axios.post(url, authData)
            .then(response => {
                //console.log(response);
                const expirationTime = new Date( new Date().getTime() + response.data.expiresIn * 1000 ); // fn that gives current time of the date
                localStorage.setItem('token', response.data.idToken); // localStorage is a browser api is used to keep the previous status even after reloading/refreshing the page until token expiresIn.
                localStorage.setItem('expirationTime', expirationTime); 
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId)); //idToken, localId coming fomr firebase
                dispatch(checkAuthTimeOut(response.data.expiresIn)); //expiresIn coming fomr firebase
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error)); //data.error is from firebase
            })
    };
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path //// there will be a path property in action when it is dispatched
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationTime = new Date( localStorage.getItem('expirationTime')); // withouth Date, we only rcv string of time, but using Date, we convert into Date object
            if (expirationTime <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeOut( ( expirationTime.getTime() - new Date().getTime() ) /1000 ) );
            }
        }
    }
}