import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { forgotPassword } from './reduxFlow/entryActions';
import CustomParticle from '../styles/customParticle';
import '../styles/form.css';

const loginRedirectPath = 'door.html#/login';
const imagePath="./front/src/styles/images/ForYou.jpg";

const FormItem = Form.Item;
const styles = {
    iconStyle:{
      color: 'rgba(0,0,0,.25)'
    },
    rememberBox:{
      color:'red'
    },
    title:{ 
      color:'black',
      fontFamily: '-webkit-body',
      fontStyle: 'italic',
      fontSize: 'x-large',
      fontWeight: 'bolder',
      position:'relative',
      left:1,
      marginBottom:10
    }
}

class ForgotPasswordContainer extends Component {

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
    
    await this.informPasswordLost().catch(this.handleError);
  }

  informPasswordLost =async (e) => {
    const { form, dispatch } = this.props;
    const param = form.getFieldsValue();
    const responseResult = await forgotPassword(param,dispatch);
    message.success(`Request sent to Admin.Please check email - ${param.email} for resetting the password`);
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
    const { history } = this.props;

    return (<div>
      <span className="mainDiv">
        <span className="loginLayout">
          <Form onSubmit={this.handleSubmit} className="password-lost-form">
            <img src={imagePath} height="50" width="150" style={{ position:'relative', left:1 }} />
            <span style={styles.title}> - Reset Request</span>
            <FormItem>
              {getFieldDecorator('email', { rules: 
                [{ type: 'email', message: 'The input is not valid E-mail!'},
                  { required: true, message: 'Please input your E-mail!' }]
              })(
                  <Input prefix={<Icon type="mail" style={styles.iconStyle} />} placeholder="Email-id" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" >Forgot Password</Button>
            </FormItem>
          </Form>
        </span>
      </span>
      <CustomParticle/>
      </div>);
  }
}

const WrappedForgotPasswordContainer = Form.create()(ForgotPasswordContainer);
export default connect(null)(withRouter(WrappedForgotPasswordContainer));