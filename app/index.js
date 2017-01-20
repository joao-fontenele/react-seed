import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';

import App from 'appRoot/examples/components/App.react';
import MainLayout from 'appRoot/default/components/MainLayout.react';


ReactDOM.render(
    (
        <Router history={browserHistory}>
          <Route path="/" component={MainLayout}>
            <IndexRoute component={App} />
          </Route>
        </Router>
    ),
    document.getElementById('app')
);
