import React from 'react';
import CustomParticle from '../styles/customParticle';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { withRouter } from 'react-router-dom';
import '../styles/form.css';

const FormItem = Form.Item;

class LoginContainer extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { history } = this.props;
    
    return (
    		<div>
    		<span className="mainDiv">
    <span className="loginLayout">
      <Form onSubmit={this.handleSubmit} className="login-form">
        <img src="./front/src/styles/images/ForYou.jpg" height="80" width="235" style={{ marginBottom:5 }} />
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox style={{ color:'red' }}>Remember me</Checkbox>
          )}
          <a className="login-form-forgot">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a onClick={() => history.push('/register')} > register now!</a>
        </FormItem>
      </Form>
      </span>
      </span>
      <CustomParticle/>
      </div>
    );
  }
}

const WrappedLoginContainer = Form.create()(LoginContainer);
export default withRouter(WrappedLoginContainer);