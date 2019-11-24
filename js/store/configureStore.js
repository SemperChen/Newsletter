import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga'

import AppReducer from '../reducers/index';

const middlewares = [];
// const {logger} = require('redux-logger');

// configuring saga middleware
const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);
/* global __DEV__  */
if (__DEV__) {
    // middlewares.push(logger);
}else {
    global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        debug: () => {},
        error: () => {},
        assert: () => {}
    };
}

export default function configureStore() {

    return {
        ...createStore(AppReducer, applyMiddleware(...middlewares)),
        runSaga: sagaMiddleware.run
    };
}
