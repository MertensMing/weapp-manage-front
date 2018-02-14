import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class UserSignUp extends PureComponent {

  static propTypes = {
    prop: PropTypes.array
  }

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>hello react</div>
    );
  }
}
