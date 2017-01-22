import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import AppRouter from './app-router.react.js';
import store from 'appRoot/default/store/store';


ReactDOM.render(
    (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    ),
    document.getElementById('app'));

// import Examples from 'appRoot/examples/redux/index';
// Examples.run('ex1');
// Examples.run('ex2');
// Examples.run('ex3');
