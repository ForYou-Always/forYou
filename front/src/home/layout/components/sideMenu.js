import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon, Modal, Button, Avatar, Skeleton, List, Tag } from 'antd';
import '../../../styles/home.css';
import { deliveredPostDetails }  from '../flux/layoutActions.js';
import * as ACTION_TYPES from '../flux/layoutActionTypes';

const { SubMenu } = Menu;
const { Sider } = Layout;

const styles={
    siderStyle:{
      background: '#fff',
      overflow: 'auto',
      height: '92vh'
    },
    menuStyle:{
      height: '100%',
      borderRight: 0 
    },
    subMenuIcon:{
      fontSize: 25 
    },
}

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

class SideMenu extends Component {
  
  constructor(props){
    super(props);
    this.state = {
        visible: false,
        confirmLoading: false,
        list: [],
        }
  }
  
  getDeliveredPost = async(param) => {
    const { dispatch } = this.props;
    await deliveredPostDetails(param, dispatch);
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
  
  showCurrentModal = () => {
    const param = {
        status: 'Available'
    }
    this.getDeliveredPost(param).catch(this.handleError);
    this.setState({
      visible: true,
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

  handleCancel = () => {
    console.log('Clicked cancel button');
    const { dispatch } = this.props;
    dispatch({ type: ACTION_TYPES.RECEIVE_DELIVERED_POST, data:[] });
    this.setState({
      visible: false,
    });
  }
  
  render() {
    const { history, collapsed, postResponse, deliveredPost} = this.props;
    const {  ModalText, visible, confirmLoading} = this.state;
    
    const { initLoading, loading, list } = this.state;
    return (
        
     <div>
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
      <Sider
          width={200}
          collapsible
          trigger={null}
          collapsed={collapsed}
          style={styles.siderStyle}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={styles.menuStyle}
        >
          <SubMenu key="Timeline" title={<span>
          <Icon type="dashboard" theme="twoTone" style={styles.subMenuIcon} /><span>Timeline</span></span>}>
            <Menu.Item key="1">Info</Menu.Item>
            <Menu.Item key="2">My Posts</Menu.Item>
            <Menu.Item key="3">Favourites</Menu.Item>
          </SubMenu>
          <SubMenu key="Forum" title={<span >
          <Icon type="sound" theme="twoTone" style={styles.subMenuIcon} /><span>Forum</span></span>}>
            <Menu.Item key="5">NGO</Menu.Item>
            <Menu.Item key="6">Crisis</Menu.Item>
            <Menu.Item key="8">Hot Topics</Menu.Item>
          </SubMenu>
          <SubMenu key="News Feed" title={<span>
          <Icon type="gold" theme="twoTone" style={styles.subMenuIcon} /><span>News Feed</span></span>}>
            <Menu.Item key="9">Events</Menu.Item>
            <Menu.Item key="10">Govt. Links</Menu.Item>
            <Menu.Item key="11">Official</Menu.Item>
          </SubMenu>
          <SubMenu key="Post Details" title={<span>
          <Icon type="shopping-cart" style={styles.subMenuIcon} /><span>Post Details</span></span>}>
            <Menu.Item key="12" onClick={this.showDeliveredModal}>Delivered Post</Menu.Item>
            <Menu.Item key="13" onClick={this.showCurrentModal}>Current Post</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      </div>
    );
  }
}

function mapStatetoProps(state){
  return{
    collapsed: state.get('layout').get('switchSideToggle'),
    deliveredPost: state.get('layout').get('putDeliveredPost'),
    postResponse: state.get('post').get('getPostData')
  }
}

export default withRouter(connect(mapStatetoProps)(SideMenu));