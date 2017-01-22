import React from 'react';
import {Link} from 'react-router';

const Header = React.createClass({
    render: function() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
              <div className="container">
                <ul className="nav nav-tabs">
                  <li role="presentation">
                    <Link to="/" activeClassName="active">
                      Home
                    </Link>
                  </li>

                  <li role="presentation">
                    <Link to="/tasks" activeClassName="active">
                      Tasks
                    </Link>
                  </li>

                  <li role="presentation">
                    <Link to="/projects" activeClassName="active">
                      Projects
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
        );
    },
});

export default Header;
