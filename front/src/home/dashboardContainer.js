import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import CustomParticle from '../styles/customParticle';
import { loginUser } from './reduxFlow/entryActions';
import '../styles/form.css';

const homeRedirectPath = 'home.html#/profile';
const FormItem = Form.Item;
const styles = {
    iconStyle:{
      color: 'rgba(0,0,0,.25)'
    },
    rememberBox:{
      color:'red'
    }
}

class DashboardContainer extends React.Component {
  
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
    
    await this.handleUserLogin().catch(this.handleError);
  }
  
  handleUserLogin = async() => {
    this.setState({ loading: true });
    const param = this.props.form.getFieldsValue();
    await loginUser(param, this.props.dispatch);
    message.success(`Login Successful - ${param.user_name}`);
    setTimeout(() => {
      window.location.href = `${window.location.origin}/${homeRedirectPath}`;
      this.setState({ loading: false });
    },100);
  }
  
  handleError = (err) => {
    message.error(`${err.customError}`);
    this.setState({ loading: false });
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
							{getFieldDecorator('user_name', { rules: [{ required: true, message: 'Please input your username!' }] })
							  (<Input prefix={<Icon type="user" style={styles.iconStyle} />} placeholder="Username" />)
							}
						</FormItem>
							  
						<FormItem>
							{getFieldDecorator('password', { rules: [{ required: true, message: 'Please input your Password!' }] })
							  (<Input prefix={<Icon type="lock" style={styles.iconStyle} />} type="password" placeholder="Password" />)
							}
						</FormItem>
							  
						<FormItem>
    						{getFieldDecorator('remember', { valuePropName: 'checked', initialValue: true })
    						  (<Checkbox style={styles.rememberBox}>Remember me</Checkbox>)
    						}
							<a className="login-form-forgot">Forgot password</a>
							<Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
							Or <a onClick={() => history.push('/register')} > register now!</a>
						</FormItem>
						
					</Form>
				</span>
				</span>
				<CustomParticle/>
			</div>);
	}
}

const WrappedDashboardContainer = Form.create()(DashboardContainer);
export default connect(null)(withRouter(WrappedDashboardContainer));