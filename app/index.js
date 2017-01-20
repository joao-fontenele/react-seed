import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';

import App from 'appRoot/examples/components/App.react';
import MainLayout from 'appRoot/default/components/MainLayout.react';
import TasksContainer from 'appRoot/integra/components/TasksContainer.react';


ReactDOM.render(
    (
        <Router history={browserHistory}>
          <Route path="/" component={MainLayout}>
            <IndexRoute component={App} />
            <Route path="tasks" component={TasksContainer} />
          </Route>
        </Router>
    ),
    document.getElementById('app')
);
