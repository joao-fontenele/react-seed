import React from 'react';
import {Router, IndexRoute, Route, browserHistory, Redirect} from 'react-router';

import App from 'appRoot/examples/components/App.react';
import MainLayout from 'appRoot/default/components/MainLayout.react';
import TasksContainer from 'appRoot/integra/components/TasksContainer.react';


const AppRouter = (
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={App} />
        <Route path="tasks" component={TasksContainer} />
      </Route>

      {/* fallback only works for the 1st /, so /tasks/bad/uri still gives
      error */}
      <Redirect from="*" to="/"></Redirect>
    </Router>
);

export default AppRouter;
