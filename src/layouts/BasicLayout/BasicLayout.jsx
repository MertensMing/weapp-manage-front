import React from 'react';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { Layout, Menu, Breadcrumb, Icon, Spin, Button } from 'antd';
import { Switch, Redirect, Route } from 'react-router-dom';
import { getMenuData } from '@/common/menu';
import SideMenu from './SideMenu';
import Authorized from '@/utils/Authorized';
import { connect } from 'react-redux';
import getRoutes from '@/utils/getRoutes';
import { toggleCollapsed as toggleCollapsedAction } from '@/store/actions/global';
import * as userActions from '@/store/actions/user';
import Exception from 'ant-design-pro/lib/Exception';
import GlobalHeader from './GlobalHeader';
import './BasicLayout.scss';

const { AuthorizedRoute } = Authorized;

const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;

class BasicLayout extends React.Component {

  componentWillMount() {
    this.props.dispatch(userActions.getUserInfo());
  }

  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Usoccer Admin';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - Usoccer Admin`;
    }
    return title;
  }

  userLogout = () => {
    this.props.dispatch(userActions.logout());
  }

  render() {
    const {
      routerData, match, location,
    } = this.props;
    /**
     * 根据菜单取得重定向地址.
     */
    const redirectData = [];
    const getRedirect = (item) => {
      if (item && item.children) {
        if (item.children[0] && item.children[0].path) {
          redirectData.push({
            from: `/${item.path}`,
            to: `/${item.children[0].path}`,
          });
          item.children.forEach((children) => {
            getRedirect(children);
          });
        }
      }
    };
    getMenuData().forEach(getRedirect);
    const layout = (
      <Layout>
        <SideMenu
          {...this.props}
          toggleCollapsed={() => this.props.dispatch(toggleCollapsedAction())}
          menuData={getMenuData()}
        />
        <Layout>
          <GlobalHeader {...this.props} userLogout={this.userLogout} />
          <Content className="g-content">
            <div className="route-wrap">
              <Switch>
                {
                  getRoutes(match.path, routerData).map(item =>
                    (
                      <AuthorizedRoute
                        key={item.key}
                        path={item.path}
                        component={item.component}
                        exact={item.exact}
                        authority={item.authority}
                        redirectPath="/exception/403"
                      />
                    )
                  )
                }
                {
                  redirectData.map(item =>
                    <Redirect key={item.from} exact from={item.from} to={item.to} />
                  )
                }
                <Redirect exact from="/" to="/team" />
                <Route render={() => <Exception type="404" />} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Usoccer ©2018 Created by Mertens
          </Footer>
        </Layout>
      </Layout>
    );
    return (
      <DocumentTitle title={this.getPageTitle()}>
        {layout || <Spin />}
      </DocumentTitle>
    );
  }
}

export default connect(state => {
  return {
    collapsed: state.global.collapsed,
    userInfo: state.user.info,
  }
})(BasicLayout);
