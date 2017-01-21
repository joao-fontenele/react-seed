/**
 * This is a simple redux example, no react is needed
 *
 * This example shows how to use redux middleware, and async actions
 */

import {createStore, applyMiddleware} from 'redux';
import loggerMiddleware from 'redux-logger'; // logs state changes
import promiseMiddleware from 'redux-promise-middleware'; // simplifies dispatching promise based actions
import thunkMiddleware from 'redux-thunk'; // allows async actions
import superagent from 'superagent'; // ajax lib

const initialState = {
    isFetching: false,
    tasks: [],
    error: null,
};

/**
 * the pending, rejected and fulfilled sufixes are appended automatically by
 * the promise middleware
 */
const reducer = function(state=initialState, action) {
    switch (action.type) {
        case 'FETCH_TASKS_PENDING':
            return Object.assign({}, state, {isFetching: true});
        case 'FETCH_TASKS_FULFILLED':
            return Object.assign(
                {},
                state,
                {isFetching: false, tasks: action.payload.body, error: null}
            );
        case 'FETCH_TASKS_REJECTED':
            return Object.assign(
                {},
                state,
                {isFetching: false, error: action.payload}
            );
        case 'INVALIDATE_TASKS':
            return Object.assign({}, state, {error: null, tasks: []});
        default:
            return state;
    }
};

/**
 * this is the middleware setup, i don't know yet is order matters
 */
const middleware = applyMiddleware(
    promiseMiddleware(),
    thunkMiddleware,
    loggerMiddleware()
);

const run = function() {
    const store = createStore(reducer, middleware);

    console.log('\n');

    store.subscribe(function() {
        console.log('store changed', store.getState());
    });

    /**
     * Using thunk middleware
     */
    store.dispatch((dispatch) => {
        dispatch({type: 'FETCH_TASKS_PENDING'});
        superagent.get('http://localhost:3000/tasks/')
            .then((res) => {
                dispatch({
                    type: 'FETCH_TASKS_FULFILLED',
                    payload: res,
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'FETCH_TASKS_REJECTED',
                    payload: err,
                });
            })
            // .finally(() => { // bluebird has a finally, but native promises don't
            .then(() => {
                // cleans the tasks array
                store.dispatch({
                    type: 'INVALIDATE_TASKS',
                });
            })
            .then(() => { // using then just to execute this sequentially
                /**
                * thanks to the promise middleware, this is simplified, to firing a simple
                * action.
                * the pending, rejected and fulfilled sufixes are appended automatically by
                * the promise middleware
                */
                store.dispatch({
                    type: 'FETCH_TASKS',
                    payload: superagent.get('http://localhost:3000/tasks/'),
                });
            })
            .then(() => { // using then just to execute this sequentially
                store.dispatch({
                    type: 'FETCH_TASKS',
                    payload: superagent.get('http://localhost:3000/tasks/bad/url'),
                });
            });
    });

    console.log('\n');
};

export default run;
