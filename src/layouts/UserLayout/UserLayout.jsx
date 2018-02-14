import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import getRoutes from '@/utils/getRoutes';
import { Switch, Link, Route, Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import logo from '@/assets/images/Grouplogo.png?imageView2/2/w/200';
import './UserLayout.scss';

const links = [{
  title: '帮助',
  href: '',
}, {
  title: '隐私',
  href: '',
}, {
  title: '条款',
  href: '',
}];

const copyright = <div>Copyright <Icon type="copyright" />2018 Usoccer</div>;

class UserLayout extends PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Usoccer Admin';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - Usoccer Admin`;
    }
    return title;
  }
  render() {
    const { routerData, match } = this.props;
    const LoginComponent = routerData['/user/login'].component;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className="user-layout container">
          <div className="top">
            <div className="header">
              <Link to="/">
                <img alt="logo" className="logo" src={logo} />
              </Link>
            </div>
            <div className="desc">Usoccer Admin</div>
          </div>
          <Switch>
            {
              getRoutes(match.path, routerData).map(item =>
                (
                  <Route
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  />
                )
              )
            }
            <Redirect exact from="/" to="/user/login" />
            <Route component={LoginComponent} />
          </Switch>
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
