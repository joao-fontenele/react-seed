const React = require('react');
const HelpBlock = require('./HelpBlock.react');

const TextInput = React.createClass({

    render: function() {
        let wrapperCls = this.props.componentName;
        const removeButton = this.props.handleRemove && (
            <span
                className="remove-button"
                onClick={this.props.handleRemove}
            >
                &#10006;
            </span>
        );
        if (this.props.wrapperCls) {
            wrapperCls += ' ' + this.props.wrapperCls;
        }
        if (this.props.errorMessage) {
            wrapperCls += ' has-error';
        }

        return (
            <div className={wrapperCls}>
              <label className={'label'} htmlFor={this.props.componentName}>
                {this.props.label}
                </label>
                <input
                    value={this.props.value}
                    name={this.props.componentName}
                    ref="field"
                    className={'field'}
                    type={this.props.type}
                    onBlur={this.props.validate}
                    onChange={this.props.handleChange}
                    placeholder={this.props.placeholder}
                    disabled={this.props.disabled}
                />
                {removeButton}
                <HelpBlock
                    errorMessage={this.props.errorMessage}
                    helpBlockCls={this.props.helpBlockCls}
                />
            </div>
        );
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return (this.props.value !== nextProps.value) ||
                (this.props.errorMessage !== nextProps.errorMessage) ||
                (this.props.handleRemove !== nextProps.handleRemove);
    },

});

TextInput.defaultProps = {
    type:         'text',
    errorMessage: null,
    placeholder:  '',
    disabled:     false,
};

TextInput.propTypes = {
    value:          React.PropTypes.string.isRequired,
    handleChange:   React.PropTypes.func.isRequired,
    label:          React.PropTypes.string.isRequired,
    componentName:  React.PropTypes.string.isRequired,
    handleRemove:   React.PropTypes.func,
    type:           React.PropTypes.string,
    errorMessage:   React.PropTypes.string,
    placeholder:    React.PropTypes.string,
    wrapperCls:     React.PropTypes.string,
    validate:       React.PropTypes.func,
    disabled:       React.PropTypes.bool,
};

module.exports = TextInput;
