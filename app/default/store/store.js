import {applyMiddleware, createStore, combineReducers} from 'redux';
import loggerMiddleware from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

import tasksReducer from 'appRoot/default/store/reducers/tasks-reducer';
import listsReducer from 'appRoot/default/store/reducers/lists-reducer';
import uiReducer from 'appRoot/default/store/reducers/ui-reducer';

const middleware = applyMiddleware(
    promiseMiddleware(),
    thunkMiddleware,
    loggerMiddleware()
);

const reducers = combineReducers({
    tasks: tasksReducer,
    lists: listsReducer,
    uiState: uiReducer,
});

const store = createStore(reducers, middleware);

export default store;
