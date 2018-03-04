import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import Login from '../../components/Login';
import styles from './Login.less';
import { Form, Input, Button, Icon, Alert,Checkbox } from 'antd';


const FormItem = Form.Item;
const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(state => ({
  login: state.login,
}))
@Form.create()
export default class Logins extends Component {
  state = {
    count: 0,
    type: 'account',
  }

  componentWillReceiveProps(nextProps) {
    //if (nextProps.login.message === '登录成功') {
    const oldStatus = this.props.login.status;
    const newStatus = nextProps.login.status;
      if ( oldStatus!=='ok'  && newStatus === 'ok') {
      this.props.dispatch(routerRedux.push('/dashboard/analysis'));
      //alert("hello");
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSwitch = (key) => {
    this.setState({
      type: key,
    });
  }

  
  handleSubmit = (e) => {
    e.preventDefault();
    
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (!err) {
          this.props.dispatch({
            type: `login/accountSubmit`,
            payload: values,
          });
        }
      }
    );
  }

  renderMessage = (message) => {
    return (
      <Alert
        style={{ marginBottom: 24 }}
        message={message}
        type="error"
        showIcon
      />
    );
  }

  render() {
    const { form, login } = this.props;
    const { getFieldDecorator } = form;
    const { count, type } = this.state;
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>

        {
                login.status === 'error' &&
                login.submitting === false &&
                this.renderMessage('账户或密码错误')
              }

          
              <FormItem>
                {getFieldDecorator('mobile', {
                  rules: [{
                    required: true, message: '请输入账户名！',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" className={styles.prefixIcon} />}
                    placeholder="请输入您的账号"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: '请输入密码！',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" className={styles.prefixIcon} />}
                    type="password"
                    placeholder="请输入您的密码"
                  />
                )}
              </FormItem>
            
          <FormItem className={styles.additional}>
            <Button size="large" loading={login.submitting} className={styles.submit} type="primary" htmlType="submit">
              登录
            </Button>
          </FormItem>
        </Form>
        
      </div>
    );
  }
}
