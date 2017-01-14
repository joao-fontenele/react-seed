const chai = require('chai');
const enzyme = require('enzyme');
const React = require('react');
const chaiEnzyme = require('chai-enzyme');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const jsdom = require('jsdom').jsdom;

chai.use(chaiEnzyme());
chai.use(sinonChai);

const expect = chai.expect;
const shallow = enzyme.shallow;
const mount = enzyme.mount;

global.document = jsdom('');
global.window = global.document.defaultView;
Object.keys(global.document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        global[property] = global.document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js',
};

global.React = React;
global.expect = expect;
global.shallow = shallow;
global.mount = mount;
global.sinon = sinon;
