import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import Initialiser from 'initialiser';
import { default as fetching } from 'ducks/modules/fetching';
import { default as user } from 'ducks/modules/user';
import { default as recordingsStats } from 'ducks/modules/recordings-stats';
import { default as recordings } from 'ducks/modules/recordings';
import { default as recording } from 'ducks/modules/recording';
import { default as hover } from 'ducks/modules/hover';
import { default as toaster } from 'ducks/modules/toaster';

const loggerMiddleware = createLogger();

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(Initialiser.history);

const store = createStore(
    combineReducers({
        fetching,
        user,
        recordingsStats,
        recordings,
        recording,
        hover,
        toaster
    }),
    Initialiser.initialState,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        historyMiddleware
    )
);

export default store;