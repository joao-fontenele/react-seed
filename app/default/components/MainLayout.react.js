import React from 'react';
import {Link} from 'react-router';

const MainLayout = React.createClass({
    render: function() {
        return (
            <div className="main-layout">
              <header>
                <ul className="navbar">
                  <li>
                    <Link to="/" activeClassName="active">
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link to="/tasks" activeClassName="active">
                      Tasks
                    </Link>
                  </li>

                  <li>
                    <Link to="/projects" activeClassName="active">
                      Projects
                    </Link>
                  </li>
                </ul>
              </header>

              <main className="main-content">
                {this.props.children}
              </main>
            </div>
        );
    },
});

export default MainLayout;
