import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Breadcrumb, Icon } from 'antd'
const { Header, Footer, Sider, Content } = Layout
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
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /> 概况</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        </Header>
        <Content>内容</Content>
      </Layout>
    )
  }
}
