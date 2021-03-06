import React from 'react';
import { Spin } from 'antd';

const DynamicComponent = (loadComponent, extraProps) => (
  class DynamicComponent extends React.Component {
    state = {
      Component: null,
    };

    componentWillMount() {
      if (this.hasLoadedComponent()) {
        return;
      }

      loadComponent()
        .then(module => module.default)
        .then((Component) => {
          this.setState({ Component });
        })
        .catch((err) => {
          console.error(`Cannot load component in <DynamicComponent />`);
          throw err
        })
    }

    hasLoadedComponent() {
      return this.state.Component !== null;
    }

    render() {
      const { Component } = this.state
      return (Component) ? <Component {...extraProps} {...this.props} /> : <div className="global-spin-wrap"><Spin size="large" /></div>
    }
  }
)

export default DynamicComponent