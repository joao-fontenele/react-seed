const TextInput = require('../../app/examples/components/TextInput.react');

const expect  = global.expect,
    it        = global.it,
    describe  = global.describe,
    shallow   = global.shallow,
    sinon     = global.sinon,
    context   = global.context;

describe('A TextInput component,', function() {
    let wrapper;
    const minProps = {
        value: 'initial',
        label: 'a test label',
        componentName: 'test-input',
        handleChange: function() {},
    };

    it('renders without exploding', function() {
        wrapper = shallow(<TextInput {...minProps} />);
        expect(wrapper).to.exist;
    });

    it('should have a label element passed by props', function() {
        wrapper = shallow(<TextInput {...minProps} />);
        expect(wrapper.find('.label')).to.contain(minProps.label);
    });

    it('should have a componentName that is present in the class of the component', function() {
        wrapper = shallow(<TextInput {...minProps} />);
        expect(wrapper).to.have.className(minProps.componentName);
    });

    it('should not add more classes passed by props to the component if no extra classes are given', function() {
        wrapper = shallow(<TextInput {...minProps} errorMessage={null} wrapperCls={null} />);
        expect(wrapper).to.have.exactly.className(minProps.componentName);
    });

    it('should add a has-error class if there\'s an error message', function() {
        wrapper = shallow(<TextInput {...minProps} errorMessage="some error" />);
        expect(wrapper).to.have.className('has-error');
    });

    it('should not add a has-error class if there\'s not an error message', function() {
        wrapper = shallow(<TextInput {...minProps} errorMessage={null} />);
        expect(wrapper).to.not.have.className('has-error');
    });

    it('should add more classes passed by props to the component', function() {
        const cls = '-compact _centered';
        wrapper = shallow(<TextInput {...minProps} wrapperCls={cls} />);
        expect(wrapper).to.have.className(cls);
    });

    it('should have a close icon in case a handleRemove prop is passed', function() {
        const handler = function() {};
        wrapper = shallow(<TextInput {...minProps} handleRemove={handler} />);

        expect(wrapper.find('.remove-button')).to.exist;
    });

    it('should not have a close icon in case a handleRemove prop is not passed', function() {
        wrapper = shallow(<TextInput {...minProps} handleRemove={null} />);
        expect(wrapper.find('.remove-button')).to.not.exist;
    });

    it('should call handleRemove prop in case one is passed, and the button is clicked', function() {
        const handler = sinon.spy();

        wrapper = shallow(<TextInput {...minProps} handleRemove={handler} />);
        wrapper.find('.remove-button').simulate('click');

        expect(handler).to.have.been.called.once;
    });

    context('should have a HelpBlock component,', function() {
        it('that exists', function() {
            wrapper = shallow(<TextInput {...minProps} />);
            expect(wrapper.find('HelpBlock')).to.exist;
        });

        it('that reveives empty props when there\'s no error', function() {
            wrapper = shallow(<TextInput {...minProps} errorMessage={null}/>);
            const help = wrapper.find('HelpBlock');
            expect(help).to.have.prop('errorMessage', null);
        });

        it('that reveives a string with an error message in the props when there\'s an error', function() {
            const err = 'some error ocurred';
            wrapper = shallow(<TextInput {...minProps} errorMessage={err} />);
            const help = wrapper.find('HelpBlock');
            expect(help).to.have.prop('errorMessage', err);
        });
    });

    context('should have an input field element,', function() {
        it('that has a class field', function() {
            wrapper = shallow(<TextInput {...minProps} />);
            const field = wrapper.find('input');
            expect(field).to.have.className('field');
        });

        it('that displays it\'s value property', function() {
            wrapper = shallow(<TextInput {...minProps} />);
            const field = wrapper.find('input');
            expect(field).to.have.attr('value', minProps.value);
        });

        it('that changes it\'s value when the parent changes it\'s props', function() {
            const newVal = 'after change';
            wrapper = shallow(<TextInput {...minProps} />);
            wrapper.setProps({value: newVal});
            const field = wrapper.find('input');

            expect(field).to.not.have.attr('value', minProps.value);
            expect(field).to.have.attr('value', newVal);
        });

        it('that displays the placeholder passed by props', function() {
            wrapper = shallow(<TextInput {...minProps} placeholder="ph" />);
            const field = wrapper.find('.field');
            expect(field).to.have.attr('placeholder', 'ph');
        });

        it('that uses the type passed by props', function() {
            wrapper = shallow(<TextInput {...minProps} type="email"/>);
            const field = wrapper.find('.field');
            expect(field).to.have.attr('type', 'email');
        });

        it('that is not disabled if the disabled prop is false', function() {
            wrapper = shallow(<TextInput {...minProps} />);
            const field = wrapper.find('.field');
            expect(field).to.not.be.disabled;
        });

        it('that is disabled if the disabled prop is true', function() {
            wrapper = shallow(<TextInput {...minProps} disabled />);
            const field = wrapper.find('.field');
            expect(field).to.be.disabled;
        });
    });

    context('should call the callback validation properly', function() {
        // TODO how exactly to test this? if I pass null as the validation rule,
        // it cant be a sinon spy, and without a spy i cant possibly know if
        // it has been called or not
        it('doesn\'t call the parent\'s validation, if it\'s not passed');

        it('calls the parent\'s validation if it\'s passed by props and the field blurs', function() {
            const validation = sinon.spy();

            wrapper = shallow(<TextInput {...minProps} validate={validation} />);
            wrapper.find('.field').simulate('blur');

            expect(validation).to.have.been.called.once;
        });
    });

    context('should call the callback on changes properly', function() {
        it('calls the parent\'s changeHandler on changes', function() {
            const handler = sinon.spy();

            wrapper = shallow(<TextInput {...minProps} handleChange={handler} />);
            wrapper.find('.field').simulate('change');

            expect(handler).to.have.been.called.once;
        });
    });

});
