import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import '../../../styles/home.css';

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
    }
}

class SideMenu extends Component {
  
  constructor(props){
    super(props);
  }
  
  render() {
    const { history, collapsed } = this.props;

    return (
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
        </Menu>
      </Sider>
    );
  }
}

function mapStatetoProps(state){
  return{
    collapsed: state.get('layout').get('switchSideToggle')
  }
}

export default withRouter(connect(mapStatetoProps)(SideMenu));