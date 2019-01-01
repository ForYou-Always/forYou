import React, { Component } from 'react';
<<<<<<< HEAD
import Particles from 'react-particles-js';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import CustomParticle from '../styles/customParticle';
import { withRouter } from 'react-router-dom';
=======
>>>>>>> refs #fy7 signup CR
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Input, Select, Checkbox, Button, message } from 'antd';
import { registerUser } from './reduxFlow/entryActions';
<<<<<<< HEAD
import '../styles/form.css';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
=======
import CustomParticle from '../styles/customParticle';
import '../styles/form.css';

const loginRedirectPath = 'door.html#/login';
const styles={
    title:{ 
      color:'white',
      fontFamily: '-webkit-body',
      fontStyle: 'italic',
      fontSize: 'x-large',
      fontWeight: 'bolder',
      position:'relative',
      left:50
    }
}
>>>>>>> refs #fy7 signup CR

const formItemLayout = {
  		labelCol: {
  			xs: { span: 24 },
  			sm: { span: 8 },
  		},
  		wrapperCol: {
  			xs: { span: 24 },
  			sm: { span: 16 },
  		}
};

const tailFormItemLayout = {
		wrapperCol: {
			xs: {
				span: 24,
				offset: 0,
			},
			sm: {
				span: 16,
				offset: 8,
			},
		}
};

const FormItem = Form.Item;
const Option = Select.Option;

class Signup extends Component {

<<<<<<< HEAD
	constructor(props) {
		super(props);

		this.state = {
				confirmDirty: false,
				autoCompleteResult: [],
		}
	}
	
	componentWillMount(){
		const { dispatch } = this.props;
		//Test Data
		const req = {
				user_name:'Admin',
				password:'Admin@abcd',
		}
		registerUser(req ,dispatch);
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	}

	handleConfirmBlur (e){
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}

	compareToFirstPassword (rule, value, callback)  {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	}

	validateToNextPassword  (rule, value, callback)  {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	}

	render(){

		const { getFieldDecorator } = this.props.form;
		const { autoCompleteResult } = this.state;

		const prefixSelector = getFieldDecorator('prefix', { initialValue: '91' })(
				<Select style={{ width: 70 }}><Option value="91">+91</Option></Select>);

		return (
			<div>
				<span className="mainDiv">
				<span className="loginLayout">
					<Form onSubmit={this.handleSubmit}  className="signup-form">
						<FormItem {...formItemLayout} label="E-mail" >
							{getFieldDecorator('email', {
								rules: [{
									type: 'email', message: 'The input is not valid E-mail!',
								}, {
									required: true, message: 'Please input your E-mail!',
								}],
							})(
									<Input />
							)}
						</FormItem>
						<FormItem {...formItemLayout} label="Password" >
							{getFieldDecorator('password', {
								rules: [{
									required: true, message: 'Please input your password!',
								}, {
									validator: this.validateToNextPassword,
								}],
							})(
									<Input type="password" />
							)}
						</FormItem>
						<FormItem {...formItemLayout} label="Confirm Password" >
							{getFieldDecorator('confirm', {
								rules: [{
									required: true, message: 'Please confirm your password!',
								}, {
									validator: this.compareToFirstPassword,
								}],
							})(
									<Input type="password" onBlur={this.handleConfirmBlur} />
							)}
						</FormItem>
						<FormItem {...formItemLayout} label="Phone Number" >
							{getFieldDecorator('phone', {
								rules: [{ required: true, message: 'Please input your phone number!' }],
							})(
									<Input addonBefore={prefixSelector} style={{ width: '100%' }} />
							)}
						</FormItem>
						<FormItem {...tailFormItemLayout}>
							{getFieldDecorator('agreement', {
								valuePropName: 'checked',
							})(
									<Checkbox>I have read the <a href="">agreement</a></Checkbox>
							)}
						</FormItem>
						<FormItem {...tailFormItemLayout}>
							<Button type="primary" htmlType="submit">Register</Button>
						</FormItem>
					</Form>
				</span>
				</span>
				<CustomParticle/>
			</div>
		);
	};
}

function mapStatetoProps(state){
	return{
		singupData: state.get('entry').get('getSingupInfo')
	}
}

const WrappedHorizontalLoginForm = Form.create()(Signup);

export default connect(mapStatetoProps)(withRouter(WrappedHorizontalLoginForm));
=======
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
  
  render(){

    const { getFieldDecorator } = this.props.form;
    const prefixSelector = getFieldDecorator('prefix', { initialValue: '91' })(
        <Select style={{ width: 70 }}><Option value="91">+91</Option></Select>);
    
    return (
        <div>
          <span className="mainDiv">
            <span className="loginLayout">
              <Form onSubmit={this.handleSubmit}  className="signup-form">
                 <img src="./front/src/styles/images/ForYou.jpg" height="50" width="150" style={{ position:'relative', left:50, marginBottom:10 }} />
                 <span style={styles.title}> - SignUp</span>
                <FormItem {...formItemLayout} label={<span style={{ color:'white' }}>E-mail</span>}>
                  {getFieldDecorator('email', {
                    rules: [{
                      type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                      required: true, message: 'Please input your E-mail!',
                    }],
                  })(
                      <Input />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label={<span style={{ color:'white' }}>Password</span>} >
                  {getFieldDecorator('password', {
                    rules: [{
                      required: true, message: 'Please input your password!',
                    }, {
                      validator: this.validateToNextPassword,
                    }],
                  })(
                      <Input type="password" />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label={<span style={{ color:'white' }}>Confirm Password</span>} >
                  {getFieldDecorator('confirm', {
                    rules: [{
                      required: true, message: 'Please confirm your password!',
                    }, {
                      validator: this.compareToFirstPassword,
                    }],
                  })(
                      <Input type="password" onBlur={this.handleConfirmBlur} />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label={<span style={{ color:'white' }}>Phone Number</span>}>
                  {getFieldDecorator('contact_no', {
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                  })(
                      <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                  )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  {getFieldDecorator('agreement', {
                    valuePropName: 'checked'
                  })(
                      <Checkbox style={{ color:'white' }}>I have read the <a href="">agreement</a></Checkbox>
                  )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">Register</Button>
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
export default connect(null)(withRouter(WrappedSignupForm));
>>>>>>> refs #fy7 signup CR
