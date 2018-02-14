import React from 'react';
import { Route, Redirect } from 'mirrorx';
import Authorized from './Authorized';

class AuthorizedRoute extends React.Component {
  render() {
    const { component: Component, render, authority,
      noMatch, redirectPath, ...rest } = this.props;
    const noMatchComponent = noMatch ?
      noMatch :
      <Route render={() => <Redirect to={{ pathname: redirectPath || '/user/login' }} />} {...rest} />;
    return (
      <Authorized authority={authority} noMatch={noMatchComponent}>
        <Route {...rest} render={props => Component ? <Component {...props} /> : render(props)} />
      </Authorized>
    );
  }
}

export default AuthorizedRoute;
