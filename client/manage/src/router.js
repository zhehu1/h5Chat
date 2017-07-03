import React from 'react';
import { Router, Route } from 'dva/router';
import UserList from './routes/UserList';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/users" component={UserList} />
    </Router>
  );
}

export default RouterConfig;
