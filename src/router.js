import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Router, hashHistory } from 'react-router'
import dynamic from '@/utils/dynamic'

export default class AppRouter extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={dynamic(() => import(/* webpackChunkName: "p_list" */ './pages/a'))}/>
        <Route path="/b" component={dynamic(() => import(/* webpackChunkName: "p_b" */ './pages/b'))}/>
      </Router>
    )
  }
}
