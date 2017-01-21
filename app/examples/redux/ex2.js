/**
 * This is a simple redux example, no react is needed
 *
 * This is an example of combining various states in a single store, this is
 * acomplished by combining reducers in a single reducer. Remenber that Actions
 * pass throgh every single reducing. Giving the chance to the reducers to
 * react and change their part of the state accordingly.
 */

import {createStore, combineReducers} from 'redux';


const userReducer = function(state={}, action) {
    switch (action.type) {
        case 'CHANGE_NAME':
            return Object.assign({}, state, {name: action.payload});
        case 'CHANGE_AGE':
            return Object.assign({}, state, {age: action.payload});
        default:
            return state;
    }
};

const postsReducer = function(state=[], action) {
    switch (action.type) {
        case 'ADD_POSTS':
            return state.concat(action.payload);
        default:
            return state;
    }
};

/**
 * this function combines the reducers, and delegates parts of the state to
 * their reducers. It's possible to make more complex combinations though
 */
const reducers = combineReducers({
    user: userReducer,
    posts: postsReducer,
});

const run = function() {

    const store = createStore(reducers);

    console.log('\n');

    store.subscribe(function() {
        console.log('store changed', store.getState());
    });

    store.dispatch({type: 'FOO'}); // should not alter the state
    store.dispatch({type: 'CHANGE_NAME', payload: 'John Doe'});
    store.dispatch({type: 'CHANGE_AGE', payload: '20'});
    store.dispatch({type: 'ADD_POSTS', payload: ['this is a post', 'another post']});
    store.dispatch({type: 'CHANGE_NAME', payload: 'Jane Doe'});

    console.log('\n');
};

export default run;
