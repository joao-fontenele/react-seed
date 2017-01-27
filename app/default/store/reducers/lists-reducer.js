import {
    SAVE_TASK,
    REMOVE_TASK,
    FETCH_TASKS,
} from 'appRoot/default/store/actions/action-types';
import {
    updateObject,
    createAsyncReducer,
    updateEntitiesObject,
} from 'appRoot/default/store/utils/';


const initialState = {};

// append taskId to the right list
const createTaskHandler = function(state, action) {
    const taskId = action.payload.data.id;
    const listId = action.payload.data.listId;

    const updatedTasks = state[listId].tasks.concat(taskId);

    const updatedLists = updateEntitiesObject(
        state,
        listId,
        {tasks: updatedTasks}
    );

    // return {lists: updatedLists};
    return updatedLists;
};

const saveTaskHandler = function(state, action) {
    const id = action.payload.data.id;
    if (id || id === 0) {
        // no need to update list in case the task itself is edited, unless
        // it's possible to move tasks between lists
        return state;
    }

    return createTaskHandler(state, action);
};

// remove taskId from the right list
const removeTaskHandler = function(state, action) {
    const taskId = action.payload.data.id;
    const listId = action.payload.data.listId;

    const updatedTasks = state[listId].tasks.filter((el) => {
        return el.id !== taskId;
    });

    const updatedLists = updateEntitiesObject(
        state,
        listId,
        {tasks: updatedTasks}
    );

    return updatedLists;
};

const fetchTasksHandler = function(state, action) {
    return updateObject(
        state,
        action.payload.promise.entities.lists
    );
};

const listsReducer = createAsyncReducer(initialState, {
    SAVE_TASK: saveTaskHandler,
    REMOVE_TASK: removeTaskHandler,
    FETCH_TASKS: fetchTasksHandler,
});

export default listsReducer;
