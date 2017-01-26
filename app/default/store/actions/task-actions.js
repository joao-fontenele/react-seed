import Request from 'superagent';

import store from 'appRoot/default/store/store';
import {SAVE_TASK, REMOVE_TASK, FETCH_TASKS}
    from 'appRoot/default/store/actions/action-types';
import {makeAsyncAction} from 'appRoot/default/store/utils';


// TODO: get from configuration
const baseEndpoint = 'http://localhost:3000';
const projectId = 1;
const fetchEndpoint =  `http://localhost:3000/projects/${projectId}/lists?_embed=tasks`;

const Actions = {
    trigger: function(actionType, task) {
        let requisition = null;
        const tasksEndpoint = `${baseEndpoint}/tasks`;

        switch (actionType) {
            case SAVE_TASK:
                if (task.id || task.id === 0) {
                    requisition = Request.put(`${tasksEndpoint}/${task.id}`).send(task);
                } else {
                    requisition = Request.post(tasksEndpoint).send(task);
                }
                break;
            case REMOVE_TASK:
                requisition = Request.del(`${tasksEndpoint}/${task.id}`);
                break;
            case FETCH_TASKS:
                requisition = Request.get(fetchEndpoint);
                break;
            default:
                throw new Error(`invalid actionType: ${actionType}`);
        }

        makeAsyncAction(store, actionType, requisition, task);
    },
};

export default Actions;
