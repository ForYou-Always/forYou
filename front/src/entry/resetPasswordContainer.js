import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, message } from 'antd';
import CustomParticle from '../styles/customParticle';
import { resetPassword } from './reduxFlow/entryActions';
import '../styles/form.css';

const loginRedirectPath = 'door.html#/login';
const imagePath="./front/src/styles/images/ForYou.jpg";

const FormItem = Form.Item;
const formItemLayout = {
    /*labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    }*/
}
const styles = {
    iconStyle:{
      color: 'rgba(0,0,0,.25)'
    },
    rememberBox:{
      color:'red'
    }
}

class ResetPasswordContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        loading: false,
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = false;
    this.props.form.validateFields((err) =>  isValid = !err);
    if(!isValid){
      return;
    } 
    
    await this.resetPasswordFunction().catch(this.handleError);
  }

  resetPasswordFunction = async (e) => {
    this.setState({ loading: true });    
    const{ form, dispatch }= this.props;
    const param= form.getFieldsValue();

    await resetPassword(param,dispatch);
    message.success(`Password reseted successfully for mail - ${param.email}`);
    setTimeout(() => {
      window.location.href = `${window.location.origin}/${loginRedirectPath}`;
      this.setState({ loading: false });
    },1000);
  }
  
  handleError = (err) => {
    message.error(`${err.customError}`);
    this.setState({ loading: false });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <span className="mainDiv">
          <span className="loginLayout">
            <Form onSubmit={this.handleSubmit} className="change-password-form">
              <img src={imagePath} height="80" width="235" style={{ position:'relative', left:1, marginBottom:20 }} />
              <FormItem {...formItemLayout} >
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }, {
                    required: true, message: 'Please input your E-mail!',
                  }],
                })(
                    <Input prefix={<Icon type="mail" style={styles.iconStyle} />} placeholder=" Mail-Id" />
                )}
              </FormItem>
              <FormItem>
                { getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Enter Your New Password!' }],
                })(
                    <Input prefix={<Icon type="lock" style={styles.iconStyle} />} type="password" placeholder=" New Password" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('confirm-password', {
                  rules: [{ required: true, message: 'Re-Enter Your New Password!' }],
                })(
                    <Input prefix={<Icon type="lock" style={styles.iconStyle} />} type="password" placeholder=" Re-enter New Password" />
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" >Confirm Reset</Button>
              </FormItem>
            </Form>
          </span>
        </span>
        <CustomParticle/>
      </div>
    );
  }
}

const WrappedResetPasswordContainer = Form.create()(ResetPasswordContainer);
export default withRouter(connect(null)(WrappedResetPasswordContainer));