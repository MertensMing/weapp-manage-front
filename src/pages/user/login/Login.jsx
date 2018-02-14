import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import ajax from '@/common/ajax';
import { Link } from 'react-router-dom';
import { setAuthority } from '@/utils/authority';
import { connect } from 'react-redux';
import * as userActions from '@/store/actions/user';
import './Login.scss';

const FormItem = Form.Item;

class Login extends PureComponent {

  static propTypes = {
    prop: PropTypes.array
  }

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(userActions.login(values));
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {
            getFieldDecorator('uname',
              {
                rules: [
                  { required: true, message: '请输入用户名' }
                ],
              }
            )(<Input prefix={<Icon type="user" />} placeholder="用户名" />)
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('passwd', {
              rules: [
                { required: true, message: '请输入密码' }
              ],
            })(<Input prefix={<Icon type="lock" />} type="password" placeholder="密码" />)
          }
        </FormItem>
        <FormItem>
          <div className="row">
            <Button loading={this.props.loading} type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </div>
          <div className="row-1">
            <Link className="login-form-forgot" to="/user/reset-passwd">忘记密码</Link>
            {/* <span>还没注册？<a href="">立即注册</a></span> */}
          </div>
        </FormItem>
      </Form>
    );
  }
}

const LoginForm = Form.create()(Login);

export default connect(state => {
  return {
    state,
    loading: state.loading[userActions.types.login]
  }
})(LoginForm);
