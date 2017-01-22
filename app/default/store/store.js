import {applyMiddleware, createStore, combineReducers} from 'redux';
import loggerMiddleware from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

import taskReducer from 'appRoot/default/store/reducers/task-reducer';

const middleware = applyMiddleware(
    promiseMiddleware(),
    thunkMiddleware,
    loggerMiddleware()
);

const reducers = combineReducers({
    tasksState: taskReducer,
});

const store = createStore(reducers, middleware);

export default store;
