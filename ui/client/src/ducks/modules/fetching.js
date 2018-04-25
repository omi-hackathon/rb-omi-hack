import Initialiser from 'initialiser';
import store from 'ducks/configureStore';
import { addItem, removeItem } from 'utils/immutable';

// ACTION TYPES
const START_FETCH_USER = 'START_FETCH_USER';
const STOP_FETCH_USER = 'STOP_FETCH_USER';
const USER_LOGIN = 'USER_LOGIN';

// SYNC ACTION CREATORS
export function startFetchUser() {
    return { type: START_FETCH_USER };
}
export function stopFetchUser() {
    return { type: STOP_FETCH_USER };
}

// ASYNC ACTION CREATORS

// SELECTORS
export function selectFetching() {
    return store.getState().fetching;
}

// REDUCER
export default function reducer(state = Initialiser.initialState.fetching, action) {
    switch (action.type) {
        case START_FETCH_USER:
            return addItem(state, 'user');
        case STOP_FETCH_USER:
        case USER_LOGIN:
            return removeItem(state, 'user');
        default:
            return state;
    }
}
