const React = require('react');

const HelpBlock = React.createClass({

    render: function() {
        let icon;
        if (this.props.errorMessage) {
            icon = (<i className="glyphicon glyphicon-alert">&nbsp;</i>);
        }

        return (
            <span className={'help-block'}>
                {icon}
                {this.props.errorMessage}
            </span>
        );
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return (this.props.errorMessage !== nextProps.errorMessage);
    },

});

HelpBlock.defaultProps = {
    errorMessage: null,
};

HelpBlock.propTypes = {
    errorMessage: React.PropTypes.string,
};

module.exports = HelpBlock;
