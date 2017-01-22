import React from 'react';

import Actions from 'appRoot/default/store/actions/task-actions';
import {SAVE_TASK, REMOVE_TASK} from 'appRoot/default/store/actions/action-types';
import {updateObject} from 'appRoot/default/store/utils';


const idPropType = React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
]);

const TaskForm = React.createClass({
    propTypes: {
        id: idPropType,
        name: React.PropTypes.string,
        dueDate: React.PropTypes.string,
        projectId: idPropType,
        tags: React.PropTypes.array,
        index: React.PropTypes.number,
    },

    getDefaultProps: function() {
        return {
            id: '',
            name: '',
            dueDate: '',
            projectId: '',
            tags: [],
        };
    },

    getInitialState: function() {
        return this.getTaskFromProps();
    },

    getTaskFromProps: function(joinTags=true) {
        return {
            id: this.props.id,
            name: this.props.name,
            dueDate: this.props.dueDate,
            projectId: this.props.projectId,
            tags: joinTags ? this.props.tags.join(',') : this.props.tags,
        };
    },

    getTaskFromState: function() {
        return updateObject(
            this.state,
            {tags: this.state.tags.split(',')}
        );
    },

    resyncTask: function() {
        this.setState(this.getTaskFromProps());
    },

    onSaveTask: function(evt) {
        evt.preventDefault();
        Actions.trigger(SAVE_TASK, this.getTaskFromState());
        if (this.props.index === undefined) {
            this.resyncTask();
        }
    },

    onRemoveTask: function(evt) {
        evt.preventDefault();
        Actions.trigger(REMOVE_TASK, this.getTaskFromProps(false), this.props.index);
    },

    onChangeForm: function(evt) {
        const newState = {};
        newState[evt.target.id] = evt.target.value;
        this.setState(newState);
    },

    renderControlButtons: function() {
        return (
            <div className="btn-group col-sm-11 col-sm-offset-1">
              <button
                className="btn btn-primary save-button"
                onClick={this.onSaveTask}
              >
                Salvar
              </button>
              {this.props.index !== undefined &&
                <button
                  className="btn btn-danger remove-button"
                  onClick={this.onRemoveTask}
                >
                  Remover
                </button>
              }
            </div>
        );
    },

    renderInput: function(id, label, disabled=false) {
        return (
            <div className="form-group" key={id}>
              <label htmlFor={id} className="col-sm-1 control-label">
                {label}
              </label>
              <div className="col-sm-11">
                <input
                  ref={id}
                  id={id}
                  className="form-control"
                  onChange={this.onChangeForm}
                  value={this.state[id]}
                  disabled={disabled}
                />
              </div>
            </div>
        );
    },

    renderForm: function() {
        let inputs = [
            {id: 'id', label: 'id', disabled: true},
            {id: 'name', label: 'name'},
            {id: 'dueDate', label: 'dueDate'},
            {id: 'projectId', label: 'projectId'},
            {id: 'tags', label: 'tags'},
        ];

        inputs = inputs.map((el) => {
            return this.renderInput(el.id, el.label, el.disabled);
        });

        return (
            <form className="task-form form-horizontal">
              {inputs}
              {this.renderControlButtons()}
            </form>
        );
    },

    render: function() {
        return (
            <div className="task-element">
              {this.renderForm()}
            </div>
        );
    },
});

export default TaskForm;
