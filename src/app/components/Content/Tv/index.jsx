import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Breadcrumb, Icon, Table, Button } from 'antd'
const { Header, Footer, Sider, Content } = Layout
import { Link } from 'react-router'
import axios from 'axios'

import './index.scss'

export default class Tv extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pagination: {
        total: 0,
        pageSize: 5,
      },
      loading: false
    }
  }

  componentDidMount = () => {
    this.getTvList()
  }

  getTvList = async function(page = 1, pageSize = 10, options = {}) {
    this.setState({
      loading: true,
    })
    const res = await axios({
      url:'/tv/list.json',
      method: 'get', //default
      baseURL: '',
      headers: {},
      params: {
        page,
        pageSize,
        ...options,
      },
      data: {},
    })
    const pager = { ...this.state.pagination }
    pager.total = res.data.data.total || 0
    this.setState({
      list: res.data.data.list || [],
      loading: false,
      pagination: pager,
    })
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.getTvList(pagination.current, pagination.pageSize, {
      order: sorter.field,
      orderType: sorter.order,
    })
  }

  render() {
    const columns = [{
      title: '名称',
      dataIndex: 'title',
      key: 'title',
      width: 250,
      render: (text, record) => <a className="tv-name" target="_blank" href={record.url}>{text}</a>
    }, {
      title: '海报',
      dataIndex: 'cover',
      key: 'cover',
      width: 150,
      render: (text, record) => <div className="cover-wrap"><img className="tv-cover" src={record.cover} alt={record.title} /></div>
    }, {
      title: '上映时间',
      dataIndex: 'start_time',
      key: 'start_time',
      sorter: true,
      render: text => <span>{text || '未知'}</span>
    }, {
      title: '评分',
      dataIndex: 'rate',
      key: 'rate',
      sorter: true,
    }, {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 250,
      render: () => {
        return (
          <div>
            <Button>查看详情</Button>
            <Button>编辑</Button>
            <Button type="dashed">删除</Button>
          </div>
        )
      }
    }];
    
    return (
      <Layout>
        <Header>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/content/tv">电视剧</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        </Header>
        <Content>
          <Button className="plus-tv-btn" icon="plus">添加电视剧</Button>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />
        </Content>
      </Layout>
    )
  }
}
