import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu, Layout, Breadcrumb, Icon } from 'antd'
const { Header, Footer, Sider, Content } = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
import { Link } from 'react-router'

export default class Tv extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Layout>
        <Header>
          <Menu mode="horizontal" defaultSelectedKeys={['info']}>
            <Menu.Item key="info">个人信息</Menu.Item>
            <Menu.Item key="pswd">修改密码</Menu.Item>
          </Menu>
        </Header>
        <Content>内容</Content>
      </Layout>
    )
  }
}
