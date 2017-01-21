/**
 * This is a simple redux example, no react is needed
 *
 * The store should hold a simple counter. It's state is altered by dispatching
 * actions.
 *
 * Actions are plain objects that MUST have a `type` attribute, no other
 * restrictions are enforced, but it seems that if the action has actual data,
 * it's considered good practice that the data should be contained inside an
 * attribute called `payload`
 */

import {createStore} from 'redux';

/**
 * reducer is a normal function that takes state and an action to get possibly
 * a new state. It's usually recommended that reducers should be pure functions.
 *
 * It's important that there's a default, because when the store is initiated
 * this function is called with state argument undefined. Or pass an initial
 * state into the createStore function.
 */
const reducer = function(state=0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + action.payload;
        case 'DECREMENT':
            return state - action.payload;
        // if the action doesn't concern this reducer, just return the state as
        // is. Also treats the initial state case
        default:
            return state;
    }
};



const run = function() {
    /**
    * this is the store. Another argument could be passed to initialize the state,
    * but since the reducer has already a default, it's not needed here. To access
    * the state, one could call `store.getState()`
    */
    const store = createStore(reducer);

    console.log('\n');

    /**
    * using the store object, one could subscribe to changes in the state
    */
    store.subscribe(function() {
        console.log('store changed', store.getState());
    });

    /**
    * then we can fire actions to the store, and expect the state to change based
    * on the actions. Notice again, that actions are simple objects with the type
    * attribute.
    * Notice too that these actions will trigger the subscription above
    */
    store.dispatch({type: 'FOO'}); // should not alter the state
    store.dispatch({type: 'INCREMENT', payload: 1});
    store.dispatch({type: 'INCREMENT', payload: 2});
    store.dispatch({type: 'DECREMENT', payload: 3});

    console.log('\n');
};

export default run;
