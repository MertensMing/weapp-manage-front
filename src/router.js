import React, { Component } from 'react';
import {
  Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { getRouterData } from '@/common/router';
import Authorized from '@/utils/Authorized';
import dynamic from '@/utils/dynamic';

const { AuthorizedRoute } = Authorized;

export const history = createBrowserHistory();

class AppRouter extends Component {
  
  componentWillMount() {}

  render() {
    const routerData = getRouterData();
    const BasicLayout = routerData['/'].component;
    const UserLayout = routerData['/user'].component;
    return (
      <Router history={history}>
        <Switch>
          <AuthorizedRoute
            path="/user"
            render={props => <UserLayout {...props} routerData={routerData} />}
            authority="guest"
            redirectPath="/"
          />
          <AuthorizedRoute
            path="/"
            authority={['admin']}
            render={props => <BasicLayout {...props} routerData={routerData} />}
            redirectPath="/user"
          />
        </Switch>
      </Router>
    );
  }
}

export default connect()(AppRouter);