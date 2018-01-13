import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logoImage from '../assets/images/common/logo.svg';
import './asass.scss';

export default class A extends Component {

  static propTypes = {
    value: PropTypes.array
  }

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <a href="#/b" className="logo">go to b</a>
        <span className="icon">&#xe644;</span>
        <img src={logoImage} alt="" />
      </div>
    );
  }
}
