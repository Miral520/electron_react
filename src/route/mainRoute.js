import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Welcome from '@page/welcome/welcome';
import Index from '@page/index/index';

class MainRoute extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Welcome}></Route>
        <Route path="/index" component={Index}></Route>
      </Router>
    );
  }
};

export default MainRoute;