import React from 'react';
import {connect} from 'react-redux';

import TaskForm from './task-form.react';
import Actions from 'appRoot/default/store/actions/task-actions';
import Store from 'appRoot/default/store/store';
import {FETCH_TASKS} from 'appRoot/default/store/actions/action-types';


const TaskContainer = React.createClass({
    componentWillMount: function() {
        Actions.trigger(FETCH_TASKS);
    },

    renderTaskList: function() {
        return this.props.tasks.map(function(task, index) {
            return (
                <TaskForm
                  {...task}
                  key={task.id}
                  index={index}
                />
            );
        });
    },

    render: function() {
        return (
            <div className="home-wrapper row">
              <h1 className="home-title col-sm-12">
                Integra Home
              </h1>
              <div className="task-list col-sm-12">
                {this.renderTaskList()}
              </div>

              <h3 className="col-sm-12">Adicione uma task</h3>
              <TaskForm />
            </div>
        );
    },
});

const mapStateToProps = function(store) {
    return {
        tasks: store.tasksState.tasks,
        isRequesting: store.tasksState.isRequesting,
        error: store.tasksState.error,
    };
};

export default connect(mapStateToProps)(TaskContainer);
