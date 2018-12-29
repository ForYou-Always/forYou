import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Button, Tooltip } from 'antd';

import Header from './layout/header';
import SideMenu from './layout/sideMenu';
import ContentBody from './layout/contentBody';
import '../styles/home.css';

//const { SubMenu } = Menu;
//const { Header, Content, Sider } = Layout;

class LayoutContainer extends Component {
  
  constructor(props){
    super(props);
  }
	
	render() {
		const { history, children } = this.props;

		return (
			<Layout>
  	    <Header />
  	    <Layout>
  	      <SideMenu />
  	      <ContentBody>
  	        {children}
  	      </ContentBody>
  	    </Layout>
  	  </Layout>
	  );
	}
}

export default connect(null)(withRouter(LayoutContainer));