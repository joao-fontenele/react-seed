import React from 'react';
import {connect} from 'react-redux';

import TaskList from './task-list.react.js';
import Actions from 'appRoot/default/store/actions/task-actions';
import {FETCH_TASKS} from 'appRoot/default/store/actions/action-types';


const ListList = React.createClass({
    componentWillMount: function() {
        Actions.trigger(FETCH_TASKS);
    },

    render: function() {
        const lists = this.props.lists.map((el) => {
            return (
                <TaskList list={el} key={el.id}/>
            );
        });

        return (
            <div className="list-list">
              {lists}
            </div>
        );
    },
});

const mapStateToProps = function(store) {
    return {
        lists: store.tasksState.lists,
        isRequesting: store.tasksState.isRequesting,
        error: store.tasksState.error,
    };
};

export default connect(mapStateToProps)(ListList);
