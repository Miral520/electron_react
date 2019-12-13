import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './map';

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      <route.component {...props} routes={route.routes} />
    )}
  />
);

class MainRoute extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        </Switch>
      </Router>
    );
  }
};

export default MainRoute;