import {
    SAVE_TASK,
    REMOVE_TASK,
    FETCH_TASKS,
} from 'appRoot/default/store/actions/action-types';
import {updateObject, updateItemInArray, createAsyncReducer} from 'appRoot/default/store/utils/';


const initialState = {
    isRequesting: false,
    tasks: [],
    error: null,
};

const editTaskHandler = function(state, action) {
    const id = action.payload.data.id;
    const updatedTasks = updateItemInArray(state.tasks, id, (task) => {
        return updateObject(task, action.payload.promise.body);
    });

    return updateObject(
        state,
        {
            isRequesting: false,
            tasks: updatedTasks,
        }
    );
};

const createTaskHandler = function(state, action) {
    return updateObject(
        state,
        {
            isRequesting: false,
            tasks: state.tasks.concat(action.payload.promise.body),
        }
    );
};

const saveTaskHandler = function(state, action) {
    const id = action.payload.data.id;
    if (id || id === 0) {
        return editTaskHandler(state, action);
    }

    return createTaskHandler(state, action);
};

const removeTaskHandler = function(state, action) {
    const id = action.payload.data.id;

    return updateObject(
        state,
        {
            isRequesting: false,
            tasks: state.tasks.filter((el) => {
                return el.id !== id;
            }),
        }
    );
};

const fetchTasksHandler = function(state, action) {
    return updateObject(
        state,
        {isRequesting: false, tasks: action.payload.promise.body}
    );
};

// const taskReducerOld = function(state=initialState, action) {
//     switch (action.type) {
//         case SAVE_TASK + _PENDING:
//             return updateObject(state, {isRequesting: true});
//         case SAVE_TASK + _FULFILLED:
//             return updateObject(
//                 state,
//                 {
//                     isRequesting: false,
//                     tasks: state.tasks.concat(action.payload.body),
//                 }
//             );
//         case SAVE_TASK + _REJECTED:
//             return updateObject(
//                 state,
//                 {isRequesting: false, error: action.payload}
//             );
//         case REMOVE_TASK + _PENDING:
//             return updateObject(state, {isRequesting: true});
//         case REMOVE_TASK + _FULFILLED:
//             return updateObject(
//                 state,
//                 {
//                     isRequesting: false,
//                     tasks: state.tasks.filter((el) => {
//                         return el.id !== action.payload.body.id;
//                     }),
//                 }
//             );
//         case REMOVE_TASK + _REJECTED:
//             return updateObject(
//                 state,
//                 {isRequesting: false, error: action.payload}
//             );
//         case FETCH_TASKS + _PENDING:
//             return updateObject(state, {isRequesting: true});
//         case FETCH_TASKS + _FULFILLED:
//             return updateObject(
//                 state,
//                 {isRequesting: false, tasks: action.payload.body}
//             );
//         case FETCH_TASKS + _REJECTED:
//             return updateObject(
//                 state,
//                 {isRequesting: false, tasks: action.payload.body}
//             );
//         default:
//             return state;
//     }
// };

const taskReducer = createAsyncReducer(initialState, {
    SAVE_TASK: saveTaskHandler,
    REMOVE_TASK: removeTaskHandler,
    FETCH_TASKS: fetchTasksHandler,
});

export default taskReducer;
