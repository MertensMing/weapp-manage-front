import React from 'react';
import { Spin } from 'antd';

export default class PromiseRender extends React.PureComponent {
    state = {
      Component: null,
    };
    componentDidMount() {
      this.props.promise
        .then(() => {
          this.setState({
            Component: this.props.ok,
          });
        })
        .catch(() => {
          this.setState({
            Component: this.props.error,
          });
        });
    }
    render() {
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> :
        <div className="global-spin-wrap"><Spin size="large" /></div>
    }
}
