import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Input, Icon, Select, Checkbox, Button, message } from 'antd';
import { registerUser } from './reduxFlow/entryActions';
import CustomParticle from '../styles/customParticle';
import '../styles/form.css';

const loginRedirectPath = 'door.html#/login';
const styles={
    iconStyle:{
      color: 'rgba(0,0,0,.25)'
    },
    title:{ 
      color:'black',
      fontFamily: '-webkit-body',
      fontStyle: 'italic',
      fontSize: 'x-large',
      fontWeight: 'bolder',
      position:'relative',
      left:15
    },
    labels:{
      color:'black'
    },
    logo:{
      position:'relative',
      left:15,
      marginBottom:20
    }
}

const formItemLayout = {
    /*labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    }*/
};

const tailFormItemLayout = {
    /*wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    }*/
};

const FormItem = Form.Item;
const Option = Select.Option;

class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
        confirmDirty: false,
    }
  }
  
  handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = false;
    this.props.form.validateFields((err) =>  isValid = !err);
    if(!isValid){
      return;
    } 
    
    await this.registerUser().catch(this.handleError);
  }
  
  registerUser = async () => {
    this.setState({ loading: true });
    const { form, dispatch } = this.props;
    const param = form.getFieldsValue();
    
    await registerUser(param, dispatch);
    message.success(`Registration Successful - ${param.email}`);
    setTimeout(() => {
      window.location.href = `${window.location.origin}/${loginRedirectPath}`;
      this.setState({ loading: false });
    },1000);
  }
  
  handleError = (err) => {
    message.error(`${err.customError}`);
    this.setState({ loading: false });
  }

  handleConfirmBlur =(e)=>{
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword =(rule, value, callback)  =>{
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword=  (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  
//  label={<span style={styles.labels}>E-mail</span>}
//  label={<span style={styles.labels}>Password</span>}
//  <span style={styles.title}> - SignUp</span>
  render(){

    const { getFieldDecorator } = this.props.form;
    const prefixSelector = getFieldDecorator('prefix', { initialValue: '91' })(
        <Select style={{ width: 70 }}><Option value="91">+91</Option></Select>);
    
    return (
        <div>
          <span className="mainDiv">
            <span className="loginLayout">
              <Form onSubmit={this.handleSubmit}  className="signup-form">
                 <img src="./front/src/styles/images/ForYou.jpg" height="80" width="235" style={styles.logo} />
                <FormItem {...formItemLayout} >
                  {getFieldDecorator('email', {
                    rules: [{
                      type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                      required: true, message: 'Please input your E-mail!',
                    }],
                  })(
                      <Input prefix={<Icon type="mail" style={styles.iconStyle} />} placeholder=" E-mail"/>
                  )}
                </FormItem>
                <FormItem {...formItemLayout}  >
                  {getFieldDecorator('password', {
                    rules: [{
                      required: true, message: 'Please input your password!',
                    }, {
                      validator: this.validateToNextPassword,
                    }],
                  })(
                      <Input prefix={<Icon type="lock" style={styles.iconStyle} />} type="password" placeholder=" Password"/>
                  )}
                </FormItem>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator('confirm', {
                    rules: [{
                      required: true, message: 'Please confirm your password!',
                    }, {
                      validator: this.compareToFirstPassword,
                    }],
                  })(
                      <Input prefix={<Icon type="lock" style={styles.iconStyle} />} type="password" placeholder=" Confirm Password" onBlur={this.handleConfirmBlur} />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} >
                  {getFieldDecorator('contact_no', {
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                  })(
                      <Input prefix={<Icon type="phone" style={styles.iconStyle} />} placeholder=" Contact No." addonBefore={prefixSelector} style={{ width: '100%' }} />
                  )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  {getFieldDecorator('agreement', {
                    valuePropName: 'checked'
                  })(
                      <Checkbox style={styles.labels}>I have read the <a>agreement</a></Checkbox>
                  )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" className="sign-up-button">Register</Button>
                </FormItem>
              </Form>
            </span>
            </span>
          <CustomParticle/>
        </div>
    );
  };
}

const WrappedSignupForm = Form.create()(Signup);
export default withRouter(connect(null)(WrappedSignupForm));