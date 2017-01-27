import React from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router';


const Task = React.createClass({
    propTypes: {
        taskId: React.PropTypes.number.isRequired,
    },

    render: function() {
        const task = this.props.task;
        return (
          <Link to={`tasks/details/${this.props.taskId}`}>
            <div className="task-element">
              <span className="name">{task.name}</span> -
              <span className="status">{task.status}</span>
            </div>
          </Link>
        );
    },
});

const mapStateToProps = function(store, ownProps) {
    return {
        task: store.tasks[ownProps.taskId],
    };
};

export default connect(mapStateToProps)(Task);
