import React from 'react';

import TextInput from 'appRoot/examples/components/TextInput.react';


const App = React.createClass({
    getInitialState: function() {
        return {
            inputValue: '',
        };
    },

    onChangeValue: function(evt) {
        this.setState({inputValue: evt.target.value});
    },

    render: function() {
        return (
            <div>
              <h1>Hello World!!</h1>
              <form className="example-form">
                <TextInput
                  value={this.state.inputValue}
                  handleChange={this.onChangeValue}
                  label="Type something"
                  componentName="simple-input"
                />
              </form>
            </div>
        );
    },
});

export default App;
