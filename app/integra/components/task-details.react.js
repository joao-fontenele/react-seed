import React from 'react';
import {connect} from 'react-redux';

import Actions from 'appRoot/default/store/actions/task-actions';
import {FETCH_TASKS} from 'appRoot/default/store/actions/action-types';

const TaskDetails = React.createClass({
    render: function() {
        const task = this.props.task;
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

const mapStateToProps = function(store, ownProps) {
    return {
        task: store.tasks[ownProps.params.id],
    };
};

export default connect(mapStateToProps)(TaskDetails);
