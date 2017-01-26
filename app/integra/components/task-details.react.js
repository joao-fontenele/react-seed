import React from 'react';
import {connect} from 'react-redux';

import Actions from 'appRoot/default/store/actions/task-actions';
import {FETCH_TASKS} from 'appRoot/default/store/actions/action-types';

const TaskDetails = React.createClass({
    render: function() {
        const task = this.props.task;
        console.log('details props', this.props);
        return (
            <div className="task-details">
              <div className="name">{task.name}</div>
              <div className="dueDate">{task.dueDate}</div>
              <div className="status">{task.status}</div>
              <div className="assignee">{task.assignee}</div>
            </div>
        );
    },
});

function getTaskById (lists, id) {
    if (!lists.length) {
        Actions.trigger(FETCH_TASKS);
    }
    for (let i = 0, listLength = lists.length; i < listLength; i+=1) {
        const tasks = lists[i].tasks;
        for (let j = 0, taskLength = tasks.length; j < taskLength; j+=1) {
            if (tasks[j].id == id) {
                return tasks[j];
            }
        }
    }
}

const mapStateToProps = function(store, ownProps) {
    return {
        task: getTaskById(store.tasksState.lists, ownProps.params.id),
    };
};

export default connect(mapStateToProps)(TaskDetails);
