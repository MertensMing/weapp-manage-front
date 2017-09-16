import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon, Popover, Button } from 'antd'
const { Header, Footer, Sider, Content } = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
import { Link } from 'react-router'
import { connect } from 'react-redux'

import './index.scss'

class BaseLayout extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { locationBeforeTransitions } = this.props.routing
    return (
      <Layout className="manage-layout">
        <Sider className="manage-sider">
          <div className="manage-logo">
            <a href="/">
              <img
                className="img"
                src="http://ov9z0zlev.bkt.clouddn.com/assets/images/common/logo.svg"
                alt="logo"
              ></img>
            </a>
          </div>
          <Menu
            selectedKeys={[locationBeforeTransitions.pathname]}
            defaultOpenKeys={[locationBeforeTransitions.pathname.replace(/(\/[^\/]*$)/g, '')]}
            mode="inline"
          >
            <Menu.Item key="/">
              <Link to="/"><Icon type="home" />概况</Link>
            </Menu.Item>
            <SubMenu
              key="/content"
              title={<span><Icon type="folder" /><span>内容管理</span></span>}>
              <Menu.Item key="/content/tv">
                <Link to="/content/tv">电视剧</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="/setting">
              <Link to="/setting"><Icon type="setting" />设置</Link>
            </Menu.Item>
          </Menu>
          {/* 用户信息、退出登录 */}
          <div className="manage-user">
            <Popover
              trigger="hover"
              content={
                <div className="user-info-pop">
                  <div className="info">
                    <img
                      className="img"
                      src="http://i.imgur.com/aJiMQPY.gif"
                      alt="user-logo"
                    ></img>
                  </div>
                  <Button type="dashed">退出登录</Button>
                </div>
              }
            >
              <div className="user-name">Mertens</div>
            </Popover>
          </div>
          {/* 用户信息、退出登录 end */}
        </Sider>
        {this.props.children}
      </Layout>
    )
  }
}

export default connect((state) => {
  return state
})(BaseLayout)