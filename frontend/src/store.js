import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';

const logger = createLogger({
    /* https://github.com/evgenyrodionov/redux-logger */
    collapsed: true,
    diff: true
});


const inititalState = {};

const store = createStore(
    rootReducer,
    inititalState,
    composeWithDevTools(
        /* logger must be the last middleware in chain to log actions */
        applyMiddleware(thunk, logger)
    ));

export default store;