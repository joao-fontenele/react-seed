import React from 'react';


const Task = React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
    },

    render: function() {
        return (
          <div className="task-element">
            <span className="name">{this.props.name}</span> -
            <span className="status">{this.props.status}</span>
          </div>
        );
    },
});

export default Task;
