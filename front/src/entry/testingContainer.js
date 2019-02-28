import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Checkbox , Modal } from 'antd';
import { sendFeedbackMail } from './reduxFlow/entryActions';
import '../styles/form.css';

const FormItem = Form.Item;
const styles = {
    iconStyle:{
      color: 'rgba(0,0,0,.25)'
    },
    rememberBox:{
      color:'red'
    }
}
  
  const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    };
    const formTailLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8, offset: 4 },
    };

    const { TextArea } = Input;
    
    class testingContainer extends React.Component {
      constructor(props){
        super(props);
        this.state = {
            selectedRowKeys: ["0"], 
            checkNick: false,
            loading: false,
            visible: false
        }
      }
      

      check = () => {
        this.props.form.validateFields(
          (err) => {
            if (!err) {
              console.info('success');
            }
          },
        );
      }

      handleChange = (e) => {
        this.setState({
          checkNick: e.target.checked,
        }, () => {
          this.props.form.validateFields(['nickname'], { force: true });
        });
      }
      
      showModal = () => {
        this.setState({
          visible: true,
        });
      }

      handleOk = async(e) => {

        const { dispatch, form } = this.props;
        const param = form.getFieldsValue();
        await sendFeedbackMail(param ,dispatch);
        this.setState({
          visible: false,
        });
      }

      handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
      

  
	render() {
	  const { getFieldDecorator } = this.props.form;
	  const { visible , checkNick } = this.state;
    return ( 
      <div>
      <Button type="primary" onClick={this.showModal}>
      Open Modal
    </Button>
    <Modal
      title="Feedback / Issue"
      visible={visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
    >
    <Form.Item {...formItemLayout} label="Email">
    {getFieldDecorator('email', {
      rules: [{
        required: true,
        message: 'Please input your email',
      }],
    })(
      <Input placeholder="Please input your email" />
    )}
  </Form.Item>
  
  <Form.Item {...formItemLayout} label="Subject">
  {getFieldDecorator('subject', {
    rules: [{
      required: true,
      message: 'Please input your subject',
    }],
  })(
    <Input placeholder="Please input your email" />
  )}
</Form.Item>
  <Form.Item {...formItemLayout} label="Message">
    {getFieldDecorator('message', {
      rules: [{
        required: checkNick,
        message: 'Please input your Message',
      }],
    })(
      <TextArea rows={4} placeholder="Please input your nickname" />
    )}
  </Form.Item>
    </Modal>
      </div>
    );
  }
}

const WrappedtestingContainer = Form.create({ name: 'dynamic_rule' })(testingContainer);
export default withRouter(connect(null)(WrappedtestingContainer));