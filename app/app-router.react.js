import React from 'react';
import {Router, IndexRoute, Route, browserHistory, Redirect} from 'react-router';

import App from 'appRoot/examples/components/App.react';
import MainLayout from 'appRoot/default/components/main-layout.react';
import TasksContainer from 'appRoot/integra/components/tasks-container.react';
import ListList from 'appRoot/integra/components/list-list.react';
import TaskDetails from 'appRoot/integra/components/task-details.react';


const AppRouter = React.createClass({
    render: function() {
        return (
          <Router history={browserHistory}>
            <Route path="/" component={MainLayout}>
              <IndexRoute component={App} />
              <Route path="tasks">
                <IndexRoute component={ListList} />
                <Route path="details/:id" component={TaskDetails} />
              </Route>

            </Route>

            {/* fallback only works for the 1st /, so /tasks/bad/uri still gives
            error */}
            <Redirect from="*" to="/"></Redirect>
          </Router>
        );
    },
});

export default AppRouter;
