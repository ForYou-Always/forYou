import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Drawer, InputNumber, Switch, Slider } from 'antd';
import { Button, Input, Upload, Icon, Checkbox, Row, Col,Badge } from 'antd';
import * as ACTION_TYPES from '../flux/layoutActionTypes.js';
//import { postRegister }  from '.././post/flux/postActions.js';

const { TextArea } = Input;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

class supportComponents extends Component {
  constructor(props){
    super(props);
  }

  onClose = () => {
    const { dispatch } = this.props;
    dispatch({
      type: ACTION_TYPES.RECEIVE_POST_DRAWER_TOGGLE,
      data: false
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = false;
    this.props.form.validateFields((err) =>  isValid = !err);
    if(!isValid){
      return;
    } 

    await this.postSaveFunction().catch(this.handleError);
    this.onClose();
  }

  postSaveFunction = async() =>{
    const { form, dispatch } = this.props;
    const param = form.getFieldsValue();
    param.status="Available";
    await postRegister(param, dispatch);
  }

  handleError = (err) => {
    message.error(`${err.customError}`);
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  
  handleCancel = () => {
    console.log('Clicked cancel button');
    const { dispatch } = this.props;
    dispatch({ type: ACTION_TYPES.RECEIVE_DELIVERED_POST, data:[] });
    this.setState({
      visible: false,
    });
  }
  
  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  
  getDeliveredPost = async(param) => {
    const { dispatch } = this.props;
    await deliveredPostDetails(param, dispatch);
  }
  
  showCurrentModal = () => {
    const param = {
        status: 'Available'
    }
    this.getDeliveredPost(param).catch(this.handleError);
    this.setState({
      visible: true,
    });
  }
  
  showDeliveredModal = () => {
    const param = {
        status: 'Delivered'
    }
    this.getDeliveredPost(param).catch(this.handleError);
    this.setState({
      visible: true,
    });
  }


  render() {
    const {  visible, confirmLoading} = this.state;
    const { form, history, drawer } = this.props;
    const { getFieldDecorator } = form;
    return (
        <div>
          <Drawer
            title="Input New Post Details"
            width={720}
            onClose={this.onClose}
            visible={drawer}
            style={{
              overflow: 'auto',
              height: 'calc(100% - 108px)',
              paddingBottom: '108px',
            }}
          >
            <Form layout="vertical" hideRequiredMark>
              <Form.Item {...formItemLayout} label="InputProductsNumber" >
                {getFieldDecorator('inputProductsNumber', { initialValue: 1 })(
                    <InputNumber min={1} max={20} />
                )}
                <span className="ant-form-text"> machines</span>
              </Form.Item>
      
              <Form.Item {...formItemLayout} label="Products">
                {getFieldDecorator('products', {
                  rules: [{
                    required: true,
                    message: 'Please input your materials',
                  }],
                })(
                    <Input placeholder="Please input your materials" />
                )}
              </Form.Item>
      
              <Form.Item {...formItemLayout} label="BigVehicle" >
                {getFieldDecorator('bigVehicle', { valuePropName: 'checked' })(
                    <Switch />
                )}
              </Form.Item>
      
              <Form.Item {...formItemLayout} label="ProductUsed" >
                {getFieldDecorator('productUsed')(
                    <Slider marks={{
                      0: '1 Month', 20: '2 Month', 40: '3 Month', 60: '4 Month', 80: '5 Month', 100: 'Morethan 1 Year',
                    }}
                    />
                )}
              </Form.Item>
      
              <Form.Item {...formItemLayout} label="Types of volunters" >
                {getFieldDecorator("typeVolunters", {
                })(
                    <Checkbox.Group style={{ width: "100%" }}>
                    <Row>
                    <Col span={8}><Checkbox value="Male">Male</Checkbox></Col>
                    <Col span={8}><Checkbox value="Female">Female</Checkbox></Col>
                    <Col span={8}><Checkbox value="Both">Both</Checkbox></Col>
                    </Row>
                    </Checkbox.Group>
                )}
              </Form.Item>
      
              <Form.Item {...formItemLayout} label="Upload" extra="longgggggggggggggggggggggggggggggggggg" >
                {getFieldDecorator('upload', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                    <Upload name="logo" action="/upload.do" listType="picture">
                    <Button>
                    <Icon type="upload" /> Click to upload
                      </Button>
                    </Upload>
                )}
              </Form.Item>
              
              <Form.Item label="PostDetails" >
                {getFieldDecorator("postDetails", {
                })(
                    <TextArea rows={4}  placeholder="Please input the details about the post"/>
                )}
              </Form.Item>
            
            </Form>
            <div
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} type="primary">
                Submit
              </Button>
            </div>
          </Drawer>
          
          {visible && <Modal
            title="Delivered Post"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
          <List
          itemLayout="horizontal"
          dataSource={deliveredPost}
          renderItem={post => (
            <List.Item actions={[<a>View</a>, <a>Remove</a>]}>
            <List.Item actions={[<Tag color="#f50">Delivered</Tag>]}>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://ant.design">forU NGO</a>}
                description={<p>{post.inputProductsNumber} Product(s) have been delivered </p>}
              />
            </List.Item>
            </List.Item>
            </List.Item>
          )}
          />
          </Modal>}
          
        </div>
    );
  }
}

function mapStatetoProps(state){
  return{
    drawer: state.get('layout').get('switchPostDrawerToggle')
  }
}

const WrappedPostForm = Form.create()(supportComponents);
export default connect(mapStatetoProps)(withRouter(WrappedPostForm));