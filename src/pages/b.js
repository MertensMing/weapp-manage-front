import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class B extends Component {

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
      <a href="#/">go to a</a>
    );
  }
}
