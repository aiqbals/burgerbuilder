import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authStart = (state, action) => {
    return updateObject( state, { error: null, loading: true} )
};

const authSuccess = ( state, action ) => {
    return updateObject( state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false  
    });
};

const authFail = ( state, action ) => {
    return updateObject( state, { 
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null});
}; // made the user logged out cuz all the core info that made up logged in is now lost again through making null after the given expiration time

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path }); // there will be a path property in action when it is dispatched
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart( state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess( state, action );
        case actionTypes.AUTH_FAIL: return authFail( state, action );
        case actionTypes.AUTH_LOGOUT: return authLogout( state, action );
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath( state, action );
        default: return state;
    }
};

export default reducer;