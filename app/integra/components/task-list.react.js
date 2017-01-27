import React from 'react';

import Task from './task.react.js';


const TaskList = React.createClass({
    // propTypes: {
    //     list: React.PropTypes.shape({
    //         id: React.PropTypes.number,
    //         name: React.PropTypes.string,
    //         projectId: React.PropTypes.number,
    //     }).isRequired,
    //     tasks: React.PropTypes.arrayOf(
    //         React.PropTypes.shape({
    //             id: React.PropTypes.number,
    //             name: React.PropTypes.string,
    //             status: React.PropTypes.string,
    //         })
    //     ).isRequired,
    // },
    //
    // getDefaultProps: function() {
    //     return {};
    // },

    renderTasks: function() {
        const tasks = this.props.list.tasks.map((id) => {
            return (
                <li key={id}>
                  <Task taskId={id} />
                </li>
            );
        });
        return tasks;
    },

    render: function() {
        const list = this.props.list;
        return (
          <div className="task-list">
            <div className="name">
              {list.name}
              <ul className="tasks">
                {this.renderTasks()}
              </ul>
            </div>
          </div>
        );
    },
});

export default TaskList;
