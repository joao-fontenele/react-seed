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

const editTaskHandler = function(state, action) {
    const taskId = action.payload.data.id;

    const updatedTasks =  updateEntitiesObject(
        state,
        taskId,
        action.payload.promise.body
    );

    // return {tasks: updatedTasks};
    return updatedTasks;
};

const createTaskHandler = function(state, action) {
    const updatedTasks =  updateObject(
        state,
        action.payload.promise.body
    );

    return updatedTasks;
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

    const updatedTasks = updateObject(state, {}); // copy
    delete updatedTasks[id]; // do remove the task

    return updatedTasks;
};

const fetchTasksHandler = function(state, action) {
    return updateObject(
        state,
        action.payload.promise.entities.tasks
    );
};

const tasksReducer = createAsyncReducer(initialState, {
    SAVE_TASK: saveTaskHandler,
    REMOVE_TASK: removeTaskHandler,
    FETCH_TASKS: fetchTasksHandler,
});

export default tasksReducer;
