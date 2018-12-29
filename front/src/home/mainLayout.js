import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Button, Tooltip } from 'antd';
import '../styles/home.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class MainLayout extends Component {
  
  constructor(props){
    super(props);
    this.state = {
        loading: false,
        collapsed: true,
    }
  }
	
  handleError = (err) => {
    message.error(`${err.customError}`);
    this.setState({ loading: false });
  }
  
  handleSideMenuTogle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

	render() {
		const { history } = this.props;
		const { collapsed } = this.state;

		return (
			<div>
  			<Layout>
    	    <Header className="header" style={{ padding:'0 30px' }}>
    	     <Button shape="circle" icon="menu-fold" onClick={this.handleSideMenuTogle} style={{ marginRight:10 }}/>    	    
    	     <span><img src="./front/src/styles/images/ForYou.jpg" height="35" width="100"/>
    	       <div style={{ float:'right' }}>
    	         <Button type="dashed" icon="notification" style={{ marginRight:10 }}/>
    	         <Button type="dashed" icon="message" style={{ marginRight:10 }}/>
    	         <Button type="dashed" icon="bars" style={{ marginRight:10 }}/>
    	         <Tooltip placement="bottomRight" title="Logout"><Button type="dashed" icon="logout"/></Tooltip>
    	       </div>
    	     {false && <Menu
    	        theme="dark"
    	        mode="horizontal"
    	        style={{ lineHeight: '64px', float:'right' }}
    	      >
    	        <Menu.Item key="1"><Button type="dashed" icon="notification"/></Menu.Item>
    	        <Menu.Item key="2"><Button type="dashed" icon="bars"/></Menu.Item>
    	        <Menu.Item key="3"><Button type="dashed" icon="logout"/></Menu.Item>
    	      </Menu>}</span>
    	    </Header>
    	    <Layout>
    	      <Sider width={200} style={{ background: '#fff', overflow: 'auto', height: '92vh' }}
    	          trigger={null}
        	      collapsible
                collapsed={collapsed}
    	      >
    	        <Menu
    	        theme="dark"
    	          mode="inline"
    	          defaultSelectedKeys={['1']}
    	          style={{ height: '100%', borderRight: 0 }}
    	        >
    	          <SubMenu key="Timeline" title={<span>
    	          <Icon type="dashboard" theme="twoTone" style={{ fontSize: '25px' }} /><span>Timeline</span></span>}>
    	            <Menu.Item key="1">Info</Menu.Item>
    	            <Menu.Item key="2">My Posts</Menu.Item>
    	            <Menu.Item key="3">Favourites</Menu.Item>
    	          </SubMenu>
    	          <SubMenu key="Forum" title={<span >
    	          <Icon type="sound" theme="twoTone" style={{ fontSize: '25px' }} /><span>Forum</span></span>}>
    	            <Menu.Item key="5">NGO</Menu.Item>
    	            <Menu.Item key="6">Crisis</Menu.Item>
    	            <Menu.Item key="8">Hot Topics</Menu.Item>
    	          </SubMenu>
    	          <SubMenu key="News Feed" title={<span>
    	          <Icon type="gold" theme="twoTone" style={{ fontSize: '25px' }} /><span>News Feed</span></span>}>
    	            <Menu.Item key="9">Events</Menu.Item>
    	            <Menu.Item key="10">Govt. Links</Menu.Item>
    	            <Menu.Item key="11">Official</Menu.Item>
    	          </SubMenu>
    	        </Menu>
    	      </Sider>
    	      <Layout style={{ padding: '0 24px 24px' }}>
    	        <Breadcrumb style={{ margin: '16px 0' }}>
    	          <Breadcrumb.Item>Home</Breadcrumb.Item>
    	          <Breadcrumb.Item>List</Breadcrumb.Item>
    	          <Breadcrumb.Item>App</Breadcrumb.Item>
    	        </Breadcrumb>
    	        <Content style={{
    	          background: '#fff', padding: 24, margin: 0, minHeight: 280,
    	        }}
    	        >
    	          Content
    	        </Content>
    	      </Layout>
    	    </Layout>
    	  </Layout>
			</div>);
	}
}

export default connect(null)(withRouter(MainLayout));