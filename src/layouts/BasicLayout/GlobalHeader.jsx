import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';
import style from './GlobalHeader.scss';

const { Header } = Layout;

export default class GlobalHeader extends PureComponent {

  static propTypes = {
    prop: PropTypes.array
  }

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { userInfo } = this.props;
    const menu = (
      <Menu className="user-menu" >
        <Menu.Item key="0">
          <Link className="menu-link" to="/setting/me">
            <Icon type="user" />&nbsp;&nbsp;我的信息
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
          <span onClick={this.props.userLogout} className="menu-link"><Icon type="logout" />&nbsp;&nbsp;退出登录</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="global-header-container">
        <Header className="header">
          <Dropdown trigger={['hover']} placement="bottomRight" overlay={menu}>
            {
              userInfo ?
                <span className="menu-target">
                  <img src={`${userInfo.avatarUrl}?imageView2/2/w/200`} className="avatar" />&nbsp;{userInfo.username}&nbsp;&nbsp;<Icon type="down" />
                </span> : <span />
            }
          </Dropdown>
        </Header>
      </div>
    );
  }
}
