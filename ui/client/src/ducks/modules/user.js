import Initialiser from 'initialiser';
import { cloneDeep } from 'utils/immutable';
import api from 'utils/api';
import store from 'ducks/configureStore';
import { startFetchUser, stopFetchUser } from 'ducks/modules/fetching';

// ACTION TYPES
const USER_LOGIN = 'USER_LOGIN';
const USER_LOGOUT = 'USER_LOGOUT';

// SYNC ACTION CREATORS
export function login(user) {
    return { type: USER_LOGIN, user };
}
export function logout() {
    localStorage.clear();
    Initialiser.history.push('/login');
    return { type: USER_LOGOUT, user: { auth_token: null } };
}

// ASYNC ACTION CREATORS
export function authenticate(credentials) {
    return async dispatch => {
        try {
            dispatch(startFetchUser());
            const response = await api.authenticate(credentials);
            localStorage.setItem('auth_token', response.user.auth_token);
            if (response.user) {
                return dispatch(login(response.user));
            }
            throw new Error('Not authenticated');
        } catch (err) {
            localStorage.clear();
            Initialiser.history.push('/login');
            dispatch(stopFetchUser());
            return dispatch(logout());
        }
    };
}
export function fetchUser() {
    return async dispatch => {
        try {
            dispatch(startFetchUser());
            const response = await api.fetchUser();
            if (response && response.user) {
                return dispatch(login(response.user));
            }
            localStorage.clear();
            Initialiser.history.push('/login');
            return dispatch(logout());
        } catch (err) {
            console.error('Error fetching user:', err);
        }
    };
}

// SELECTORS
export function selectUser() {
    return store.getState().user;
}

// REDUCER
export default function reducer(state = Initialiser.initialState.user, action) {
    const USER_LOGIN = 'USER_LOGIN';
    const USER_LOGOUT = 'USER_LOGOUT';
    switch (action.type) {
        case USER_LOGIN:
        case USER_LOGOUT:
            return cloneDeep(action.user);
        default:
            return state;
    }
}
