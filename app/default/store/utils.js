import {_PENDING, _FULFILLED, _REJECTED}
    from 'appRoot/default/store/actions/action-types';


/**
 * imutability helpers
 */
export const updateObject = function(oldObject, newValues) {
    return Object.assign({}, oldObject, newValues);
};

export const updateItemInArray = function(array, itemId, updateItemCallback) {
    const updatedItems = array.map(item => {
        if(item.id !== itemId) {
            // Since we only want to update one item, preserve all others as they are now
            return item;
        }

        // Use the provided callback to create an updated item
        const updatedItem = updateItemCallback(item);
        return updatedItem;
    });

    return updatedItems;
};


/**
 * async reducer boilerplate code
 */
const pendingHandler = function(state) {
    return updateObject(state, {isRequesting: true});
};

const rejectedHandler = function(state, action) {
    return updateObject(state, {error: action.payload});
};

export const createAsyncReducer = function(initialState, handlers) {

    const asyncHandlers = {};
    Object.keys(handlers).forEach((el) => {
        asyncHandlers[el + _PENDING] = pendingHandler;
        asyncHandlers[el + _FULFILLED] = handlers[el];
        asyncHandlers[el + _REJECTED] = rejectedHandler;
    });

    return function reducer (state=initialState, action) {
        if (asyncHandlers.hasOwnProperty(action.type)) {
            return asyncHandlers[action.type](state, action);
        } else {
            return state;
        }
    };
};

/**
 * given a basic action, an http request and the store to dispatch the async
 * actions, trigger the async actions (pending, fulfilled, and rejected)
 */
export const makeAsyncAction = function(store, actionType, promise, data=null) {
    store.dispatch({
        type: actionType + _PENDING,
    });

    promise
        .then((response) => {
            store.dispatch({
                type: actionType + _FULFILLED,
                payload: {
                    promise: response,
                    data: data,
                },
            });
        })
        .catch((err) => {
            store.dispatch({
                type: actionType + _REJECTED,
                payload: {
                    promise: err,
                    data: data,
                },
            });
        });
};
