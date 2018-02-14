import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import ajax from '@/common/ajax';
import { Link } from 'react-router-dom';
import { setAuthority } from '@/utils/authority';
import { connect } from 'react-redux';
import * as userActions from '@/store/actions/user';
import './ResetPasswd.scss';

const FormItem = Form.Item;

class ResetPasswd extends PureComponent {

  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(userActions.resetPasswd(values));
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="reset-passwd-form">
        <FormItem>
          {
            getFieldDecorator('email',
              {
                rules: [
                  { required: true, message: '请输入你的注册邮箱' },
                  { type: 'email', message: '邮箱格式错误' }
                ],
              }
            )(<Input prefix={<Icon type="mail" />} placeholder="你的注册邮箱" />)
          }
        </FormItem>
        <FormItem>
          <div className="row">
            <Button loading={this.props.loading} type="primary" htmlType="submit" className="reset-passwd-form-button">
              发送重置密码申请
            </Button>
            <Link to="/user/login">
              <Button className="reset-passwd-form-button">
                重置成功
              </Button>
            </Link>
          </div>
        </FormItem>
      </Form>
    );
  }
}

const ResetPasswdForm = Form.create()(ResetPasswd);

export default connect(state => {
  return {
    loading: state.loading[userActions.types.resetPasswd],
    state,
  }
})(ResetPasswdForm);
