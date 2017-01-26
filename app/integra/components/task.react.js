import React from 'react';

import {Link} from 'react-router';


const Task = React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
    },

    render: function() {
        return (
          <Link to={`tasks/details/${this.props.id}`}>
            <div className="task-element">
              <span className="name">{this.props.name}</span> -
              <span className="status">{this.props.status}</span>
            </div>
          </Link>
        );
    },
});

export default Task;
