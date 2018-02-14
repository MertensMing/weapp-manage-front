import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { connect } from 'react-redux';
import './Me.scss';

const FormItem = Form.Item;

class Me extends PureComponent {

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const { userInfo } = this.props;
    return (
      <Form className="me-form-layout" onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="头像"
        >
          <img className="me-avatar" src={userInfo.avatarUrl} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="用户名"
        >
          {userInfo.username}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {userInfo.email}
        </FormItem>
      </Form>
    );
  }
}

const mapStateToProps = props => {
  return {
    userInfo: props.user.info,
  };
};

export default connect(mapStateToProps)(Me);
