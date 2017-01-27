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
        const lists = Object.keys(this.props.lists).map((key) => {
            const el = this.props.lists[key];
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
        lists: store.lists,
    };
};

export default connect(mapStateToProps)(ListList);
