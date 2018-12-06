import React, { Component } from 'react';
import Particles from 'react-particles-js';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import CustomParticle from '../styles/customParticle';
import { withRouter } from 'react-router-dom';
import '../styles/form.css';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 8 },
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 16 },
		},
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
		},
};

class Signup extends Component {

	constructor(props) {
		super(props);

		this.state = {
				confirmDirty: false,
				autoCompleteResult: [],
		}
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

const WrappedHorizontalLoginForm = Form.create()(Signup);

export default withRouter(WrappedHorizontalLoginForm);