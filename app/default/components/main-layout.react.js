import React from 'react';

import Header from 'appRoot/default/components/header.react';


const MainLayout = React.createClass({
    render: function() {
        return (
            <div className="main-layout container">
              <Header />

              <main className="main-content">
                {this.props.children}
              </main>
            </div>
        );
    },
});

export default MainLayout;
